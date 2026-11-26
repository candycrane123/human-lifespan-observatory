# ROLE & EXPERTISE

Act as an interdisciplinary research team consisting of:

- A PhD-level demographer
- A social and cultural anthropologist
- A pension economist
- A public health and longevity researcher
- A labour market economist
- A quantitative data scientist
- An award-winning data visualization designer
- A senior UX/UI architect
- A senior full-stack software engineer

Combine scientific rigour, interdisciplinary reasoning, critical thinking and exceptional visual storytelling.

# PROJECT MISSION

Design and implement an interactive, scientifically grounded, visually premium educational research application entitled:

**Human Lifespan Observatory — Az emberi életidő atlasza**

Investigate how human longevity, healthy lifespan, working life, retirement systems and socioeconomic conditions have evolved across countries and generations.

Do not merely visualize statistics. Build an exploratory environment that helps users understand the structural relationships, inequalities, historical transformations and societal consequences behind the data.

The central research question is:

**Are humans gaining more healthy, autonomous years of life, or are the additional years increasingly absorbed by longer working lives and age-related health limitations?**

The complete user interface, explanations and educational content must be in Hungarian.

# 1. RESEARCH SCOPE

Investigate historical developments from 1950 to the latest reliably available year.

Include evidence-based projections to 2050 and, where scientifically justified, 2100.

Mandatory countries:

- Hungary
- United States
- Japan
- Germany
- France
- Finland
- Spain
- Austria
- Sweden
- Switzerland
- Italy
- Denmark
- Netherlands
- United Kingdom
- South Korea
- China

Include OECD, EU and global averages where comparable data exists.

Allow additional countries to be introduced through a scalable data architecture.

# 2. CORE RESEARCH DIMENSIONS

## A. Human longevity

- Life expectancy at birth
- Life expectancy at ages 40, 50, 60, 65 and 70
- Healthy life expectancy (HALE)
- Healthy Life Years (HLY), where available
- Disability-free life expectancy
- Probability of surviving to retirement age
- Age-specific mortality rates
- Gender differences
- Socioeconomic inequalities in longevity

## B. Working life and retirement

- Statutory retirement age
- Full-benefit retirement age
- Early retirement eligibility
- Effective labour market exit age
- Average age of entering the labour market
- Expected duration of working life
- Expected remaining lifespan at retirement
- Expected healthy years after retirement
- Pension replacement rates
- Retirement age differences between generations
- Retirement eligibility requirements

## C. Societal and economic transformation

- Population age structure
- Median population age
- Fertility rates
- Old-age dependency ratio
- Working-age population
- Labour productivity
- Real GDP per capita
- Average annual working hours
- Pension expenditure as a percentage of GDP
- Healthcare expenditure
- Income and educational inequalities

## D. Social anthropology and quality of life

Investigate how the social meaning of ageing, retirement and work differs across societies.

Examine:

- Intergenerational relationships
- Cultural perceptions of ageing
- Social participation after retirement
- Social isolation
- Informal caregiving
- Unpaid domestic work
- Financial autonomy
- Occupational differences in ageing
- Access to healthcare
- Urban versus rural disparities

Avoid cultural stereotypes and unsupported causal explanations.

Distinguish measurable observations from qualitative interpretation.

# 3. DATA INTEGRITY AND SCIENTIFIC METHODOLOGY

Use authoritative primary sources wherever possible:

- OECD
- World Health Organization
- World Bank
- Eurostat
- United Nations World Population Prospects
- Human Mortality Database
- International Labour Organization
- National statistical offices
- Official national pension authorities
- Peer-reviewed scientific publications

For every dataset, document:

- Original source and direct URL
- Publication and reference year
- Indicator definition
- Measurement methodology
- Geographic coverage
- Units
- Known limitations
- Missing values
- Revision status

Never fabricate, silently estimate or invent missing historical data.

Do not present interpolated values as observed statistics.

Explicitly distinguish:

- Observed data
- Official projections
- Modelled estimates
- User-defined scenarios

Use harmonized definitions where possible.

Explain when national pension systems or health indicators cannot be directly compared.

Critically important:

Do not calculate expected retirement duration by simply subtracting retirement age from life expectancy at birth.

Use conditional remaining life expectancy at the relevant retirement age.

Where healthy life expectancy at retirement is unavailable, display the limitation rather than silently substituting a different indicator.

Differentiate WHO HALE from Eurostat Healthy Life Years.

Clearly distinguish period life expectancy from cohort life expectancy.

Do not imply causation from statistical correlation.

# 4. INTERACTIVE APPLICATION MODULES

## Module 1 — The global longevity timeline

Create an interactive historical timeline displaying:

- Life expectancy
- Healthy life expectancy
- Statutory retirement age
- Effective retirement age

Allow users to:

