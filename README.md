# Human Lifespan Observatory

Az emberi életidő atlasza — magyar nyelvű demográfiai kutatási prototípus.

## Ellenőrzés böngészőből

1. Nyisd meg a [PR #1](https://github.com/candycrane123/human-lifespan-observatory/pull/1) **Commits** lapját, és jegyezd fel az ellenőrizendő commit SHA-ját.
2. Nyisd meg a **Checks** lapon a **Browser regression** futást. A futás összefoglalójában ellenőrizd a commit SHA-ját. Az **Artifacts** részen a `playwright-report-…` ZIP kibontása után nyisd meg az `index.html` jelentést. A `failure-screenshots-…` csak akkor jelenik meg, ha készült hibakép. Bejelentkezett GitHub-fiók és hozzáférés szükséges.
3. Az alkalmazás futtatásához nyisd meg a PR-ben hivatkozott védett előnézetet, ha rendelkezésre áll. Ellenőrizd az ott feltüntetett commit SHA-ját. Alternatívaként a **Files changed** lapon nyisd meg az `index.html` fájlt a kiválasztott commitból, töltsd le a **Download raw file** gombbal, és nyisd meg a böngészőben. Az Actions `browser-review-…` ZIP ugyanazt a fájlt és a hozzá tartozó `COMMIT.txt` fájlt tartalmazza. Ehhez sem fejlesztői eszköz, sem internetkapcsolat nem szükséges a letöltés után.
4. Kövesd az alábbi ellenőrzőlistát. A hibajelzésben add meg a commit SHA-ját, a böngésző nevét, a választott beállításokat és a kapott eredményt.

### Átvételi ellenőrzőlista

- [ ] Az alapnézetben Magyarország, az Egyesült Államok és Japán férfi idősorai jelennek meg. Az évválasztó a grafikon alatti számszerű összehasonlítást frissíti. A további mutatók, dátumok és források a **Beállítások és adatforrások** alatt érhetők el.

- [ ] Az Idővonalon add hozzá Németországot. A születéskori élettartam mind a négy országnál látszik összesített, férfi és női bontásban.
- [ ] Válaszd a **Történeti nézet: 1949–2024** gombot. Az ENSZ-élettartam 1950-ben indul. Az archív korhatárvonal 2010-ig tart, a más módszertanú modern vonal 2018-tól külön jelenik meg.
- [ ] Válaszd a **Közös időszak: 2018–2024** gombot. A folytonos várhatóélettartam-vonal mellett szaggatott korhatárvonal jelenik meg. Magyarország férfi korhatárpontjai 63,5 (2018), 64,5 (2020), 65 (2022) és 65 év (2024).
- [ ] Állítsd az időszakot 1990–2000-re, majd válts mutatót. A grafikon és az adatlefedettség felirata követi a beállításokat.
- [ ] Az Egyenlőtlenségek nézetben válts 2024-ről 1990-re. A rangsor a kiválasztott év országadatait mutatja.
- [ ] Válaszd a születéskori HLY-t női bontásban. Az Eurostat- és a KSH-forrás külön választható. A csak magyar KSH-sor esetén a nézet jelzi, hogy nincs elég összehasonlítható ország.
- [ ] Nyisd meg a letöltött HTML-t internetkapcsolat nélkül. Az idősor és a rangsor működik, a sikertelen online frissítést az alkalmazás jelzi.

## Helyi futtatás és tesztelés

A böngészőben közvetlenül megnyitható az önálló [index.html](index.html), vagy kiszolgálható a `python3 -m http.server 8000` paranccsal. A Playwright-tesztekhez Node.js 20 vagy újabb és Python 3 szükséges. A tesztek a 8011-es porton indítják a helyi szervert.

```sh
npm ci
npx playwright install chromium
npm test -- --workers=2
```

A [0.1.1 kiadási jegyzet](RELEASE_0.1.1.md) ismerteti az előnézeti lehetőségeket és a TLS-vizsgálatot. A [0.1 kiadási ellenőrzés](RELEASE_0.1.md) tartalmazza a korábbi hibajegyzéket, forrásellenőrzést és lefedettségi korlátokat.
