import { useState, useRef, useEffect } from "react";

/* ═══ CONSTANTS ═══ */
const S = {
  OB1:0,OB2:1,OB3:2,OB4:3,OB5:4,
  HOME:5,CAT:6,VOICE:7,MATCH:8,RESULTS:9,
  DETAIL:10,CHAT:11,PROFILE:12,SETTINGS:13,
  JOURNEY:14,LIVE:15,FEEDBACK:16,COMPLETE:17,HISTORY:18,
};
const c={
  iv:"#FAF6F1",po:"#F3EDE6",bs:"#EDE5DB",ps:"#D9D2C9",mg:"#B5AFA8",
  dw:"#2E2A26",wc:"#5A544D",ss:"#8A8279",
  co:"#D4917A",ro:"#C4929A",sg:"#9AAF9A",ap:"#DAA882",lg:"#A9A0B2",
};
const sf="'Instrument Serif',Georgia,serif";
const PAST_CIRCLES=[
  {e:"🌅",t:"Rooftop Golden Hour",v:"Noe Valley Rooftop · 2 weeks ago",unread:3,av:["#D4917A","#9AAF9A","#A9A0B2","#DAA882"]},
  {e:"☕",t:"Sunday Morning Espresso",v:"Sightglass Coffee · 3 weeks ago",unread:1,av:["#C4929A","#D4917A","#9AAF9A"]},
  {e:"🥾",t:"Marin Headlands Hike",v:"Rodeo Beach · 1 month ago",unread:0,av:["#9AAF9A","#DAA882","#A9A0B2","#D4917A","#C4929A"]},
  {e:"🍜",t:"Japantown Ramen Crawl",v:"Mifune · 1 month ago",unread:0,av:["#DAA882","#D4917A","#9AAF9A"]},
  {e:"🎨",t:"SFMOMA After Hours",v:"SFMOMA · 6 weeks ago",unread:0,av:["#A9A0B2","#C4929A","#D4917A","#9AAF9A"]},
  {e:"🌊",t:"Ocean Beach Sunset",v:"Ocean Beach · 7 weeks ago",unread:0,av:["#9AAF9A","#D4917A","#DAA882"]},
];

