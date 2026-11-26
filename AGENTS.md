# Human Lifespan Observatory — repository instructions

Read PRODUCT_SPEC.md for the original product vision and RECOVERY.md for the current release scope. The specification is an archived input and ends mid-heading; do not infer missing requirements. The supplied index.html is the existing prototype, not a validated release. Preserve it in Git history.

- All user-facing UI and educational explanations must be Hungarian.
- Prioritize working, tested software and scientific correctness over features or cosmetic redesign.
- Reproduce defects before fixing them. Test actual interactions and outputs in a real browser when available. Never claim unexecuted tests passed.
- Keep observed data, official projections, estimates and scenarios distinct. Preserve provenance; never invent missing observations or replace them with zero.
- Retirement duration must use age-conditional remaining life expectancy; never subtract retirement age from life expectancy at birth. HALE and HLY are distinct. Do not infer age-specific healthy years from birth estimates. Distinguish period and cohort measures.
- Core functions should work offline with sourced bundled data; online data retrieval must fail gracefully. Verify data against primary sources when available; mark unverified records and missing coverage.
- Keep the architecture as simple as feasible; no wholesale rewrite or new framework without a documented reason. Maintain a portable HTML deliverable when practical.
- Treat external data/imports as untrusted; validate schemas, escape output, avoid executing imported content, and protect against CSV injection. No credentials or personal/company data in the repository.
- Work in focused changes; provide diffs, reproducible tests, limitations, and launch instructions. No automatic merge to main.
