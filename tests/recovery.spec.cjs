const { test, expect } = require('@playwright/test');
const { readFile } = require('node:fs/promises');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');

const point = (page, country, metric, sex, year) =>
  page.locator(`#plot circle[data-country="${country}"][data-metric="${metric}"][data-sex="${sex}"][data-year="${year}"]`);
const setYear = async (page, id, year) => {
  await page.locator(id).fill(year);
  await page.locator(id).press('Tab');
};
const tab = (page, index) => page.locator(`[data-tab="${index}"]`).click();
const selectMetric = (page, metric, checked) =>
  page.locator(`[data-m="${metric}"]`).setChecked(checked);
const importCSV = (page, text) => page.locator('#importFile').setInputFiles({
  name: 'adat.csv', mimeType: 'text/csv', buffer: Buffer.from(text),
});
const columns = 'c,m,s,y,v,src,kind\n';
async function exportCSV(page, selector) {
  const event = page.waitForEvent('download');
  await page.locator(selector).click();
  return readFile(await (await event).path(), 'utf8');
}

const errorsByPage = new WeakMap();

test.beforeEach(async ({ page }) => {
  const errors = [];
  errorsByPage.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !/Failed to load resource: net::ERR_FAILED/.test(message.text())) {
      errors.push(message.text());
    }
  });
  await page.route('https://**', route => route.abort());
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  expect(errorsByPage.get(page)).toEqual([]);
  const chart = page.locator('#plot');
  if (await chart.count()) await expect(chart.locator('[cx="NaN"], [cy="NaN"]')).toHaveCount(0);
});

test('offline file opens and renders without any network requests', async ({ page, context, browserName }) => {
  expect(browserName).toBe('chromium');
  const network = [];
  page.on('request', request => {
    if (/^https?:/.test(request.url())) network.push(request.url());
  });
  await context.setOffline(true);
  await page.goto(pathToFileURL(resolve('index.html')).href);
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveAttribute('data-value', '76.7243902439025');
  await page.locator('#sex').selectOption('F');
  await expect(point(page, 'JPN', 'le', 'F', 2024)).toHaveAttribute('data-value', '87.13');
  expect(network).toEqual([]);
});

