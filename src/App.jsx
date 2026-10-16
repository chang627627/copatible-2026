import { useState, useRef, useEffect } from "react";

const S = {
  OB1:0,OB2:1,OB3:2,OB4:3,OB5:4,
  HOME:5,CAT:6,VOICE:7,MATCH:8,RESULTS:9,
  DETAIL:10,CHAT:11,PROFILE:12,SETTINGS:13,
  JOURNEY:14,LIVE:15,FEEDBACK:16,COMPLETE:17,HISTORY:18,
};
const NR="'Newsreader',Georgia,serif";
const MN="'IBM Plex Mono',ui-monospace,Menlo,monospace";
const B={pp:"#F5F4F1",p2:"#ECEAE5",ink:"#121212",g2:"#6B6A66",ru:"#D6D4CF",dsh:"#8A8984",dim:"#DCDAD5",dimFg:"#5C5B57",page:"#E7E5E1",bez:"#1D1B19"};
const TH={
  stock:{...B,id:"stock",
    wmBg:"#FFD83A",wmFg:"#121212",wmRvBg:"#121212",wmRvFg:"#FFD83A",
    coBg:"#FFD83A",coG2:"#4D4632",coDsh:"#6E5F1F",
    hlBg:"#FF86C1",hlFg:"#121212",
    rvBg:"#FFD83A",rvFg:"#121212",rvG2:"#4D4632",rvRu:"#121212",rvTr:"#E1BF33",rvDsh:"#6E5F1F",rvHlBg:"#FF86C1",rvHlFg:"#121212",
    ctaBg:"#121212",ctaFg:"#FFD83A",
    tbBg:"#FFD83A",tbFg:"#121212",tbN:"#4D4632",
    st:{mv:"#5A86F5",tk:"#FF86C1",od:"#3CCB7F"},
    sig:{mood:["#C2185B","#F5F4F1"],energy:["#F2B705","#121212"],activity:["#0A7146","#F5F4F1"],social:["#2347B0","#F5F4F1"],timing:["#C4361A","#F5F4F1"]},
    dng:"#C4361A"}
};
const k=TH.stock;
const cday=s=>[k.st[s],k.ink];
const bgOf=s=>s==="co"?k.coBg:k.st[s];
const DL=["THU 15 OCT","SAN FRANCISCO"];
const DAYS=[["M","12"],["T","13"],["W","14"],["T","15"],["F","16"],["S","17"],["S","18"]];
const TODAY=3, CDAY=4;
const STK={mv:"Move",tk:"Talk",od:"Outdoors"};
const SIG=[["mood","MO","Mood"],["energy","EN","Energy"],["activity","AC","Activity"],["social","SO","Social"],["timing","TI","Timing"]];
const SC=Object.fromEntries(SIG.map(([s,c,n])=>[s,[c,n]]));
const SV={v:{mood:"restless",energy:"active",activity:"low pressure",social:"a few, chill",timing:"tonight"},p:{mood:"chill",energy:"relaxed",activity:"food & drinks",social:"easygoing",timing:"evening"}};
const PAST_CIRCLES=[
  {cd:"RFT",st:"tk",t:"Rooftop Golden Hour",v:"Noe Valley Rooftop · 2 weeks ago",unread:3},
  {cd:"ESP",st:"tk",t:"Sunday Morning Espresso",v:"Sightglass Coffee · 3 weeks ago",unread:1},
  {cd:"HKE",st:"od",t:"Marin Headlands Hike",v:"Rodeo Beach · 1 month ago",unread:0},
  {cd:"RMN",st:"tk",t:"Japantown Ramen Crawl",v:"Mifune · 1 month ago",unread:0},
  {cd:"ART",st:"tk",t:"SFMOMA After Hours",v:"SFMOMA · 6 weeks ago",unread:0},
  {cd:"SEA",st:"od",t:"Ocean Beach Sunset",v:"Ocean Beach · 7 weeks ago",unread:0},
];

function Kk({l,r,sf,nr,mt}){const f=sf==="rv"?k.rvFg:k.ink,g=sf==="co"?k.coG2:sf==="st"?k.ink:sf==="rv"?k.rvG2:k.g2;return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12,marginTop:mt||0,paddingBottom:nr?0:5,borderBottom:nr?"none":"2px solid "+f}}><span style={{font:"500 11px/13px "+MN,letterSpacing:".07em",textTransform:"uppercase",color:f}}>{l}</span>{r!=null&&r!==false&&<span style={{font:"400 10px/13px "+MN,letterSpacing:".05em",textTransform:"uppercase",color:g,textAlign:"right",display:"inline-flex",alignItems:"center",gap:6}}>{r}</span>}</div>)}
function Wm({sz,rv}){const s=sz||28;return(<span aria-label="CoPatible" style={{font:`300 ${s}px/1 ${NR}`,letterSpacing:"-.015em",color:rv?k.rvFg:k.ink,whiteSpace:"nowrap"}}><span style={{background:rv?k.wmRvBg:k.wmBg,color:rv?k.wmRvFg:k.wmFg,padding:"0 2px"}}>Co</span>patible</span>)}
function Fo({l,r,mt}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:12,marginTop:mt||0,paddingBottom:7,borderBottom:"2px solid "+k.ink}}>{typeof l==="string"?<h1 style={{font:`600 27px/1 ${NR}`,letterSpacing:"-.02em",color:k.ink}}>{l}</h1>:l}{r&&<p style={{font:"400 10px/1.35 "+MN,letterSpacing:".05em",textAlign:"right",color:k.ink,whiteSpace:"nowrap"}}>{r[0]}{r[1]&&<><br/><span style={{color:k.g2}}>{r[1]}</span></>}</p>}</div>)}
function Cal({cs,mt}){return(<div style={{display:"flex",border:"1px solid "+k.ink,marginTop:mt==null?12:mt}}>{DAYS.map(([d,n],i)=>{const td=i===TODAY,cd=cs&&i===CDAY,[b,f]=cd?cday(cs):["transparent",td?k.ink:k.g2];return(<div key={i} style={{flex:1,height:40,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,font:`${td?500:400} 11px/1.25 ${MN}`,color:f,background:b,borderLeft:i?"1px solid "+k.ink:"none"}}><span>{d}</span><span style={{borderBottom:td?"2px solid "+k.ink:"none"}}>{n}</span></div>)})}</div>)}
function Hl({children,rv}){return(<span style={{background:rv?k.rvHlBg:k.hlBg,color:rv?k.rvHlFg:k.hlFg,padding:"0 2px",boxDecorationBreak:"clone",WebkitBoxDecorationBreak:"clone"}}>{children}</span>)}
function Tl({s,st,sf}){const rv=sf==="rv",fg=rv?k.rvFg:k.ink,d=sf==="co"?k.coDsh:rv?k.rvDsh:k.dsh,g=sf==="co"?k.coG2:rv?k.rvG2:k.g2,on=st==="on",un=st==="un";const [b,f,bd]=on?[k.sig[s][0],k.sig[s][1],"1px solid "+k.ink]:un?["transparent",fg,"1.5px solid "+fg]:["transparent",g,"1.5px dashed "+d];return(<span aria-label={SC[s][1]+": "+(on?"detected":un?"unsure":"missing")} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:20,flexShrink:0,font:"500 11px/1 "+MN,letterSpacing:".02em",background:b,color:f,border:bd}}>{SC[s][0]}</span>)}
function Sg({s,st,v,sf}){const rv=sf==="rv",g=sf==="co"?k.coG2:rv?k.rvG2:k.g2;return(<span style={{display:"inline-flex",alignItems:"center",gap:7,font:"400 14px/1.2 "+NR,color:st==="off"?g:rv?k.rvFg:k.ink}}><Tl s={s} st={st} sf={sf}/>{st==="off"?"—":st==="un"?(v||"")+"?":v}</span>)}
function Bd({s,mt,fn,children}){return(<div onClick={fn} style={{margin:`${mt||0}px -20px 0`,padding:"14px 20px 16px",background:bgOf(s),borderTop:"1px solid "+k.ink,borderBottom:"1px solid "+k.ink,cursor:fn?"pointer":"default"}}>{children}</div>)}
function Lb({l,out}){return(<span style={{flexShrink:0,alignSelf:"flex-start",font:"500 10px/1 "+MN,letterSpacing:".06em",textTransform:"uppercase",padding:"4px 6px",background:out?"transparent":k.ink,color:out?k.ink:k.pp,border:"1px solid "+k.ink,whiteSpace:"nowrap"}}>{l}</span>)}
function Tk({d,n,h,t,m,lb,lbo,bg,fn,lg}){const w=lg?84:72,nt={position:"absolute",left:w-10,width:18,height:18,borderRadius:"50%",background:bg||k.pp,border:"1px solid "+k.ink},gp={position:"absolute",left:w-8,width:14,height:4,background:bg||k.pp};return(<div onClick={fn} style={{position:"relative",display:"flex",background:k.pp,border:"1px solid "+k.ink,cursor:fn?"pointer":"default"}}>
  <div style={{width:w,flexShrink:0,padding:"10px 0",textAlign:"center",borderRight:"1.5px dashed "+k.ink}}>
    <p style={{font:"400 10px/1.3 "+MN,letterSpacing:".06em",color:k.g2}}>{d}</p>
    <p style={{font:`600 ${lg?34:28}px/1 ${NR}`,color:k.ink,margin:"2px 0"}}>{n}</p>
    <p style={{font:"400 10px/1.3 "+MN,letterSpacing:".04em",color:k.ink}}>{h}</p>
  </div>
  <div style={{flex:1,minWidth:0,padding:lg?"12px 14px":"10px 12px",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:8}}>
    <p style={{font:`600 ${lg?26:18}px/1.1 ${NR}`,letterSpacing:"-.01em",color:k.ink}}>{t}</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:8}}>
      <p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.ink}}>{m.map((x,i)=><span key={i} style={{display:"block"}}>{x}</span>)}</p>
      {lb&&<span style={{alignSelf:"flex-end"}}><Lb l={lb} out={lbo}/></span>}
    </div>
  </div>
  <span style={{...nt,top:-10,clipPath:"inset(50% 0 0 0)"}}/>
  <span style={{...nt,bottom:-10,clipPath:"inset(0 0 50% 0)"}}/>
  <span style={{...gp,top:-2.5}}/>
  <span style={{...gp,bottom:-2.5}}/>