/* ═══ TINY COMPONENTS ═══ */
function Pill({l,on,fn,ac}){const a=ac||c.co;return(<button onClick={fn} style={{display:"inline-flex",padding:"9px 16px",borderRadius:999,fontSize:13,fontWeight:500,fontFamily:"inherit",background:on?a+"18":c.bs,color:on?a:c.wc,border:"1.5px solid "+(on?a+"40":"transparent"),cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",flexShrink:0}}>{l}</button>)}

function Btn({l,fn,cl,out,sm}){return(<button onClick={fn} style={{width:"100%",padding:sm?"11px":"17px",border:out?"1.5px solid "+c.ps:"none",borderRadius:16,background:out?"transparent":cl||c.co,color:out?c.wc:"#fff",fontFamily:"inherit",fontSize:sm?14:16,fontWeight:600,cursor:"pointer",boxShadow:out?"none":"0 4px 20px "+(cl||c.co)+"40",transition:"all .3s"}}>{l}</button>)}

function Bk({fn,l}){return(<span onClick={fn} style={{fontSize:13,color:c.ss,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.ss} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>{l||"Back"}</span>)}

function Dots({n,i,a}){return(<div style={{display:"flex",gap:8,justifyContent:"center",mb:24,marginBottom:24}}>{[...Array(n)].map((_,j)=><div key={j} style={{width:j===i?24:8,height:8,borderRadius:4,background:j===i?(a||c.co):c.ps,transition:"all .3s"}}/>)}</div>)}

function Chev(){return(<svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.ps} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>)}

function Av({cl,sz,ch,ml}){return(<div style={{width:sz||24,height:sz||24,borderRadius:"50%",background:cl,border:"2px solid "+c.po,marginLeft:ml===false?0:(ml||-6),flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:(sz||24)*0.4,fontWeight:600,color:cl}}>{ch||""}</div>)}

/* ═══ STATUS BAR ═══ */
function SBar(){return(<div style={{position:"absolute",top:0,left:0,right:0,zIndex:200,padding:0}}><img src="/statusbar.png" alt="" style={{width:"100%",height:"auto",display:"block"}}/></div>)}

/* ═══ TAB BAR ═══ */
function Tabs({act,nav}){
  const t=[
    {id:S.HOME,l:"Check-In",d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3"},
    {id:S.JOURNEY,l:"Journey",d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"},
    {id:S.PROFILE,l:"Profile",d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"},
  ];
  const hide=[S.OB1,S.OB2,S.OB3,S.OB4,S.OB5,S.VOICE,S.MATCH,S.CHAT];
  if(hide.includes(act))return null;
  const tabFor={
    [S.HOME]:S.HOME,[S.CAT]:S.HOME,[S.COMPLETE]:S.HOME,
    [S.JOURNEY]:S.JOURNEY,[S.RESULTS]:S.JOURNEY,[S.DETAIL]:S.JOURNEY,[S.FEEDBACK]:S.JOURNEY,[S.HISTORY]:S.JOURNEY,
    [S.PROFILE]:S.PROFILE,[S.SETTINGS]:S.PROFILE,
  };
  const activeTab=tabFor[act]||act;
  return(<div style={{position:"absolute",bottom:0,left:0,right:0,height:84,background:c.iv+"ee",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid "+c.ps+"60",display:"flex",justifyContent:"space-around",alignItems:"flex-start",paddingTop:10,zIndex:30}}>
    {t.map(x=>{const on=activeTab===x.id;return(<div key={x.id} onClick={()=>nav(x.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 12px"}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={on?c.co:c.mg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={x.d}/></svg><span style={{fontSize:10,fontWeight:500,color:on?c.co:c.mg}}>{x.l}</span></div>)})}
  </div>);
}

/* ═══ SCREEN 1: WELCOME ═══ */
function Ob1({nav}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0 32px 52px"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
      {/* Logo mark */}
      <div style={{width:96,height:96,borderRadius:"50%",background:`linear-gradient(145deg,${c.co}25,${c.ro}20)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32,position:"relative"}}>
        <div style={{position:"absolute",inset:-6,borderRadius:"50%",border:`1px solid ${c.co}15`}}/>
        <span style={{fontFamily:sf,fontSize:40,fontStyle:"italic",color:c.co,marginTop:2}}>C</span>
      </div>
      {/* Brand name */}
      <h1 style={{fontFamily:sf,fontSize:46,fontWeight:400,color:c.dw,letterSpacing:"-0.03em",marginBottom:16}}>CoPatible</h1>
      {/* Tagline */}
      <p style={{fontSize:18,color:c.ss,lineHeight:1.6,maxWidth:240}}>Find your people.<br/><span style={{fontSize:15,color:c.mg}}>Voice-first. Emotionally aligned.</span></p>
    </div>
    {/* Bottom actions */}
    <div>
      <Btn l="Get Started" fn={()=>nav(S.OB2)}/>
      {/* Divider */}
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0"}}>
        <div style={{flex:1,height:1,background:c.ps+"80"}}/>
        <span style={{fontSize:12,color:c.mg}}>or</span>
        <div style={{flex:1,height:1,background:c.ps+"80"}}/>
      </div>
      {/* Google login */}
      <button onClick={()=>nav(S.OB2)} style={{width:"100%",padding:"15px",border:"1.5px solid "+c.ps,borderRadius:16,background:"transparent",fontFamily:"inherit",fontSize:15,fontWeight:500,color:c.dw,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
        <svg width={18} height={18} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </button>
      <p onClick={()=>nav(S.HOME)} style={{textAlign:"center",fontSize:14,color:c.ss,marginTop:18,cursor:"pointer"}}>I already have an account</p>
    </div>
  </div>
)}

/* ═══ SCREEN 2: LIFE CHAPTER ═══ */
function Ob2({nav}){
  const [s,setS]=useState(null);
  const opts=["Just moved to a new city","Starting a new job","Starting fresh after a big change","Want to expand my world","Feeling disconnected lately"];
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
    <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.OB1)}/></div>
    <h1 style={{fontFamily:sf,fontSize:30,fontWeight:400,color:c.dw,marginBottom:8}}>One quick question</h1>
    <p style={{fontSize:14,color:c.ss,marginBottom:24,lineHeight:1.5}}>What brought you here?</p>
    <div style={{display:"flex",flexDirection:"column",gap:10,flex:1}}>
      {opts.map((o,i)=><div key={i} onClick={()=>setS(i)} style={{padding:"16px 18px",borderRadius:16,background:s===i?c.co+"12":c.po,border:"1.5px solid "+(s===i?c.co+"40":c.bs),color:s===i?c.co:c.wc,fontSize:15,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>{o}</div>)}
    </div>
    <Btn l="Let's go" fn={()=>nav(S.HOME)} cl={s!==null?c.co:c.ps}/>
  </div>
)}

/* ═══ SCREEN 3: INTERESTS ═══ */
function Ob3({nav}){
  const all=["Coffee walks","Bouldering","Live music","Cooking together","Deep conversation","Go-karting","Art galleries","Hiking","Board games","Yoga","Food crawls","Volunteering","Book clubs","Pickup sports","Comedy shows","Wine tasting","Photography","Just vibing"];
  const [s,setS]=useState(new Set(["Bouldering","Deep conversation","Coffee walks"]));
  const t=v=>{const n=new Set(s);n.has(v)?n.delete(v):n.add(v);setS(n)};
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
    <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.OB2)}/></div>
    <Dots n={4} i={1} a={c.sg}/>
    <h1 style={{fontFamily:sf,fontSize:30,fontWeight:400,color:c.dw,marginBottom:8}}>What sounds good?</h1>
    <p style={{fontSize:14,color:c.ss,marginBottom:20,lineHeight:1.5}}>Pick a few — we'll use these to curate experiences.</p>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",flex:1,alignContent:"flex-start",overflowY:"auto",paddingBottom:8}}>
      {all.map(a=><Pill key={a} l={a} on={s.has(a)} fn={()=>t(a)} ac={c.sg}/>)}
    </div>
    <Btn l="Continue" fn={()=>nav(S.OB4)}/>
  </div>
)}

/* ═══ SCREEN 4: PERSONAL INFO ═══ */
function Ob4({nav}){
  const [age,setAge]=useState(1);
  const [gen,setGen]=useState(1);
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
    <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.OB3)}/></div>
    <Dots n={4} i={2} a={c.ap}/>
    <h1 style={{fontFamily:sf,fontSize:30,fontWeight:400,color:c.dw,marginBottom:8}}>Let's get to know you</h1>
    <p style={{fontSize:14,color:c.ss,marginBottom:24,lineHeight:1.5}}>Just the basics — nothing public.</p>
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:20}}>
      <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:8}}>First name</label><input defaultValue="Mike" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid "+c.ps,background:c.po,fontSize:15,fontFamily:"inherit",color:c.dw,outline:"none"}}/></div>
      <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:8}}>City</label><input defaultValue="San Francisco" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid "+c.ps,background:c.po,fontSize:15,fontFamily:"inherit",color:c.dw,outline:"none"}}/></div>
      <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:10}}>Age range</label><div style={{display:"flex",gap:8}}>{["18–24","25–34","35–44","45+"].map((a,i)=><Pill key={a} l={a} on={age===i} fn={()=>setAge(i)}/>)}</div></div>
      <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:10}}>Gender</label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["Woman","Man","Non-binary","Prefer not to say"].map((g,i)=><Pill key={g} l={g} on={gen===i} fn={()=>setGen(i)}/>)}</div></div>
    </div>
    <Btn l="Continue" fn={()=>nav(S.OB5)}/>
  </div>
)}

/* ═══ SCREEN 5: ALL SET ═══ */
function Ob5({nav}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"0 32px 60px"}}>
    <div style={{width:72,height:72,borderRadius:"50%",background:c.sg+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:24}}>✦</div>
    <h1 style={{fontFamily:sf,fontSize:32,fontWeight:400,color:c.dw,marginBottom:8}}>You're all set, Mike</h1>
    <p style={{fontSize:15,color:c.ss,lineHeight:1.6,marginBottom:32,maxWidth:280}}>We'll use your vibe to find the right people and curate real-world moments for you.</p>
    <div style={{background:"#F2EBE3",borderRadius:20,padding:"18px 20px",width:"100%",marginBottom:40,textAlign:"left"}}>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",color:c.ss,marginBottom:10}}>Your snapshot</p>
      <p style={{fontSize:14,color:c.wc,lineHeight:1.7}}>📍 San Francisco · 25–34<br/>🧗 Bouldering, Deep conversation, Coffee walks<br/>💫 Just moved to a new city</p>
    </div>
    <Btn l="Start your first check-in" fn={()=>nav(S.HOME)}/>
  </div>
)}

/* ═══ SCREEN 6: HOME ═══ */
function Home({nav,joined,matched,profDone}){
  const [share,setShare]=useState(false);
  const memoryText=matched?"You almost cancelled Saturday. You stayed three hours.":"I'm here when you're ready. The first check-in is the hardest part.";
  const handleShare=()=>{if(navigator.share){navigator.share({title:"A moment from my journey on CoPatible",text:`Co noticed: "${memoryText}"\n\nCoPatible — find your people.`,url:"https://copatible.app"}).catch(()=>setShare(true))}else{setShare(true)}};
  return(
  <div style={{padding:"60px 20px 100px"}}>
    <div style={{paddingTop:40,marginBottom:28}}>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:8}}>Thursday evening · San Francisco</p>
      <h1 style={{fontFamily:sf,fontSize:34,fontWeight:400,lineHeight:1.15,color:c.dw}}>Hey Mike,<br/>ready to <em style={{fontStyle:"italic",color:c.co}}>connect?</em></h1>
    </div>
    {/* Co's memory card — adapts to user state */}
    <div style={{background:"#2E2A26",borderRadius:22,padding:"20px 22px",marginBottom:20,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,background:`radial-gradient(circle,${c.co}30,transparent 70%)`,borderRadius:"50%"}}/>
      <div style={{display:"flex",alignItems:"flex-start",gap:12,position:"relative"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(145deg,${c.co}50,${c.ro}40)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontFamily:sf,fontSize:15,fontStyle:"italic",color:"#fff"}}>C</span>
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:11,fontWeight:600,color:c.co,marginBottom:6,letterSpacing:"0.04em"}}>Co noticed</p>
          <p style={{fontSize:14,color:"#F2EBE3",lineHeight:1.5,marginBottom:matched?14:0}}>{memoryText}</p>
          {matched&&<div onClick={e=>{e.stopPropagation();handleShare()}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:999,background:c.co+"20",border:"1px solid "+c.co+"40",cursor:"pointer"}}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span style={{fontSize:11,fontWeight:600,color:c.co}}>Share this moment</span>
          </div>}
        </div>
      </div>
    </div>
    {/* Share modal */}
    {share&&<div onClick={()=>setShare(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:c.iv,borderRadius:24,padding:24,width:"100%",maxWidth:340,position:"relative"}}>
        <p style={{fontSize:11,fontWeight:600,color:c.ss,marginBottom:4,letterSpacing:"0.06em",textTransform:"uppercase"}}>Share this moment</p>
        <p style={{fontSize:13,color:c.ss,marginBottom:20,lineHeight:1.5}}>A private moment from your journey.</p>
        {/* Shareable card preview */}
        <div style={{background:`linear-gradient(145deg,#2E2A26,#1a1816)`,borderRadius:20,padding:"32px 26px",position:"relative",overflow:"hidden",marginBottom:20}}>
          <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,background:`radial-gradient(circle,${c.co}40,transparent 70%)`,borderRadius:"50%"}}/>
          <div style={{position:"absolute",bottom:-60,left:-40,width:180,height:180,background:`radial-gradient(circle,${c.ro}25,transparent 70%)`,borderRadius:"50%"}}/>
          <div style={{position:"relative"}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(145deg,${c.co}60,${c.ro}50)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
              <span style={{fontFamily:sf,fontSize:20,fontStyle:"italic",color:"#fff"}}>C</span>
            </div>
            <p style={{fontSize:11,fontWeight:600,color:c.co,marginBottom:10,letterSpacing:"0.08em",textTransform:"uppercase"}}>Co noticed</p>
            <p style={{fontFamily:sf,fontSize:22,fontStyle:"italic",color:"#F2EBE3",lineHeight:1.35,marginBottom:24}}>"{memoryText}"</p>
            <div style={{borderTop:"1px solid "+c.co+"30",paddingTop:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:10,color:c.mg,letterSpacing:"0.08em",textTransform:"uppercase"}}>CoPatible</span>
              <span style={{fontSize:10,color:c.mg}}>A moment from my journey</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1}}><Btn l="Share" fn={handleShare} sm/></div>
          <div style={{flex:1}}><Btn l="Close" fn={()=>setShare(false)} out sm/></div>
        </div>
      </div>
    </div>}
    {/* Complete profile prompt — after first match, before profile done */}
    {matched&&!profDone&&<div onClick={()=>nav(S.COMPLETE)} style={{background:c.ap+"12",borderRadius:18,padding:"16px 18px",marginBottom:20,cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:40,height:40,borderRadius:"50%",background:c.ap+"20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.ap} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div style={{flex:1}}>
        <p style={{fontSize:14,fontWeight:600,color:c.dw,marginBottom:2}}>Complete your profile</p>
        <p style={{fontSize:12,color:c.ss}}>Better matches when we know you better</p>
      </div>
      <Chev/>
    </div>}
    {/* Hero card */}
    <div style={{background:"#F2EBE3",borderRadius:24,padding:"28px 22px",position:"relative",overflow:"hidden",marginBottom:20}}>
      <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,background:"radial-gradient(circle,"+c.ro+"15,transparent 70%)",borderRadius:"50%"}}/>
      <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,"+c.ro+"30,"+c.co+"25)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={c.ro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
      </div>
      <h2 style={{fontFamily:sf,fontSize:24,fontWeight:400,color:c.dw,marginBottom:8,lineHeight:1.2}}>How are you feeling<br/><em style={{fontStyle:"italic"}}>right now?</em></h2>
      <p style={{fontSize:14,color:c.ss,lineHeight:1.5,marginBottom:20}}>A quick voice check-in helps us find the right circle for your mood today.</p>
      <Btn l="Start Check-In" fn={()=>nav(S.VOICE)}/>
    </div>
    {/* Empty state — before first circle */}
    {!joined&&<div style={{textAlign:"center",padding:"32px 20px"}}>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:16}}>{[c.co,c.sg,c.ro,c.ap,c.lg].map((cl,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:cl+"40"}}/>)}</div>
      <p style={{fontSize:14,color:c.ss,lineHeight:1.5}}>Your first circle is waiting.<br/>Check in to get matched.</p>
    </div>}
    {/* Upcoming circle — only after join */}
    {joined&&<div onClick={()=>nav(S.DETAIL)} style={{background:"#F2EBE3",borderRadius:20,padding:"18px 20px",cursor:"pointer",marginBottom:16}}>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",color:c.sg,marginBottom:10}}>Upcoming circle</p>
      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <span style={{fontSize:28}}>🏎️</span>
        <div><h3 style={{fontSize:16,fontWeight:600,color:c.dw,marginBottom:2}}>Go-Kart Grand Prix</h3><p style={{fontSize:12,color:c.ss}}>Tomorrow, 7 PM · Kartland SF</p></div>
      </div>
    </div>}
    {joined&&<div style={{background:"#F2EBE3",borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:22}}>🔥</span><div><p style={{fontSize:14,fontWeight:600,color:c.dw}}>3-week streak</p><p style={{fontSize:12,color:c.ss}}>You've checked in 3 weeks in a row</p></div>
    </div>}
  </div>
  );
}

/* ═══ SCREEN 7: CATEGORY ═══ */
function Cat({nav}){
  const [sel,setSel]=useState(null);
  const cats=[
    {e:"🎉",l:"Need to Let Loose",s:"Energy to burn, want fun",a:c.ap},
    {e:"💭",l:"Want Deep Conversation",s:"Meaningful connection",a:c.lg},
    {e:"🥂",l:"Ready to Celebrate",s:"Something worth toasting",a:c.co},
    {e:"🌿",l:"Something Low Pressure",s:"Easy, no stress",a:c.sg},
  ];
  const bg=sel!==null?cats[sel].a+"08":"transparent";
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px",background:`linear-gradient(180deg,${c.iv},${bg})`,transition:"background .4s"}}>
    <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.HOME)}/></div>
    <h1 style={{fontFamily:sf,fontSize:28,fontWeight:400,color:c.dw,marginBottom:8}}>What kind of connection do you need?</h1>
    <p style={{fontSize:14,color:c.ss,marginBottom:24}}>Pick what feels right.</p>
    <div style={{display:"flex",flexDirection:"column",gap:12,flex:1}}>
      {cats.map((x,i)=><div key={i} onClick={()=>{setSel(i);setTimeout(()=>nav(S.VOICE),300)}} style={{display:"flex",alignItems:"center",gap:16,padding:"18px",background:sel===i?x.a+"12":"#F2EBE3",borderRadius:20,cursor:"pointer",border:sel===i?"1.5px solid "+x.a+"30":"1.5px solid transparent",transition:"all .2s"}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:x.a+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{x.e}</div>
        <div><h3 style={{fontSize:16,fontWeight:600,color:c.dw,marginBottom:2}}>{x.l}</h3><p style={{fontSize:12,color:c.ss}}>{x.s}</p></div>
      </div>)}
    </div>
  </div>
)}

/* ═══ SCREEN 8: VOICE RECORDING (4 phases) ═══ */
function Voice({nav}){
  const [ph,setPh]=useState(0); // 0=idle 1=rec 2=transcribe 3=confirm 4=typing
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
  const tags=[{l:"New to city",c:c.co},{l:"Low pressure",c:c.sg},{l:"Active",c:c.ap}];

  const liveWords=txt.split(" ");
  const [lw,setLw]=useState(0);const lwr=useRef(null);
  const start=()=>{setPh(1);setSec(0);setLw(0);tr.current=setInterval(()=>setSec(s=>s+1),1000);lwr.current=setInterval(()=>setLw(w=>{if(w>=liveWords.length-1){clearInterval(lwr.current);return liveWords.length}return w+1}),280)};
  const stop=()=>{clearInterval(tr.current);clearInterval(lwr.current);setPh(3);setWi(0);wr.current=setInterval(()=>setWi(w=>{if(w>=words.length-1){clearInterval(wr.current);return words.length}return w+1}),60)};
  useEffect(()=>()=>{clearInterval(tr.current);clearInterval(wr.current);clearInterval(lwr.current)},[]);
  const fm=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  // Phase 0-1: orb
  if(ph<=1)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
      <div style={{padding:"68px 0 12px"}}><Bk fn={()=>{clearInterval(tr.current);clearInterval(lwr.current);nav(S.HOME)}}/></div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
        <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ro,marginBottom:16}}>{ph===0?"Voice check-in":"Recording"}</p>
        <h1 style={{fontFamily:sf,fontSize:28,fontWeight:400,color:c.dw,marginBottom:ph===1?8:40,maxWidth:260}}>{ph===0?"Tell us how you're feeling":"We're listening..."}</h1>
        {ph===1&&<p style={{fontSize:20,fontWeight:500,color:c.ro,marginBottom:24,fontVariantNumeric:"tabular-nums"}}>{fm(sec)}</p>}
        <div style={{position:"relative",width:ph===1?120:160,height:ph===1?120:160,marginBottom:ph===1?20:40,transition:"all .4s"}}>
          <div style={{position:"absolute",inset:-10,borderRadius:"50%",border:"1px solid "+c.ro+"30",animation:"p1 4s ease-in-out infinite"}}/>
          <div style={{position:"absolute",inset:-24,borderRadius:"50%",border:"1px solid "+c.ro+"18",animation:"p2 4s ease-in-out infinite .5s"}}/>
          <div onClick={ph===0?start:undefined} style={{width:"100%",height:"100%",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:ph===0?"pointer":"default",background:ph===1?`radial-gradient(circle at 40% 40%,${c.ro}70,${c.co}50 50%,${c.lg}30)`:`radial-gradient(circle at 40% 40%,${c.ro}50,${c.co}30 50%,${c.lg}20)`,transition:"all .4s",transform:ph===1?"scale(1.06)":"scale(1)"}}>
            {ph===0?<svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={c.ro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>:
            <div style={{display:"flex",gap:3,alignItems:"center",height:28}}>{[0,.12,.24,.36,.48,.6,.72,.84].map((d,i)=><div key={i} style={{width:3,borderRadius:2,background:c.ro,height:[8,13,18,11,16,10,14,11][i],animation:`wv 1.2s ease-in-out ${d}s infinite`}}/>)}</div>}
          </div>
        </div>
        {ph===0&&<p style={{fontSize:13,color:c.ss}}><strong style={{fontWeight:500,color:c.wc}}>Tap to start</strong></p>}
        {ph===1&&lw>0&&<div style={{background:"#F2EBE3",borderRadius:18,padding:"16px 18px",marginTop:8,textAlign:"left",width:"100%"}}>
          <p style={{fontSize:10,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:c.ss,marginBottom:8}}>You</p>
          <p style={{fontSize:15,fontFamily:"inherit",color:c.dw,lineHeight:1.7}}>{liveWords.slice(0,lw).join(" ")}<span style={{opacity:.4}}>|</span></p>
        </div>}
        {ph===1&&<div style={{marginTop:"auto",paddingTop:20,width:"100%"}}><Btn l="Done talking" fn={stop} cl={c.co}/></div>}
        {ph===0&&<p onClick={()=>setPh(5)} style={{fontSize:13,color:c.ss,marginTop:20,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}>Share a photo instead</p>}
      </div>
    </div>
  );

  // Photo handler
  const handlePhoto=()=>{setPhotoAnalyzing(true);setTimeout(()=>{setPhotoAnalyzing(false);setPhotoUploaded(true);setPhotoVibes(["Chill mood","Evening out","Food & drinks","Relaxed energy"])},2000)};

  // Phase 5: photo upload
  if(ph===5)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
      <div style={{padding:"68px 0 12px"}}><Bk fn={()=>{setPh(0);setPhotoUploaded(false);setPhotoVibes([])}}/></div>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ro,marginBottom:16}}>Photo check-in</p>
        <h1 style={{fontFamily:sf,fontSize:28,fontWeight:400,color:c.dw,marginBottom:8,maxWidth:280}}>Show us your vibe</h1>
        <p style={{fontSize:14,color:c.ss,marginBottom:24,lineHeight:1.5}}>Share a photo of where you are or what you're up to — we'll read the energy.</p>
        {!photoUploaded&&!photoAnalyzing&&<div onClick={handlePhoto} style={{width:"100%",height:200,borderRadius:22,border:"2px dashed "+c.ps,background:"#F2EBE3",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:12}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:c.ro+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={c.ro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
          <p style={{fontSize:14,fontWeight:500,color:c.wc}}>Tap to take or upload a photo</p>
        </div>}
        {photoAnalyzing&&<div style={{width:"100%",height:200,borderRadius:22,background:"#F2EBE3",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
          <div style={{width:40,height:40,border:"2px solid "+c.ps,borderTopColor:c.ro,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
          <p style={{fontSize:14,color:c.ss,fontWeight:500}}>Reading your vibe...</p>
        </div>}
        {photoUploaded&&<>
          <div style={{width:"100%",height:200,borderRadius:22,background:`linear-gradient(135deg,${c.co}30,${c.ro}25,${c.lg}20)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.03)"}}/>
            <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.6}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
            {photoVibes.map((v,i)=><span key={i} style={{padding:"7px 14px",borderRadius:999,fontSize:12,fontWeight:600,background:[c.co,c.sg,c.ap][i%3]+"15",color:[c.co,c.sg,c.ap][i%3],border:"1.5px solid "+[c.co,c.sg,c.ap][i%3]+"30"}}>{v}</span>)}
          </div>
        </>}
        <div style={{marginTop:"auto"}}><Btn l="Find my circle" fn={()=>{setFuStep(0);setFuSel(null);setFuAnswers([]);setSimMissing(["mood","energy","activity","social","timing"].filter(()=>Math.random()<0.35));setPh(6)}} cl={photoUploaded?c.co:c.ps}/></div>
      </div>
    </div>
  );

  // Phase 6: dynamic follow-up from Co based on missing signals
  // Both voice and photo attempt to detect all 5 signals.
  // What's detected depends on what the user actually says/shows, not the input method.
  const allSignalQs={
    mood:{q:"How are you feeling right now?",opts:["Restless & adventurous","Calm & reflective","Excited & social","A bit lonely","Stressed — need an escape"],icon:"💭"},
    energy:{q:"What kind of energy are you looking for?",opts:["Something active","Chill and low-key","A mix of both","Surprise me"],icon:"⚡"},
    activity:{q:"Any idea what you'd like to do?",opts:["Something outdoors","Food & drinks","Creative or artistic","Sports or fitness","Just good conversation","Open to anything"],icon:"🎯"},
    social:{q:"Who do you want to be around?",opts:["People like me","People totally different from me","A mix of both","Surprise me"],icon:"👥"},
    timing:{q:"When are you thinking?",opts:["Right now","Tonight","This weekend","I'm flexible"],icon:"🕐"},
  };
  const missingSignals=simMissing;
  const dynamicQs=missingSignals.map(k=>({...allSignalQs[k],key:k}));
  // Only ask up to 2 follow-ups to keep it light
  const cappedQs=dynamicQs.slice(0,2);

  if(ph===6&&missingSignals.length===0){nav(S.MATCH);return null}
  if(ph===6)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
      <div style={{padding:"68px 0 12px"}}><Bk fn={()=>setPh(3)}/></div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
        {/* Signal strength indicator */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{flex:1,height:4,borderRadius:2,background:c.ps}}>
            <div style={{width:`${Math.round(((5-missingSignals.length)/5)*100)}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${c.co},${c.sg})`,transition:"width .5s"}}/>
          </div>
          <span style={{fontSize:11,color:c.ss,whiteSpace:"nowrap"}}>{5-missingSignals.length}/5 signals</span>
        </div>
        {/* Co avatar + message */}
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:20}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(145deg,${c.co}40,${c.ro}30)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontFamily:sf,fontSize:16,fontStyle:"italic",color:c.co}}>C</span>
          </div>
          <div>
            <p style={{fontSize:13,fontWeight:600,color:c.dw,marginBottom:4}}>Co</p>
            <div style={{background:"#F2EBE3",borderRadius:"4px 18px 18px 18px",padding:"14px 16px"}}>
              <p style={{fontSize:15,color:c.dw,lineHeight:1.6}}>{fuStep<cappedQs.length?`I picked up on a few things — just ${cappedQs.length===1?"one quick question":"a couple quick questions"} to nail your match.`:"Got it — finding your perfect circle now!"}</p>
            </div>
          </div>
        </div>
        {/* Detected signals as tags */}
        {fuStep===0&&<div style={{marginLeft:52,marginBottom:20}}>
          <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",color:c.ss,marginBottom:8}}>What we detected</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {Object.keys(allSignalQs).filter(k=>!missingSignals.includes(k)).map(k=><span key={k} style={{padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:600,background:c.sg+"18",color:c.sg,border:"1px solid "+c.sg+"30"}}>✓ {k.charAt(0).toUpperCase()+k.slice(1)}</span>)}
          </div>
        </div>}
        {/* Current question */}
        {fuStep<cappedQs.length&&<>
          <div style={{background:"#F2EBE3",borderRadius:18,padding:"14px 16px",marginBottom:16,marginLeft:52}}>
            <p style={{fontSize:15,color:c.dw,lineHeight:1.6,fontWeight:500}}><span style={{marginRight:8}}>{cappedQs[fuStep].icon}</span>{cappedQs[fuStep].q}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginLeft:52}}>
            {cappedQs[fuStep].opts.map((o,i)=><div key={i} onClick={()=>{setFuSel(i);setFuAnswers([...fuAnswers,o]);setTimeout(()=>{if(fuStep+1>=cappedQs.length){nav(S.MATCH)}else{setFuStep(fuStep+1);setFuSel(null)}},400)}} style={{padding:"14px 18px",borderRadius:16,background:fuSel===i?c.co+"12":"#F2EBE3",border:"1.5px solid "+(fuSel===i?c.co+"40":"transparent"),color:fuSel===i?c.co:c.wc,fontSize:15,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>{o}</div>)}
          </div>
        </>}
      </div>
      <p onClick={()=>nav(S.MATCH)} style={{textAlign:"center",fontSize:13,color:c.ss,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}>Skip — just find my circle</p>
    </div>
  );

  // Phase 2: transcribing
  if(ph===2)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 24px"}}>
      <div style={{width:48,height:48,border:"2px solid "+c.ps,borderTopColor:c.ro,borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:24}}/>
      <p style={{fontSize:16,color:c.ss,fontWeight:500}}>Transcribing...</p>
    </div>
  );

  // Phase 3: transcript confirm
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"0 24px 40px"}}>
      <div style={{padding:"68px 0 12px"}}><Bk fn={()=>{setPh(0);setSec(0)}}/></div>
      <h2 style={{fontFamily:sf,fontSize:24,fontWeight:400,color:c.dw,marginBottom:20}}>Here's what we heard</h2>
      {/* Transcript card with inline play button */}
      <div style={{background:"#F2EBE3",borderRadius:18,padding:"20px 18px",marginBottom:16,minHeight:100,position:"relative"}}>
        <div style={{position:"absolute",top:16,right:16,width:32,height:32,borderRadius:"50%",background:c.ro+"20",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width={14} height={14} viewBox="0 0 24 24" fill={c.ro}><path d="M8 5v14l11-7z"/></svg></div>
        <p style={{fontSize:15,color:c.dw,lineHeight:1.7,paddingRight:40}}>{words.map((w,i)=><span key={i} style={{opacity:i<=wi?1:.15,transition:"opacity .15s"}}>{w} </span>)}</p>
      </div>
      {/* Signal tags */}
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {tags.map((t,i)=><span key={i} style={{padding:"7px 14px",borderRadius:999,fontSize:12,fontWeight:600,background:t.c+"15",color:t.c,border:"1.5px solid "+t.c+"30"}}>{t.l}</span>)}
      </div>
      <div style={{marginTop:"auto",display:"flex",flexDirection:"column",gap:10}}>
        <Btn l="Looks good — find my circle" fn={()=>{setFuStep(0);setFuSel(null);setFuAnswers([]);const all=["mood","energy","activity","social","timing"];const sh=[...all].sort(()=>Math.random()-.5);setSimMissing(["mood","energy","activity","social","timing"].filter(()=>Math.random()<0.35));setPh(6)}}/>
        <Btn l="Re-record" fn={()=>{setPh(0);setSec(0)}} out/>
      </div>
    </div>
  );
}

/* ═══ SCREEN 9: MATCHING ═══ */
function Match({nav,onDone}){
  const [st,setSt]=useState(0);
  const msgs=["Reading your energy...","Finding emotionally aligned people...","Curating experiences for you..."];
  useEffect(()=>{const a=setTimeout(()=>setSt(1),2000);const b=setTimeout(()=>setSt(2),4000);const d=setTimeout(()=>{if(onDone)onDone();nav(S.JOURNEY)},6200);return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(d)}},[]);
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 32px"}}>
      <div style={{position:"relative",width:180,height:180,marginBottom:48}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid "+c.ps+"40"}}/>
        <div style={{position:"absolute",inset:-20,borderRadius:"50%",border:"1px solid "+c.ps+"25"}}/>
        <div style={{position:"absolute",inset:-44,borderRadius:"50%",border:"1px solid "+c.ps+"15"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:24,height:24,borderRadius:"50%",background:c.co,animation:"p1 2s ease-in-out infinite",boxShadow:"0 0 20px "+c.co+"40"}}/>
        {[0,1,2,3,4].map(i=><div key={i} style={{position:"absolute",top:"50%",left:"50%",width:10,height:10,borderRadius:"50%",background:[c.ro,c.sg,c.ap,c.lg,c.co][i],animation:`orb${i} ${3+i*.5}s linear infinite`,opacity:st>=Math.floor(i/2)?1:.2,transition:"opacity .5s"}}/>)}
      </div>
      <p style={{fontFamily:sf,fontSize:22,fontStyle:"italic",fontWeight:400,color:c.dw,lineHeight:1.4}}>{msgs[st]}</p>
    </div>
  );
}

/* ═══ SCREEN 10: RESULTS ═══ */
function Results({nav,setJ}){
  const [ex,setEx]=useState(null);
  const cards=[
    {e:"🏎️",t:"Go-Kart Grand Prix",m:94,v:"Kartland SF",tm:"Tomorrow, 7 PM",tg:["Active","Fun"],av:[c.co,c.sg,c.ap,c.ro],sp:2,r:"You mentioned wanting something active and low pressure — this circle is full of people in the same energy."},
    {e:"☕",t:"Espresso & Deep Talk",m:91,v:"Sightglass Coffee",tm:"Friday, 6 PM",tg:["Chill","Deep"],av:[c.lg,c.co,c.ro],sp:3,r:"Your vibe matched 'deep conversation' — this group loves meaningful exchanges over great coffee."},
    {e:"🧗",t:"Bouldering + Brews",m:88,v:"Movement SF",tm:"Saturday, 2 PM",tg:["Active","Social"],av:[c.sg,c.ap],sp:4,r:"Bouldering is in your interests, and this crew is all new to the city — perfect overlap."},
  ];
  return(
  <div style={{padding:"60px 20px 100px"}}>
    <div style={{paddingTop:40,marginBottom:24}}>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.co,marginBottom:8}}>Matched</p>
      <h1 style={{fontFamily:sf,fontSize:30,fontWeight:400,color:c.dw}}>Your circles are <em style={{fontStyle:"italic"}}>ready</em></h1>
    </div>
    {cards.map((x,i)=><div key={i} style={{background:i===0?"#E8E0D6":"#F2EBE3",borderRadius:22,padding:i===0?"22px 20px":"20px 18px",marginBottom:14,cursor:"pointer"}} onClick={()=>setEx(ex===i?null:i)}>
      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
        <span style={{fontSize:28,marginTop:2}}>{x.e}</span>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <h3 style={{fontFamily:sf,fontSize:20,fontStyle:"italic",fontWeight:400,color:c.dw}}>{x.t}</h3>
            <span style={{padding:i===0?"5px 12px":"4px 10px",borderRadius:999,fontSize:11,fontWeight:700,background:i===0?c.co:c.co+"15",color:i===0?"#fff":c.co}}>{x.m}%</span>
          </div>
          <p style={{fontSize:12,color:c.ss,marginBottom:10}}>{x.v} · {x.tm}</p>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <span style={{padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:500,background:c.sg+"18",color:"#6B8B6B"}}>{x.tg[0]}</span>
            <span style={{padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:500,color:c.ss,border:"1px solid "+c.ps}}>{x.tg[1]}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex"}}>{x.av.map((cl,j)=><div key={j} style={{width:22,height:22,borderRadius:"50%",background:cl,border:"2px solid "+c.po,marginLeft:j>0?-5:0}}/>)}</div>
            <span style={{fontSize:11,color:c.ss}}>{x.sp} spots left</span>
          </div>
        </div>
      </div>
      {ex===i&&<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid "+c.bs}}>
        <p style={{fontSize:14,color:c.wc,lineHeight:1.6,fontStyle:"italic",marginBottom:16}}>"{x.r}"</p>
        <Btn l="Join This Circle" fn={e=>{e.stopPropagation();setJ(true);nav(S.DETAIL)}}/>
      </div>}
    </div>)}
    <p onClick={()=>nav(S.VOICE)} style={{textAlign:"center",fontSize:13,color:c.ss,marginTop:8,cursor:"pointer"}}>None of these feel right? Try again</p>
  </div>
)}

/* ═══ SCREEN 11: CIRCLE DETAIL ═══ */
function Detail({nav,noBack}){
  const mems=[
    {n:"Rachel",q:"Just moved here from NYC and looking for my crowd!",tg:["New to city","Social"],cl:c.co},
    {n:"Marcus",q:"Excited to get some competition going!",tg:["Active","Fun"],cl:c.sg},
    {n:"Sarah",q:"Can't wait to grab food after!",tg:["Foodie","Chill"],cl:c.ap},
    {n:"Mike",q:"That's you!",tg:["New to city","Active"],cl:c.ro},
  ];
  return(
  <div style={{padding:"0 0 100px"}}>
    <div style={{background:`linear-gradient(135deg,${c.co}20,${c.ap}15,${c.po})`,padding:"100px 24px 28px",position:"relative"}}>
      {!noBack&&<div onClick={()=>nav(S.JOURNEY)} style={{position:"absolute",top:60,left:20,width:36,height:36,background:c.iv+"cc",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={c.dw} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg></div>}
      <span style={{fontSize:40,display:"block",marginBottom:12}}>🏎️</span>
      <h1 style={{fontFamily:sf,fontSize:28,fontStyle:"italic",fontWeight:400,color:c.dw,marginBottom:8}}>Go-Kart Grand Prix</h1>
      <p style={{fontSize:14,color:c.ss,marginBottom:14}}>Kartland SF · Tomorrow, 7 PM</p>
      <div style={{display:"flex",gap:8}}>
        <span style={{padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:600,background:c.sg+"20",color:"#6B8B6B"}}>4 confirmed</span>
        <span style={{padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:600,background:c.ap+"20",color:c.ap}}>2 spots open</span>
      </div>
    </div>
    <div style={{padding:"24px 20px"}}>
      {/* Co's personal note about why she picked this circle */}
      <div style={{background:"#2E2A26",borderRadius:18,padding:"18px 20px",marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,background:`radial-gradient(circle,${c.co}30,transparent 70%)`,borderRadius:"50%"}}/>
        <div style={{display:"flex",gap:12,alignItems:"flex-start",position:"relative"}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(145deg,${c.co}50,${c.ro}40)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontFamily:sf,fontSize:14,fontStyle:"italic",color:"#fff"}}>C</span>
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:11,fontWeight:600,color:c.co,marginBottom:6,letterSpacing:"0.04em"}}>Why I picked this for you</p>
            <p style={{fontSize:14,color:"#F2EBE3",lineHeight:1.5,fontStyle:"italic"}}>"You said you wanted something active but low pressure. Everyone in this circle said the same thing — different words, same feeling. I think you'll click within the first twenty minutes."</p>
          </div>
        </div>
      </div>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:16}}>People in this circle</p>
      {mems.map((m,i)=><div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:i<mems.length-1?"1px solid "+c.bs:"none"}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:m.cl+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:600,color:m.cl,flexShrink:0}}>{m.n[0]}</div>
        <div>
          <h4 style={{fontSize:15,fontWeight:600,color:c.dw,marginBottom:4}}>{m.n}</h4>
          <p style={{fontSize:13,color:c.ss,fontStyle:"italic",lineHeight:1.4,marginBottom:8}}>"{m.q}"</p>
          <div style={{display:"flex",gap:6}}>{m.tg.map((t,j)=><span key={j} style={{padding:"4px 10px",borderRadius:999,fontSize:10,fontWeight:500,background:c.bs,color:c.wc}}>{t}</span>)}</div>
        </div>
      </div>)}
      <div style={{marginTop:24}}><Btn l="Enter Circle Chat" fn={()=>nav(S.CHAT)}/></div>
      {/* Invite */}
      <div onClick={()=>{if(navigator.share)navigator.share({title:"Join my circle on CoPatible",text:"I'm going to Go-Kart Grand Prix tomorrow — come with me!",url:"https://copatible.app/circle/go-kart"}).catch(()=>{})}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:16,padding:"14px",borderRadius:14,cursor:"pointer"}}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span style={{fontSize:14,fontWeight:500,color:c.co}}>Invite a friend to this circle</span>
      </div>
    </div>
  </div>
)}

/* ═══ SCREEN 12: CHAT ═══ */
function Chat({nav}){
  const [msgs,setMsgs]=useState([
    {sys:true,t:"Co introduced you all because you're looking for something active and low-pressure. Have fun 🏎️"},
    {f:"Rachel",t:"Hey everyone! So excited for tomorrow!",cl:c.co},
    {f:"Marcus",t:"Who's ready to get smoked on the track? 😤",cl:c.sg},
    {f:"Sarah",t:"I've never go-karted before but I'm here for it",cl:c.ap},
    {sys:true,t:"This chat stays open after the circle — keep the conversation going."},
  ]);
  const [inp,setInp]=useState("");
  const send=()=>{if(!inp.trim())return;setMsgs(p=>[...p,{f:"You",t:inp,cl:c.ro,me:true}]);setInp("")};
  return(
  <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
    {/* Header */}
    <div style={{padding:"60px 20px 14px",borderBottom:"1px solid "+c.bs,display:"flex",alignItems:"center",gap:12}}>
      <div onClick={()=>nav(S.DETAIL)} style={{cursor:"pointer",flexShrink:0}}><svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.dw} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg></div>
      <span style={{fontSize:20}}>🏎️</span>
      <div style={{flex:1}}><h3 style={{fontSize:15,fontWeight:600,color:c.dw}}>Go-Kart Grand Prix</h3><p style={{fontSize:11,color:c.ss}}>4 members</p></div>
      <div style={{display:"flex"}}>{[c.co,c.sg,c.ap,c.ro].map((cl,i)=><div key={i} style={{width:20,height:20,borderRadius:"50%",background:cl,border:"2px solid "+c.iv,marginLeft:i>0?-4:0}}/>)}</div>
    </div>
    {/* Event strip */}
    <div style={{margin:"8px 16px 0",padding:"10px 14px",background:c.ap+"12",borderRadius:12,display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:14}}>📅</span><p style={{fontSize:12,color:c.ap,fontWeight:500}}>Tomorrow, 7 PM · Kartland SF</p>
    </div>
    {/* Messages */}
    <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:8}}>
      {msgs.map((m,i)=>{
        if(m.sys)return(<div key={i} style={{textAlign:"center",padding:"8px 0"}}><p style={{fontSize:12,color:c.ss,background:c.bs,display:"inline-block",padding:"6px 14px",borderRadius:12}}>{m.t}</p></div>);
        return(<div key={i} style={{display:"flex",justifyContent:m.me?"flex-end":"flex-start"}}>
          <div style={{maxWidth:"78%"}}>
            {!m.me&&<p style={{fontSize:11,fontWeight:600,color:m.cl,marginBottom:3,marginLeft:4}}>{m.f}</p>}
            <div style={{padding:"11px 16px",borderRadius:18,background:m.me?`linear-gradient(135deg,${c.co}20,${c.ro}15)`:`linear-gradient(135deg,#fff,${c.po})`,borderBottomRightRadius:m.me?6:18,borderBottomLeftRadius:m.me?18:6}}>
              <p style={{fontSize:14,color:c.dw,lineHeight:1.5}}>{m.t}</p>
            </div>
          </div>
        </div>)
      })}
    </div>
    {/* Input */}
    <div style={{padding:"12px 16px 32px",borderTop:"1px solid "+c.bs,display:"flex",gap:10,alignItems:"center"}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Say something..." style={{flex:1,padding:"12px 16px",borderRadius:999,border:"1.5px solid "+c.ps,background:c.po,fontSize:14,fontFamily:"inherit",color:c.dw,outline:"none"}}/>
      <div style={{width:38,height:38,borderRadius:"50%",background:c.ro+"20",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.ro} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></div>
      <div onClick={send} style={{width:38,height:38,borderRadius:"50%",background:c.co,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>
    </div>
  </div>
)}

/* ═══ SCREEN 13: PROFILE ═══ */
function Profile({nav}){return(
  <div style={{padding:"60px 20px 100px"}}>
    <div style={{paddingTop:40,textAlign:"center",marginBottom:32}}>
      <div style={{width:88,height:88,borderRadius:"50%",background:`linear-gradient(135deg,${c.co}35,${c.ro}35)`,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:sf,fontSize:36,color:c.co,position:"relative"}}>M<div style={{position:"absolute",inset:-4,borderRadius:"50%",border:"1.5px solid "+c.co+"30"}}/></div>
      <h1 style={{fontFamily:sf,fontSize:26,fontStyle:"italic",fontWeight:400,color:c.dw,marginBottom:4}}>Mike Thorne</h1>
      <p style={{fontSize:13,color:c.ss,marginBottom:4}}>San Francisco</p>
      <p style={{fontSize:13,color:c.wc,lineHeight:1.5,maxWidth:280,margin:"8px auto 0"}}>Software Engineer at Stripe. Loves deep house, bouldering, and finding the best espresso in SF.</p>
    </div>
    <div style={{display:"flex",borderRadius:20,overflow:"hidden",marginBottom:28}}>
      {[{n:6,l:"Circles"},{n:3,l:"Streak"},{n:12,l:"Connections"}].map((s,i)=><div key={i} style={{flex:1,background:"#F2EBE3",padding:"18px 12px",textAlign:"center",borderLeft:i>0?"1px solid "+c.bs:"none"}}><div style={{fontSize:22,fontWeight:600,color:c.dw,marginBottom:2}}>{s.n}</div><div style={{fontSize:11,color:c.ss,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:500}}>{s.l}</div></div>)}
    </div>
    {/* Your vibe */}
    <div style={{marginBottom:24}}>
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>Your vibe</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <span style={{padding:"9px 16px",borderRadius:999,fontSize:13,fontWeight:500,background:c.ro+"15",color:c.ro}}>Usually curious</span>
        <span style={{padding:"9px 16px",borderRadius:999,fontSize:13,fontWeight:500,background:c.sg+"15",color:"#6B8B6B"}}>Prefers evenings</span>
        <span style={{padding:"9px 16px",borderRadius:999,fontSize:13,fontWeight:500,background:c.lg+"15",color:c.lg}}>Small groups</span>
      </div>
    </div>
    {/* Invite friends */}
    <div onClick={()=>{if(navigator.share)navigator.share({title:"Join me on CoPatible",text:"I've been finding my people through CoPatible — voice-first, emotionally aligned. You should try it!",url:"https://copatible.app/invite/mike"}).catch(()=>{})}} style={{background:`linear-gradient(135deg,${c.co}12,${c.ro}10)`,borderRadius:18,padding:"18px 20px",marginBottom:24,cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:44,height:44,borderRadius:"50%",background:c.co+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </div>
      <div style={{flex:1}}>
        <p style={{fontSize:15,fontWeight:600,color:c.dw,marginBottom:2}}>Invite Friends</p>
        <p style={{fontSize:12,color:c.ss}}>Share CoPatible with people you think would love it</p>
      </div>
      <Chev/>
    </div>
    {["Account Settings","Privacy","Help & Support"].map((l,i)=><div key={i} onClick={l==="Account Settings"?()=>nav(S.SETTINGS):undefined} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:"#F2EBE3",borderRadius:16,marginBottom:8,cursor:"pointer"}}><span style={{fontSize:15,fontWeight:500,color:c.dw}}>{l}</span><Chev/></div>)}
    <div style={{marginTop:20}}><Btn l="Log Out" fn={()=>nav(S.OB1)} out/></div>
  </div>
)}

/* ═══ SCREEN 14: SETTINGS ═══ */
function Settings({nav}){
  const [tg,setTg]=useState({push:true,circle:true,match:true,sound:false});
  const Tog=({id,l})=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:"1px solid "+c.bs}}>
    <span style={{fontSize:15,color:c.dw}}>{l}</span>
    <div onClick={()=>setTg(p=>({...p,[id]:!p[id]}))} style={{width:44,height:26,borderRadius:13,background:tg[id]?c.co:c.ps,padding:3,cursor:"pointer",transition:"background .2s",display:"flex",alignItems:tg[id]?"center":"center",justifyContent:tg[id]?"flex-end":"flex-start"}}>
      <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,.15)",transition:"all .2s"}}/>
    </div>
  </div>;
  return(
  <div style={{padding:"0 24px 120px"}}>
    <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.PROFILE)}/></div>
    <h1 style={{fontFamily:sf,fontSize:30,fontWeight:400,color:c.dw,marginBottom:24}}>Settings</h1>
    <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>Notifications</p>
    <Tog id="push" l="Push Notifications"/>
    <Tog id="circle" l="Circle Updates"/>
    <Tog id="match" l="Match Suggestions"/>
    <Tog id="sound" l="Sound Effects"/>
    <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginTop:28,marginBottom:12}}>Account</p>
    {["Edit Profile","City","Email","Phone"].map((l,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:"1px solid "+c.bs}}><span style={{fontSize:15,color:c.dw}}>{l}</span><Chev/></div>)}
    <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginTop:28,marginBottom:12}}>Privacy & Data</p>
    {["Delete Voice Data","Export My Data"].map((l,i)=><div key={i} style={{padding:"14px 0",borderBottom:"1px solid "+c.bs}}><span style={{fontSize:15,color:c.dw}}>{l}</span></div>)}
    <div style={{marginTop:28}}><Btn l="Delete Account" fn={()=>{}} cl="#c45050"/></div>
  </div>
)}

/* ═══ JOURNEY TAB (wrapper) ═══ */
function Journey({nav,matched,joined,setJ}){
  // Not matched yet — empty state
  if(!matched)return(
    <div style={{padding:"60px 20px 100px"}}>
      <div style={{paddingTop:40,marginBottom:28}}>
        <h1 style={{fontFamily:sf,fontSize:34,fontWeight:400,color:c.dw}}>Journey</h1>
      </div>
      <div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:c.co+"12",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 16.24a6 6 0 0 1 0-8.49"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <p style={{fontSize:15,fontWeight:500,color:c.dw,marginBottom:6}}>No circles yet</p>
        <p style={{fontSize:14,color:c.ss,lineHeight:1.5}}>Check in to discover your circles.</p>
        <div style={{marginTop:24,maxWidth:200,margin:"24px auto 0"}}><Btn l="Start Check-In" fn={()=>nav(S.VOICE)} sm/></div>
      </div>
    </div>
  );
  // Matched but not joined — show results
  if(!joined)return(<Results nav={nav} setJ={setJ} />);
  // Joined — show active circle with members + past suggestions
  const mems=[
    {n:"Rachel",q:"Just moved here from NYC!",cl:c.co},
    {n:"Marcus",q:"Ready for competition!",cl:c.sg},
    {n:"Sarah",q:"Can't wait for food after!",cl:c.ap},
    {n:"Mike",q:"That's you",cl:c.ro},
  ];
  return(
    <div style={{padding:"60px 20px 100px"}}>
      <div style={{paddingTop:40,marginBottom:24}}>
        <h1 style={{fontFamily:sf,fontSize:34,fontWeight:400,color:c.dw}}>Journey</h1>
      </div>
      {/* Active circle card */}
      <div style={{background:"#F2EBE3",borderRadius:22,padding:"20px 18px",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{padding:"4px 10px",borderRadius:999,fontSize:11,fontWeight:600,background:c.sg+"20",color:"#6B8B6B"}}>Confirmed</span>
          <span style={{padding:"4px 10px",borderRadius:999,fontSize:11,fontWeight:600,background:c.co+"15",color:c.co}}>Tomorrow</span>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:16}}>
          <span style={{fontSize:28,marginTop:2}}>🏎️</span>
          <div style={{flex:1}}>
            <h3 style={{fontFamily:sf,fontSize:20,fontStyle:"italic",fontWeight:400,color:c.dw}}>Go-Kart Grand Prix</h3>
            <p style={{fontSize:12,color:c.ss,marginTop:4}}>Kartland SF · Tomorrow, 7 PM</p>
          </div>
        </div>
        {/* Members preview */}
        <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",color:c.ss,marginBottom:10}}>Your circle</p>
        {mems.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<mems.length-1?"1px solid "+c.bs:"none"}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:m.cl+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:600,color:m.cl,flexShrink:0}}>{m.n[0]}</div>
            <div style={{flex:1}}>
              <span style={{fontSize:14,fontWeight:500,color:c.dw}}>{m.n}</span>
              <span style={{fontSize:12,color:c.ss,marginLeft:8}}>{m.q}</span>
            </div>
          </div>
        ))}
        <div style={{marginTop:16,display:"flex",gap:10}}>
          <div style={{flex:1}}><Btn l="Enter Circle Chat" fn={()=>nav(S.CHAT)} sm/></div>
          <div style={{flex:1}}><Btn l="How was it?" fn={()=>nav(S.FEEDBACK)} out sm/></div>
        </div>
      </div>
      {/* Check in again */}
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <p style={{fontSize:14,color:c.ss,lineHeight:1.5,marginBottom:16}}>Ready for another circle?</p>
        <Btn l="Check in again" fn={()=>nav(S.VOICE)} out sm/>
      </div>
      {/* Past circles — chats stay open. Show 3 most recent inline. */}
      {(()=>{const past=PAST_CIRCLES;const inline=past.slice(0,3);return(
      <div style={{marginTop:16,marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss}}>Past circles</p>
          {past.length>3&&<span onClick={()=>nav(S.HISTORY)} style={{fontSize:11,fontWeight:600,color:c.co,cursor:"pointer"}}>View all {past.length} →</span>}
        </div>
        {inline.map((x,i)=>(
          <div key={i} onClick={()=>nav(S.CHAT)} style={{background:"#F2EBE3",borderRadius:18,padding:"16px 16px",marginBottom:10,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>{x.e}</span>
              <div style={{flex:1}}>
                <h4 style={{fontFamily:sf,fontSize:16,fontStyle:"italic",fontWeight:400,color:c.dw}}>{x.t}</h4>
                <p style={{fontSize:11,color:c.ss,marginTop:2}}>{x.v}</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                <div style={{display:"flex"}}>{x.av.map((cl,j)=><div key={j} style={{width:18,height:18,borderRadius:"50%",background:cl,border:"2px solid #F2EBE3",marginLeft:j>0?-5:0}}/>)}</div>
                {x.unread>0&&<span style={{fontSize:10,fontWeight:600,color:"#fff",background:c.co,padding:"2px 7px",borderRadius:999}}>{x.unread} new</span>}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,paddingTop:10,borderTop:"1px solid "+c.bs}}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{fontSize:11,color:c.co,fontWeight:600}}>Chat is still open</span>
            </div>
          </div>
        ))}
      </div>
      )})()}
      {/* Past suggestions */}
      <div style={{marginTop:8}}>
        <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>Also suggested</p>
        {[{e:"☕",t:"Espresso & Deep Talk",v:"Sightglass Coffee · Friday, 6 PM",m:91},{e:"🧗",t:"Bouldering + Brews",v:"Movement SF · Saturday, 2 PM",m:88}].map((x,i)=>(
          <div key={i} style={{background:"#F2EBE3",borderRadius:18,padding:"16px 16px",marginBottom:10,opacity:0.6}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>{x.e}</span>
              <div style={{flex:1}}>
                <h4 style={{fontFamily:sf,fontSize:16,fontStyle:"italic",fontWeight:400,color:c.dw}}>{x.t}</h4>
                <p style={{fontSize:11,color:c.ss,marginTop:2}}>{x.v}</p>
              </div>
              <span style={{fontSize:11,color:c.ss}}>{x.m}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ FEEDBACK SCREEN ═══ */
function Feedback({nav}){
  const [mood,setMood]=useState(null);
  const [note,setNote]=useState("");
  const [done,setDone]=useState(false);
  const moods=[
    {e:"😍",l:"Loved it"},
    {e:"😊",l:"Good time"},
    {e:"😐",l:"It was okay"},
    {e:"😕",l:"Not for me"},
  ];

  if(done)return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 32px"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:c.sg+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:24}}>✦</div>
      <h1 style={{fontFamily:sf,fontSize:28,fontWeight:400,color:c.dw,marginBottom:8}}>Thanks, Mike</h1>
      <p style={{fontSize:15,color:c.ss,lineHeight:1.6,maxWidth:260,marginBottom:32}}>Your feedback helps us curate better circles for you next time.</p>
      <Btn l="Back to Journey" fn={()=>nav(S.JOURNEY)}/>
      {/* Invite after positive experience */}
      <div onClick={()=>{if(navigator.share)navigator.share({title:"Join me on CoPatible",text:"I've been finding my people through CoPatible — you should try it.",url:"https://copatible.app/invite/mike"}).catch(()=>{})}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:24,cursor:"pointer"}}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        <span style={{fontSize:14,fontWeight:500,color:c.co}}>Had a great time? Bring a friend next time</span>
      </div>
    </div>
  );

  return(
    <div style={{display:"flex",flexDirection:"column",padding:"0 24px 120px",minHeight:"100%"}}>
      <div style={{padding:"68px 0 12px"}}><Bk fn={()=>nav(S.JOURNEY)}/></div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
        <span style={{fontSize:24}}>🏎️</span>
        <div>
          <h1 style={{fontFamily:sf,fontSize:26,fontWeight:400,color:c.dw}}>How was it?</h1>
          <p style={{fontSize:12,color:c.ss}}>Go-Kart Grand Prix · Kartland SF</p>
        </div>
      </div>

      {/* Mood selection */}
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>How did it feel?</p>
      <div style={{display:"flex",gap:10,marginBottom:28}}>
        {moods.map((m,i)=>(
          <div key={i} onClick={()=>setMood(i)} style={{flex:1,textAlign:"center",padding:"14px 4px",borderRadius:16,background:mood===i?c.co+"15":"#F2EBE3",border:mood===i?"1.5px solid "+c.co+"40":"1.5px solid transparent",cursor:"pointer",transition:"all .2s"}}>
            <span style={{fontSize:24,display:"block",marginBottom:6}}>{m.e}</span>
            <span style={{fontSize:11,color:mood===i?c.co:c.ss,fontWeight:500}}>{m.l}</span>
          </div>
        ))}
      </div>

      {/* Note */}
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:10}}>Anything else?</p>
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional — tell us what made it great or what could be better..." style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid "+c.ps,background:"#F2EBE3",fontSize:14,fontFamily:"inherit",color:c.dw,outline:"none",resize:"none",minHeight:80,lineHeight:1.5}}/>

      <div style={{marginTop:"auto",paddingTop:20}}>
        <Btn l="Submit Feedback" fn={()=>setDone(true)} cl={mood!==null?c.co:c.ps}/>
        <p onClick={()=>nav(S.JOURNEY)} style={{textAlign:"center",fontSize:13,color:c.ss,marginTop:14,cursor:"pointer"}}>Skip for now</p>
      </div>
    </div>
  );
}

