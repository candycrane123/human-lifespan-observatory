# Release 0.1 — functional recovery

## Handover
The initial ChatGPT prototype is supplied unchanged as index.html (renamed from human_lifespan_observatory.html). The user reports that it does not work as intended; exact failure steps are not yet supplied. Previous messages report partial embedded data, external network restrictions, incomplete historical coverage, simplified scenarios, a static research guide instead of AI, and no world map. These are handover claims, not independently verified test results. Inspect the actual code and verify everything. The original product requirements are in PRODUCT_SPEC.md. Do not attempt all nine research modules at once.

## Assignment
1. Serve and open the original application in a real browser; also check direct file opening if feasible. Record console and network errors and reproduce failures. Install a suitable browser testing framework (e.g. Playwright) using approved environment setup if necessary. Report tooling blockers honestly.
2. Audit event handlers, state, chart rendering, data flow, parsing, missing data, sources and calculations. Create a defect register with reproduction steps, expected/actual behavior, severity, root cause, fix and regression test. P0 = unusable or scientifically misleading; P1 = core functionality broken; P2 = other substantial defects; P3 = minor.
3. Fix P0/P1 defects in core timeline, country and indicator selection, gender and year filtering, chart updates, navigation, offline data fallback. Preserve Hungarian UI and visual identity. Disable or clearly label unsupported features rather than faking data or interactivity. Do not expand scope to new modules.
4. Add automated regression tests: offline startup; Hungary/Austria/Germany/Japan comparison; male/female/total filters; time range and indicator changes; missing combinations; rapid filter changes; navigation; network failure; data import/export and malformed input where supported. Assert output values/series and state, not merely visible controls. Check demographic formulas with known cases. Test desktop/mobile and note any unsupported environments.
5. Validate data source definitions and sample records where possible. Document unavailable data. Never equate a visually complete chart with a verified chart.
6. Deliver corrected source, run instructions, tests, defect register, test evidence and known limitations. Preserve original baseline in Git history, use a dedicated branch or PR, do not merge automatically.

## Release gate
No known unaddressed P0 defects; P1 defects fixed or explicitly blocked. Core comparisons operate without network. Every tested filter changes the intended dataset and chart. Missing values remain missing. No unexplained runtime errors in tested workflows. Report actual test commands and outcomes. If the gate cannot be met, label release incomplete. Do not start Release 0.2.

## Subsequent roadmap (not current scope)
0.2 data foundation; 0.3 core visualizations; 0.4 retirement analytics; 0.5 personal simulator; 0.6 cohort and inequality research; 1.0 validated release.