</div>)}
function Emp({t,m,mt}){return(<div style={{display:"flex",border:"1.5px dashed "+k.ink,marginTop:mt||0}}>
  <div style={{width:72,flexShrink:0,padding:"10px 0",textAlign:"center",borderRight:"1.5px dashed "+k.ink,color:k.g2}}><p style={{font:"400 10px/1.3 "+MN,letterSpacing:".06em"}}>DAY</p><p style={{font:`600 28px/1 ${NR}`,margin:"2px 0"}}>—</p><p style={{font:"400 10px/1.3 "+MN}}>TIME</p></div>
  <div style={{flex:1,padding:"10px 12px",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:8}}><p style={{font:`600 18px/1.15 ${NR}`,color:k.ink}}>{t}</p><p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2}}>{m}</p></div>
</div>)}
function Btn({l,fn,out,sm,dim,dng}){const [b,f,bd]=dng?["transparent",k.dng,"1.5px solid "+k.dng]:out?["transparent",k.ink,"1.5px solid "+k.ink]:dim?[k.dim,k.dimFg,"none"]:[k.ctaBg,k.ctaFg,"none"];return(<button onClick={fn} style={{width:"100%",height:sm?40:48,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"0 14px",background:b,color:f,border:bd,borderRadius:0,font:`500 ${sm?11:12}px/1 ${MN}`,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer",transition:"background .2s,color .2s"}}>{l}</button>)}
function Lk({l,fn,mt}){return(<button onClick={fn} style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:mt||0,padding:"10px 0",background:"none",border:"none",font:"500 11px/1.3 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.ink,textDecoration:"underline",textUnderlineOffset:3,textDecorationThickness:1,cursor:"pointer",textAlign:"left"}}>{l}</button>)}
function Chip({l,on,fn}){const T=fn?"button":"span";return(<T onClick={fn} style={{display:"inline-flex",padding:"8px 12px",font:"400 15px/1.2 "+NR,background:on?k.ink:"transparent",color:on?k.pp:k.ink,border:"1px solid "+k.ink,borderRadius:0,cursor:fn?"pointer":"default",whiteSpace:"nowrap",flexShrink:0,transition:"background .2s,color .2s"}}>{l}</T>)}
function Opt({i,l,on,fn}){return(<button onClick={fn} style={{display:"flex",alignItems:"baseline",gap:14,width:"100%",textAlign:"left",padding:"15px 12px",background:on?k.ink:"transparent",color:on?k.pp:k.ink,border:"none",borderBottom:"1px solid "+k.ru,borderRadius:0,cursor:"pointer",transition:"background .2s,color .2s"}}><span style={{font:"500 11px/1 "+MN,color:on?k.pp:k.g2,width:12,flexShrink:0}}>{"ABCDEF"[i]}</span><span style={{font:"400 17px/1.3 "+NR}}>{l}</span></button>)}
function Chev(){return(<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={k.g2} strokeWidth="1.5" strokeLinecap="square"><path d="M9 18l6-6-6-6"/></svg>)}
function Row({t,s,lt,r,fn,mu}){return(<div onClick={fn} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:"1px solid "+k.ru,cursor:fn?"pointer":"default"}}>{lt}<div style={{flex:1,minWidth:0}}><p style={{font:`600 16px/1.25 ${NR}`,color:mu?k.g2:k.ink}}>{t}</p>{s&&<p style={{font:`400 14px/1.4 ${NR}`,color:k.g2,marginTop:2}}>{s}</p>}</div>{r===undefined?<Chev/>:r}</div>)}
function Ini({n,me,sz}){const s=sz||36;return(<div style={{width:s,height:s,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+k.ink,background:me?k.ink:"transparent",color:me?k.pp:k.ink,font:`600 ${Math.round(s*.44)}px/1 ${NR}`}}>{n[0]}</div>)}
function Cd({c,s}){const [b,f]=s?cday(s):["transparent",k.ink];return(<span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:38,height:24,padding:"0 5px",flexShrink:0,font:"500 10.5px/1 "+MN,letterSpacing:".04em",background:b,color:f,border:"1px solid "+k.ink}}>{c}</span>)}
function Pc({x,fn}){return(<div onClick={fn} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:"1px solid "+k.ru,cursor:"pointer"}}><Cd c={x.cd}/><div style={{flex:1,minWidth:0}}><p style={{font:`600 16px/1.25 ${NR}`,color:k.ink}}>{x.t}</p><p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2,marginTop:3}}>{x.v}</p><p style={{display:"flex",alignItems:"center",gap:5,font:"500 10px/1.4 "+MN,letterSpacing:".06em",textTransform:"uppercase",color:k.ink,marginTop:6}}>Chat is still open <Ar/></p></div>{x.unread>0&&<Lb l={x.unread+" new"}/>}</div>)}
function Tog({l,on,fn}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:"1px solid "+k.ru}}><span style={{font:`400 16px/1.3 ${NR}`,color:k.ink}}>{l}</span><button role="switch" aria-checked={on} aria-label={l} onClick={fn} style={{width:42,height:24,padding:2,display:"flex",alignItems:"center",justifyContent:on?"flex-end":"flex-start",background:on?k.ink:"transparent",border:"1.5px solid "+k.ink,borderRadius:0,cursor:"pointer",transition:"background .2s"}}><span style={{width:16,height:16,background:on?k.pp:k.ink}}/></button></div>)}
function Bk({fn,l}){return(<button onClick={fn} aria-label={l||"Back"} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 0",background:"none",border:"none",font:"500 11px/1 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.ink,cursor:"pointer"}}><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={k.ink} strokeWidth="1.5" strokeLinecap="square"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>{l===undefined?"Back":l}</button>)}
function Ar({d}){return(<svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" style={{flexShrink:0}}>{d==="ne"?<path d="M7 17L17 7M9 7h8v8"/>:<path d="M4 12h15M13 6l6 6-6 6"/>}</svg>)}
function Ld({c}){return(<div style={{display:"flex",gap:6,color:c||k.ink}}>{[0,1,2].map(i=><span key={i} style={{width:8,height:8,background:"currentColor",animation:`bsd 1.2s ease-in-out ${i*.2}s infinite`}}/>)}</div>)}
function Fld({l,dv}){return(<label style={{display:"block"}}><span style={{display:"block",font:"500 10.5px/1 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.g2,marginBottom:8}}>{l}</span><input defaultValue={dv} style={{width:"100%",height:48,padding:"0 14px",border:"1px solid "+k.dsh,borderRadius:0,background:k.pp,font:`400 17px/1 ${NR}`,color:k.ink,outline:"none"}}/></label>)}
function Stp({i,n}){return(<span style={{font:"400 10px/1 "+MN,letterSpacing:".06em",color:k.g2}}>STEP {i} OF {n}</span>)}
function SBar({bg}){return(<div style={{position:"absolute",top:0,left:0,right:0,height:54,zIndex:200,background:bg}}><img src="/statusbar.png" alt="" style={{width:"100%",height:"auto",display:"block"}}/></div>)}
function Tabs({act,nav}){
  const t=[{id:S.HOME,l:"Check-in"},{id:S.JOURNEY,l:"Journey"},{id:S.PROFILE,l:"Profile"}];
  const hide=[S.OB1,S.OB2,S.OB3,S.OB4,S.OB5,S.VOICE,S.MATCH,S.CHAT];
  if(hide.includes(act))return null;
  const tabFor={[S.HOME]:S.HOME,[S.CAT]:S.HOME,[S.COMPLETE]:S.HOME,[S.JOURNEY]:S.JOURNEY,[S.RESULTS]:S.JOURNEY,[S.DETAIL]:S.JOURNEY,[S.FEEDBACK]:S.JOURNEY,[S.HISTORY]:S.JOURNEY,[S.PROFILE]:S.PROFILE,[S.SETTINGS]:S.PROFILE};
  const a=tabFor[act]||act;
  return(<div style={{position:"absolute",bottom:0,left:0,right:0,height:84,background:k.pp,borderTop:"1px solid "+k.ink,zIndex:30}}><div style={{display:"flex",height:60}}>
    {t.map((x,i)=>{const on=a===x.id;return(<button key={x.id} onClick={()=>nav(x.id)} aria-current={on?"page":undefined} style={{position:"relative",flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"9px 12px",backgroundColor:on?k.tbBg:"transparent",backgroundClip:"padding-box",border:"none",borderLeft:i?"1.5px dashed "+k.ink:"none",borderRadius:0,textAlign:"left",cursor:"pointer",transition:"background .2s"}}>
      <span style={{font:"400 10px/13px "+MN,letterSpacing:".04em",color:on?k.tbN:k.g2}}>{"0"+(i+1)}</span>
      <span style={{font:`600 15px/18px ${NR}`,color:on?k.tbFg:k.ink,marginTop:2,whiteSpace:"nowrap"}}>{x.l}</span>
      {i>0&&<span aria-hidden="true" style={{position:"absolute",left:-7,top:-7,width:12,height:12,borderRadius:"50%",background:k.pp,border:"1px solid "+k.ink,clipPath:"inset(50% 0 0 0)"}}/>}
      {i>0&&<span aria-hidden="true" style={{position:"absolute",left:-5,top:-2.5,width:8,height:4,background:k.pp}}/>}
    </button>)})}
  </div></div>);
}

function Fl({l,children}){return(<div><span style={{display:"block",font:"500 10.5px/1 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.g2,marginBottom:8}}>{l}</span><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{children}</div></div>)}

function Ob1({nav}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"64px 20px 48px"}}>
    <Fo l={<Wm sz={44}/>} r={DL}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <h1 style={{font:`300 40px/1.08 ${NR}`,letterSpacing:"-.015em",color:k.ink}}>Find <Hl>your people.</Hl></h1>
      <p style={{font:"400 11px/1.4 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.g2,marginTop:14}}>Voice-first. Emotionally aligned.</p>
    </div>
    <div>
      <Btn l="Get Started" fn={()=>nav(S.OB2)}/>
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"18px 0"}}><div style={{flex:1,height:1,background:k.ru}}/><span style={{font:"400 10px/1 "+MN,letterSpacing:".06em",color:k.g2}}>OR</span><div style={{flex:1,height:1,background:k.ru}}/></div>
      <button onClick={()=>nav(S.OB2)} style={{width:"100%",height:48,display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"0 14px",border:"1.5px solid "+k.ink,borderRadius:0,background:"transparent",font:"500 12px/1 "+MN,letterSpacing:".08em",textTransform:"uppercase",color:k.ink,cursor:"pointer"}}>
        <svg width={18} height={18} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </button>
      <Lk l="I already have an account" fn={()=>nav(S.HOME)} mt={8}/>
    </div>
  </div>
)}

function Ob2({nav}){
  const [s,setS]=useState(null);
  const opts=["Just moved to a new city","Starting a new job","Starting fresh after a big change","Want to expand my world","Feeling disconnected lately"];
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
    <div style={{paddingTop:54}}><Bk fn={()=>nav(S.OB1)}/></div>
    <Kk l="One quick question" mt={12}/>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>What brought you here?</h1>
    <div style={{flex:1,marginTop:24,paddingBottom:24}}><div style={{borderTop:"1px solid "+k.ink}}>{opts.map((o,i)=><Opt key={i} i={i} l={o} on={s===i} fn={()=>setS(i)}/>)}</div></div>
    <Btn l="Let's go" dim={s===null} fn={()=>nav(S.HOME)}/>
  </div>
)}

function Ob3({nav}){
  const all=["Coffee walks","Bouldering","Live music","Cooking together","Deep conversation","Go-karting","Art galleries","Hiking","Board games","Yoga","Food crawls","Volunteering","Book clubs","Pickup sports","Comedy shows","Wine tasting","Photography","Just vibing"];
  const [s,setS]=useState(new Set(["Bouldering","Deep conversation","Coffee walks"]));
  const t=v=>{const n=new Set(s);n.has(v)?n.delete(v):n.add(v);setS(n)};
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
    <div style={{paddingTop:54,display:"flex",justifyContent:"space-between",alignItems:"center"}}><Bk fn={()=>nav(S.OB2)}/><Stp i={2} n={4}/></div>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>What sounds good?</h1>
    <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,marginTop:8}}>Pick a few — we'll use these to curate experiences.</p>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",flex:1,alignContent:"flex-start",overflowY:"auto",marginTop:20,paddingBottom:24}}>{all.map(a=><Chip key={a} l={a} on={s.has(a)} fn={()=>t(a)}/>)}</div>
    <Btn l="Continue" fn={()=>nav(S.OB4)}/>
  </div>
)}

function Ob4({nav}){
  const [age,setAge]=useState(1);
  const [gen,setGen]=useState(1);
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
    <div style={{paddingTop:54,display:"flex",justifyContent:"space-between",alignItems:"center"}}><Bk fn={()=>nav(S.OB3)}/><Stp i={3} n={4}/></div>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>Let's get to know you</h1>
    <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,marginTop:8}}>Just the basics — nothing public.</p>
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:20,marginTop:24,paddingBottom:24}}>
      <Fld l="First name" dv="Mike"/>
      <Fld l="City" dv="San Francisco"/>
      <Fl l="Age range">{["18–24","25–34","35–44","45+"].map((a,i)=><Chip key={a} l={a} on={age===i} fn={()=>setAge(i)}/>)}</Fl>
      <Fl l="Gender">{["Woman","Man","Non-binary","Prefer not to say"].map((g,i)=><Chip key={g} l={g} on={gen===i} fn={()=>setGen(i)}/>)}</Fl>
    </div>
    <Btn l="Continue" fn={()=>nav(S.OB5)}/>
  </div>
)}