- Select multiple countries simultaneously
- Enable or disable individual indicators
- Switch between male, female and population-level data
- Adjust the historical time range
- Zoom and pan
- Hover over individual data points
- Highlight individual countries
- Switch between absolute values and changes relative to a baseline year
- Display historical and projected data separately

Use consistent country-specific colours throughout the application.

Use different line styles for different indicators.

## Module 2 — The anatomy of human life

Create a premium horizontal lifetime visualization separating:

- Childhood and education
- Working life
- Healthy retirement
- Retirement with health limitations

Provide side-by-side comparisons between countries, genders and generations.

Where statistically defensible, visualize expected years and proportions of life spent in each phase.

Clearly identify model assumptions and avoid presenting synthetic life trajectories as guaranteed individual outcomes.

## Module 3 — The retirement opportunity gap

Investigate how longevity gains translate into retirement opportunities.

Visualize:

- Expected retirement duration
- Healthy retirement duration
- Changes in retirement age
- Changes in age-conditional life expectancy
- Survival probability to retirement
- Distribution of retirement benefits across socioeconomic groups

Compare whether increases in longevity have primarily resulted in:

- Longer working lives
- Longer healthy retirement
- Longer retirement with health limitations
- A combination of these outcomes

Any decomposition must use internally consistent demographic measures.

## Module 4 — Generational comparison

Allow users to compare birth cohorts:

1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000 and later generations where evidence permits.

Explore:

- Expected lifespan
- Expected retirement age
- Expected duration of working life
- Expected retirement duration
- Economic and demographic environment
- Historical exposure to major pension reforms
- Uncertainty of future outcomes

Distinguish completed historical cohorts from cohorts requiring projections.

## Module 5 — Personal lifetime simulator

Allow users to enter:

- Country
- Birth year
- Gender
- Age of entering employment
- Planned retirement age

Display population-level estimates of:

- Remaining lifespan
- Probability of reaching selected ages
- Expected duration of working life
- Expected retirement duration
- Potential healthy retirement duration

Provide uncertainty ranges and transparent assumptions.

Clearly state that the simulator is an educational demographic model, not an individual medical, financial or life expectancy prediction.

## Module 6 — The future of retirement

Create an interactive scenario laboratory for 2030–2050.

Adjustable parameters:

- Retirement age
- Longevity improvement
- Healthy lifespan improvement
- Fertility rate
- Labour force participation
- Productivity growth
- Migration assumptions

Demonstrate the potential effects on:

- Pension system sustainability
- Working-age population
- Dependency ratios
- Retirement duration
- Intergenerational burden

Differentiate official projections from hypothetical scenarios.

Do not claim to predict pension sustainability without an adequately specified economic model.

## Module 7 — Global inequality explorer

Create an interactive country map and comparison matrix.

Allow countries to be ranked by:

- Life expectancy
- Healthy life expectancy
- Expected healthy retirement years
- Survival probability to retirement
- Working life duration
- Gender inequality
- Socioeconomic longevity inequality
- Pension replacement rate

Avoid arbitrary composite rankings.

If a composite indicator is introduced, publish its formula, assumptions and adjustable weights.

## Module 8 — Historical context and societal turning points

Overlay relevant historical events onto the timelines:

- Pension reforms
- Major public health developments
- Economic crises
- Political and economic transitions
- Pandemics
- Medical innovations
- Demographic transitions

Explain their possible relevance without automatically attributing demographic changes to individual events.

## Module 9 — AI research companion

Provide context-aware educational explanations of the currently selected data.

Answer questions such as:

- Why does Hungary have lower life expectancy than Austria?
- Why do Japanese citizens live longer?
- Which countries provide the longest healthy retirement?
- Has increasing retirement age kept pace with improvements in healthy longevity?
- Are younger generations likely to experience shorter retirement?
- What role does occupational and educational inequality play?
- Can productivity growth compensate for population ageing?

Ground every factual answer in accessible sources.

Separate evidence, interpretation, uncertainty and competing explanations.

# 5. VISUAL DESIGN DIRECTION

The experience must resemble a premium scientific publication combined with an interactive demographic research laboratory.

Draw inspiration from:

- Our World in Data
- Gapminder
- Financial Times visual journalism
- The Economist data journalism
- Bloomberg Graphics
- High-quality scientific atlases

Do not imitate their branding.

Design principles:

- Editorial sophistication
- Exceptional typography
- Generous whitespace
- Restrained, accessible colour palette
- Strong visual hierarchy
- Data-first composition
- Meaningful visual storytelling
- Responsive layouts
- Light and dark modes
- Accessible chart colours and contrast
- Smooth but purposeful interactions

Avoid generic AI-generated dashboard aesthetics:

- Excessive rounded cards
- Decorative gradients
- Glassmorphism
- Unnecessary icons
- Oversized headings
- meaningless animations
- Generic stock photography
- Artificially dramatic statistics
- Visual clutter

Every visual component must communicate information.

Use custom visualizations where conventional charts are insufficient.

# 6. EDUC