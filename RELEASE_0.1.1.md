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