function Ob5({nav}){const sn=[["City","San Francisco · 25–34"],["Into","Bouldering, Deep conversation, Coffee walks"],["Chapter","Just moved to a new city"]];return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"64px 20px 48px"}}>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink}}>You're all set, Mike</h1>
    <p style={{font:`400 16px/1.5 ${NR}`,color:k.g2,marginTop:10}}>We'll use your vibe to find the right people and curate real-world moments for you.</p>
    <Kk l="Your snapshot" mt={24}/>
    {sn.map(([l,v])=><div key={l} style={{padding:"10px 0",borderBottom:"1px solid "+k.ru}}><p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2}}>{l}</p><p style={{font:`400 15px/1.4 ${NR}`,color:k.ink,marginTop:2}}>{v}</p></div>)}
    <div style={{marginTop:"auto",paddingTop:24}}><Btn l="Start your first check-in" fn={()=>nav(S.HOME)}/></div>
  </div>
)}

function Home({nav,joined,matched,profDone}){
  const [share,setShare]=useState(false);
  const mem=matched?["You almost cancelled Saturday. ","You stayed three hours."]:["I'm here when you're ready. ","The first check-in is the hardest part."];
  const memoryText=mem.join("");
  const handleShare=()=>{if(navigator.share){navigator.share({title:"A moment from my journey on CoPatible",text:`Co noticed: "${memoryText}"\n\nCoPatible — find your people.`,url:"https://copatible.app"}).catch(()=>setShare(true))}else{setShare(true)}};
  return(
  <div style={{padding:"64px 20px 116px"}}>
    <Fo l={<Wm/>} r={DL}/>
    <Cal cs={joined?"mv":null}/>
    <Bd s="co" mt={16}>
      <Kk l="Co noticed" sf="co" r={matched&&<button onClick={e=>{e.stopPropagation();handleShare()}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"8px 0",margin:"-8px 0",background:"none",border:"none",font:"500 10px/13px "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.ink,cursor:"pointer"}}>Share this moment <Ar d="ne"/></button>}/>
      <p style={{font:`400 24px/1.2 ${NR}`,letterSpacing:"-.01em",color:k.ink,marginTop:10}}>{mem[0]}<Hl>{mem[1]}</Hl></p>
      {matched&&<div style={{display:"flex",justifyContent:"space-between",marginTop:14}}><Sg s="mood" st="on" v="restless" sf="co"/><Sg s="energy" st="un" v="active" sf="co"/><Sg s="timing" st="off" sf="co"/></div>}
    </Bd>
    {share&&<div onClick={()=>setShare(false)} style={{position:"fixed",inset:0,background:"rgba(18,18,18,.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:k.pp,border:"1px solid "+k.ink,padding:20,width:"100%",maxWidth:353}}>
        <Kk l="Share this moment"/>
        <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,margin:"8px 0 16px"}}>A private moment from your journey.</p>
        <div style={{background:k.rvBg,border:"1px solid "+k.ink,padding:"22px 20px 16px",marginBottom:16}}>
          <Kk l="Co noticed" sf="rv"/>
          <p style={{font:`400 24px/1.2 ${NR}`,letterSpacing:"-.01em",color:k.rvFg,marginTop:10}}>{mem[0]}<Hl rv>{mem[1]}</Hl></p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginTop:24,paddingTop:10,borderTop:"1px solid "+k.rvRu}}><Wm sz={18} rv/><span style={{font:"400 10px/1.3 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.rvG2,textAlign:"right"}}>A moment from my journey</span></div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1}}><Btn l="Share" fn={handleShare} sm/></div>
          <div style={{flex:1}}><Btn l="Close" fn={()=>setShare(false)} out sm/></div>
        </div>
      </div>
    </div>}
    {matched&&!profDone&&<div style={{marginTop:16,borderTop:"1px solid "+k.ink}}><Row t="Complete your profile" s="Better matches when we know you better" fn={()=>nav(S.COMPLETE)}/></div>}
    {joined?<Bd s="mv" mt={12}><Kk nr l="Move · Your circle" sf="st"/><div style={{marginTop:9}}><Tk d="FRI" n="16" h="7PM" t="Go-Kart Grand Prix" m={["Kartland SF","4 people"]} lb="I'm in" bg={bgOf("mv")} fn={()=>nav(S.DETAIL)}/></div></Bd>:<Emp mt={16} t="Your first circle is waiting." m="Check in to get matched"/>}
    <div style={{marginTop:28}}>
      <h2 style={{font:`300 26px/1.15 ${NR}`,letterSpacing:"-.01em",color:k.ink}}>Hey Mike,<br/>how are you feeling right now?</h2>
      <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,marginTop:8}}>A quick voice check-in helps us find the right circle for your mood today.</p>
      <div style={{marginTop:16}}><Btn l="Start Check-In" fn={()=>nav(S.VOICE)}/></div>
    </div>
    {joined&&<div style={{marginTop:16}}><Row lt={<Cd c="3W"/>} t="3-week streak" s="You've checked in 3 weeks in a row" r={null}/></div>}
  </div>
  );
}