test('four-country comparison uses real values for total, men and women', async ({ page }) => {
  await page.locator('[data-c=DEU]').click();
  await selectMetric(page, 'nra', false);
  const samples = {
    T: { HUN: 76.7243902439025, AUT: 81.9951219512195, DEU: 80.7926829268293, JPN: 84.0363414634146 },
    M: { HUN: 73.7, AUT: 79.8, DEU: 78.5, JPN: 81.09 },
    F: { HUN: 79.9, AUT: 84.3, DEU: 83.2, JPN: 87.13 },
  };
  for (const [sex, values] of Object.entries(samples)) {
    await page.locator('#sex').selectOption(sex);
    await expect(page.locator('#plot circle')).toHaveCount(100);
    await expect(page.locator('#plot polyline')).toHaveCount(4);
    for (const [country, value] of Object.entries(values)) {
      await expect(point(page, country, 'le', sex, 2024)).toHaveAttribute('data-value', String(value));
    }
  }
  await page.locator('[data-c=AUT]').click();
  await expect(page.locator('#plot [data-country=AUT]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
});

test('year limits, baseline and rapid state changes update the chart', async ({ page }) => {
  await setYear(page, '#start', '1989');
  await setYear(page, '#end', '1990');
  await page.locator('#sex').selectOption('M');
  await expect(point(page, 'JPN', 'le', 'M', 1990)).toHaveAttribute('data-value', '75.92');
  await expect(point(page, 'JPN', 'le', 'M', 1991)).toHaveCount(0);
  await page.locator('#base').check();
  await expect(point(page, 'JPN', 'le', 'M', 1989)).toHaveAttribute('data-value', '0');
  await expect(point(page, 'JPN', 'le', 'M', 1990)).not.toHaveAttribute('data-value', '75.92');
  await page.evaluate(() => {
    for (const sex of ['F', 'T', 'M', 'F']) {
      const select = document.querySelector('#sex');
      select.value = sex;
      select.dispatchEvent(new Event('change'));
    }
  });
  await expect(point(page, 'JPN', 'le', 'M', 1990)).toHaveCount(0);
  await expect(point(page, 'JPN', 'le', 'F', 1989)).toHaveAttribute('data-value', '0');
  await setYear(page, '#start', '');
  await expect(page.locator('#start')).toHaveValue('1989');
  await setYear(page, '#start', '2001');
  await expect(page.locator('#end')).toHaveValue('2002');
});

test('indicator and missing combinations remain explicit', async ({ page }) => {
  await expect(point(page, 'HUN', 'nra', 'M', 2024)).toHaveAttribute('data-value', '65');
  await expect(point(page, 'HUN', 'nra', 'F', 2024)).toHaveAttribute('data-value', '62');
  await expect(page.locator('[data-m=exit]')).toBeDisabled();
  await selectMetric(page, 'le', false);
  await selectMetric(page, 'nra', false);
  await selectMetric(page, 'hly', true);
  await expect(page.locator('#plot')).toContainText('nincs adat');
  await page.locator('#missing summary').click();
  await expect(page.locator('#coverage')).toContainText('Japán');
  await page.locator('#sex').selectOption('F');
  await expect(point(page, 'HUN', 'hly', 'F', 2024)).toHaveAttribute('data-value', '64.5');
  await expect(page.locator('#plot [data-country=JPN]')).toHaveCount(0);
  await page.locator('#base').check();
  await expect(page.locator('#plot circle')).toHaveCount(0);
  await expect(page.locator('#coverage')).toContainText('A kezdőévi bázis hiányzik');
});

test('navigation preserves timeline state and checks age-conditional formulas', async ({ page }) => {
  await page.locator('#sex').selectOption('F');
  for (const index of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    await tab(page, index);
    await expect(page.locator('h1')).toBeVisible();
  }
  await tab(page, 0);
  await expect(page.locator('#sex')).toHaveValue('F');
  await expect(point(page, 'HUN', 'le', 'F', 2024)).toHaveAttribute('data-value', '79.9');
  await tab(page, 2);
  const austria = page.getByRole('row').filter({ hasText: 'Ausztria' });
  await expect(austria.locator('td').nth(2)).toHaveText('21,7');
  await expect(austria.locator('td').nth(3)).toHaveText('9,3');
  await expect(austria.locator('td').nth(5)).toHaveText('43%');
  await tab(page, 4);
  await page.locator('#focus').selectOption('AUT');
  await expect(page.locator('.metrics')).toContainText('21,7 év');
  await setYear(page, '#ret', '64');
  await expect(page.locator('.metrics')).not.toContainText('21,7 év');
  await tab(page, 5);
  await expect(page.locator('#sout')).toContainText('23,3%');
});

test('failed refresh survives navigation and cannot change bundled data', async ({ page }) => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('https://ourworldindata.org/**', async route => {
    await gate;
    await route.abort();
  });
  await tab(page, 9);
  await page.locator('#unLoad').click();
  await tab(page, 0);
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveAttribute('data-value', '76.7243902439025');
  await tab(page, 9);
  await expect(page.locator('#unLoad')).toBeDisabled();
  release();
  await expect(page.locator('#loadStatus')).toContainText('Nem sikerült betölteni');
  await expect(page.locator('#unLoad')).toBeEnabled();
  await tab(page, 0);
  await expect(page.locator('#history')).toHaveValue('wb');
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveAttribute('data-value', '76.7243902439025');
});

test('online history and projections load as distinct series with provenance', async ({ page }) => {
  await page.route('https://ourworldindata.org/**', route => {
    const projected = route.request().url().includes('projections');
    return route.fulfill({
      contentType: 'text/csv',
      body: projected
        ? 'Entity,Code,Year,Life expectancy at birth (Projected)\nHungary,HUN,2024,77\nHungary,HUN,2025,77.3'
        : 'Entity,Code,Year,Life expectancy at birth\nHungary,HUN,1950,61.2\nHungary,HUN,2024,77',
    });
  });
  await tab(page, 9);
  await page.locator('#unLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('1 új rekord');
  await page.locator('#projLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('2 új rekord');
  await tab(page, 0);
  await page.locator('#reset').click();
  await page.locator('#history').selectOption('hist');
  await selectMetric(page, 'proj', true);
  await expect(point(page, 'HUN', 'le', 'T', 1950)).toHaveAttribute('data-value', '61.2');
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveCount(0);
  await expect(point(page, 'HUN', 'proj', 'T', 2025).locator('title')).toContainText('Hivatalos projekció');
});

test('CSV rejects malformed rows, selects imported series and exports original values', async ({ page }) => {
  await tab(page, 9);
  await importCSV(page, '');
  await expect(page.locator('#importStatus')).toContainText('CSV-oszlopnevek');
  await importCSV(page, columns+'ZZZ,le,T,2023,80,https://example.org,"nyitott');
  await expect(page.locator('#importStatus')).toContainText('Lezáratlan');
  await importCSV(page, columns+
    'ZZZ,le,T,2023,80,https://example.org,"=1+1, <img src=x>"\n'+
    'ZZZ,le,T,2024, ,https://example.org,adat\n'+
    'ZZZ,le,T,2023,88,https://example.org,ismétlés\n'+
    'ZZZ,le,T,2022,81,javascript:alert(1),adat\n'+
    'ZZZ,le,T,2021,79,https://example.org,adat\n');
  await expect(page.locator('#importStatus')).toContainText('2 importált, 3 kihagyott');
  await tab(page, 0);
  await page.locator('[data-c=ZZZ]').click();
  await page.locator('#history').selectOption('import');
  await selectMetric(page, 'nra', false);
  await expect(point(page, 'ZZZ', 'le', 'T', 2023).locator('title')).toContainText('=1+1, <img src=x>');
  await expect(page.locator('#plot img')).toHaveCount(0);
  await expect(point(page, 'ZZZ', 'le', 'T', 2024)).toHaveCount(0);
  await expect(page.locator('#plot polyline')).toHaveCount(0);
  const csv = await exportCSV(page, '#csv');
  expect(csv.trim().split('\n')).toHaveLength(3);
  expect(csv).toContain('"ZZZ","le","T","2023","80","https://example.org","Saját CSV · =1+1, <img src=x>"');
  await tab(page, 9);
  expect(await exportCSV(page, '#exportAll')).toContain('https://data.worldbank.org/indicator/SP.DYN.LE00.FE.IN');
});

test('World Bank refresh is atomic and uses a separate source', async ({ page }) => {
  let rejectIndicator = true;
  await page.route('https://api.worldbank.org/**', route => {
    const code = new URL(route.request().url()).pathname.split('/').at(-1);
    if (rejectIndicator && code === 'SP.DYN.LE00.FE.IN') return route.fulfill({ json: { unexpected: true } });
    return route.fulfill({ json: [{ pages: 1 }, [
      { countryiso3code: 'HUN', date: '2024', indicator: { id: code },
        value: code === 'SP.DYN.LE00.IN' ? 77.25 : null },
      { countryiso3code: 'HUN', date: '2023', indicator: { id: code }, value: ' ' },
    ]] });
  });
  await tab(page, 9);
  await page.locator('#wbLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('Nem sikerült betölteni');
  await tab(page, 0);
  await expect(page.locator('#history option')).toHaveCount(1);
  rejectIndicator = false;
  await tab(page, 9);
  await page.locator('#wbLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('1 új rekord');
  await page.locator('#wbLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('0 új rekord');
  await tab(page, 0);
  await expect(page.locator('#history')).toHaveValue('wb');
  await page.locator('#history').selectOption('wb-live');
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveAttribute('data-value', '77.25');
  await expect(point(page, 'HUN', 'le', 'T', 2023)).toHaveCount(0);
  await expect(point(page, 'AUT', 'le', 'T', 2024)).toHaveCount(0);
});

test('desktop chart tooltip and pan use the rendered year scale', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop pointer test');
  const chart = page.locator('#plot');
  await chart.scrollIntoViewIfNeeded();
  const box = await chart.boundingBox();
  await page.mouse.move(box.x + box.width * 920 / 960, box.y + box.height / 2);
  await expect(page.locator('#tip')).toContainText('2024');
  await expect(page.locator('#tip')).toContainText('76,7');
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 600 / 960, box.y + box.height / 2);
  await page.mouse.up();
  await expect(page.locator('#start')).toHaveValue('2008');
  await expect(point(page, 'HUN', 'le', 'T', 2007)).toHaveCount(0);
  await expect(point(page, 'HUN', 'le', 'T', 2024)).toHaveAttribute('data-value', '76.7243902439025');
});

test('country rankings use one reference year and exclude aggregates', async ({ page }) => {
  await tab(page, 6);
  await expect(page.locator('#rankYear')).toHaveValue('2024');
  const ranked = page.locator('[data-rank-country]');
  await expect(ranked).toHaveCount(16);
  await expect(ranked.first()).toHaveAttribute('data-rank-country', 'CHE');
  await expect(page.locator('[data-rank-country="JPN"]')).toContainText('84,0');
  await page.locator('#rankYear').selectOption('1990');
  await expect(ranked).toHaveCount(16);
  await expect(page.locator('[data-rank-country][data-year="1990"]')).toHaveCount(16);
  await expect(page.locator('[data-rank-country="HUN"]')).toContainText('69,3');
  await expect(page.locator('[data-rank-country="WLD"]')).toHaveCount(0);
});

test('rankings keep distinct HLY definitions and unverified imports apart', async ({ page }) => {
  await tab(page, 9);
  await importCSV(page, columns+'ZZZ,hly,F,2024,100,https://example.org,ismeretlen módszer\n');
  await expect(page.locator('#importStatus')).toContainText('1 importált');
  await tab(page, 6);
  await page.locator('#rank').selectOption('hly');
  await page.locator('#sex').selectOption('F');
  await expect(page.locator('#rankSource')).toHaveValue('health');
  await page.locator('#rankSource').selectOption('hly');
  await expect(page.locator('#ranking')).toContainText('nincs legalább két összehasonlítható ország');
  await page.locator('#rankSource').selectOption('health');
  await expect(page.locator('#rankYear')).toHaveValue('2024');
  await expect(page.locator('[data-rank-country][data-source="health"]')).toHaveCount(10);
  await expect(page.locator('[data-rank-country="AUT"]')).toContainText('60,6');
  await expect(page.locator('[data-rank-country="HUN"], [data-rank-country="ZZZ"]')).toHaveCount(0);
});

test('rankings do not fill gaps with other reference years or WDI releases', async ({ page }) => {
  await page.route('https://api.worldbank.org/**', route => {
    const code = new URL(route.request().url()).pathname.split('/').at(-1);
    const rows = [['HUN', '2024', 77], ['AUT', '2023', 81], ['JPN', '2023', 84]];
    return route.fulfill({ json: [{ pages: 1 }, code === 'SP.DYN.LE00.IN' ? rows.map(([countryiso3code, date, value]) =>
      ({ countryiso3code, date, value, indicator: { id: code } })) : []] });
  });
  await tab(page, 9);
  await page.locator('#wbLoad').click();
  await expect(page.locator('#loadStatus')).toContainText('3 új rekord');
  await tab(page, 6);
  await page.locator('#rankSource').selectOption('wb-live');
  await expect(page.locator('#ranking')).toContainText('nincs legalább két összehasonlítható ország');
  await page.locator('#rankYear').selectOption('2023');
  await expect(page.locator('[data-rank-country][data-source="wb-live"][data-year="2023"]')).toHaveCount(2);
  await expect(page.locator('[data-rank-country="AUT"]')).toContainText('81,0');
  await expect(page.locator('[data-rank-country="HUN"]')).toHaveCount(0);
});
