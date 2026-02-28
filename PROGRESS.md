# BWB ROI Calculator — Progress

## Phase 1: PRD + Project Scaffold
- [x] Create PRD.md
- [x] Create PROGRESS.md
- [x] Initialize Next.js + TypeScript + Tailwind
- [x] Configure branding (colors, fonts, logo)
- [x] Build layout shell (Header, Footer, DashboardShell)
- [x] Verify: `npm run dev` shows branded shell

## Phase 2: Business Logic + Tests
- [x] Types and interfaces
- [x] Progressive bracket engine
- [x] Revenue projections
- [x] Option 1 calculations
- [x] Option 2 calculations
- [x] Scenario presets
- [x] Formatters
- [x] Test suite — all 40 tests pass

## Phase 3: UI Components — Inputs + Comparison
- [x] Input components (sliders, scenario toggle, timeline)
- [x] Comparison grid with option cards
- [x] Fee breakdown and equity split visuals
- [x] useCalculator hook + state management
- [x] Verify: live updating on input change

## Phase 4: Charts + Visualization
- [x] Install Recharts
- [x] Revenue chart
- [x] Cumulative net income chart
- [x] Net take-home bar chart
- [x] Fee comparison chart
- [x] Chart interactivity (tooltips, annotations)

## Phase 5: Polish + Responsive
- [x] Mobile/tablet/desktop responsive layout
- [x] Number formatting
- [x] Print stylesheet
- [x] Accessibility (ARIA labels, keyboard nav)
- [x] Disclaimer footer
- [x] Slider thumb styling

## Phase 6: Deployment
- [x] Dockerfile
- [x] docker-compose.yml
- [x] ecosystem.config.js
- [x] next.config.ts standalone output
- [x] .dockerignore
- [x] GitHub repo: https://github.com/Djholloway139/bwb-tools-roi-calc
- [x] DNS + VPS deployment
  - Container `bwb-tools` running on Hostinger VPS (72.61.18.201)
  - Live at https://bwb-tools.rapiqual.com/roi-calc
  - basePath `/roi-calc` configured in next.config.ts
  - Traefik auto-discovery via `root_default` external network
  - No other containers affected (n8n, vault-agents, area-checker, chappie, ppb-bot, n8n-debug-agent all untouched)

## Phase 7: Post-Deploy Fixes
- [x] Replaced logo with correct Betches B Logo (public/bwb-logo.png)
- [x] Fixed logo not rendering — switched from Next.js `<Image>` to plain `<img>` with explicit basePath prefix (`/roi-calc/bwb-logo.png`)
- [x] Removed em dash from title — now reads "Bozeman Expansion Deal Comparison"
- [x] Applied Betches font branding:
  - Playfair Display SC: regular weight (400) only, no bold
  - All headings: `font-weight: 400` enforced in globals.css
  - Letter spacing: `-0.03em` on all headings (matches -30 tracking from brand guide)
  - Montserrat: body font, unchanged
- [x] All changes pushed to GitHub and redeployed to VPS