function Cat({nav}){
  const [sel,setSel]=useState(null);
  const cats=[
    {cd:"LSE",l:"Need to Let Loose",s:"Energy to burn, want fun"},
    {cd:"TLK",l:"Want Deep Conversation",s:"Meaningful connection"},
    {cd:"CEL",l:"Ready to Celebrate",s:"Something worth toasting"},
    {cd:"LOW",l:"Something Low Pressure",s:"Easy, no stress"},
  ];
  return(
  <div style={{padding:"0 20px 116px"}}>
    <div style={{paddingTop:54}}><Bk fn={()=>nav(S.HOME)}/></div>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>What kind of connection do you need?</h1>
    <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,marginTop:8}}>Pick what feels right.</p>
    <div style={{marginTop:24,borderTop:"1px solid "+k.ink}}>
      {cats.map((x,i)=>{const on=sel===i,f=on?k.pp:k.ink;return(<div key={i} onClick={()=>{setSel(i);setTimeout(()=>nav(S.VOICE),300)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 12px",borderBottom:"1px solid "+k.ru,background:on?k.ink:"transparent",cursor:"pointer",transition:"background .2s"}}>
        <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:38,height:24,padding:"0 5px",flexShrink:0,font:"500 10.5px/1 "+MN,letterSpacing:".04em",color:f,border:"1px solid "+f}}>{x.cd}</span>
        <div style={{flex:1,minWidth:0}}><p style={{font:`600 16px/1.25 ${NR}`,color:f}}>{x.l}</p><p style={{font:`400 14px/1.4 ${NR}`,color:on?k.pp:k.g2,marginTop:2}}>{x.s}</p></div>
      </div>)})}
    </div>
  </div>
)}

