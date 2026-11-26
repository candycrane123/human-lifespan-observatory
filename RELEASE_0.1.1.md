# Release 0.1.1 — CI and browser acceptance

## CI and provenance

The workflow checks out the PR head SHA explicitly (the pushed SHA on relevant push events), runs Chromium desktop and mobile-emulated projects and publishes the Playwright HTML report. Failures attach browser screenshots when a browser page was available. The portable artifact contains the exact committed HTML, its checksum and the source SHA. These artifacts expire after 14 days. The workflow uses read-only repository permissions, avoids persisting the checkout credential and needs no custom secrets.

The original HLY ranking was reproduced in Chromium. It ranked Hungary’s 2025 KSH female HLY (64.2) beside Austria’s 2024 Eurostat HLY (60.6). Rankings now use a single source methodology, reference year, indicator and sex selection. A slice with fewer than two countries has no ranking. Regional aggregates and unverified imports are excluded from rankings. The timeline and CSV still retain their underlying data access.

## Hosting and browser-only access

- **GitHub Pages** returned 404 on the site endpoint. GitHub reported actual repository visibility as public during this work. Visibility was left untouched. GitHub supports publishing from private repositories only on eligible plans, and restricting Pages readership requires eligible GitHub Enterprise Cloud organization settings. A private source repository alone does not restrict its Pages site. No Pages deployment was enabled. [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) · [Access control](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
- **Portable GitHub review copy** works through the browser’s Download and Open File controls. A commit-specific file link remains available after CI artifacts expire. GitHub's source viewer and artifact links serve downloads or source, so these links are distinct from a running hosted preview.
- **GitHub Codespaces** can serve a single file over a private forwarded port if the account allows Codespaces and has available quota. Codespaces eligibility and a live port were unverified. This release does not require a Codespace. [Private port forwarding](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)

## TLS investigation

With verification enabled, command-line HTTPS to both upstream hosts succeeded against the system CA bundle. Both connections presented a leaf for the requested host issued by this environment’s managed HTTPS proxy. The previous Playwright Chromium browser reported `ERR_CERT_AUTHORITY_INVALID` on both hosts. This points to a proxy CA trust difference between the browser and system clients in this managed environment. Production browsers still need normal endpoint trust and CORS support. Keep TLS verification enabled. A managed browser that must use this proxy requires the administrator-provisioned CA in its supported browser trust store. The automated CI suite intercepts external requests with fixtures to keep regressions deterministic.


## Historical retirement-age comparison

The shared chart compares WDI period life expectancy at birth with OECD normal retirement ages for a full, uninterrupted career starting at 22. The four pension reference years are 2018, 2020, 2022 and 2024 for 15 countries. The dashed line links published snapshots. There are no intervening annual observations or projections in that series. Earlier OECD publications using career entry at age 20 were excluded. The chart's difference between the two measures does not measure expected years in retirement.

Data were transcribed using the numeric workbook columns for normal age by sex, excluding effective exit age and future pension columns. The 2024 values use the OECD full-career model edition already bundled with the application. The OECD aggregate remains a 2024 point.

- 2018 — OECD Pensions at a Glance 2019, Figure 4.4, `data` sheet, columns C (women) and E (men). [Workbook](https://doi.org/10.1787/888934041326)
- 2020 — OECD Pensions at a Glance 2021, Figure 6.14, `Data` sheet, columns D (men) and G (women). [Workbook](https://stat.link/kftyqv)
- 2022 — OECD Pensions at a Glance 2023, Figure 6.13, `Data` sheet, columns D (men) and G (women). [Workbook](https://stat.link/9zyo7u)
- 2024 — OECD Pensions at a Glance 2025, current retirement ages and OECD Data Explorer measure CRPLF22. [OECD publication](https://www.oecd.org/en/publications/pensions-at-a-glance-2025_e40274c1-en/full-report/current-retirement-ages_0f63b747.html)


### Extension to the mid-century baseline

- The default historical view covers 1949–2024. The oldest OECD date is 1949, shown with its actual date as the reference point around 1950. The archive adds published checkpoints from 1949 through 2010. The 2011 report's planned or projected values for 2020 onward are excluded. Its model assumes a complete career from age 20. The modern age-22 model remains a separate chart segment, with a visible gap from 2010 to 2018. A line segment links published checkpoints without adding any annual records. Archived West Germany rows through 2002 were omitted from the present-day Germany series. [OECD historical methodology](https://doi.org/10.1787/pension_glance-2011-en) · [Men, Table 1.1](https://doi.org/10.1787/888932372089) · [Women, Table 1.2](https://doi.org/10.1787/888932372108)
- The offline life-expectancy source now defaults to UN World Population Prospects 2024. The packaged data use `LEx`, `LExMale` and `LExFemale` for 1950–2023 only, the historic estimate interval of this revision. The source supplies each year for all 19 app selections. The 2024 medium projection was not included. The WDI 1960–2024 source remains selectable independently. [UN WPP downloads](https://population.un.org/wpp/Download/Standard/MostUsed/) · [Source CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_Demographic_Indicators_Medium.csv.gz)

### Simplified comparison view

The timeline opens with Hungary, the United States and Japan in the male selection. The chart is followed by a country legend and a year-selectable table. The table defaults to the latest year with a comparable pair in the current selection. Its difference column uses the same country, sex and year. Missing source values remain blank, and a population-wide life expectancy is never subtracted from a sex-specific retirement age. Source, range, extra metrics and export controls are grouped under the expandable chart settings.

### Statutory pension ages

The main view uses a separate statutory indicator for Hungary, the US and Japan. The OECD full-career model remains available as a separately named indicator. In Hungary the general age was 62 in 2010 and 65 in 2024 for both sexes. The OECD 2010 archive includes advance-eligibility figures and the OECD 2024 female model reaches Hungary’s 40-year preferential entitlement before 65. These values do not measure the same rule.

- Hungary uses the general employee threshold for 1955–1979, then the unified general rules. Transition years use the birth cohorts reaching general age in that calendar year. Years without an eligible new cohort are gaps. The October 1954 reform is first shown for the full reference year 1955. [Historical reform account](https://epa.oszk.hu/05300/05334/00083/pdf/EPA05334_demografia_1983_2-3.pdf) · [Transition table](https://real.mtak.hu/24515/1/06_Cseres_Gergely_Zsombor_u.pdf) · [Law §18](https://njt.jog.gov.hu/jogszabaly/1997-81-00-00)
- The US uses SSA’s unreduced retired-worker benefit and the highest full retirement age attained by a cohort in the calendar year. Multiple rules can coexist in a transition year. In 2024 the highest was 66 years and 8 months, for some people born in 1958. [SSA Table 2.A17.1](https://www.ssa.gov/policy/docs/statcomps/supplement/2024/2a8-2a19.html#a17.1)
- Japan uses the old-age Basic Pension age of 65 from the 1986 reform. The earlier period and special Employees’ Pension benefits are outside this series. [Japan Pension Service](https://www.nenkin.go.jp/international/english/japanese-system/benefit/oldage_basic.html) · [Statistics Bureau](https://www.stat.go.jp/english/data/nenkan/1431-23e.html)
