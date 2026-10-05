# Mandate 2026 research ledger

Research began 2026-10-05 03:49:08 UTC. This ledger records the research phase before rebuilding the game. The requested minimum research period is 25 minutes; earliest completion is 04:14:08 UTC.

## Evidence hierarchy

1. Election commissions: names, boundaries, vote counts, party registrations, electoral rules.
2. Parliamentary rosters: current members and caucus totals, distinct from election results.
3. Inter-Parliamentary Union API: global institutional snapshot and latest reported election distributions. These are attributed and dated, not advertised as a fully verified current party registry.
4. Natural Earth: contextual world and US state boundaries. These are generalised map shapes, not authoritative electoral boundaries or an endorsement of territorial claims.

## Findings used to avoid incorrect defaults

- Australia: 150 House divisions; full preferential voting; three-year maximum House term. 2025 AEC primary and two-candidate-preferred CSVs provide the district baseline. AEC's September 25, 2026 register contains 33 parties. The Coalition is an alliance, not a registered single party. State parties and independents must remain distinct.
- Queensland: 93 current seats. June 2026 redistribution applies at the 2028 state election, not during 2026. Parliament's June 2, 2026 member sheet is distinct from the 2024 result.
- NSW: 93 districts, optional preferential voting. Parliament reports current lower-house groups 46 Labor, 24 Liberal, 11 Nationals, 3 Greens and 9 independents.
- Victoria: 88 districts; the November 28, 2026 election has not yet happened at snapshot time. Upper-house regions are not lower-house districts.
- Tasmania: 35 members, five seven-member districts; Hare-Clark STV, not national party-list PR. 2025 result has Liberal 14, Labor 10, Greens 5, independents 5 and Shooters/Fishers/Farmers 1.
- ACT: 25 seats, five five-member districts; Hare-Clark. Leanne Castley's June 2026 switch and Rebecca Vassarotti's June countback mean the 2024 election roster is not a current-party roster.
- UK: 650 constituencies; 649 current MPs on the retrieved official API. Labour Co-op MPs are included in Labour's total. A PM requires parliamentary confidence; the biggest party is not automatically guaranteed government.
- Scotland: 129 seats, 73 constituencies plus eight regions with seven additional members each. The 2026 result and current party balance differ because the Presiding Officer has no party affiliation.
- Wales: 2026 reform means 96 seats in 16 six-member constituencies, closed-list D'Hondt, four-year term. The obsolete 60-seat model must not be used.
- Northern Ireland: 90 MLAs, 18 five-member STV districts, power sharing. A generic winner-takes-all prime-minister model is inappropriate.
- Canada: 343 federal ridings and FPTP. The official 2025 candidate table provides individual district vote shares. The July 2026 federal registry includes 14 registered parties; candidates from deregistered 2025 parties are retained only as historical result data.
- British Columbia: 93 ridings, election October 24, 2026. October 3 final candidate nominations give the actual available party slate; no 2026 outcome is claimed.
- Québec: official 2026 map has 127 divisions, not the former 125; October 5 polling has not concluded at the research snapshot.
- New Zealand: 2026 election uses 71 electorates (64 general, 7 Māori), base parliament 120, MMP threshold 5% or one electorate. Overhang can expand the chamber. September 29, 2026 party registry includes name changes and newly registered parties. Dissolution on October 1 does not turn the 2023 seat distribution into a 2026 result.
- Germany: 630-seat Bundestag, 299 constituencies, MMP and second-vote coverage. A district plurality alone no longer guarantees a seat. Five-percent threshold has exceptions. Federal Returning Officer CSVs include district names and 2025 results.
- United States: House has 435 voting seats and two-year terms; Presidency has a four-year term. Electoral College 538, majority 270; Maine and Nebraska split statewide and district electors. October 1, 2026 Clerk member XML supplies real House districts. Governors have mostly four-year terms, except New Hampshire and Vermont two; Virginia prohibits consecutive gubernatorial terms.
- France: President elected directly for five years, absolute majority/two-round system; legislative election is separate. District first-round victory also requires a quarter of registered electors, and runoff eligibility differs from presidential rules.
- India: 543 elected Lok Sabha constituencies. IPU's statutory 545 is unsuitable for an elected seat-count game. ECI's 2026 state result tables include Tamil Nadu, Kerala, Assam, West Bengal and Puducherry, whose party outcomes cannot be replaced with old 2021 data.
- Japan: February 2026 election, 465 House seats (289 single-member plus 176 proportional); September current caucus table differs from election-day allocation.
- Brazil: current registry has 30 parties; old PSC/PROS/Patriota names cannot be offered as current registered parties. Party federations and coalitions differ.
- South Africa: 400 National Assembly seats; President elected by the Assembly. National/regional compensatory allocation and independents differ from simple single-member constituencies.
- Special cases: appointed legislatures, suspended chambers, transitional systems, noncompetitive party systems and collective executives must be marked. Any competitive election gameplay in these jurisdictions is alternate-history sandbox gameplay, not a factual description.

