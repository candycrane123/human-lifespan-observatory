# Human Lifespan Observatory

Az emberi életidő atlasza — magyar nyelvű demográfiai kutatási prototípus.

## Indítás

Nyisd meg az [index.html](index.html) fájlt Chromium-alapú böngészőben, vagy futtasd a `python3 -m http.server 8000` parancsot ebben a könyvtárban, majd nyisd meg a [helyi alkalmazást](http://localhost:8000/). A beépített összehasonlításokhoz nincs szükség internetkapcsolatra vagy telepítésre.

A 0.1-es kiadás beépített Világbank-idősorai 1960 és 2024 között mutatják a születéskori periódus-élettartamot összesített, férfi- és női bontásban. Az adatok és módszertan nézetben választható az online frissítés, a CSV-import és az export. Az online és importált adatok az oldal újratöltéséig maradnak meg.

## Böngészős regressziós tesztek

Node.js 20 vagy újabb és Python 3 szükséges. A tesztek önállóan indítják a helyi szervert a 8011-es porton.

```sh
npm ci
npx playwright install chromium
npm test -- --workers=2
```

A [kiadási ellenőrzés](RELEASE_0.1.md) tartalmazza a hibajegyzéket, a mérési eredményeket, a forrásellenőrzést és a korlátokat. A [RECOVERY.md](RECOVERY.md) rögzíti a kiadási feladatot, a [PRODUCT_SPEC.md](PRODUCT_SPEC.md) az archivált termékleírást.
