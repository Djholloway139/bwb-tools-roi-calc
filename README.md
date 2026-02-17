# BWB ROI Calculator

Interactive financial modeling tool for comparing two BWB (Betches Walking Betches) expansion deal structures side-by-side. Built for Danette, the prospective Bozeman, MT partner.

## Deal Structures

- **Option 1: Partnership-Licensing** — $30K upfront + progressive licensing fees on annual revenue
- **Option 2: True Partnership LLC** — $20K upfront for 49% equity, profit split 51/49

## Features

- **Revenue-driven inputs** — Number of clients × average service price drives starting monthly revenue
- **Compound growth modeling** — Configurable monthly growth rate with 12/18/24-month timelines
- **Scenario presets** — Conservative, Moderate, Aggressive with one-click switching
- **ROI metrics** — Total Revenue, Total Profit, Partner Take-Home, ROI %, Break-Even Month
- **Interactive charts** — Revenue projections, cumulative income, net take-home, fee comparison
- **Progressive licensing brackets** — Marginal rate calculation matching US tax bracket structure

## Tech Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- Recharts for data visualization
- Jest for unit/integration testing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

## Tests

```bash
npm test
```

## Deployment

Docker standalone build with PM2, behind Traefik reverse proxy.

```bash
docker build -t bwb-roi .
docker run -d -p 3000:3000 bwb-roi
```

**URL**: `https://bwb-tools.rapiqual.com`