function Mic({c,sz}){return(<svg width={sz||36} height={sz||36} viewBox="0 0 24 24" fill="none" stroke={c||k.ink} strokeWidth="1.5" strokeLinecap="square"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>)}
function Cam({c,sz}){return(<svg width={sz||28} height={sz||28} viewBox="0 0 24 24" fill="none" stroke={c||k.ink} strokeWidth="1.5" strokeLinecap="square"><path d="M1.5 6.5h5l2-3h7l2 3h5v14h-21z"/><circle cx="12" cy="13.5" r="4"/></svg>)}
function Voice({nav}){
  const [ph,setPh]=useState(0);
  const [sec,setSec]=useState(0);
  const [wi,setWi]=useState(0);
  const [typed,setTyped]=useState("");
  const [photoUploaded,setPhotoUploaded]=useState(false);
  const [photoAnalyzing,setPhotoAnalyzing]=useState(false);
  const [photoVibes,setPhotoVibes]=useState([]);
  const [fuSel,setFuSel]=useState(null);
  const [fuStep,setFuStep]=useState(0);
  const [fuAnswers,setFuAnswers]=useState([]);
  const [simMissing,setSimMissing]=useState(()=>{const all=["mood","energy","activity","social","timing"];return all.filter(()=>Math.random()<0.35)});
  const tr=useRef(null);const wr=useRef(null);
  const txt="I just moved here a couple weeks ago and I don't really know anyone yet. I'm feeling kind of restless tonight, like I want to do something active but low pressure. Maybe meet a few chill people.";
  const words=txt.split(" ");
  const tags=["New to city","Low pressure","Active"];
  const dsp={font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12};

  const liveWords=txt.split(" ");
  const [lw,setLw]=useState(0);const lwr=useRef(null);
  const start=()=>{setPh(1);setSec(0);setLw(0);tr.current=setInterval(()=>setSec(s=>s+1),1000);lwr.current=setInterval(()=>setLw(w=>{if(w>=liveWords.length-1){clearInterval(lwr.current);return liveWords.length}return w+1}),280)};
  const stop=()=>{clearInterval(tr.current);clearInterval(lwr.current);setPh(3);setWi(0);wr.current=setInterval(()=>setWi(w=>{if(w>=words.length-1){clearInterval(wr.current);return words.length}return w+1}),60)};
  useEffect(()=>()=>{clearInterval(tr.current);clearInterval(wr.current);clearInterval(lwr.current)},[]);
  const fm=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  if(ph<=1)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>{clearInterval(tr.current);clearInterval(lwr.current);nav(S.HOME)}}/></div>
      <Kk l={ph===0?"Voice check-in":"Recording"} mt={12} r={ph===1&&<span style={{font:"500 20px/1 "+MN,letterSpacing:0,color:k.ink,fontVariantNumeric:"tabular-nums"}}>{fm(sec)}</span>}/>
      <h1 style={dsp}>{ph===0?"Tell us how you're feeling":"We're listening..."}</h1>
      <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:ph===0?"center":"flex-start",paddingTop:ph===0?0:32}}>
        <button onClick={ph===0?start:undefined} aria-label={ph===0?"Start recording":"Recording"} style={{width:ph===0?148:112,height:ph===0?148:112,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0,background:ph===0?k.coBg:k.ink,border:"1px solid "+k.ink,borderRadius:0,cursor:ph===0?"pointer":"default"}}>
          {ph===0?<Mic/>:<div style={{display:"flex",gap:3,alignItems:"center",height:28}}>{[0,.12,.24,.36,.48,.6,.72,.84].map((d,i)=><div key={i} style={{width:3,background:k.ctaFg,height:[8,13,18,11,16,10,14,11][i],animation:`wv 1.2s ease-in-out ${d}s infinite`}}/>)}</div>}
        </button>
        {ph===0&&<><p style={{font:"500 11px/1.2 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.ink,marginTop:14}}>Tap to start</p><Lk l="Share a photo instead" fn={()=>setPh(5)} mt={12}/></>}
        {ph===1&&lw>0&&<div style={{marginTop:20,width:"100%",borderTop:"1px solid "+k.ink,paddingTop:10}}>
          <p style={{font:"500 10px/1.4 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.g2,marginBottom:6}}>You</p>
          <p style={{font:`400 17px/1.55 ${NR}`,color:k.ink}}>{liveWords.slice(0,lw).join(" ")}<span style={{color:k.g2}}>|</span></p>
        </div>}
      </div>
      {ph===1&&<div style={{marginTop:"auto",paddingTop:20}}><Btn l="Done talking" fn={stop}/></div>}
    </div>
  );

  const handlePhoto=()=>{setPhotoAnalyzing(true);setTimeout(()=>{setPhotoAnalyzing(false);setPhotoUploaded(true);setPhotoVibes(["Chill mood","Evening out","Food & drinks","Relaxed energy"])},2000)};

  if(ph===5)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>{setPh(0);setPhotoUploaded(false);setPhotoVibes([])}}/></div>
      <Kk l="Photo check-in" mt={12}/>
      <h1 style={dsp}>Show us your vibe</h1>
      <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,margin:"10px 0 20px"}}>Share a photo of where you are or what you're up to — we'll read the energy.</p>
      {!photoUploaded&&!photoAnalyzing&&<button onClick={handlePhoto} style={{width:"100%",height:200,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:0,background:"transparent",border:"1.5px dashed "+k.ink,borderRadius:0,cursor:"pointer"}}><Cam/><span style={{font:`400 15px/1.3 ${NR}`,color:k.ink}}>Tap to take or upload a photo</span></button>}
      {photoAnalyzing&&<div style={{height:200,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,border:"1px solid "+k.ink}}><Ld/><p style={{font:"400 11px/1.2 "+MN,letterSpacing:".06em",textTransform:"uppercase",color:k.g2}}>Reading your vibe...</p></div>}
      {photoUploaded&&<>
        <div style={{height:200,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:k.dim,border:"1px solid "+k.ink}}><Cam c={k.dimFg} sz={48}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>{photoVibes.map(v=><Chip key={v} l={v}/>)}</div>
      </>}
      <div style={{marginTop:"auto",paddingTop:24}}><Btn l="Find my circle" dim={!photoUploaded} fn={()=>{setFuStep(0);setFuSel(null);setFuAnswers([]);const m=["mood","energy","activity","social","timing"].filter(()=>Math.random()<0.35);setSimMissing(m);m.length?setPh(6):nav(S.MATCH)}}/></div>
    </div>
  );

  const allSignalQs={
    mood:{q:"How are you feeling right now?",opts:["Restless & adventurous","Calm & reflective","Excited & social","A bit lonely","Stressed — need an escape"],v:["restless","calm","excited","a bit lonely","stressed"]},
    energy:{q:"What kind of energy are you looking for?",opts:["Something active","Chill and low-key","A mix of both","Surprise me"],v:["active","low-key","a mix","surprise me"]},
    activity:{q:"Any idea what you'd like to do?",opts:["Something outdoors","Food & drinks","Creative or artistic","Sports or fitness","Just good conversation","Open to anything"],v:["outdoors","food & drinks","creative","sports","good talk","open"]},
    social:{q:"Who do you want to be around?",opts:["People like me","People totally different from me","A mix of both","Surprise me"],v:["like me","different","a mix","surprise me"]},
    timing:{q:"When are you thinking?",opts:["Right now","Tonight","This weekend","I'm flexible"],v:["right now","tonight","this weekend","flexible"]},
  };
  const missingSignals=simMissing;
  const dynamicQs=missingSignals.map(s=>({...allSignalQs[s],key:s}));
  const cappedQs=dynamicQs.slice(0,2);
  const src=photoUploaded?"p":"v";
  const askK=fuStep<cappedQs.length?cappedQs[fuStep].key:null;
  const ans=Object.fromEntries(fuAnswers.map((a,i)=>[cappedQs[i]&&cappedQs[i].key,a]));
  const stOf=s=>!missingSignals.includes(s)||ans[s]?"on":s===askK?"un":"off";
  const vOf=s=>!missingSignals.includes(s)?SV[src][s]:ans[s]?allSignalQs[s].v[allSignalQs[s].opts.indexOf(ans[s])]:"";
  const nOn=SIG.filter(([s])=>stOf(s)==="on").length;

  if(ph===6)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>setPh(3)}/></div>
      <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",margin:"0 -20px",padding:"0 20px"}}>
        <Bd s="co" mt={8}>
          <Kk l="From Co" r={nOn+"/5 signals"} sf="co"/>
          <p style={{font:`400 22px/1.25 ${NR}`,color:k.ink,marginTop:10}}>{fuStep<cappedQs.length?<>I picked up on a few things — just <Hl>{cappedQs.length===1?"one quick question":"a couple quick questions"}</Hl> to nail your match.</>:<>Got it — <Hl>finding your perfect circle now!</Hl></>}</p>
          <div style={{display:"flex",border:"1px solid "+k.ink,marginTop:14}}>{SIG.map(([s],i)=>{const t=stOf(s);return(<div key={s} style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"10px 4px",borderLeft:i?"1px solid "+k.ink:"none",textAlign:"center"}}><Tl s={s} st={t} sf="co"/><span style={{font:`400 13px/1.2 ${NR}`,color:t==="off"?k.coG2:k.ink,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",maxWidth:"100%",overflowWrap:"break-word"}}>{t==="off"?"—":t==="un"?"?":vOf(s)}</span></div>)})}</div>
          <p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.coG2,marginTop:8}}>{`Solid = ${src==="p"?"seen":"heard"} · Outline = asking · Dashed = missing`}</p>
        </Bd>
        {fuStep<cappedQs.length&&<div style={{marginTop:24}}>
          <Kk l={"Question "+(fuStep+1)+" of "+cappedQs.length} r={<Tl s={askK} st="un" sf="pp"/>}/>
          <p style={{font:`400 22px/1.25 ${NR}`,color:k.ink,marginTop:12}}>{cappedQs[fuStep].q}</p>
          <div style={{marginTop:16,borderTop:"1px solid "+k.ink}}>{cappedQs[fuStep].opts.map((o,i)=><Opt key={i} i={i} l={o} on={fuSel===i} fn={()=>{setFuSel(i);setFuAnswers([...fuAnswers,o]);setTimeout(()=>{if(fuStep+1>=cappedQs.length){nav(S.MATCH)}else{setFuStep(fuStep+1);setFuSel(null)}},400)}}/>)}</div>
        </div>}
      </div>
      <div><Lk l="Skip — just find my circle" fn={()=>nav(S.MATCH)} mt={12}/></div>
    </div>
  );

  if(ph===2)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 20px"}}>
      <Ld/>
      <p style={{font:`300 24px/1.2 ${NR}`,color:k.ink,marginTop:18}}>Transcribing...</p>
    </div>
  );

  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 20px 48px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>{setPh(0);setSec(0)}}/></div>
      <h1 style={dsp}>Here's what we heard</h1>
      <div style={{position:"relative",marginTop:20,border:"1px solid "+k.ink,padding:"16px 52px 16px 16px"}}>
        <button aria-label="Play recording" style={{position:"absolute",top:12,right:12,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",padding:0,background:"transparent",border:"1px solid "+k.ink,borderRadius:0,cursor:"pointer"}}><svg width={12} height={12} viewBox="0 0 24 24" fill={k.ink}><path d="M5 3v18l16-9z"/></svg></button>
        <p style={{font:`400 17px/1.55 ${NR}`,color:k.ink}}>{words.map((w,i)=><span key={i} style={{opacity:i<=wi?1:.15,transition:"opacity .15s"}}>{w} </span>)}</p>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>{tags.map(t=><Chip key={t} l={t}/>)}</div>
      <div style={{marginTop:"auto",paddingTop:24,display:"flex",flexDirection:"column",gap:10}}>
        <Btn l="Looks good — find my circle" fn={()=>{setFuStep(0);setFuSel(null);setFuAnswers([]);const m=["mood","energy","activity","social","timing"].filter(()=>Math.random()<0.35);setSimMissing(m);m.length?setPh(6):nav(S.MATCH)}}/>
        <Btn l="Re-record" fn={()=>{setPh(0);setSec(0)}} out/>
      </div>
    </div>
  );
}