## Source URLs

- https://api.data.ipu.org/v1/countries?page%5Bsize%5D=250
- https://api.data.ipu.org/v1/chambers?page%5Bsize%5D=300
- https://api.data.ipu.org/v1/elections?page%5Bsize%5D=3000
- https://www.aec.gov.au/Parties_and_Representatives/Party_Registration/Registered_parties/files/register-2026-09-25.json
- https://results.aec.gov.au/31496/Website/Downloads/
- https://www.ecq.qld.gov.au/electoral-boundaries/state-electoral-boundaries
- https://www.parliament.nsw.gov.au/members-and-electorates
- https://www.vec.vic.gov.au/voting/2026-state-election
- https://www.tec.tas.gov.au/house-of-assembly/elections-2025/results/
- https://www.parliament.act.gov.au/members
- https://members-api.parliament.uk/api/Members/Search?House=1&IsCurrentMember=true
- https://members-api.parliament.uk/api/Location/Constituency/Search
- https://www.parliament.scot/msps/elections/2026-election-results
- https://www.parliament.scot/msps/current-party-balance
- https://vote.wales/election-results/
- https://www.electoralcommission.org.uk/voting-and-elections/how-elections-work/types-elections/northern-ireland-assembly
- https://www.elections.ca/content.aspx?dir=par&document=index&lang=e&section=pol
- https://www.elections.ca/content.aspx?section=res&dir=rep/off/45gedata&document=byed&lang=e
- https://elections.bc.ca/2026-provincial-election/candidate-list/
- https://www.electionsquebec.qc.ca/en/pressreleases/2026-provincial-election-polling-day-is-october-5/
- https://elections.nz/assets/pagecomponent-file-files/Register-of-Political-Parties-and-Logos-29-September-2026.pdf
- https://vote.nz/enrolling/get-ready-to-enrol/find-your-electorate-on-a-map
- https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/opendata.html
- https://www.archives.gov/electoral-college/allocation
- https://clerk.house.gov/xml/lists/MemberData.xml
- https://www.fec.gov/documents/5644/2024presgeresults.pdf
- https://www.elections.interieur.gouv.fr/scrutins/lelection-presidentielle/election-presidentielle-je-suis-electeur
- https://www.eci.gov.in/faq/1/6?hl=en-US
- https://results.eci.gov.in/ResultAcGenMay2026/index.htm
- https://www.shugiin.go.jp/internet/itdb_english.nsf/html/statics/member/mem_a.htm
- https://www.tse.jus.br/partidos/partidos-registrados-no-tse
- https://www.parliament.gov.za/national-assembly
- https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files

## Reuse and validation

The AEC map licence forbids altered derivative boundary products, so the game uses ABS CED 2025 boundary geometry instead, whose embedded metadata permits CC BY 4.0. ABS geometry is based on mesh blocks, generalised for rendering and attributed. Natural Earth is public domain. IPU metadata specifies CC BY-NC-SA 4.0, so the derived global political dataset retains that licence separately from code. German CSV metadata specifies Datenlizenz Deutschland – Namensnennung 2.0.

A 193-country official-member URL audit checks availability, not factual correctness. Some stale IPU links redirect to unrelated or compromised domains; none of those pages is used as a source. Successful retrieval does not earn a verified-data badge. All counts, sums, date scopes, duplicate district names within a jurisdiction, and result-vs-current labels require checks during data assembly.

Campaign probabilities, preference transfers, coalition willingness, event effects, approval and economic indicators are fictional gameplay. Aggregated shares cannot reproduce an exact STV count without individual preference ballots. Incomplete country profiles retain conspicuous coverage labels instead of fabricated factual electorates or party lists.

Research phase completed 2026-10-05 04:14:13 UTC: 25 minutes 5 seconds elapsed.
