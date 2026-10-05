(function(root){
'use strict';
const VERSION=2,clamp=(x,a=0,b=100)=>Math.max(a,Math.min(b,Number(x)||0));
const policies=[
 {id:'health',name:'Public health capacity',area:'Health',cost:12,approval:3,economy:1,description:'Train staff and expand local services. Benefits arrive gradually.'},
 {id:'housing',name:'Affordable housing programme',area:'Housing',cost:15,approval:4,economy:2,description:'Support construction and rental assistance, with a significant budget cost.'},
 {id:'enterprise',name:'Small business investment',area:'Economy',cost:10,approval:1,economy:4,description:'Support productive investment. Growth does not reach every household equally.'},
 {id:'integrity',name:'Independent integrity commission',area:'Integrity',cost:5,approval:3,economy:0,description:'Increase disclosure and independent oversight of public spending.'},
 {id:'energy',name:'Clean energy transition',area:'Climate',cost:12,approval:2,economy:3,description:'Invest in energy resilience while managing transition costs.'},
 {id:'education',name:'Skills and schools package',area:'Education',cost:11,approval:3,economy:2,description:'Invest in education and training for long-term employment.'},
 {id:'restraint',name:'Expenditure restraint',area:'Budget',cost:-14,approval:-4,economy:-1,description:'Improve the fiscal balance at the cost of service satisfaction.'}
];
const actions={
 door:{name:'Knock on doors',cost:4,national:.45,local:3.5,trust:1},
 rally:{name:'Hold a campaign rally',cost:8,national:1.6,local:.8,trust:.3},
 debate:{name:'Prepare a televised debate',cost:6,national:1.7,local:.2,trust:.8},
 recruit:{name:'Recruit local volunteers',cost:5,national:.7,local:2.2,trust:1.4},
 fundraise:{name:'Fundraise transparently',cost:-14,national:-.2,local:0,trust:.3},
 research:{name:'Listen to voters',cost:3,national:.6,local:1.8,trust:1},
 services:{name:'Work on constituency cases',cost:4,national:.3,local:3,trust:1.5},
 media:{name:'Explain your programme',cost:5,national:1.2,local:.3,trust:.5},
 scrutiny:{name:'Scrutinise the government',cost:4,national:1.2,local:.5,trust:1},
 organise:{name:'Build the party organisation',cost:5,national:.7,local:1.5,trust:1}
};
function random(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296}
function normalise(a,total=100){const sum=a.reduce((x,y)=>x+Math.max(0,y),0);return a.map(x=>sum?Math.max(0,x)/sum*total:total/a.length)}
function shift(s,index,delta){const next=clamp(s.poll[index]+delta,.05,94),old=s.poll[index];const rest=s.poll.reduce((a,x,i)=>a+(i===index?0:x),0);s.poll=s.poll.map((x,i)=>i===index?next:rest?x*(100-next)/rest:(100-next)/(s.poll.length-1));return next-old}
function log(s,message){s.log.unshift({at:s.phase==='campaign'?'Week '+s.week:'Q'+s.quarter+' · '+s.year,message});s.log=s.log.slice(0,100)}
function create(profile,config={}){
 const parties=profile.parties.filter(p=>!['Speaker','No Party Affiliation','Vacant','Other 2025 affiliations','Unaffiliated'].includes(p.name)).map(p=>({...p}));
 if(config.customParty){parties.push({name:config.customParty.name,short:config.customParty.short||'NEW',colour:config.customParty.colour||'#9878d1',seats:0,custom:true})}
 if(parties.length===0)parties.push({name:config.customParty?.name||'Your fictional party',short:'NEW',colour:'#9878d1',seats:0,custom:true});
 if(parties.length===1)parties.push({name:'Fictional rival movement',short:'RIVAL',colour:'#558caa',seats:0,custom:true});
 const player=Math.max(0,parties.findIndex(x=>x.name===config.party));const seats=config.sandboxSeats||profile.seats||100,termYears=config.sandboxTerm||profile.executiveTerm||profile.term||4;
 let poll=normalise(parties.map(p=>p.seats?Math.pow(p.seats,.8):.8));
 if(profile.code==='US'||profile.mode.startsWith('governor'))poll=normalise(parties.map((_,i)=>i<2?45:2.5));
 if(!parties.some(p=>p.seats))poll=normalise(parties.map((_,i)=>i<2?30:5));
 const s={version:VERSION,profile:profile.code,seed:(config.seed??Date.now())>>>0,name:config.name||'Alex Morgan',age:clamp(config.age||35,18,90),background:config.background||'Community organiser',year:(Number(config.year)||2026)+((Number(config.year)||2026)===2026?.75:0),startYear:Number(config.year)||2026,parties,player,poll,basePoll:[...poll],seats,termYears,office:profile.office,home:config.home||profile.districts[0]?.name||'Simulated constituency 1',phase:'campaign',week:1,quarter:0,termNumber:0,termsWon:0,consecutiveTerms:0,actions:3,partyFunds:85,approval:45,local:45,trust:55,economy:60,budget:100,mandate:0,enacted:[],history:[],log:[],event:null,results:null,coalition:[],tab:'hq',difficulty:config.difficulty||'standard',platform:config.platform||'Housing',pendingBills:[],target:config.home||profile.districts[0]?.name||'',wonHome:false,leaders:[],approvalHistory:[45],retired:false,scenario:profile.restricted||profile.mode==='approximate'||!!config.sandboxSeats};
 if(parties[player].custom){shift(s,player,3-s.poll[player]);s.basePoll=[...s.poll]}
 log(s,'Your career begins. Campaign for your local seat and build support for your party.');return s
}
function act(s,type){const a=actions[type];if(!a||s.actions<=0||s.event||s.phase==='negotiation'||s.retired||s.partyFunds<a.cost)return false;
 s.actions--;s.partyFunds=clamp(s.partyFunds-a.cost,0,500);const bonus=s.background==='Community organiser'&&type==='door'?.4:s.background==='Economist'&&type==='research'?.25:s.background==='Journalist'&&type==='debate'?.35:0;
 const gain=a.national+bonus+(random(s)-.5)*.65;shift(s,s.player,gain);s.local=clamp(s.local+a.local);s.trust=clamp(s.trust+a.trust);
 if(s.phase==='government')s.approval=clamp(s.approval+gain*.7);if(type==='recruit')s.mandate+=.6;log(s,a.name+' completed. '+(gain>=0?'+':'')+gain.toFixed(1)+' points of simulated party support.');return true
}
function allocate(votes,seats,method='dhondt',initial){const counts=initial?[...initial]:votes.map(()=>0);for(let n=0;n<seats;n++){let best=0,value=-1;votes.forEach((v,i)=>{const d=method==='sainte'?2*counts[i]+1:counts[i]+1;if(v/d>value){value=v/d;best=i}});counts[best]++}return counts}
function districtVotes(s,d){
 let baseline;if(d.votes)baseline=s.parties.map(p=>d.votes[p.name]||.12);else if(d.winner&&s.parties.some(p=>p.name===d.winner)){const incumbent=s.parties.findIndex(p=>p.name===d.winner),others=s.basePoll.reduce((a,v,i)=>a+(i===incumbent?0:v),0);baseline=s.basePoll.map((v,i)=>i===incumbent?55:v/Math.max(.1,others)*45)}else baseline=normalise(s.basePoll.map(v=>v*(.25+random(s)*2.5)));
 let values=baseline.map((v,i)=>Math.max(.05,v+(s.poll[i]-s.basePoll[i])+(random(s)-.5)*5));
 if(d.name===s.home)values[s.player]+=((s.local-45)*.3)+(s.background==='Local councillor'?2:0);
 if(d.name===s.target)values[s.player]+=s.mandate;
 return normalise(values)
}
function rank(votes,s){let left=votes.map((v,i)=>({v,i})),out=[];while(left.length){let ticket=random(s)*left.reduce((a,x)=>a+x.v,0),chosen=left.length-1;for(let i=0;i<left.length;i++){ticket-=left[i].v;if(ticket<=0){chosen=i;break}}out.push(left.splice(chosen,1)[0].i)}return out}
function irv(votes,s,optional=false){
 let active=votes.map((_,i)=>i),v=[...votes],rounds=[];
 while(active.length>1){const total=active.reduce((a,i)=>a+v[i],0),ordered=[...active].sort((a,b)=>v[b]-v[a]);rounds.push(active.map(i=>({party:i,vote:v[i]})));if(v[ordered[0]]>total/2)return {winner:ordered[0],final:normalise(ordered.map(i=>v[i])),rounds};
  const low=ordered.at(-1);active=active.filter(i=>i!==low);const weights=active.map(i=>Math.max(.1,votes[i])*(.6+random(s)));const transfer=normalise(weights,v[low]*(optional?.78:1));active.forEach((i,k)=>v[i]+=transfer[k]);v[low]=0;
 }
 return {winner:active[0],final:[100],rounds}
}
function stv(votes,magnitude,s){
 // Generated preference ballots, weighted inclusive Gregory surplus transfers.
 const candidateParties=[];votes.forEach((v,i)=>{const n=Math.min(magnitude,Math.max(1,Math.ceil(v/100*magnitude)+1));for(let j=0;j<n;j++)candidateParties.push(i)});
 const weights=candidateParties.map((p,i)=>votes[p]/candidateParties.filter(x=>x===p).length*(.9+random(s)*.2));
 const ballots=Array.from({length:400},()=>({ranking:rank(weights,s),weight:1})),active=new Set(candidateParties.map((_,i)=>i)),elected=[],quota=Math.floor(ballots.length/(magnitude+1))+1;
 while(elected.length<magnitude&&active.size){
  if(active.size<=magnitude-elected.length){elected.push(...active);break}
  const counts=candidateParties.map(()=>0),assigned=[];ballots.forEach((b,k)=>{const c=b.ranking.find(x=>active.has(x));assigned[k]=c;if(c!==undefined)counts[c]+=b.weight});
  const best=[...active].sort((a,b)=>counts[b]-counts[a])[0];if(counts[best]>=quota){elected.push(best);active.delete(best);const fraction=(counts[best]-quota)/counts[best];ballots.forEach((b,k)=>{if(assigned[k]===best)b.weight*=fraction})}
  else{const low=[...active].sort((a,b)=>counts[a]-counts[b])[0];active.delete(low)}
 }
 const seats=votes.map(()=>0);elected.forEach(c=>seats[candidateParties[c]]++);return seats
}
function getDistricts(profile,s){if(profile.districts.length)return profile.districts;
 const count=['list-pr','approximate'].includes(profile.mode)?Math.min(50,s.seats):profile.mode==='parallel'?(profile.constituencySeats||Math.round(s.seats*.62)):s.seats;
 return Array.from({length:count},(_,i)=>({name:'Simulated constituency '+(i+1),region:'Unverified district names',magnitude:['list-pr','approximate'].includes(profile.mode)?undefined:1}))}
function election(s,p){
 s.event=null;let counts=s.parties.map(()=>0),rows=[],voteTotals=s.parties.map(()=>0),own=false,executive=false,executiveWinner=-1,electors=s.parties.map(()=>0),runoff=null;
 const districts=getDistricts(p,s),mode=p.mode;
 if(mode==='us-pres'){
  for(const d of p.presidentialStates){const votes=normalise(s.poll.map(v=>Math.max(.1,v+(random(s)-.5)*15))),winner=votes.indexOf(Math.max(...votes));let allocation=s.parties.map(()=>0);
   if(['ME','NE'].includes(d.region)){allocation[winner]+=2;for(let k=0;k<d.electors-2;k++){const v=votes.map(x=>x+(random(s)-.5)*18),win=v.indexOf(Math.max(...v));allocation[win]++}}
   else allocation[winner]+=d.electors;
   allocation.forEach((x,i)=>electors[i]+=x);rows.push({...d,votes,winner,electors:allocation});votes.forEach((x,i)=>voteTotals[i]+=x/p.presidentialStates.length)
  }
  executiveWinner=electors.indexOf(Math.max(...electors));if(electors[executiveWinner]<270)executiveWinner=-1;executive=executiveWinner===s.player;
  counts=allocate(s.poll,s.seats);own=executive;
 }else if(['pres-two','governor','governor-two','governor-av'].includes(mode)){
  let votes=normalise(s.poll.map(v=>Math.max(.1,v+(random(s)-.5)*6))),first=[...votes];const order=votes.map((v,i)=>i).sort((a,b)=>votes[b]-votes[a]);executiveWinner=order[0];
  if(mode==='governor-av')executiveWinner=irv(votes,s).winner;
  else if(mode!=='governor'&&votes[order[0]]<=50){const rest=100-votes[order[0]]-votes[order[1]],portion=.35+random(s)*.3;votes=first.map(()=>0);votes[order[0]]=first[order[0]]+rest*portion;votes[order[1]]=first[order[1]]+rest*(1-portion);executiveWinner=votes[order[0]]>=votes[order[1]]?order[0]:order[1];runoff={first,final:votes,qualifiers:order.slice(0,2)}}
  voteTotals=votes;executive=executiveWinner===s.player;counts=s.seats===1?counts.map((_,i)=>i===executiveWinner?1:0):allocate(s.poll,s.seats);rows=[{name:p.name+' nationwide',region:p.name,votes,winner:executiveWinner}];own=executive;
 }else{
  for(const d of districts){const votes=districtVotes(s,d);let awarded=s.parties.map(()=>0),win=votes.indexOf(Math.max(...votes)),m=d.magnitude||1;
   if(mode==='av'||mode==='av-optional')win=irv(votes,s,mode==='av-optional').winner;
   if(mode==='stv'){awarded=stv(votes,m,s);win=awarded.indexOf(Math.max(...awarded))}
   else if(mode==='list-pr'&&d.magnitude){awarded=allocate(votes,m)}
   else awarded[win]=1;
   awarded.forEach((x,i)=>counts[i]+=x);voteTotals=voteTotals.map((x,i)=>x+votes[i]/districts.length);rows.push({...d,votes,winner:win,awarded,simulated:!p.realDistricts});if(d.name===s.home)own=awarded[s.player]>0;
  }
  if(mode==='mmp-nz'||mode==='mmp-de'){
   const local=[...counts],eligible=s.poll.map((v,i)=>v>=5||local[i]>=(mode==='mmp-nz'?1:3)||s.parties[i].name.includes('South Schleswig')?v:0),total=allocate(eligible,s.seats,'sainte');
   counts=mode==='mmp-nz'?total.map((x,i)=>Math.max(x,local[i])):total;
   if(mode==='mmp-de'){const playerWins=rows.filter(x=>x.winner===s.player).sort((a,b)=>b.votes[s.player]-a.votes[s.player]);own=playerWins.slice(0,counts[s.player]).some(x=>x.name===s.home)}
  }else if(mode==='ams'){
   const target=s.seats-counts.reduce((a,x)=>a+x,0);counts=allocate(s.poll,target,'dhondt',counts)
  }else if(mode==='parallel'){
   const localSeats=p.constituencySeats||Math.round(s.seats*.62);if(rows.length!==localSeats)counts=allocate(voteTotals,localSeats);const list=allocate(s.poll,s.seats-localSeats);counts=counts.map((x,i)=>x+list[i])
  }else if((mode==='list-pr'&&!districts.some(x=>x.magnitude))||mode==='approximate')counts=allocate(s.poll,s.seats);
  if(mode.startsWith('mmp')||['ams','list-pr','approximate','parallel'].includes(mode))own=own||counts[s.player]>0; // player leads party list where list membership is abstracted.
 }
 const total=counts.reduce((a,x)=>a+x,0),majority=Math.floor(total/2)+1;const parliamentLeader=counts.indexOf(Math.max(...counts));
 s.termNumber++;s.quarter=0;s.week=1;s.actions=3;s.enacted=[];s.coalition=[s.player];s.wonHome=own;s.results={counts,rows,votes:voteTotals,electors,total,majority,executiveWinner,runoff,kind:p.electionKind,leader:parliamentLeader};
 const limit=(p.code==='US'?2:p.code==='BR'||p.code==='FR'?2:p.consecutiveLimit||null),ineligible=limit!==null&&(p.code==='US'?s.termsWon:s.consecutiveTerms)>=limit;
 if(p.electionKind==='executive'){
  if(mode==='us-pres'&&executiveWinner<0){s.phase='opposition';log(s,'No Electoral College majority. A contingent election would be required; the game places your campaign out of executive office pending that process.')}
  else s.phase=executive&&!ineligible?'government':'opposition';
 }else if(counts[s.player]>=majority&&own)s.phase='government';
 else if(own&&counts[s.player]>0)s.phase='negotiation';else s.phase='opposition';
 s.personalSeatLoss=p.electionKind==='parliamentary'&&counts[s.player]>=majority&&!own;if(s.personalSeatLoss)log(s,'Your party won a majority, but you lost your constituency. A replacement leader governs while you rebuild your local career outside Parliament.');if(s.phase==='opposition')s.coalition=[];
 s.approval=clamp(s.poll[s.player]+(s.phase==='government'?15:12),30,72);s.approvalHistory=[s.approval];s.partyFunds=clamp(s.partyFunds+25,0,500);s.budget=100;
 if(s.phase==='government'){s.termsWon++;s.consecutiveTerms++}else if(s.phase==='opposition')s.consecutiveTerms=0;
 if(ineligible){s.retired=p.code==='US';log(s,'Your term limit prevents another consecutive term in this office. '+(s.retired?'Your presidential career is complete. Start a new career.':'You remain a party organiser for this term.'))}
 log(s,p.electionKind==='executive'?'Election counted. '+(s.phase==='government'?'You won executive office.':'You remain outside executive office.'):'Election counted: '+counts[s.player]+' seats. '+(s.phase==='government'?'You command a majority.':s.phase==='negotiation'?'Negotiate confidence support or take the opposition benches.':s.personalSeatLoss?'A replacement leader governs for your party while you rebuild your local seat.':'You lead your party in opposition.'));
 s.history.push({year:s.year,party:s.parties[s.player].name,vote:voteTotals[s.player],seats:counts[s.player],phase:s.phase,home:own});return s.results
}
function coalition(s,index){if(s.phase!=='negotiation'||index===s.player||s.coalition.includes(index)||!s.results.counts[index])return false;
 // Willingness is simulated and visible, not a claim about real party policy.
 const chance=clamp(75-s.coalition.length*8+(s.trust-50)*.5,25,92);s.actions=Math.max(0,s.actions-1);if(random(s)*100>chance){log(s,s.parties[index].name+' declined the simulated confidence agreement.');return false}
 s.coalition.push(index);s.trust=clamp(s.trust-3);s.approval=clamp(s.approval-1);log(s,s.parties[index].name+' agreed to support confidence and a negotiated programme.');
 if(s.coalition.reduce((a,i)=>a+s.results.counts[i],0)>=s.results.majority){s.phase='government';s.termsWon++;s.consecutiveTerms++;log(s,'A majority-backed government is formed. You take office as '+s.office+'.');s.history.at(-1).phase='government'}return true
}
function opposition(s){if(s.phase!=='negotiation')return false;s.phase='opposition';s.coalition=[];s.consecutiveTerms=0;s.history.at(-1).phase='opposition';log(s,'You take the opposition benches and begin rebuilding for the next election.');return true}
const events=[
 {title:'Household costs rise',text:'A simulated price shock puts pressure on household budgets.',choices:[{name:'Target relief and explain funding',budget:-9,approval:4,economy:1,trust:1},{name:'Protect the fiscal reserve',budget:4,approval:-3,economy:0,trust:0},{name:'Negotiate with employers and unions',budget:-4,approval:2,economy:2,trust:2}]},
 {title:'Severe weather emergency',text:'Communities need recovery assistance after a fictional storm.',choices:[{name:'Fund an immediate recovery package',budget:-12,approval:5,economy:1,trust:2},{name:'Coordinate existing resources',budget:-4,approval:2,economy:0,trust:1},{name:'Delay the response',budget:0,approval:-6,economy:-3,trust:-4}]},
 {title:'Questions over a donor',text:'A fictional party donor’s undisclosed interest raises public concern.',choices:[{name:'Publish records and request scrutiny',budget:-3,approval:3,economy:0,trust:5},{name:'Return the donation',budget:-6,approval:2,economy:0,trust:4},{name:'Dismiss the questions',budget:0,approval:-5,economy:0,trust:-7}]},
 {title:'A difficult wage settlement',text:'Service workers ask for higher pay while the budget is under pressure.',choices:[{name:'Agree to a phased settlement',budget:-8,approval:3,economy:1,trust:1},{name:'Negotiate productivity improvements',budget:-4,approval:1,economy:2,trust:2},{name:'Freeze the wage bill',budget:3,approval:-4,economy:-1,trust:-2}]},
 {title:'An investment proposal',text:'A fictional manufacturer proposes a new regional employment centre.',choices:[{name:'Offer a transparent investment grant',budget:-9,approval:2,economy:4,trust:1},{name:'Approve with environmental safeguards',budget:-4,approval:2,economy:2,trust:2},{name:'Decline the proposal',budget:0,approval:-1,economy:-1,trust:0}]}
];
function advance(s,p){if(s.event||s.retired)return false;if(s.phase==='negotiation'){opposition(s);return true}
 if(s.phase==='campaign'){if(s.week===8){election(s,p);return true}s.week++;s.actions=3;s.partyFunds=clamp(s.partyFunds+3,0,500);const rival=s.poll.map((v,i)=>i).filter(i=>i!==s.player);if(rival.length)shift(s,rival[Math.floor(random(s)*rival.length)],.35+random(s)*.45);log(s,'Campaign week '+s.week+' begins. Rivals are campaigning too.');return true}
 s.quarter++;s.year=Number((s.year+.25).toFixed(2));s.actions=3;s.partyFunds=clamp(s.partyFunds+8,0,500);s.economy=clamp(s.economy+(random(s)-.5)*5);s.budget=clamp(s.budget+7+(s.economy-60)/8,0,220);
 if(s.phase==='government'){s.approval=clamp(s.approval+(s.economy-60)/20-1.1+(s.trust-55)/45);shift(s,s.player,(s.approval-50)/35)}else{shift(s,s.player,.3+(random(s)-.5)*.8);s.approval=clamp(s.approval+.1+(random(s)-.5)*2)}
 s.approvalHistory.push(s.approval);s.local=clamp(s.local-1);
 if(s.quarter>=Math.round(s.termYears*4)){s.phase='campaign';s.personalSeatLoss=false;s.week=1;s.basePoll=[...s.poll];s.coalition=[];log(s,'The term is complete. A new eight-week campaign begins.');return true}
 s.event={...events[Math.floor(random(s)*events.length)]};log(s,'Three months have passed. '+s.event.title+'.');return true
}
function resolve(s,index){const choice=s.event?.choices[index];if(!choice)return false;
 if(s.phase==='government'&&s.budget+choice.budget<0)return false;
 if(s.phase==='government'){s.budget=clamp(s.budget+choice.budget,0,220);s.economy=clamp(s.economy+choice.economy);s.approval=clamp(s.approval+choice.approval)}
 else{const cost=choice.budget<0?Math.ceil(-choice.budget/3):0;if(s.partyFunds<cost)return false;s.partyFunds-=cost;shift(s,s.player,choice.approval*.4);s.approval=clamp(s.approval+choice.approval*.6)}
 s.trust=clamp(s.trust+choice.trust);log(s,(s.personalSeatLoss?'Party advocacy: ':s.phase==='opposition'?'Opposition response: ':'Government decision: ')+choice.name+'.');s.event=null;return true
}
function legislate(s,id){const p=policies.find(x=>x.id===id);if(!p||s.phase!=='government'||s.event||s.actions<=0||s.enacted.includes(id)||s.budget<p.cost)return false;
 s.actions--;const support=s.results.kind==='executive'?clamp(s.results.counts[s.player]/Math.max(1,s.seats)*100+20,20,98):s.coalition.reduce((a,i)=>a+s.results.counts[i],0)/s.results.total*100;const pass=s.results.kind!=='executive'&&support>=50?true:random(s)*100<support;
 if(pass){s.budget=clamp(s.budget-p.cost,0,220);s.approval=clamp(s.approval+p.approval);s.economy=clamp(s.economy+p.economy);s.enacted.push(id);shift(s,s.player,p.approval*.15);log(s,p.name+' passed. Budget and public satisfaction change over this simulated term.')}
 else{s.approval=clamp(s.approval-1);log(s,p.name+' was blocked by simulated legislative opposition.')}return pass
}
function propose(s,id){const p=policies.find(x=>x.id===id);if(!p||s.phase!=='opposition'||s.actions<=0||s.event||s.pendingBills.includes(id)||s.partyFunds<3)return false;s.actions--;s.partyFunds-=3;s.pendingBills.push(id);shift(s,s.player,.9);s.trust=clamp(s.trust+1);log(s,'Opposition proposal: '+p.name+'. You cannot spend the government budget.');return true}
function validSave(s,data){if(!s||s.version!==VERSION||!data.countries[s.profile]&&!data.regions.some(p=>p.code===s.profile)||!Array.isArray(s.parties)||s.parties.length<2||s.parties.length>100||!Array.isArray(s.poll)||s.poll.length!==s.parties.length||!Number.isInteger(s.player)||s.player<0||s.player>=s.parties.length||!['campaign','government','opposition','negotiation'].includes(s.phase))return false;return ['seed','year','actions','partyFunds','approval','local','trust','economy','budget','seats','termYears'].every(k=>Number.isFinite(s[k]))&&s.seats>0&&s.seats<=4000&&s.termYears>0&&s.termYears<=10&&s.poll.every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&s.parties.every(p=>p&&typeof p.name==='string'&&typeof p.short==='string'&&/^#[0-9a-f]{6}$/i.test(p.colour))&&['log','history','enacted','coalition','approvalHistory','basePoll'].every(k=>Array.isArray(s[k]))}
const api={VERSION,clamp,policies,actions,create,act,election,advance,resolve,legislate,propose,coalition,opposition,allocate,irv,stv,normalise,getDistricts,validSave};if(typeof module!=='undefined')module.exports=api;root.Engine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