/* ═══ HISTORY — ALL PAST CIRCLES ═══ */
function History({nav}){
  return(
    <div style={{padding:"60px 20px 100px"}}>
      <div style={{padding:"40px 0 20px"}}><Bk fn={()=>nav(S.JOURNEY)}/></div>
      <h1 style={{fontFamily:sf,fontSize:32,fontWeight:400,color:c.dw,marginBottom:6}}>Past circles</h1>
      <p style={{fontSize:14,color:c.ss,marginBottom:24}}>Every circle Co built for you. Chats stay open.</p>
      {PAST_CIRCLES.map((x,i)=>(
        <div key={i} onClick={()=>nav(S.CHAT)} style={{background:"#F2EBE3",borderRadius:18,padding:"16px 16px",marginBottom:10,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>{x.e}</span>
            <div style={{flex:1}}>
              <h4 style={{fontFamily:sf,fontSize:16,fontStyle:"italic",fontWeight:400,color:c.dw}}>{x.t}</h4>
              <p style={{fontSize:11,color:c.ss,marginTop:2}}>{x.v}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
              <div style={{display:"flex"}}>{x.av.map((cl,j)=><div key={j} style={{width:18,height:18,borderRadius:"50%",background:cl,border:"2px solid #F2EBE3",marginLeft:j>0?-5:0}}/>)}</div>
              {x.unread>0&&<span style={{fontSize:10,fontWeight:600,color:"#fff",background:c.co,padding:"2px 7px",borderRadius:999}}>{x.unread} new</span>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,paddingTop:10,borderTop:"1px solid "+c.bs}}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={c.co} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{fontSize:11,color:c.co,fontWeight:600}}>Chat is still open</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══ COMPLETE PROFILE ═══ */
function Complete({nav,onDone}){
  const all=["Coffee walks","Bouldering","Live music","Cooking together","Deep conversation","Go-karting","Art galleries","Hiking","Board games","Yoga","Food crawls","Volunteering","Book clubs","Pickup sports","Comedy shows","Wine tasting","Photography","Just vibing"];
  const [sel,setSel]=useState(new Set(["Bouldering","Deep conversation","Coffee walks"]));
  const [age,setAge]=useState(1);
  const [gen,setGen]=useState(1);
  const toggle=v=>{const n=new Set(sel);n.has(v)?n.delete(v):n.add(v);setSel(n)};
  return(
    <div style={{display:"flex",flexDirection:"column",padding:"0 24px 120px"}}>
      <div style={{padding:"68px 0 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Bk fn={()=>nav(S.HOME)}/>
        <span onClick={()=>nav(S.HOME)} style={{fontSize:13,color:c.ss,cursor:"pointer"}}>Skip for now</span>
      </div>
      <h1 style={{fontFamily:sf,fontSize:28,fontWeight:400,color:c.dw,marginBottom:6}}>Complete your profile</h1>
      <p style={{fontSize:14,color:c.ss,marginBottom:28,lineHeight:1.5}}>This helps us find better circles for you.</p>

      {/* Interests */}
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>What sounds good?</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
        {all.map(a=><Pill key={a} l={a} on={sel.has(a)} fn={()=>toggle(a)} ac={c.sg}/>)}
      </div>

      {/* Personal info */}
      <p style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,marginBottom:12}}>About you</p>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:28}}>
        <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:8}}>First name</label><input defaultValue="Mike" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid "+c.ps,background:c.po,fontSize:15,fontFamily:"inherit",color:c.dw,outline:"none"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:8}}>City</label><input defaultValue="San Francisco" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid "+c.ps,background:c.po,fontSize:15,fontFamily:"inherit",color:c.dw,outline:"none"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:10}}>Age range</label><div style={{display:"flex",gap:8}}>{["18–24","25–34","35–44","45+"].map((a,i)=><Pill key={a} l={a} on={age===i} fn={()=>setAge(i)}/>)}</div></div>
        <div><label style={{fontSize:11,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",color:c.ss,display:"block",marginBottom:10}}>Gender</label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["Woman","Man","Non-binary","Prefer not to say"].map((g,i)=><Pill key={g} l={g} on={gen===i} fn={()=>setGen(i)}/>)}</div></div>
      </div>

      <Btn l="Save & improve my matches" fn={()=>{onDone();nav(S.HOME)}}/>
    </div>
  );
}

/* ═══ APP SHELL ═══ */
export default function App(){
  const [scr,setScr]=useState(S.OB1);
  const [joined,setJ]=useState(false);
  const [matched,setM]=useState(false);
  const [profDone,setProfDone]=useState(false);
  const ref=useRef(null);

  const nav=s=>{setScr(s);if(ref.current)ref.current.scrollTop=0};
  const full=[S.VOICE,S.MATCH,S.OB1,S.OB5,S.CHAT];

  return (
    <div style={{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#1a1816",fontFamily:"'DM Sans',-apple-system,sans-serif",color:c.dw}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes p1{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.04);opacity:1}}
        @keyframes p2{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.06);opacity:.7}}
        @keyframes wv{0%,100%{height:8px;opacity:.4}50%{height:28px;opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes orb0{from{transform:translate(-50%,-50%) rotate(0deg) translateX(60px)}to{transform:translate(-50%,-50%) rotate(360deg) translateX(60px)}}
        @keyframes orb1{from{transform:translate(-50%,-50%) rotate(72deg) translateX(70px)}to{transform:translate(-50%,-50%) rotate(432deg) translateX(70px)}}
        @keyframes orb2{from{transform:translate(-50%,-50%) rotate(144deg) translateX(80px)}to{transform:translate(-50%,-50%) rotate(504deg) translateX(80px)}}
        @keyframes orb3{from{transform:translate(-50%,-50%) rotate(216deg) translateX(65px)}to{transform:translate(-50%,-50%) rotate(576deg) translateX(65px)}}
        @keyframes orb4{from{transform:translate(-50%,-50%) rotate(288deg) translateX(75px)}to{transform:translate(-50%,-50%) rotate(648deg) translateX(75px)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{display:none}
        input:focus{border-color:${c.co}!important}
      `}</style>
      <div style={{width:393,height:852,borderRadius:48,overflow:"hidden",position:"relative",background:c.iv,boxShadow:"0 0 0 1px rgba(46,42,38,.08),0 24px 80px rgba(0,0,0,.35)",flexShrink:0}}>
        <SBar/>
        <div ref={ref} style={{position:"absolute",inset:0,overflowY:full.includes(scr)?"hidden":"auto",overflowX:"hidden",background:`linear-gradient(180deg,${c.iv},${c.po})`,scrollbarWidth:"none"}}>
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
        <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:134,height:5,borderRadius:3,background:"#1a1816",zIndex:200}}/>
      </div>
    </div>
  );
}