function Match({nav,onDone}){
  const [st,setSt]=useState(0);
  const msgs=["Reading your energy...","Finding emotionally aligned people...","Curating experiences for you..."];
  useEffect(()=>{const a=setTimeout(()=>setSt(1),2000);const b=setTimeout(()=>setSt(2),4000);const d=setTimeout(()=>{if(onDone)onDone();nav(S.JOURNEY)},6200);return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(d)}},[]);
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"64px 20px 48px",background:k.rvBg}}>
      <Kk l="Co is matching" r={"0"+(st+1)+" / 03"} sf="rv"/>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <p style={{font:`300 32px/1.15 ${NR}`,letterSpacing:"-.015em",color:k.rvFg,minHeight:111}}>{msgs[st]}</p>
        <div style={{display:"flex",gap:8,marginTop:24}}>{SIG.map(([s],i)=><Tl key={s} s={s} st={st>=Math.floor(i/2)?"on":"off"} sf="rv"/>)}</div>
      </div>
      <div style={{height:2,background:k.rvTr}}><div style={{height:2,background:k.rvFg,transformOrigin:"left",animation:"bsr 6.2s linear forwards"}}/></div>
    </div>
  );
}

function Results({nav,setJ}){
  const [ex,setEx]=useState(null);
  const cards=[
    {cd:"KRT",st:"mv",d:"FRI",n:"16",h:"7PM",p:4,t:"Go-Kart Grand Prix",m:94,v:"Kartland SF",tm:"Tomorrow, 7 PM",tg:["Active","Fun"],sp:2,r:"You mentioned wanting something active and low pressure — this circle is full of people in the same energy."},
    {cd:"ESP",st:"tk",d:"FRI",n:"16",h:"6PM",p:3,t:"Espresso & Deep Talk",m:91,v:"Sightglass Coffee",tm:"Friday, 6 PM",tg:["Chill","Deep"],sp:3,r:"Your vibe matched 'deep conversation' — this group loves meaningful exchanges over great coffee."},
    {cd:"BLD",st:"mv",d:"SAT",n:"17",h:"2PM",p:2,t:"Bouldering + Brews",m:88,v:"Movement SF",tm:"Saturday, 2 PM",tg:["Active","Social"],sp:4,r:"Bouldering is in your interests, and this crew is all new to the city — perfect overlap."},
  ];
  const f=ex===null?0:ex;
  return(
  <div style={{padding:"64px 20px 116px"}}>
    <Kk l="Matched" r="3 circles"/>
    <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>Your circles are ready</h1>
    <div style={{marginTop:20}}>
      {cards.map((x,i)=>{const fc=i===f,tg=()=>setEx(ex===i?null:i),tk=<Tk d={x.d} n={x.n} h={x.h} t={x.t} m={[x.v,x.p+" going · "+x.sp+" spots left",x.tg.join(" · ")]} lb={x.m+"%"} lbo={!fc} bg={fc?bgOf(x.st):k.pp}/>;return fc?<Bd key={i} s={x.st} mt={i?16:0} fn={tg}>
        <Kk nr l={STK[x.st]} sf="st"/>
        <div style={{marginTop:9}}>{tk}</div>
        {ex===i&&<div style={{marginTop:14}}>
          <Kk l="From Co" sf="st"/>
          <p style={{font:`400 16px/1.45 ${NR}`,color:k.ink,marginTop:8}}>{x.r}</p>
          <div style={{marginTop:14}}><Btn l="Join This Circle" fn={e=>{e.stopPropagation();setJ(true);nav(S.DETAIL)}}/></div>
        </div>}
      </Bd>:<div key={i} style={{marginTop:i?16:0,cursor:"pointer"}} onClick={tg}>{tk}</div>})}
    </div>
    <Lk l="None of these feel right? Try again" fn={()=>nav(S.VOICE)} mt={20}/>
  </div>
)}

function Detail({nav,noBack}){
  const mems=[
    {n:"Rachel",q:"Just moved here from NYC and looking for my crowd!",tg:["New to city","Social"]},
    {n:"Marcus",q:"Excited to get some competition going!",tg:["Active","Fun"]},
    {n:"Sarah",q:"Can't wait to grab food after!",tg:["Foodie","Chill"]},
    {n:"Mike",q:"That's you!",tg:["New to city","Active"]},
  ];
  return(
  <div style={{padding:(noBack?64:0)+"px 20px 116px"}}>
    {!noBack&&<div style={{paddingTop:54}}><Bk fn={()=>nav(S.JOURNEY)}/></div>}
    <Bd s="mv" mt={noBack?0:8}>
      <Kk nr l="Move · Your circle" sf="st"/>
      <div style={{marginTop:9}}><Tk lg d="FRI" n="16" h="7PM" t="Go-Kart Grand Prix" m={["Kartland SF · Tomorrow","4 confirmed · 2 spots open"]} lb="I'm in" bg={bgOf("mv")}/></div>
    </Bd>
    <Bd s="co" mt={16}>
      <Kk l="From Co" r="Why I picked this for you" sf="co"/>
      <p style={{font:`400 19px/1.35 ${NR}`,color:k.ink,marginTop:10}}>You said you wanted something active but low pressure. Everyone in this circle said the same thing — <Hl>different words, same feeling.</Hl> I think you'll click within the first twenty minutes.</p>
    </Bd>
    <Kk l="People in this circle" mt={28}/>
    {mems.map((m,i)=><div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:i<mems.length-1?"1px solid "+k.ru:"none"}}>
      <Ini n={m.n} me={m.n==="Mike"}/>
      <div style={{flex:1,minWidth:0}}>
        <p style={{font:`600 16px/1.25 ${NR}`,color:k.ink}}>{m.n}</p>
        <p style={{font:`400 14px/1.4 ${NR}`,color:k.g2,marginTop:2}}>"{m.q}"</p>
        <p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2,marginTop:6}}>{m.tg.join(" · ")}</p>
      </div>
    </div>)}
    <div style={{marginTop:24}}><Btn l="Enter Circle Chat" fn={()=>nav(S.CHAT)}/></div>
    <div style={{marginTop:10}}><Btn out l={<>Invite a friend to this circle <Ar d="ne"/></>} fn={()=>{if(navigator.share)navigator.share({title:"Join my circle on CoPatible",text:"I'm going to Go-Kart Grand Prix tomorrow — come with me!",url:"https://copatible.app/circle/go-kart"}).catch(()=>{})}}/></div>
  </div>
)}

