# Dara Sai Varshith — Portfolio

Personal portfolio for Dara Sai Varshith, Agentic AI engineer. Live at
https://varshith192.github.io/portfolio/

Built with React 18 and Vite 5. No UI framework; styling is plain CSS with
design tokens in `src/styles/tokens.css`.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/portfolio/
npm run build     # production build in dist/
npm run preview   # serve dist/ at http://localhost:4173/portfolio/
```

## Structure

- `src/data/content.js` holds all copy and links (sourced from the résumé).
- `src/components/` has one component per section, plus the hero agent graph
  (`AgentGraph.jsx`) and the three case-study diagrams (`Diagrams.jsx`).
- `public/resume/` holds the downloadable résumé PDF.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on
every push to `main`. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions** once.
