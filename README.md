# Mandate — Political Life
A free, offline-capable single-player browser political simulation. No build, account, API key, subscription or backend required.

## Play
Open index.html in a modern browser. Everything is bundled locally. Choose a country, election level, party or new party, politician, seat, office, year, chamber size and term. Four campaign weeks precede the first election. Each week gives three actions. Government and opposition both advance in three-month turns. Resolve events, improve support, enact policies in government, and contest automatic elections at the end of each term. Careers save in your browser; use Export save to back up or transfer them.

## Publish on GitHub Pages
1. Create a GitHub repository called `mandate`.
2. Upload **the contents of this folder**, including `.github/workflows/pages.yml`, to the `main` branch. Do not upload only the ZIP or nest everything inside another folder.
3. Open repository Settings → Pages → Source → GitHub Actions.
4. Open Actions → Publish GitHub Pages → Run workflow if it has not already run.
5. Your public game will be at `https://YOUR-USERNAME.github.io/mandate/`.

Alternatively, choose Deploy from a branch → main → /(root) in Pages settings; the HTML files also work without Actions.

## Scope and honesty
- 197 country/territory choices, including UN members and additional selectable territories. Naming follows browser region names.
- Australia, US, UK, Canada, NZ, India, France and Germany have illustrative presets. All countries allow custom configuration. State/province names can be entered anywhere; supplied region lists outside Australia/US/Canada are partial.
- Party labels are examples, not a complete current or historical party database. No real politicians, electoral rolls or polling data.
- Historical years are alternate-history starting dates, not historically accurate scenarios. Non-democratic countries can be played as fictional electoral settings.
- Parliamentary contests require a seat majority. Executive contests use a simplified direct vote, including the US (no Electoral College). No coalitions or upper chamber.
- Election map is a schematic district cartogram, not real geographic borders. Home-seat trust contributes to the career score; individual constituencies are not separately simulated.
- Approval or campaign support and seeded uncertainty determine elections. Economy affects quarterly approval. Ideology is a roleplay label in this release.
- Government budgets and opposition party funds use abstract units. Opposition cannot change the economy directly.
- Browser storage is local to the browser/device/origin. Export before clearing browser data.

## Verification
Run `node tests.cjs` for engine checks. Engine checks passed. A full browser visual check could not run in the build environment because no browser executable was installed. No dependencies. Source: `engine.js` simulation, `app.js` UI, `countries.js` country choices, `style.css` layout.

## License
MIT; see LICENSE. No external media or fonts included.