function Chat({nav}){
  const [msgs,setMsgs]=useState([
    {sys:true,t:"Co introduced you all because you're looking for something active and low-pressure. Have fun."},
    {f:"Rachel",t:"Hey everyone! So excited for tomorrow!"},
    {f:"Marcus",t:"Who's ready to get smoked on the track? 😤"},
    {f:"Sarah",t:"I've never go-karted before but I'm here for it"},
    {sys:true,t:"This chat stays open after the circle — keep the conversation going."},
  ]);
  const [inp,setInp]=useState("");
  const send=()=>{if(!inp.trim())return;setMsgs(p=>[...p,{f:"You",t:inp,me:true}]);setInp("")};
  const lr=useRef(null);
  useEffect(()=>{const e=lr.current;if(e)e.scrollTop=e.scrollHeight},[msgs]);
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
    <div style={{padding:"64px 20px 12px",borderBottom:"2px solid "+k.ink,display:"flex",alignItems:"center",gap:12}}>
      <Bk l="" fn={()=>nav(S.DETAIL)}/>
      <Cd c="KRT" s="mv"/>
      <div style={{flex:1,minWidth:0}}><h3 style={{font:`600 17px/1.2 ${NR}`,color:k.ink}}>Go-Kart Grand Prix</h3><p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2,marginTop:2}}>4 members</p></div>
    </div>
    <div style={{flexShrink:0,margin:"12px 20px",padding:"8px 12px",background:bgOf("mv"),border:"1px solid "+k.ink,font:"500 10.5px/1.3 "+MN,letterSpacing:".06em",textTransform:"uppercase",color:k.ink}}>Tomorrow, 7 PM · Kartland SF</div>
    <div ref={lr} style={{flex:1,minHeight:0,overflowY:"auto",padding:"0 20px 12px",display:"flex",flexDirection:"column",gap:10}}>
      {msgs.map((m,i)=>m.sys?<div key={i} style={{flexShrink:0,background:k.coBg,border:"1px solid "+k.ink,padding:"10px 12px"}}><p style={{font:"500 10px/1 "+MN,letterSpacing:".07em",textTransform:"uppercase",color:k.ink}}>Co</p><p style={{font:`400 15px/1.45 ${NR}`,color:k.ink,marginTop:6}}>{m.t}</p></div>:<div key={i} style={{flexShrink:0,display:"flex",justifyContent:m.me?"flex-end":"flex-start"}}>
        <div style={{maxWidth:"78%"}}>
          {!m.me&&<p style={{font:"500 10px/1.2 "+MN,letterSpacing:".06em",textTransform:"uppercase",color:k.ink,marginBottom:4}}>{m.f}</p>}
          <div style={{padding:"10px 14px",background:m.me?k.ink:k.p2,color:m.me?k.pp:k.ink,font:`400 15px/1.45 ${NR}`,overflowWrap:"anywhere"}}>{m.t}</div>
        </div>
      </div>)}
    </div>
    <div style={{padding:"12px 20px 40px",borderTop:"1px solid "+k.ru,display:"flex",gap:8,alignItems:"center"}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Say something..." aria-label="Message" style={{flex:1,minWidth:0,height:42,padding:"0 12px",border:"1px solid "+k.dsh,borderRadius:0,background:k.pp,font:`400 16px/1 ${NR}`,color:k.ink,outline:"none"}}/>
      <button aria-label="Voice message" style={{width:42,height:42,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"1px solid "+k.ink,borderRadius:0,cursor:"pointer"}}><Mic sz={18}/></button>
      <button onClick={send} style={{height:42,flexShrink:0,padding:"0 14px",background:k.ctaBg,color:k.ctaFg,border:"none",borderRadius:0,font:"500 11px/1 "+MN,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer"}}>Send</button>
    </div>
  </div>
)}

function Profile({nav}){return(
  <div style={{padding:"64px 20px 116px"}}>
    <Fo l="Profile" r={DL}/>
    <h2 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:20}}>Mike Thorne</h2>
    <p style={{font:"400 10px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2,marginTop:8}}>San Francisco</p>
    <p style={{font:`400 16px/1.5 ${NR}`,color:k.ink,marginTop:10}}>Software Engineer at Stripe. Loves deep house, bouldering, and finding the best espresso in SF.</p>
    <div style={{display:"flex",border:"1px solid "+k.ink,marginTop:24}}>
      {[{n:6,l:"Circles"},{n:3,l:"Streak"},{n:12,l:"Connections"}].map((s,i)=><div key={i} style={{flex:1,minWidth:0,padding:"14px 8px",textAlign:"center",borderLeft:i?"1px solid "+k.ink:"none"}}><p style={{font:`600 24px/1 ${NR}`,color:k.ink}}>{s.n}</p><p style={{font:"400 10px/1.3 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.g2,marginTop:6}}>{s.l}</p></div>)}
    </div>
    <Kk l="Your vibe" mt={28}/>
    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:12,marginTop:14}}>
      <Sg s="mood" st="on" v="Usually curious"/>
      <Sg s="timing" st="on" v="Prefers evenings"/>
      <Sg s="social" st="on" v="Small groups"/>
    </div>
    <div style={{marginTop:24,borderTop:"1px solid "+k.ink}}>
      <Row t="Invite Friends" s="Share CoPatible with people you think would love it" r={<span style={{display:"inline-flex",color:k.ink}}><Ar d="ne"/></span>} fn={()=>{if(navigator.share)navigator.share({title:"Join me on CoPatible",text:"I've been finding my people through CoPatible — voice-first, emotionally aligned. You should try it!",url:"https://copatible.app/invite/mike"}).catch(()=>{})}}/>
      <Row t="Account Settings" fn={()=>nav(S.SETTINGS)}/>
      <Row t="Privacy"/>
      <Row t="Help & Support"/>
    </div>
    <div style={{marginTop:24}}><Btn l="Log Out" fn={()=>nav(S.OB1)} out/></div>
  </div>
)}

function Settings({nav}){
  const [tg,setTg]=useState({push:true,circle:true,match:true,sound:false});
  const fl=id=>()=>setTg(p=>({...p,[id]:!p[id]}));
  return(
  <div style={{padding:"0 20px 116px"}}>
    <div style={{paddingTop:54}}><Bk fn={()=>nav(S.PROFILE)}/></div>
    <Fo l="Settings" mt={8}/>
    <Kk l="Notifications" mt={24}/>
    {[["push","Push Notifications"],["circle","Circle Updates"],["match","Match Suggestions"],["sound","Sound Effects"]].map(([id,l])=><Tog key={id} l={l} on={tg[id]} fn={fl(id)}/>)}
    <Kk l="Account" mt={28}/>
    {["Edit Profile","City","Email","Phone"].map(l=><Row key={l} t={l}/>)}
    <Kk l="Privacy & Data" mt={28}/>
    {["Delete Voice Data","Export My Data"].map(l=><Row key={l} t={l} r={null}/>)}
    <div style={{marginTop:28}}><Btn l="Delete Account" dng fn={()=>{}}/></div>
  </div>
)}

function Journey({nav,matched,joined,setJ}){
  if(!matched)return(
    <div style={{padding:"64px 20px 116px"}}>
      <Fo l="Journey" r={DL}/>
      <Emp mt={24} t="No circles yet" m="Check in to discover your circles."/>
      <div style={{marginTop:16}}><Btn l="Start Check-In" sm fn={()=>nav(S.VOICE)}/></div>
    </div>
  );
  if(!joined)return(<Results nav={nav} setJ={setJ} />);
  const mems=[
    {n:"Rachel",q:"Just moved here from NYC!"},
    {n:"Marcus",q:"Ready for competition!"},
    {n:"Sarah",q:"Can't wait for food after!"},
    {n:"Mike",q:"That's you"},
  ];
  const past=PAST_CIRCLES,inline=past.slice(0,3);
  return(
    <div style={{padding:"64px 20px 116px"}}>
      <Fo l="Journey" r={DL}/>
      <Bd s="mv" mt={16}>
        <Kk nr l="Move · Confirmed · Tomorrow" sf="st"/>
        <div style={{marginTop:9}}><Tk d="FRI" n="16" h="7PM" t="Go-Kart Grand Prix" m={["Kartland SF","4 people"]} lb="I'm in" bg={bgOf("mv")}/></div>
      </Bd>
      <Kk l="Your circle" mt={20}/>
      {mems.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<mems.length-1?"1px solid "+k.ru:"none"}}>
        <Ini n={m.n} me={m.n==="Mike"} sz={32}/>
        <div style={{flex:1,minWidth:0}}><span style={{font:`600 15px/1.3 ${NR}`,color:k.ink}}>{m.n}</span><span style={{font:`400 13px/1.3 ${NR}`,color:k.g2,marginLeft:8}}>{m.q}</span></div>
      </div>)}
      <div style={{marginTop:16,display:"flex",gap:10}}>
        <div style={{flex:1}}><Btn l="Enter Circle Chat" fn={()=>nav(S.CHAT)} sm/></div>
        <div style={{flex:1}}><Btn l="How was it?" fn={()=>nav(S.FEEDBACK)} out sm/></div>
      </div>
      <div style={{marginTop:28}}>
        <p style={{font:`400 18px/1.3 ${NR}`,color:k.ink}}>Ready for another circle?</p>
        <div style={{marginTop:12}}><Btn l="Check in again" sm out fn={()=>nav(S.VOICE)}/></div>
      </div>
      <Kk l="Past circles" mt={32} r={past.length>3&&<button onClick={()=>nav(S.HISTORY)} style={{background:"none",border:"none",font:"500 10px/13px "+MN,letterSpacing:".06em",textTransform:"uppercase",color:k.ink,display:"inline-flex",alignItems:"center",gap:5,cursor:"pointer",padding:"6px 0",margin:"-6px 0"}}>View all {past.length} <Ar/></button>}/>
      {inline.map(x=><Pc key={x.t} x={x} fn={()=>nav(S.CHAT)}/>)}
      <Kk l="Also suggested" mt={28}/>
      {[{cd:"ESP",t:"Espresso & Deep Talk",v:"Sightglass Coffee · Friday, 6 PM",m:91},{cd:"BLD",t:"Bouldering + Brews",v:"Movement SF · Saturday, 2 PM",m:88}].map(x=><Row key={x.cd} mu lt={<Cd c={x.cd}/>} t={x.t} s={x.v} r={<span style={{font:"400 10px/1 "+MN,letterSpacing:".05em",color:k.g2}}>{x.m}%</span>}/>)}
    </div>
  );
}

