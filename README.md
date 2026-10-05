# Mandate — A Political Life

A playable, offline-capable political career game with a researched **5 October 2026 source snapshot**. Choose a country and jurisdiction, join a party or found your own, build your politician, campaign for office, and govern or work in opposition through three-month turns.

## Play

Download this repository or the release ZIP, extract it, and open **index.html** in a modern browser. No installation, account, build process or API key is needed. All scripts, data and map assets are bundled locally.

An eight-week campaign gives three actions each week. Win support nationally and in your own constituency. Parliamentary elections can lead to majority government, coalition negotiations or opposition; losing your own seat can leave you outside Parliament even when your party wins. Executive races include presidential and gubernatorial contests. Government and opposition advance one quarter per turn. Choose policies, manage funds, respond to fictional events and prepare for the next election at the end of the modelled term. Term limits apply where documented in the selected profile.

The interface includes parliament seat charts, district searches, interactive geographic maps where bundled, manifesto and policy decisions, finances, approval history, career records and a source desk. Careers autosave locally; export a save before changing browser/device or clearing storage. Import restores a compatible version-2 save.

## Coverage

| Coverage | Included |
|---|---|
| Country choices | 197 national profiles; all 193 UN members plus four additional selectable jurisdictions |
| Regional choices | 67 profiles: eight Australian jurisdictions, 50 US governors, three UK devolved legislatures, British Columbia, and five Indian state/territory elections |
| Named districts | 2,613 names across the supplied profiles; generic slots elsewhere are explicitly simulated |
| Detailed federal districts | Australia, United Kingdom, Canada, New Zealand, Germany and US House districts |
| Geography | Natural Earth world/state outlines; simplified ABS Australian federal and seven state/territory district maps |
| Sources | 36 attributed source entries, with profile dates and research notes |

Party coverage varies. Australia, New Zealand, Brazil and Canada include checked 2026 registries; some profiles use current parliamentary groups, while the global IPU layer uses **latest reported election distributions**, which may be older. A registry, an election result and a current caucus count are different datasets. The game labels these distinctions. British Columbia has a 2026 candidate slate but no invented October election result. Québec was researched but is not a selectable provincial profile in this release.

## Facts and simulation

The year selector changes your fictional career start date. It does **not** load historical parties or electorates. All campaign polls, election outcomes, events, preference ballots, approval, budgets and economic changes are game-generated. Real source vote shares are dated starting baselines.

Electoral models include FPTP, preferential voting, simulated STV ballots, D’Hondt party lists, mixed systems, New Zealand MMP with overhang, Germany's fixed 630-seat allocation and second-vote coverage approximation, direct presidential runoffs, and the 538-vote US Electoral College with Maine/Nebraska splits. They are gameplay models, not official election-counting software. STV uses generated ballots, Scottish regional compensation is approximated nationally, and US congressional support uses an abstract legislative allocation. Contingent elections and complex power-sharing arrangements are explained but simplified. Independents are often grouped rather than modelled as separate candidates.

Limited or noncompetitive jurisdictions require conspicuously labelled alternate-history sandbox play. Exact current parties, district names and election rules are not claimed for every country. State legislatures outside the supplied regional profiles, upper chambers and detailed candidate nomination laws are not included.

Maps are generalised and do not determine electoral enrolment or endorse territorial claims. Sources & rules in the game gives the relevant coverage, dates, licences and limitations. See [RESEARCH.md](RESEARCH.md) for the source ledger and the completed **25-minute, 5-second research phase** before this rebuild.

## GitHub Pages

The included `.github/workflows/pages.yml` publishes the static game from `main` once repository **Settings → Pages → Source → GitHub Actions** is enabled. Run “Publish GitHub Pages” manually if necessary after enabling it. Branch-based Pages also works: choose `main` and `/(root)`.

For this repository the intended Pages URL is `https://ashtonleearcher98-ship-it.github.io/Election-sim/`; this address is playable only after Pages has been enabled and deployment succeeds.

## Validation and development

Run `node tests.cjs`. The dependency-free engine tests cover source references, current rosters, district counts, all 264 profile elections, seat conservation, STV, MMP, campaign progression, quarterly terms, opposition restrictions, coalitions, Electoral College splits and save validation. Real Chromium smoke checks also exercised setup, campaign, results, maps, policies, source cards, desktop and 390-pixel mobile layouts with no page errors or horizontal overflow.

`engine.js` contains the simulation, `app.js` the interface, `style.css` the layout and `data/` the bundled source-derived records and map geometry. Browser data wrappers make the game work directly from a local file without a server.

## Licence

Original code and locally drawn mark: MIT, [LICENSE](LICENSE). **Data has separate terms**, including the IPU-derived global dataset's CC BY-NC-SA 4.0 licence. The MIT licence does not relicense third-party source material. See [DATA-LICENSES.md](DATA-LICENSES.md).
