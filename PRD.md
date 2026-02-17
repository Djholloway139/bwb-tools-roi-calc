# BWB ROI Calculator — Product Requirements Document

## Overview

BWB (Betches Walking Betches) is a luxury pet care company based in LA (~150 families, 10-person team). They are expanding to Bozeman, Montana with a prospective partner named Danette. This tool enables Danette to compare two deal structures side-by-side with interactive financial modeling.

**URL**: `https://bwb-tools.rapiqual.com`

---

## Deal Structures

### Option 1: Partnership-Licensing Model
- **Upfront cost**: $30,000
- **Ongoing**: Monthly licensing fee calculated via progressive brackets on projected annual revenue
- **Partner net**: Revenue - Operating Expenses - Licensing Fee
- **Break-even**: First month where cumulative partner net > $30,000

### Option 2: True Partnership LLC (49% Equity)
- **Upfront cost**: $20,000 for 49% equity
- **Ongoing**: BWB gets 51% of profit, Danette gets 49%
- **Profit**: Revenue - Operating Expenses
- **Break-even**: First month where cumulative partner distributions > $20,000

---

## Progressive Licensing Brackets (Option 1)

Works like US tax brackets — each tier rate applies ONLY to revenue within that band:

| Tier | Range | Rate |
|------|-------|------|
| 1 | $0–$100K | 15% |
| 2 | $100K–$250K | 10% |
| 3 | $250K–$1M | 5% |
| 4 | $1M+ | 2.5% |

**Monthly billing**: Project annual run rate (month × 12), calculate annual fee, divide by 12.

**Example**: $300K annual → 15%×$100K + 10%×$150K + 5%×$50K = $32,500

---

## Adjustable Inputs

| Input | Default | Range |
|-------|---------|-------|
| Number of clients | 8 | 1–100 |
| Average service price | $150 | $50–$300 |
| Monthly growth rate | 10% | 0%–25% |
| Operating expense ratio | 45% | 10%–80% |
| Timeline | 24 months | 12/18/24 |

**Starting monthly revenue** is derived: `numberOfClients × averageServicePrice` (default: 8 × $150 = $1,200/mo).

---

## Scenario Presets

| Scenario | Monthly Growth | OpEx Ratio |
|----------|---------------|------------|
| Conservative | 5% | 60% |
| Moderate | 10% | 45% |
| Aggressive | 15% | 30% |

---

## UI Components

### Input Panel
- Labeled sliders with min/max/step
- Currency-formatted number inputs
- Scenario toggle (conservative/moderate/aggressive)
- Timeline selector (12/18/24 months)

### Comparison Grid
- Side-by-side Option 1 vs Option 2
- Option cards: Total Revenue, Total Profit, Partner Take-Home, ROI %, Upfront Cost, Break-Even, Total Fees/Distributions
- Fee bracket visualization (Option 1)
- Equity split visual (Option 2)

### Charts (Recharts)
1. **Revenue Chart**: Monthly revenue projection (shared baseline)
2. **Cumulative Chart**: Cumulative partner net income, both options overlaid with crossover annotation
3. **Net Take-Home Chart**: Monthly partner net, grouped bars
4. **Fee Comparison Chart**: Cumulative fees/distributions to BWB

---

## Branding

- **Colors**: Primary #C0B3A6, Secondary #0A0706, Tertiary #4F0115, Background #F5EEE8
- **Fonts**: Playfair Display SC (headings), Montserrat (body)
- **Logo**: BWB logo in header

---

## Technical Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- Recharts for data visualization
- PM2 + Docker for deployment
- Traefik reverse proxy (existing infrastructure)

---

## Deployment

- Docker standalone build with PM2
- Traefik labels for auto-discovery
- DNS: `bwb-tools.rapiqual.com` → `72.61.18.201`

---

## Disclaimer

"These projections are for illustrative purposes only and do not constitute financial advice."