function Feedback({nav}){
  const [mood,setMood]=useState(null);
  const [note,setNote]=useState("");
  const [done,setDone]=useState(false);
  const moods=[
    {mk:"++",l:"Loved it"},
    {mk:"+",l:"Good time"},
    {mk:"=",l:"It was okay"},
    {mk:"−",l:"Not for me"},
  ];
  if(done)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"stretch",padding:"0 20px 116px"}}>
      <Kk l="Feedback"/>
      <h1 style={{font:`300 34px/1.1 ${NR}`,letterSpacing:"-.015em",color:k.ink,marginTop:12}}>Thanks, Mike</h1>
      <p style={{font:`400 16px/1.5 ${NR}`,color:k.g2,marginTop:10}}>Your feedback helps us curate better circles for you next time.</p>
      <div style={{marginTop:28}}><Btn l="Back to Journey" fn={()=>nav(S.JOURNEY)}/></div>
      <div><Lk l={<>Had a great time? Bring a friend next time <Ar d="ne"/></>} fn={()=>{if(navigator.share)navigator.share({title:"Join me on CoPatible",text:"I've been finding my people through CoPatible — you should try it.",url:"https://copatible.app/invite/mike"}).catch(()=>{})}} mt={10}/></div>
    </div>
  );
  return(
    <div style={{minHeight:"100%",display:"flex",flexDirection:"column",padding:"0 20px 116px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>nav(S.JOURNEY)}/></div>
      <Fo l="How was it?" mt={8}/>
      <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}><Cd c="KRT" s="mv"/><p style={{font:"400 10.5px/1.4 "+MN,letterSpacing:".05em",textTransform:"uppercase",color:k.ink}}>Go-Kart Grand Prix · Kartland SF</p></div>
      <Kk l="How did it feel?" mt={28}/>
      <div role="group" aria-label="How did it feel?" style={{display:"flex",border:"1px solid "+k.ink,marginTop:12}}>
        {moods.map((m,i)=>{const on=mood===i;return(<button key={i} onClick={()=>setMood(i)} aria-pressed={on} style={{flex:1,minWidth:0,height:76,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,padding:"0 4px",background:on?k.ink:"transparent",color:on?k.pp:k.ink,border:"none",borderLeft:i?"1px solid "+k.ink:"none",borderRadius:0,cursor:"pointer",transition:"background .2s,color .2s"}}><span style={{font:"500 16px/1 "+MN}}>{m.mk}</span><span style={{font:`400 13px/1.2 ${NR}`}}>{m.l}</span></button>)})}
      </div>
      <Kk l="Anything else?" mt={28}/>
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional — tell us what made it great or what could be better..." aria-label="Anything else?" style={{display:"block",width:"100%",marginTop:12,padding:"12px 14px",border:"1px solid "+k.dsh,borderRadius:0,background:k.pp,font:`400 16px/1.5 ${NR}`,color:k.ink,outline:"none",resize:"none",minHeight:96}}/>
      <div style={{marginTop:"auto",paddingTop:24}}>
        <Btn l="Submit Feedback" dim={mood===null} fn={()=>setDone(true)}/>
        <Lk l="Skip for now" fn={()=>nav(S.JOURNEY)} mt={6}/>
      </div>
    </div>
  );
}

function History({nav}){
  return(
    <div style={{padding:"0 20px 116px"}}>
      <div style={{paddingTop:54}}><Bk fn={()=>nav(S.JOURNEY)}/></div>
      <Fo l="Past circles" r={[PAST_CIRCLES.length+" CIRCLES"]} mt={8}/>
      <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,margin:"10px 0 8px"}}>Every circle Co built for you. Chats stay open.</p>
      {PAST_CIRCLES.map(x=><Pc key={x.t} x={x} fn={()=>nav(S.CHAT)}/>)}
    </div>
  );
}

function Complete({nav,onDone}){
  const all=["Coffee walks","Bouldering","Live music","Cooking together","Deep conversation","Go-karting","Art galleries","Hiking","Board games","Yoga","Food crawls","Volunteering","Book clubs","Pickup sports","Comedy shows","Wine tasting","Photography","Just vibing"];
  const [sel,setSel]=useState(new Set(["Bouldering","Deep conversation","Coffee walks"]));
  const [age,setAge]=useState(1);
  const [gen,setGen]=useState(1);
  const toggle=v=>{const n=new Set(sel);n.has(v)?n.delete(v):n.add(v);setSel(n)};
  return(
    <div style={{padding:"0 20px 116px"}}>
      <div style={{paddingTop:54,display:"flex",justifyContent:"space-between",alignItems:"center"}}><Bk fn={()=>nav(S.HOME)}/><Lk l="Skip for now" fn={()=>nav(S.HOME)}/></div>
      <Fo l="Complete your profile" mt={8}/>
      <p style={{font:`400 14px/1.45 ${NR}`,color:k.g2,marginTop:10}}>This helps us find better circles for you.</p>
      <Kk l="What sounds good?" mt={28}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>{all.map(a=><Chip key={a} l={a} on={sel.has(a)} fn={()=>toggle(a)}/>)}</div>
      <Kk l="About you" mt={28}/>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginTop:14}}>
        <Fld l="First name" dv="Mike"/>
        <Fld l="City" dv="San Francisco"/>
        <Fl l="Age range">{["18–24","25–34","35–44","45+"].map((a,i)=><Chip key={a} l={a} on={age===i} fn={()=>setAge(i)}/>)}</Fl>
        <Fl l="Gender">{["Woman","Man","Non-binary","Prefer not to say"].map((g,i)=><Chip key={g} l={g} on={gen===i} fn={()=>setGen(i)}/>)}</Fl>
      </div>
      <div style={{marginTop:28}}><Btn l="Save & improve my matches" fn={()=>{onDone();nav(S.HOME)}}/></div>
    </div>
  );
}

export default function App(){
  const [scr,setScr]=useState(S.OB1);
  const [joined,setJ]=useState(false);
  const [matched,setM]=useState(false);
  const [profDone,setProfDone]=useState(false);
  const ref=useRef(null);
  const nav=s=>{setScr(s);if(ref.current)ref.current.scrollTop=0};
  const full=[S.VOICE,S.MATCH,S.OB1,S.OB5,S.CHAT];
  const rv=scr===S.MATCH;
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:"16px 0",background:k.page,fontFamily:NR,color:k.ink}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes wv{0%,100%{height:6px}50%{height:28px}}
        @keyframes bsd{0%,100%{opacity:.15}50%{opacity:1}}
        @keyframes bsr{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:${k.page}}
        ::-webkit-scrollbar{display:none}
        button,input,textarea{font-family:inherit}
        input:focus,textarea:focus{border-color:${k.ink}!important}
        input::placeholder,textarea::placeholder{color:${k.g2}}
        button:focus-visible{outline:2px solid ${k.ink};outline-offset:2px}
        ::selection{background:${k.hlBg};color:${k.hlFg}}
        @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important}}
      `}</style>
      <div style={{position:"relative",width:427,height:880,flexShrink:0}}>
      <div style={{position:"absolute",top:11,left:15,width:401,height:860,borderRadius:58,overflow:"hidden",transform:"translateZ(0)",background:k.pp}}>
        <SBar bg={rv?k.rvBg:k.pp}/>
        <div ref={ref} style={{position:"absolute",inset:0,overflowY:full.includes(scr)?"hidden":"auto",overflowX:"hidden",background:k.pp,scrollbarWidth:"none"}}>
          {scr===S.OB1&&<Ob1 nav={nav}/>}
          {scr===S.OB2&&<Ob2 nav={nav}/>}
          {scr===S.OB3&&<Ob3 nav={nav}/>}
          {scr===S.OB4&&<Ob4 nav={nav}/>}
          {scr===S.OB5&&<Ob5 nav={nav}/>}
          {scr===S.HOME&&<Home nav={nav} joined={joined} matched={matched} profDone={profDone}/>}
          {scr===S.CAT&&<Cat nav={nav}/>}
          {scr===S.VOICE&&<Voice nav={nav}/>}
          {scr===S.MATCH&&<Match nav={nav} onDone={()=>setM(true)}/>}
          {scr===S.RESULTS&&<Results nav={nav} setJ={(v)=>{setJ(v);setM(true)}}/>}
          {scr===S.DETAIL&&<Detail nav={nav}/>}
          {scr===S.CHAT&&<Chat nav={nav}/>}
          {scr===S.PROFILE&&<Profile nav={nav}/>}
          {scr===S.SETTINGS&&<Settings nav={nav}/>}
          {scr===S.JOURNEY&&<Journey nav={nav} matched={matched} joined={joined} setJ={(v)=>{setJ(v);setM(true)}}/>}
          {scr===S.FEEDBACK&&<Feedback nav={nav}/>}
          {scr===S.COMPLETE&&<Complete nav={nav} onDone={()=>setProfDone(true)}/>}
          {scr===S.HISTORY&&<History nav={nav}/>}
        </div>
        <Tabs act={scr} nav={nav}/>
        <img src="/home-indicator.png" alt="" style={{position:"absolute",bottom:0,left:0,width:"100%",display:"block",zIndex:200,pointerEvents:"none",userSelect:"none"}}/>
      </div>
      <img src="/phone-frame.png" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",zIndex:60,pointerEvents:"none",userSelect:"none"}}/>
      </div>
    </div>
  );
}
