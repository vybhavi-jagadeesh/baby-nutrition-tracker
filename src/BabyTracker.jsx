import { useState, useRef, useCallback, useEffect } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  ocean:   { id:"ocean",   name:"Ocean blue",      group:"boy",  primary:"#64B5F6", primaryDark:"#1E88E5", accent:"#FF8A65", bg:"#F0F7FF", card:"#DEEEFF", text:"#1A3A5C", muted:"#4A7FA8", track:"#B3D4F0", darkBg:"#0F2035", darkCard:"#1A3A5C", darkText:"#E8F4FF", darkMuted:"#7AAFD4" },
  forest:  { id:"forest",  name:"Mint forest",     group:"boy",  primary:"#52B788", primaryDark:"#2D9966", accent:"#FFD166", bg:"#F2FAF5", card:"#D8F3DC", text:"#1B4332", muted:"#4A7C6A", track:"#B7E4C7", darkBg:"#0A1F14", darkCard:"#1B4332", darkText:"#D8F3DC", darkMuted:"#7AB89A" },
  slate:   { id:"slate",   name:"Slate & amber",   group:"boy",  primary:"#5B8DB8", primaryDark:"#3A6A94", accent:"#F4A64A", bg:"#F5F7FA", card:"#E8EDF2", text:"#1E2D3D", muted:"#5A6A7A", track:"#C5CCD8", darkBg:"#101820", darkCard:"#1E2D3D", darkText:"#E8EDF2", darkMuted:"#8A9AAA" },
  rose:    { id:"rose",    name:"Rose petal",      group:"girl", primary:"#F48FB1", primaryDark:"#C2607A", accent:"#80CBC4", bg:"#FFF5F7", card:"#FCE4EC", text:"#5C1A30", muted:"#C2647A", track:"#F8BBD0", darkBg:"#200A12", darkCard:"#5C1A30", darkText:"#FCE4EC", darkMuted:"#F48FB1" },
  lavender:{ id:"lavender",name:"Lavender dream",  group:"girl", primary:"#B39DDB", primaryDark:"#8B6FBE", accent:"#FFD180", bg:"#FAF8FF", card:"#EDE7F6", text:"#3D2B6B", muted:"#7B68A8", track:"#D1C4E9", darkBg:"#150E28", darkCard:"#3D2B6B", darkText:"#EDE7F6", darkMuted:"#B39DDB" },
  peach:   { id:"peach",   name:"Peach blossom",   group:"girl", primary:"#FFAB76", primaryDark:"#E07A3A", accent:"#CE93D8", bg:"#FFF8F3", card:"#FDE8D8", text:"#5C2D0A", muted:"#B8724A", track:"#F7D5BC", darkBg:"#201008", darkCard:"#5C2D0A", darkText:"#FDE8D8", darkMuted:"#FFAB76" },
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Lora:wght@400;600&display=swap');`;

function makeGlobal(t, dark) {
  const bg = dark ? t.darkBg : t.bg;
  const card = dark ? t.darkCard : t.card;
  const cardSurface = dark ? "#ffffff0f" : "#ffffff";
  const textPrimary = dark ? t.darkText : t.text;
  const textMuted = dark ? t.darkMuted : t.muted;
  const border = dark ? t.primary + "44" : t.primary + "66";
  const trackBg = dark ? t.primary + "33" : t.track;
  const segBg = dark ? t.primary + "22" : t.primary + "22";
  const inputBorder = dark ? t.primary + "88" : t.primary + "99";
  const modalBg = dark ? t.darkCard : "#fff";
  const tabBg = dark ? t.darkCard : "#fff";
  const tabBorder = dark ? t.primary + "33" : t.track;

  return `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito',sans-serif;background:${bg};color:${textPrimary};-webkit-tap-highlight-color:transparent;transition:background .3s,color .3s}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:${bg};padding-bottom:88px;position:relative}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes checkPop{0%{transform:scale(.6)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes scanLine{0%,100%{top:5%}50%{top:90%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade-up{animation:fadeUp .35s ease forwards}
.card{background:${cardSurface};border-radius:20px;padding:18px;margin:10px 16px;box-shadow:0 2px 16px ${t.primary}18;border:1px solid ${border}}
.pill{border-radius:100px;padding:4px 12px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
.btn{border:none;border-radius:14px;padding:12px 20px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap}
.btn-primary{background:${t.primary};color:${t.text}}.btn-primary:hover{background:${t.primaryDark};color:#fff;transform:translateY(-1px)}.btn-primary:active{transform:scale(.97)}
.btn-ghost{background:transparent;border:2px solid ${t.primary};color:${textMuted}}.btn-ghost:hover{background:${t.primary}22;color:${textPrimary}}
.btn-soft{background:${t.primary}22;color:${textPrimary};border:1.5px solid ${t.primary}44}
.section-title{font-family:'Lora',serif;font-size:19px;color:${textPrimary};margin:18px 16px 2px}
.lbl{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${textMuted}}
.check-circle{width:33px;height:33px;border-radius:50%;border:2px solid ${t.primary};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0}
.check-circle.done{background:${t.primary};border-color:${t.primary};animation:checkPop .3s ease}
input[type=number],input[type=text],input[type=date],input[type=time],select,textarea{font-family:'Nunito',sans-serif;border:2px solid ${inputBorder};border-radius:12px;padding:10px 13px;font-size:14px;background:${cardSurface};color:${textPrimary};outline:none;width:100%;transition:border-color .15s}
input:focus,select:focus,textarea:focus{border-color:${t.primary}}
.progress-bar{height:8px;background:${trackBg};border-radius:100px;overflow:hidden}
.progress-fill{height:100%;border-radius:100px;transition:width .5s ease;background:${t.primary}}
.tab-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:${tabBg};border-top:2px solid ${tabBorder};display:flex;z-index:100;padding:8px 0 20px;box-shadow:0 -2px 16px ${t.primary}18}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:5px 0;transition:all .18s}
.tab span{font-size:9.5px;font-weight:700;letter-spacing:.01em}
.tab-icon{font-size:19px;line-height:1}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:fadeUp .2s ease}
.modal{background:${modalBg};border-radius:26px 26px 0 0;padding:22px 18px 44px;width:100%;max-width:430px;max-height:90vh;overflow-y:auto;border-top:3px solid ${t.primary}}
.modal-handle{width:38px;height:4px;background:${t.primary};border-radius:100px;margin:0 auto 18px}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${t.text};color:#fff;padding:11px 22px;border-radius:100px;font-size:13px;z-index:400;animation:fadeUp .25s ease;white-space:nowrap;pointer-events:none;font-weight:700}
.skeleton{background:linear-gradient(90deg,${t.track} 25%,${t.card} 50%,${t.track} 75%);background-size:400px 100%;animation:shimmer 1.2s infinite;border-radius:8px}
.seg{display:flex;background:${segBg};border-radius:12px;padding:3px;gap:2px}
.seg-btn{flex:1;padding:8px 0;border:none;border-radius:10px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .18s;background:transparent;color:${textMuted}}
.seg-btn.active{background:${t.primary};color:${t.text};box-shadow:0 2px 8px ${t.primary}55}
.divider{height:1px;background:${border};margin:12px 0}
.icon-btn{background:none;border:none;cursor:pointer;padding:5px 6px;border-radius:8px;font-size:15px;line-height:1;color:${textMuted};transition:color .15s;flex-shrink:0}
`;
}

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const SUPPLEMENTS = [
  { id:"vitd", name:"Vitamin D",      dose:"0.5ml (800 IU)", timing:"Once daily",   icon:"☀️" },
  { id:"iron", name:"Iron Drops",     dose:"1ml",            timing:"Once daily",   icon:"💧" },
  { id:"bonn", name:"Bonnisan Drops", dose:"0.6ml",          timing:"Three times daily", icon:"🌿" },
];
const FRUITS = [
  { name:"Banana",     form:"Mashed or soft pieces",          qty:"2–3 tbsp", note:"Great first fruit, easy to digest",            icon:"🍌" },
  { name:"Apple",      form:"Steamed & pureed or soft grated", qty:"2–3 tbsp", note:"Peel and cook till soft",                      icon:"🍎" },
  { name:"Pear",       form:"Steamed & mashed",               qty:"2–3 tbsp", note:"Gentle on tummy, mildly sweet",                icon:"🍐" },
  { name:"Papaya",     form:"Ripe & mashed",                  qty:"2–3 tbsp", note:"Aids digestion, naturally soft",               icon:"🧡" },
  { name:"Mango",      form:"Ripe pulp, mashed",              qty:"1–2 tbsp", note:"Small qty first, watch for allergy",           icon:"🥭" },
  { name:"Chikoo",     form:"Ripe & mashed",                  qty:"2 tbsp",   note:"High energy, great for weight",                icon:"🟤" },
  { name:"Watermelon", form:"Seedless, soft or blended",      qty:"2–3 tbsp", note:"Hydrating, give only ripe",                   icon:"🍉" },
  { name:"Avocado",    form:"Mashed with fork",               qty:"1–2 tbsp", note:"Healthy fats, great brain food",               icon:"🥑" },
];
const POOP_COLORS = [
  { id:"mustard",    label:"Mustard yellow", hex:"#E8C84A", warn:false },
  { id:"brightgreen",label:"Bright green",  hex:"#6BBF59", warn:false },
  { id:"darkgreen",  label:"Dark green",    hex:"#3A7D44", warn:false },
  { id:"lightbrown", label:"Light brown",   hex:"#C49A6C", warn:false },
  { id:"darkbrown",  label:"Dark brown",    hex:"#6B3F2A", warn:false },
  { id:"orange",     label:"Orange",        hex:"#E87530", warn:false },
  { id:"black",      label:"Black / tarry", hex:"#2C2C2C", warn:true, warnMsg:"Black poop can sometimes be caused by iron drops — which your baby is on — so it may be normal. Do mention it at the next doctor visit, or sooner if you're concerned." },
  { id:"pale",       label:"Pale / white",  hex:"#E8E0D0", warn:true, warnMsg:"Pale or white poop is uncommon. Please consult your doctor soon, as it may need attention." },
];
const CONSISTENCY = ["Watery","Soft","Formed"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const daysSince = d => Math.floor((new Date() - new Date(d)) / 86400000);
const getRagStage = (ragStartDate) => { if(!ragStartDate) return {times:1,label:"Once a day",nextIn:7}; const d=daysSince(ragStartDate); if(d<7) return {times:1,label:"Once a day",nextIn:7-d}; if(d<14) return {times:2,label:"Twice a day",nextIn:14-d}; return {times:3,label:"Three times a day",nextIn:null}; };
const todayKey = () => new Date().toISOString().split("T")[0];

// ─── LOCALSTORAGE ─────────────────────────────────────────────────────────────
function lsGet(key, fallback) { try { const v=localStorage.getItem(key); return v!==null?JSON.parse(v):fallback; } catch { return fallback; } }
function lsSet(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
const fmt  = d => new Date(d).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const fmtDate = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short"});
const fmtDateFull = d => new Date(d).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"});
const mlToOz = ml => (ml/29.5735).toFixed(1);
const ozToMl = oz => Math.round(oz*29.5735);
const now = () => new Date().toISOString();
const toTimeInput = ts => { const d=new Date(ts); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const toDateInput = ts => new Date(ts).toISOString().split("T")[0];
const fromDateTimeInputs = (dateStr, timeStr) => { const d=new Date(dateStr); const [hh,mm]=timeStr.split(":").map(Number); d.setHours(hh,mm,0,0); return d.toISOString(); };
function calcAge(dob) { if(!dob) return null; const d=new Date(dob),n=new Date(); let m=(n.getFullYear()-d.getFullYear())*12+(n.getMonth()-d.getMonth()); const days=n.getDate()-d.getDate(); const totalDays=Math.floor((n-d)/86400000); const months=Math.floor(totalDays/30.44); const remDays=Math.floor(totalDays-(months*30.44)); return `${months} month${months!==1?"s":""}${remDays>0?`, ${remDays} day${remDays!==1?"s":""}`:""}` ; }

// ─── MOCK SCAN ────────────────────────────────────────────────────────────────
// DEMO MODE — swap scanLabel body for real API call when ready
async function scanLabel(base64, mediaType, category) {
  await new Promise(r=>setTimeout(r,2200));
  if (category==="formula") return { productName:"NAN PRO 2 Follow-Up Formula", type:"formula", detectedDose:"3 scoops (≈27g) per 180ml water", recommendedForBaby:"180ml per feed, 3–4 feeds/day. Total ~600–700ml daily.", howToGive:"Boil water, cool to ~50°C, add powder, shake well.", warnings:"Do not microwave. Discard unused formula after 1 hour.", confidence:"high" };
  return { productName:"Aquadrops Vitamin D3 Drops", type:"supplement", detectedDose:"400 IU per 5 drops (0.5ml)", recommendedForBaby:"5 drops (400 IU / 0.5ml) once daily. Mix with breastmilk or formula.", howToGive:"Use dropper, mix into a small amount of milk before a feed.", warnings:"Store away from sunlight. Do not exceed dose. Follow doctor's prescription.", confidence:"high" };
}
function fileToBase64(file) { return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result.split(",")[1]); r.onerror=()=>rej(); r.readAsDataURL(file); }); }

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
import { createContext, useContext } from "react";
const ThemeCtx = createContext({ t: THEMES.ocean, dark: false });
const useTheme = () => useContext(ThemeCtx);

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function PageHeader({ icon, title, subtitle }) {
  const { t, dark } = useTheme();
  return (
    <div style={{ padding:"26px 16px 6px", background:`linear-gradient(160deg,${t.primary}33 0%,transparent 55%)` }}>
      <h2 style={{ fontFamily:"'Lora',serif", fontSize:24, color:dark?t.darkText:t.text, lineHeight:1.25 }}>{icon} {title}</h2>
      {subtitle && <p style={{ fontSize:13, color:dark?t.darkMuted:t.muted, marginTop:5, lineHeight:1.5 }}>{subtitle}</p>}
    </div>
  );
}

function IconBtn({ onClick, children, hoverColor }) {
  const { t, dark } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <button className="icon-btn" onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ color: hov ? (hoverColor||t.primaryDark) : (dark?t.darkMuted:t.muted) }}>
      {children}
    </button>
  );
}

function DateTimeRow({ dateVal, timeVal, onDateChange, onTimeChange }) {
  const { t, dark } = useTheme();
  const sub = dark ? t.darkMuted : t.muted;
  return (
    <div style={{ marginBottom:14 }}>
      <div className="lbl" style={{ marginBottom:7, color:sub }}>Date & time</div>
      <div style={{ display:"flex", gap:8 }}>
        <input type="date" value={dateVal} onChange={e=>onDateChange(e.target.value)} style={{ flex:1 }} />
        <input type="time" value={timeVal} onChange={e=>onTimeChange(e.target.value)} style={{ flex:1 }} />
      </div>
      <p style={{ fontSize:11, color:sub, marginTop:5 }}>Auto-filled — adjust if needed</p>
    </div>
  );
}

// ─── THEME PICKER SCREEN ──────────────────────────────────────────────────────
function ThemePickerScreen({ current, onPick, onClose }) {
  const { t, dark } = useTheme();
  const bg = dark ? t.darkBg : t.bg;
  const cardBg = dark ? t.darkCard : "#fff";
  const textPrimary = dark ? t.darkText : t.text;
  const textMuted = dark ? t.darkMuted : t.muted;
  const groups = [{ label:"Boy themes", key:"boy" },{ label:"Girl themes", key:"girl" }];

  return (
    <div style={{ position:"fixed", inset:0, background:bg, zIndex:300, overflowY:"auto", padding:"0 0 40px" }}>
      <div style={{ padding:"20px 16px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <h2 style={{ fontFamily:"'Lora',serif", fontSize:22, color:textPrimary }}>Choose a theme</h2>
        <button className="btn btn-soft" style={{ fontSize:13, padding:"8px 14px" }} onClick={onClose}>Done</button>
      </div>
      <p style={{ fontSize:13, color:textMuted, padding:"0 16px 16px", lineHeight:1.5 }}>Tap any theme to preview it live — your whole app updates instantly!</p>

      {groups.map(g => (
        <div key={g.key}>
          <div style={{ padding:"8px 16px 6px", fontSize:11, fontWeight:800, letterSpacing:".07em", textTransform:"uppercase", color:textMuted }}>{g.label}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, padding:"0 16px" }}>
            {Object.values(THEMES).filter(th=>th.group===g.key).map(th => (
              <div key={th.id} onClick={()=>onPick(th.id)}
                style={{ borderRadius:16, overflow:"hidden", border:`3px solid ${current===th.id ? th.primary : "transparent"}`, cursor:"pointer", transition:"all .2s", background:dark?th.darkCard:th.card, boxShadow: current===th.id ? `0 0 0 2px ${th.primary}88` : "none" }}>
                {/* Mini preview */}
                <div style={{ padding:"8px 8px 0" }}>
                  <div style={{ borderRadius:10, background:th.primary, padding:"7px 8px", marginBottom:5 }}>
                    <div style={{ fontSize:8, fontWeight:800, color:th.text, opacity:.8 }}>Good morning</div>
                    <div style={{ fontSize:11, fontWeight:800, color:th.text }}>Baby's Day</div>
                  </div>
                  <div style={{ borderRadius:8, background:dark?th.darkCard+"88":"#fff", padding:"6px 7px", marginBottom:5, border:`1px solid ${th.primary}44` }}>
                    <div style={{ fontSize:7, fontWeight:700, color:th.muted, textTransform:"uppercase", letterSpacing:".05em", marginBottom:2 }}>Milk today</div>
                    <div style={{ height:5, borderRadius:100, background:th.track, overflow:"hidden" }}>
                      <div style={{ width:"60%", height:"100%", background:th.primary, borderRadius:100 }} />
                    </div>
                  </div>
                  <div style={{ borderRadius:8, background:th.primary, padding:"5px 7px", marginBottom:8, textAlign:"center" }}>
                    <div style={{ fontSize:8, fontWeight:800, color:th.text }}>+ Log feed</div>
                  </div>
                </div>
                {/* Swatch strip */}
                <div style={{ display:"flex", gap:2, padding:"0 8px 8px" }}>
                  {[th.primary, th.accent, th.card, th.muted].map((c,i)=>(
                    <div key={i} style={{ flex:1, height:6, borderRadius:100, background:c }} />
                  ))}
                </div>
                <div style={{ background:th.primary, padding:"6px 0", textAlign:"center" }}>
                  <div style={{ fontSize:9, fontWeight:800, color:th.text }}>{th.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen({ profile, onSave, onClose, onOpenTheme, dark, onToggleDark }) {
  const { t } = useTheme();
  const textPrimary = dark ? t.darkText : t.text;
  const textMuted = dark ? t.darkMuted : t.muted;
  const cardSurface = dark ? "#ffffff0f" : "#ffffff";
  const border = dark ? t.primary+"44" : t.primary+"66";

  const [form, setForm] = useState({ ...profile });
  const [suppForm, setSuppForm] = useState(profile.supplements || [
    { id:"vitd", name:"Vitamin D",      dose:"0.5ml (800 IU)", timing:"Once daily",       timesPerDay:1, icon:"☀️" },
    { id:"iron", name:"Iron Drops",     dose:"1ml",            timing:"Once daily",        timesPerDay:1, icon:"💧" },
    { id:"bonn", name:"Bonnisan Drops", dose:"0.6ml",          timing:"Three times daily", timesPerDay:3, icon:"🌿" },
  ]);

  function addCustomField() { setForm(p=>({ ...p, custom:[...(p.custom||[]), {id:Date.now(),label:"",value:""}] })); }
  function updateCustom(id,key,val) { setForm(p=>({ ...p, custom:p.custom.map(c=>c.id===id?{...c,[key]:val}:c) })); }
  function removeCustom(id) { setForm(p=>({ ...p, custom:p.custom.filter(c=>c.id!==id) })); }
  function updateSupp(id,key,val) { setSuppForm(p=>p.map(s=>s.id===id?{...s,[key]:val}:s)); }

  const age = calcAge(form.dob);

  return (
    <div style={{ position:"fixed", inset:0, background:dark?t.darkBg:t.bg, zIndex:300, overflowY:"auto", padding:"0 0 40px" }}>
      <div style={{ padding:"20px 16px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <h2 style={{ fontFamily:"'Lora',serif", fontSize:22, color:textPrimary }}>👶 Baby profile</h2>
        <button className="btn btn-primary" style={{ fontSize:13, padding:"8px 14px" }} onClick={()=>onSave({ ...form, supplements:suppForm })}>Save</button>
      </div>

      <div style={{ textAlign:"center", padding:"10px 0 16px" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${t.primary},${t.accent})`, margin:"0 auto 8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>
          {form.gender==="girl" ? "👧" : "👦"}
        </div>
        {form.name && <div style={{ fontFamily:"'Lora',serif", fontSize:18, fontWeight:600, color:textPrimary }}>{form.name}</div>}
        {age && <div style={{ fontSize:13, color:textMuted, marginTop:3 }}>{age} old</div>}
      </div>

      <div style={{ padding:"0 16px" }}>
        {/* Core fields */}
        {[
          { label:"Baby's name",   key:"name",          type:"text", placeholder:"e.g. Arjun" },
          { label:"Date of birth", key:"dob",           type:"date" },
          { label:"Birth weight",  key:"birthWeight",   type:"text", placeholder:"e.g. 3.2 kg" },
          { label:"Current weight",key:"currentWeight", type:"text", placeholder:"e.g. 8.4 kg" },
          { label:"Blood group",   key:"bloodGroup",    type:"text", placeholder:"e.g. O+" },
          { label:"Doctor's name", key:"doctorName",    type:"text", placeholder:"e.g. Dr. Sharma" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom:13 }}>
            <div className="lbl" style={{ marginBottom:6, color:textMuted }}>{f.label}</div>
            <input type={f.type} placeholder={f.placeholder} value={form[f.key]||""}
              onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} />
          </div>
        ))}

        {/* Gender */}
        <div style={{ marginBottom:13 }}>
          <div className="lbl" style={{ marginBottom:7, color:textMuted }}>Gender</div>
          <div className="seg">
            <button className={`seg-btn ${form.gender==="boy"?"active":""}`} onClick={()=>setForm(p=>({...p,gender:"boy"}))}>👦 Boy</button>
            <button className={`seg-btn ${form.gender==="girl"?"active":""}`} onClick={()=>setForm(p=>({...p,gender:"girl"}))}>👧 Girl</button>
          </div>
        </div>

        {/* Solids start date + current food */}
        <div style={{ marginBottom:13 }}>
          <div className="lbl" style={{ marginBottom:6, color:textMuted }}>Solids start date</div>
          <input type="date" value={form.ragStartDate||""} onChange={e=>setForm(p=>({...p,ragStartDate:e.target.value}))} />
          <p style={{ fontSize:11, color:textMuted, marginTop:4 }}>Used to auto-calculate the feeding frequency timeline</p>
        </div>
        <div style={{ marginBottom:16 }}>
          <div className="lbl" style={{ marginBottom:6, color:textMuted }}>Current solid food being given</div>
          <input type="text" placeholder="e.g. Ragi porridge, Rice & lentils" value={form.currentFood||""} onChange={e=>setForm(p=>({...p,currentFood:e.target.value}))} />
          <p style={{ fontSize:11, color:textMuted, marginTop:4 }}>Just for your reference — shown on the Home screen</p>
        </div>

        {/* Milk & water targets */}
        <div style={{ marginBottom:13 }}>
          <div className="lbl" style={{ marginBottom:6, color:textMuted }}>Daily milk target (ml)</div>
          <input type="number" placeholder="e.g. 700" value={form.milkTargetMl||700} onChange={e=>setForm(p=>({...p,milkTargetMl:parseInt(e.target.value)||700}))} />
        </div>
        <div style={{ marginBottom:16 }}>
          <div className="lbl" style={{ marginBottom:6, color:textMuted }}>Daily water target (ml)</div>
          <input type="number" placeholder="e.g. 120" value={form.waterTargetMl||120} onChange={e=>setForm(p=>({...p,waterTargetMl:parseInt(e.target.value)||120}))} />
        </div>

        {/* Editable supplements */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div className="lbl" style={{ color:textMuted }}>Supplements</div>
          <button className="btn btn-soft" style={{ fontSize:12, padding:"6px 12px" }} onClick={()=>setSuppForm(p=>[...p,{id:`custom_${Date.now()}`,name:"New supplement",dose:"",timing:"Once daily",timesPerDay:1,icon:"💊"}])}>+ Add supplement</button>
        </div>
        {suppForm.map(s=>(
          <div key={s.id} style={{ background:cardSurface, border:`1.5px solid ${border}`, borderRadius:14, padding:"12px 14px", marginBottom:10 }}>
            <div style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
              <span style={{ fontSize:20 }}>{s.icon}</span>
              <input type="text" value={s.name} onChange={e=>updateSupp(s.id,"name",e.target.value)} style={{ flex:1, fontWeight:700 }} />
              <IconBtn onClick={()=>setSuppForm(p=>p.filter(x=>x.id!==s.id))}>✕</IconBtn>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              <div>
                <div className="lbl" style={{ marginBottom:4, color:textMuted }}>Dose</div>
                <input type="text" value={s.dose} onChange={e=>updateSupp(s.id,"dose",e.target.value)} placeholder="e.g. 1ml" />
              </div>
              <div>
                <div className="lbl" style={{ marginBottom:4, color:textMuted }}>Times per day</div>
                <input type="number" value={s.timesPerDay} onChange={e=>updateSupp(s.id,"timesPerDay",parseInt(e.target.value)||1)} min={1} max={6} />
              </div>
            </div>
          </div>
        ))}

        {/* Custom fields */}
        <div className="lbl" style={{ marginBottom:8, color:textMuted, marginTop:6 }}>Custom fields</div>
        {(form.custom||[]).map(c => (
          <div key={c.id} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
            <input type="text" placeholder="Label" value={c.label} onChange={e=>updateCustom(c.id,"label",e.target.value)} style={{ flex:1 }} />
            <input type="text" placeholder="Value" value={c.value} onChange={e=>updateCustom(c.id,"value",e.target.value)} style={{ flex:1 }} />
            <IconBtn onClick={()=>removeCustom(c.id)}>✕</IconBtn>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ width:"100%", marginBottom:20, fontSize:13 }} onClick={addCustomField}>+ Add field</button>

        <div className="divider" />

        {/* Settings */}
        <div style={{ marginTop:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div>
              <div style={{ fontWeight:700, color:textPrimary, fontSize:14 }}>{dark?"🌙 Dark mode":"☀️ Light mode"}</div>
              <div style={{ fontSize:12, color:textMuted }}>Switch app appearance</div>
            </div>
            <button onClick={onToggleDark} style={{ width:44, height:24, borderRadius:100, border:"none", cursor:"pointer", background:dark?t.primary:"#CCC", position:"relative", transition:"background .3s", flexShrink:0 }}>
              <div style={{ width:18, height:18, borderRadius:"50%", background:"white", position:"absolute", top:3, left:dark?23:3, transition:"left .25s" }} />
            </button>
          </div>
          <button className="btn btn-soft" style={{ width:"100%", fontSize:14 }} onClick={onOpenTheme}>🎨 Change theme</button>
        </div>
      </div>
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ milkLogs, onAddMilk, suppChecked, onToggleSupp, nextFeedAt, profile, supplements }) {
  const { t, dark } = useTheme();
  const text = dark ? t.darkText : t.text;
  const muted = dark ? t.darkMuted : t.muted;
  const ragStage = getRagStage(profile?.ragStartDate);
  const totalMilk = milkLogs.reduce((a,b)=>a+b.ml,0);
  const recommended = profile?.milkTargetMl || 700;
  const suppList = supplements || SUPPLEMENTS;
  const pct = Math.min(100, Math.round((totalMilk/recommended)*100));
  const hr = new Date().getHours();
  const greeting = hr<12?"Good morning":hr<17?"Good afternoon":"Good evening";
  const babyName = profile?.name || "Baby";
  const age = calcAge(profile?.dob);
  const timeUntilFeed = nextFeedAt ? Math.max(0, Math.round((new Date(nextFeedAt)-new Date())/60000)) : null;
  const [activeType, setActiveType] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("ml");

  function handleTypeClick(type) { setActiveType(p=>p===type?null:type); setMinutes(""); setAmount(""); }
  function handleSave() {
    let ml = activeType==="breast" ? Math.round((parseFloat(minutes)||15)*8) : (unit==="oz"?ozToMl(parseFloat(amount)||0):Math.round(parseFloat(amount)||0));
    const ts = now();
    onAddMilk({ type:activeType, ml, minutes:activeType==="breast"?parseFloat(minutes)||15:null, amount:activeType==="bottle"?parseFloat(amount)||180:null, unit:activeType==="bottle"?unit:null, time:fmt(ts), recordedTs:ts, ts });
    setActiveType(null); setMinutes(""); setAmount("");
  }

  return (
    <div>
      <div style={{ padding:"26px 16px 8px", background:`linear-gradient(160deg,${t.primary}44 0%,transparent 55%)`, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <p style={{ fontSize:13, color:muted, marginBottom:3 }}>{greeting} 🌸</p>
          <h1 style={{ fontFamily:"'Lora',serif", fontSize:27, color:text, lineHeight:1.2 }}>{babyName}'s Day</h1>
          {age && <p style={{ fontSize:12, color:muted, marginTop:3 }}>{age} old</p>}
        </div>
        <div style={{ fontSize:12, color:muted, marginTop:6, textAlign:"right" }}>
          {new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}
        </div>
      </div>

      {nextFeedAt && (
        <div className="card fade-up" style={{ background:`linear-gradient(135deg,${t.primary},${t.primaryDark})`, color:t.text, border:"none" }}>
          <div style={{ fontSize:12, opacity:.85, marginBottom:3 }}>
            {timeUntilFeed<=0?"⏰ Feed time now!":`⏰ Next feed in ${timeUntilFeed} min`}
          </div>
          <div style={{ fontFamily:"'Lora',serif", fontSize:16 }}>
            {timeUntilFeed<=15?"Time to start prepping!":timeUntilFeed>0?`Prep solids in ~${Math.max(0,timeUntilFeed-15)} min`:""}
          </div>
        </div>
      )}

      <div className="card fade-up" style={{ background:`linear-gradient(135deg,${t.primary},${t.primaryDark})`, color:t.text, border:"none" }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", opacity:.8, marginBottom:5 }}>What to give next</div>
        <div style={{ fontFamily:"'Lora',serif", fontSize:21, marginBottom:12 }}>🥣 {profile?.currentFood || "Ragi Porridge"}</div>
        <div style={{ background:"rgba(255,255,255,.2)", borderRadius:11, padding:"9px 13px", marginBottom:11 }}>
          <div style={{ fontSize:13, opacity:.85, marginBottom:3 }}>Today · {ragStage.label}</div>
          <div style={{ fontSize:14, fontWeight:700 }}>{Array.from({length:ragStage.times},(_,i)=>`Meal ${i+1}`).join("  ·  ")}</div>
          {ragStage.nextIn && <div style={{ fontSize:11, opacity:.7, marginTop:3 }}>Increases in {ragStage.nextIn} day{ragStage.nextIn>1?"s":""}</div>}
        </div>
        <div style={{ fontSize:12, marginBottom:5, opacity:.85, display:"flex", justifyContent:"space-between" }}>
          <span>Milk today</span><span>{totalMilk}ml / ~{recommended}ml</span>
        </div>
        <div style={{ height:6, background:"rgba(255,255,255,.3)", borderRadius:100, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"rgba(255,255,255,.9)", borderRadius:100, transition:"width .5s" }} />
        </div>
      </div>

      <div className="section-title">💊 Supplements</div>
      {suppList.map((s,i) => (
        <div key={s.id} className="card" style={{ animationDelay:`${i*.07}s`, display:"flex", alignItems:"center", gap:12, padding:"13px 16px" }}>
          <div style={{ fontSize:24 }}>{s.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, color:text }}>{s.name}</div>
            <div style={{ fontSize:12, color:muted }}>{s.dose} · {s.timing}</div>
          </div>
          <div className={`check-circle ${suppChecked[s.id]?"done":""}`} onClick={()=>onToggleSupp(s.id)}>
            {suppChecked[s.id] && <span style={{ color:dark?t.darkBg:"#fff", fontSize:13 }}>✓</span>}
          </div>
        </div>
      ))}

      <div className="section-title">🍼 Log a milk feed</div>
      <div className="card" style={{ padding:"14px 16px" }}>
        <div style={{ display:"flex", gap:9, marginBottom:activeType?14:0 }}>
          <button className={`btn ${activeType==="breast"?"btn-primary":"btn-ghost"}`} style={{ flex:1 }} onClick={()=>handleTypeClick("breast")}>🤱 Breastfeed {activeType==="breast"?"▲":"▼"}</button>
          <button className={`btn ${activeType==="bottle"?"btn-primary":"btn-ghost"}`} style={{ flex:1 }} onClick={()=>handleTypeClick("bottle")}>🍼 Bottle {activeType==="bottle"?"▲":"▼"}</button>
        </div>
        {activeType==="breast" && (
          <div style={{ animation:"slideDown .22s ease" }}>
            <div className="divider" />
            <div className="lbl" style={{ marginBottom:7, color:muted }}>How many minutes?</div>
            <input type="number" placeholder="e.g. 15" value={minutes} onChange={e=>setMinutes(e.target.value)} autoFocus />
            {minutes && <p style={{ fontSize:12, color:muted, marginTop:5 }}>~{Math.round((parseFloat(minutes)||0)*8)}ml estimated</p>}
            <button className="btn btn-primary" style={{ width:"100%", marginTop:11 }} onClick={handleSave}>Save feed</button>
          </div>
        )}
        {activeType==="bottle" && (
          <div style={{ animation:"slideDown .22s ease" }}>
            <div className="divider" />
            <div className="lbl" style={{ marginBottom:7, color:muted }}>Amount given</div>
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <input type="number" placeholder={unit==="ml"?"e.g. 180":"e.g. 6"} value={amount} onChange={e=>setAmount(e.target.value)} style={{ flex:1 }} autoFocus />
              <div className="seg" style={{ width:90, flexShrink:0 }}>
                <button className={`seg-btn ${unit==="ml"?"active":""}`} onClick={()=>setUnit("ml")}>ml</button>
                <button className={`seg-btn ${unit==="oz"?"active":""}`} onClick={()=>setUnit("oz")}>oz</button>
              </div>
            </div>
            {amount && unit==="oz" && <p style={{ fontSize:12, color:muted, marginBottom:6 }}>{amount} oz ≈ {ozToMl(parseFloat(amount))}ml</p>}
            <button className="btn btn-ghost" style={{ fontSize:12, padding:"7px 13px", marginBottom:10 }} onClick={()=>setAmount(unit==="ml"?"180":mlToOz(180))}>
              Use recommended ({unit==="ml"?"180ml":`${mlToOz(180)}oz`})
            </button>
            <button className="btn btn-primary" style={{ width:"100%" }} onClick={handleSave}>Save feed</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MILK FEED MODAL ──────────────────────────────────────────────────────────
function MilkFeedModal({ onClose, onSave, feedInterval, editLog }) {
  const { t, dark } = useTheme();
  const muted = dark ? t.darkMuted : t.muted;
  const [type, setType] = useState(editLog?.type||"breast");
  const [minutes, setMinutes] = useState(editLog?.minutes?String(editLog.minutes):"");
  const [amount, setAmount] = useState(editLog?.amount?String(editLog.amount):"");
  const [unit, setUnit] = useState(editLog?.unit||"ml");
  const [dateVal, setDateVal] = useState(toDateInput(editLog?.recordedTs||now()));
  const [timeVal, setTimeVal] = useState(toTimeInput(editLog?.recordedTs||now()));
  const [doReminder, setDoReminder] = useState(false);
  const [reminderMins, setReminderMins] = useState(15);
  const isEdit = !!editLog;

  function handleSave() {
    const finalTs = fromDateTimeInputs(dateVal, timeVal);
    let ml = type==="breast" ? Math.round((parseFloat(minutes)||15)*8) : (unit==="oz"?ozToMl(parseFloat(amount)||0):Math.round(parseFloat(amount)||0));
    onSave({ type, ml, minutes:type==="breast"?parseFloat(minutes)||15:null, amount:type==="bottle"?parseFloat(amount)||0:null, unit:type==="bottle"?unit:null, time:fmt(finalTs), recordedTs:finalTs, ts:editLog?.ts||now(), doReminder:!isEdit&&doReminder, reminderMins });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle" />
        <h3 style={{ fontFamily:"'Lora',serif", fontSize:20, marginBottom:16 }}>{isEdit?"Edit feed":"Log a feed"}</h3>
        {!isEdit && <div className="seg" style={{ marginBottom:16 }}>
          <button className={`seg-btn ${type==="breast"?"active":""}`} onClick={()=>setType("breast")}>🤱 Breastfeed</button>
          <button className={`seg-btn ${type==="bottle"?"active":""}`} onClick={()=>setType("bottle")}>🍼 Bottle / Formula</button>
        </div>}
        {isEdit && <div className="pill" style={{ background:`${t.primary}22`, color:t.primaryDark, marginBottom:14, fontSize:13 }}>{type==="breast"?"🤱 Breastfeed":"🍼 Bottle"}</div>}
        <DateTimeRow dateVal={dateVal} timeVal={timeVal} onDateChange={setDateVal} onTimeChange={setTimeVal} />
        {type==="breast" ? (
          <div style={{ marginBottom:14 }}>
            <div className="lbl" style={{ marginBottom:7, color:muted }}>Duration (minutes)</div>
            <input type="number" placeholder="e.g. 15" value={minutes} onChange={e=>setMinutes(e.target.value)} />
            {minutes && <p style={{ fontSize:12, color:muted, marginTop:6 }}>~{Math.round(parseFloat(minutes||0)*8)}ml estimated</p>}
          </div>
        ) : (
          <div style={{ marginBottom:14 }}>
            <div className="lbl" style={{ marginBottom:7, color:muted }}>Amount</div>
            <div style={{ display:"flex", gap:8 }}>
              <input type="number" placeholder={unit==="ml"?"e.g. 180":"e.g. 6"} value={amount} onChange={e=>setAmount(e.target.value)} style={{ flex:1 }} />
              <div className="seg" style={{ width:100, flexShrink:0 }}>
                <button className={`seg-btn ${unit==="ml"?"active":""}`} onClick={()=>setUnit("ml")}>ml</button>
                <button className={`seg-btn ${unit==="oz"?"active":""}`} onClick={()=>setUnit("oz")}>oz</button>
              </div>
            </div>
            {amount && unit==="oz" && <p style={{ fontSize:12, color:muted, marginTop:6 }}>{amount} oz ≈ {ozToMl(parseFloat(amount))}ml</p>}
            <button className="btn btn-ghost" style={{ marginTop:8, fontSize:12, padding:"7px 14px" }} onClick={()=>setAmount(unit==="ml"?"180":mlToOz(180))}>Use recommended ({unit==="ml"?"180ml":`${mlToOz(180)}oz`})</button>
          </div>
        )}
        {!isEdit && feedInterval && (
          <div style={{ marginBottom:14, background:`${t.primary}18`, borderRadius:12, padding:"12px 14px", border:`1.5px solid ${t.primary}44` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div className="lbl" style={{ color:muted }}>Set reminder for next feed?</div>
              <button onClick={()=>setDoReminder(p=>!p)} style={{ width:38, height:22, borderRadius:100, border:"none", cursor:"pointer", background:doReminder?t.primary:"#CCC", position:"relative", transition:"all .2s" }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:"white", position:"absolute", top:3, left:doReminder?19:3, transition:"left .25s" }} />
              </button>
            </div>
            {doReminder && (
              <div>
                <div style={{ fontSize:13, color:muted, marginBottom:7 }}>Remind me this many minutes before:</div>
                <div style={{ display:"flex", gap:8 }}>
                  {[15,30].map(m=>(
                    <button key={m} onClick={()=>setReminderMins(m)} className="btn" style={{ flex:1, fontSize:14, borderRadius:10, border:`2px solid ${reminderMins===m?t.primary:t.primary+"55"}`, background:reminderMins===m?t.primary:"transparent", color:reminderMins===m?t.text:muted }}>{m} min</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{ display:"flex", gap:9 }}>
          <button className="btn btn-ghost" style={{ flex:1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ flex:2 }} onClick={handleSave}>{isEdit?"Save changes":"Save feed"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MILK TAB ─────────────────────────────────────────────────────────────────
function MilkTab({ logs, onAdd, onEdit, onDelete, feedInterval, setFeedInterval, setNextFeedAt, showToast }) {
  const { t, dark } = useTheme();
  const text = dark?t.darkText:t.text; const muted = dark?t.darkMuted:t.muted;
  const [showModal, setShowModal] = useState(false);
  const [editLog, setEditLog] = useState(null);
  const [intervalInput, setIntervalInput] = useState(feedInterval||3);
  const total = logs.reduce((a,b)=>a+b.ml,0);

  function scheduleNotification(delayMins, remindMins) {
    if ("Notification" in window) Notification.requestPermission().then(p=>{ if(p==="granted"){ setTimeout(()=>new Notification("🍼 Baby feed reminder",{body:`Feed in ${remindMins} minutes — time to start prepping!`}),delayMins*60000); showToast(`🔔 Reminder set for ${remindMins} min before`); } });
  }
  function handleSave(entry) {
    if (editLog) { onEdit(entry); showToast("✏️ Feed updated"); }
    else { onAdd(entry); showToast("🍼 Feed logged!"); if(entry.doReminder&&feedInterval){ setNextFeedAt(new Date(Date.now()+feedInterval*3600000-entry.reminderMins*60000).toISOString()); scheduleNotification(feedInterval*60-entry.reminderMins,entry.reminderMins); } }
    setShowModal(false); setEditLog(null);
  }

  return (
    <div>
      <PageHeader icon="🍼" title="Milk Tracker" subtitle="Track breastfeeding & bottle feeds" />
      <div className="card" style={{ background:`${t.primary}18`, border:`1.5px solid ${t.primary}44` }}>
        <div className="lbl" style={{ marginBottom:8, color:muted }}>Feed interval</div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <input type="number" value={intervalInput} min={1} max={6} step={0.5} onChange={e=>setIntervalInput(e.target.value)} style={{ maxWidth:70 }} />
          <span style={{ fontSize:14, color:muted }}>hours between feeds</span>
          <button className="btn btn-soft" style={{ marginLeft:"auto", fontSize:13, padding:"8px 14px" }} onClick={()=>{ setFeedInterval(parseFloat(intervalInput)); showToast("✓ Interval saved"); }}>Save</button>
        </div>
      </div>
      <div className="card">
        <div className="lbl" style={{ marginBottom:7, color:muted }}>Daily progress</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:9 }}>
          <span style={{ fontFamily:"'Lora',serif", fontSize:26, color:text }}>{total}ml</span>
          <span style={{ fontSize:12, color:muted }}>~700ml recommended</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width:`${Math.min(100,(total/700)*100)}%` }} /></div>
        {total>700 && <p style={{ fontSize:12, color:t.primary, marginTop:7, fontWeight:700 }}>✓ Baby is feeding well today!</p>}
      </div>
      <div style={{ margin:"0 16px 4px" }}><button className="btn btn-primary" style={{ width:"100%" }} onClick={()=>{ setEditLog(null); setShowModal(true); }}>+ Log a feed</button></div>
      <div className="section-title" style={{ fontSize:16 }}>Feed history</div>
      {logs.length===0 && <p style={{ padding:"6px 16px", fontSize:13, color:muted }}>No feeds logged yet.</p>}
      {[...logs].sort((a,b)=>new Date(b.recordedTs||b.ts)-new Date(a.recordedTs||a.ts)).map(log=>(
        <div key={log.ts} className="card" style={{ padding:"11px 16px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, color:text }}>{log.type==="breast"?"🤱 Breastfeed":"🍼 Bottle feed"}</div>
            <div style={{ fontSize:12, color:muted, marginTop:2 }}>
              {log.type==="breast"?`${log.minutes} min`:`${log.amount}${log.unit}`}
              <span style={{ margin:"0 5px", opacity:.4 }}>·</span>
              <span style={{ fontWeight:700, color:text }}>{fmtDateFull(log.recordedTs||log.ts)} {log.time}</span>
            </div>
          </div>
          <div className="pill" style={{ background:`${t.primary}22`, color:t.primaryDark }}>~{log.ml}ml</div>
          <IconBtn onClick={()=>{ setEditLog(log); setShowModal(true); }} hoverColor={t.primaryDark}>✏️</IconBtn>
          <IconBtn onClick={()=>onDelete(log.ts)}>🗑️</IconBtn>
        </div>
      ))}
      {showModal && <MilkFeedModal onClose={()=>{ setShowModal(false); setEditLog(null); }} onSave={handleSave} feedInterval={feedInterval} editLog={editLog} />}
    </div>
  );
}

// ─── NUTRITION TAB ────────────────────────────────────────────────────────────
function NutritionTab({ showToast, solidFoods, setSolidFoods, fruitLogs, setFruitLogs, waterLogs, setWaterLogs, fruitIntroduced, setFruitIntroduced, profile, confirmDelete }) {
  const [sub, setSub] = useState("solids");
  return (
    <div>
      <PageHeader icon="🥗" title="Nutrition" subtitle="Solids, fruits & water intake" />
      <div style={{ padding:"4px 16px 0" }}>
        <div className="seg">
          {[{id:"solids",label:"🥣 Solids"},{id:"fruits",label:"🍌 Fruits"},{id:"water",label:"💧 Water"}].map(s=>(
            <button key={s.id} className={`seg-btn ${sub===s.id?"active":""}`} onClick={()=>setSub(s.id)}>{s.label}</button>
          ))}
        </div>
      </div>
      {sub==="solids" && <SolidsSection showToast={showToast} foods={solidFoods} setFoods={setSolidFoods} profile={profile} />}
      {sub==="fruits" && <FruitsSection showToast={showToast} logs={fruitLogs} setLogs={setFruitLogs} introduced={fruitIntroduced} setIntroduced={setFruitIntroduced} confirmDelete={confirmDelete} />}
      {sub==="water"  && <WaterSection  showToast={showToast} logs={waterLogs} setLogs={setWaterLogs} profile={profile} confirmDelete={confirmDelete} />}
    </div>
  );
}

function SolidsSection({ showToast, foods, setFoods, profile }) {
  const { t, dark } = useTheme();
  const text=dark?t.darkText:t.text; const muted=dark?t.darkMuted:t.muted;
  const ragStage = getRagStage(profile?.ragStartDate);
  const ragStartDate = profile?.ragStartDate || new Date(Date.now()-6*86400000).toISOString().split("T")[0];
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name:"", startDate:new Date().toISOString().split("T")[0], durationDays:7, timesPerDay:1, qtyPerServing:"" });
  const timeline=[{phase:"Days 1–7",freq:"Once a day",active:daysSince(ragStartDate)<7},{phase:"Days 8–14",freq:"Twice a day",active:daysSince(ragStartDate)>=7&&daysSince(ragStartDate)<14},{phase:"Day 15+",freq:"Three times a day",active:daysSince(ragStartDate)>=14}];

  function saveFood() { if(!form.name) return; if(editId) setFoods(fs=>fs.map(f=>f.id===editId?{...f,...form}:f)); else setFoods(fs=>[...fs,{...form,id:Date.now()}]); showToast(editId?"✓ Food updated":"✓ Food added"); setShowAdd(false); setEditId(null); setForm({name:"",startDate:new Date().toISOString().split("T")[0],durationDays:7,timesPerDay:1,qtyPerServing:""}); }
  function startEdit(food) { setForm({name:food.name,startDate:food.startDate,durationDays:food.durationDays,timesPerDay:food.timesPerDay,qtyPerServing:food.qtyPerServing}); setEditId(food.id); setShowAdd(true); }

  return (
    <div>
      <div className="card" style={{ background:`linear-gradient(135deg,${t.primary}22,${t.accent}22)`, border:`1.5px solid ${t.primary}44` }}>
        <div className="lbl" style={{ marginBottom:11, color:muted }}>Solids introduction timeline</div>
        {timeline.map((ti,i)=>(
          <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:i<2?13:0 }}>
            <div style={{ width:9,height:9,borderRadius:"50%",marginTop:4,flexShrink:0,background:ti.active?t.primary:"#CCC",boxShadow:ti.active?`0 0 0 3px ${t.primary}44`:"none" }} />
            <div>
              <div style={{ fontWeight:ti.active?700:400, fontSize:13, color:ti.active?text:muted }}>{ti.freq} {ti.active&&<span style={{ fontSize:10,color:t.primary,marginLeft:3 }}>← current</span>}</div>
              <div style={{ fontSize:11,color:muted }}>{ti.phase}</div>
            </div>
          </div>
        ))}
        {ragStage.nextIn && <div style={{ marginTop:12,background:`${t.primary}22`,borderRadius:9,padding:"7px 11px",fontSize:12,color:t.primaryDark }}>🔔 Increases to {ragStage.times+1}x/day in {ragStage.nextIn} day{ragStage.nextIn>1?"s":""}</div>}
      </div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 2px" }}>
        <div className="section-title" style={{ margin:0,color:text }}>Food phases</div>
        <button className="btn btn-primary" style={{ fontSize:12,padding:"8px 14px" }} onClick={()=>{ setEditId(null); setShowAdd(true); }}>+ Add food</button>
      </div>
      {foods.map((food,i)=>{ const d=daysSince(new Date(food.startDate)); const daysLeft=Math.max(0,food.durationDays-d); return (
        <div key={food.id} className="card fade-up" style={{ animationDelay:`${i*.08}s` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
            <div><div style={{ fontWeight:700,fontSize:15,color:text }}>{food.name}</div><div style={{ fontSize:12,color:muted,marginTop:2 }}>{food.timesPerDay}x/day · {food.qtyPerServing} · started {fmtDate(food.startDate)}</div></div>
            <button className="btn btn-ghost" style={{ fontSize:11,padding:"5px 11px" }} onClick={()=>startEdit(food)}>Edit</button>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,color:muted,marginBottom:5 }}><span>Day {Math.max(1,d+1)} of {food.durationDays}</span><span>{daysLeft>0?`${daysLeft} days left`:"Phase complete 🎉"}</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width:`${Math.min(100,Math.round((d/food.durationDays)*100))}%` }} /></div>
          {daysLeft===0 && <div style={{ marginTop:10,background:`${t.accent}33`,borderRadius:9,padding:"7px 11px",fontSize:12,color:t.primaryDark }}>🎉 Phase complete! Ready to add the next food.</div>}
        </div>
      );})}
      <div className="card" style={{ background:`${t.accent}22`,border:`1.5px solid ${t.accent}66` }}>
        <div style={{ fontSize:13,color:muted,lineHeight:1.7 }}><strong style={{ color:text }}>💡 Tips</strong><br />· One new food at a time (3-day rule)<br />· Start thin, gradually thicken<br />· Give 30–60 min before or after milk<br />· No salt, sugar or honey before 1 year</div>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ fontFamily:"'Lora',serif",fontSize:20,marginBottom:16 }}>{editId?"Edit food":"Add new food"}</h3>
            {[{label:"Food name",key:"name",type:"text",placeholder:"e.g. Rice & Lentils"},{label:"Start date",key:"startDate",type:"date"},{label:"Duration (days)",key:"durationDays",type:"number",placeholder:"e.g. 10"},{label:"Times per day",key:"timesPerDay",type:"number",placeholder:"e.g. 2"},{label:"Quantity per serving",key:"qtyPerServing",type:"text",placeholder:"e.g. 3–4 tbsp"}].map(f=>(
              <div key={f.key} style={{ marginBottom:13 }}>
                <div className="lbl" style={{ marginBottom:6,color:muted }}>{f.label}</div>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:f.type==="number"?parseInt(e.target.value)||"":e.target.value}))} />
              </div>
            ))}
            <div style={{ display:"flex",gap:9,marginTop:4 }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex:1 }} onClick={saveFood}>{editId?"Save changes":"Add food"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FruitsSection({ showToast, logs, setLogs, introduced, setIntroduced, confirmDelete }) {
  const { t, dark } = useTheme();
  const text=dark?t.darkText:t.text; const muted=dark?t.darkMuted:t.muted;
  const [showLog, setShowLog] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [form, setForm] = useState({ fruit:FRUITS[0].name, amount:"", unit:"tsp", dateVal:toDateInput(now()), timeVal:toTimeInput(now()) });

  function openAdd() { setEditEntry(null); setForm({fruit:FRUITS[0].name,amount:"",unit:"tsp",dateVal:toDateInput(now()),timeVal:toTimeInput(now())}); setShowLog(true); }
  function openEdit(log) { setEditEntry(log); setForm({fruit:log.fruit,amount:log.amount,unit:log.unit,dateVal:log.dateVal,timeVal:log.timeVal}); setShowLog(true); }
  function saveLog() { if(!form.amount) return; const ts=fromDateTimeInputs(form.dateVal,form.timeVal); const entry={fruit:form.fruit,amount:form.amount,unit:form.unit,dateVal:form.dateVal,timeVal:form.timeVal,time:fmt(ts),date:fmtDate(ts),ts:editEntry?.ts||now()}; if(editEntry) setLogs(p=>p.map(l=>l.ts===editEntry.ts?entry:l)); else { setLogs(p=>[entry,...p]); setIntroduced(p=>({...p,[form.fruit]:true})); } showToast(editEntry?"✏️ Updated":"✓ "+form.fruit+" logged"); setShowLog(false); }
  function deleteLog(ts) { confirmDelete("This fruit log entry will be removed.", ()=>{ setLogs(p=>p.filter(l=>l.ts!==ts)); showToast("🗑️ Removed"); }); }

  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px 4px" }}>
        <div style={{ fontFamily:"'Lora',serif",fontSize:17,color:text }}>Fruit log</div>
        <button className="btn btn-primary" style={{ fontSize:12,padding:"8px 14px" }} onClick={openAdd}>+ Log fruit</button>
      </div>
      {logs.length===0 ? <div className="card" style={{ textAlign:"center",padding:"18px",color:muted,fontSize:13 }}>No fruit logged yet. Tap + to add.</div>
        : logs.map(log=>(
          <div key={log.ts} className="card" style={{ padding:"11px 16px",display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:14,color:text }}>{log.fruit}</div>
              <div style={{ fontSize:12,color:muted }}>{log.date} · <span style={{ fontWeight:700,color:text }}>{log.time}</span></div>
            </div>
            <div className="pill" style={{ background:`${t.primary}22`,color:t.primaryDark }}>{log.amount} {log.unit}</div>
            <IconBtn onClick={()=>openEdit(log)} hoverColor={t.primaryDark}>✏️</IconBtn>
            <IconBtn onClick={()=>deleteLog(log.ts)}>🗑️</IconBtn>
          </div>
        ))}
      <div style={{ padding:"14px 16px 4px",borderTop:`1px solid ${t.primary}33`,marginTop:6 }}>
        <div style={{ fontFamily:"'Lora',serif",fontSize:17,color:text,marginBottom:3 }}>Fruit guide</div>
        <p style={{ fontSize:12,color:muted }}>Safe fruits for 7–8 months</p>
      </div>
      {FRUITS.map((fruit,i)=>(
        <div key={fruit.name} className="card" style={{ animationDelay:`${i*.05}s` }}>
          <div style={{ display:"flex",gap:11 }}>
            <div style={{ fontSize:28,flexShrink:0 }}>{fruit.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ fontWeight:700,fontSize:15,color:text }}>{fruit.name}</div>
                <button onClick={()=>setIntroduced(p=>({...p,[fruit.name]:!p[fruit.name]}))} style={{ fontSize:11,padding:"3px 9px",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"'Nunito'",fontWeight:700,background:introduced[fruit.name]?`${t.primary}22`:`${t.accent}44`,color:introduced[fruit.name]?t.primaryDark:muted }}>{introduced[fruit.name]?"✓ Introduced":"Mark introduced"}</button>
              </div>
              <div className="pill" style={{ background:`${t.accent}44`,color:t.primaryDark,marginTop:5,fontSize:11 }}>{fruit.qty}</div>
              <div style={{ fontSize:12,color:muted,marginTop:5 }}><span style={{ fontWeight:700,color:text }}>How: </span>{fruit.form}</div>
              <div style={{ fontSize:11,color:muted,marginTop:3,lineHeight:1.5 }}>{fruit.note}</div>
            </div>
          </div>
        </div>
      ))}
      {showLog && (
        <div className="modal-overlay" onClick={()=>setShowLog(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ fontFamily:"'Lora',serif",fontSize:20,marginBottom:16 }}>{editEntry?"Edit fruit log":"Log fruit serving"}</h3>
            <div style={{ marginBottom:13 }}><div className="lbl" style={{ marginBottom:6,color:muted }}>Which fruit?</div><select value={form.fruit} onChange={e=>setForm(p=>({...p,fruit:e.target.value}))}>{FRUITS.map(f=><option key={f.name} value={f.name}>{f.icon} {f.name}</option>)}</select></div>
            <DateTimeRow dateVal={form.dateVal} timeVal={form.timeVal} onDateChange={v=>setForm(p=>({...p,dateVal:v}))} onTimeChange={v=>setForm(p=>({...p,timeVal:v}))} />
            <div style={{ marginBottom:13 }}><div className="lbl" style={{ marginBottom:6,color:muted }}>Amount given</div>
              <div style={{ display:"flex",gap:8 }}>
                <input type="number" placeholder="e.g. 2" value={form.amount} onChange={e=>setForm(p=>({...p,amount:e.target.value}))} style={{ flex:1 }} />
                <div className="seg" style={{ width:110,flexShrink:0 }}>{["tsp","tbsp","g"].map(u=><button key={u} className={`seg-btn ${form.unit===u?"active":""}`} onClick={()=>setForm(p=>({...p,unit:u}))}>{u}</button>)}</div>
              </div>
            </div>
            <div style={{ background:`${t.primary}18`,borderRadius:10,padding:"9px 12px",marginBottom:14,fontSize:12,color:muted }}>Recommended: {FRUITS.find(f=>f.name===form.fruit)?.qty}</div>
            <div style={{ display:"flex",gap:9 }}><button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>setShowLog(false)}>Cancel</button><button className="btn btn-primary" style={{ flex:2 }} onClick={saveLog}>{editEntry?"Save changes":"Save"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function WaterSection({ showToast, logs, setLogs, profile, confirmDelete }) {
  const { t, dark } = useTheme();
  const text=dark?t.darkText:t.text; const muted=dark?t.darkMuted:t.muted;
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [form, setForm] = useState({ amount:"", unit:"ml", dateVal:toDateInput(now()), timeVal:toTimeInput(now()) });
  const totalMl = logs.reduce((a,b)=>a+(b.unit==="oz"?ozToMl(parseFloat(b.amount)):parseFloat(b.amount)||0),0);
  const recommended = profile?.waterTargetMl || 120;

  function openAdd() { setEditEntry(null); setForm({amount:"",unit:"ml",dateVal:toDateInput(now()),timeVal:toTimeInput(now())}); setShowModal(true); }
  function openEdit(log) { setEditEntry(log); setForm({amount:log.amount,unit:log.unit,dateVal:log.dateVal,timeVal:log.timeVal}); setShowModal(true); }
  function saveLog() { if(!form.amount) return; const ts=fromDateTimeInputs(form.dateVal,form.timeVal); const entry={amount:form.amount,unit:form.unit,dateVal:form.dateVal,timeVal:form.timeVal,time:fmt(ts),date:fmtDate(ts),ts:editEntry?.ts||now()}; if(editEntry) setLogs(p=>p.map(l=>l.ts===editEntry.ts?entry:l)); else setLogs(p=>[entry,...p]); showToast(editEntry?"✏️ Updated":"💧 Water logged!"); setShowModal(false); }
  function deleteLog(ts) { confirmDelete("This water log entry will be removed.", ()=>{ setLogs(p=>p.filter(l=>l.ts!==ts)); showToast("🗑️ Removed"); }); }

  return (
    <div>
      <div className="card" style={{ background:`linear-gradient(135deg,${t.primary}22,${t.accent}22)`,border:`1.5px solid ${t.primary}44` }}>
        <div className="lbl" style={{ marginBottom:6,color:muted }}>Daily water intake</div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:9 }}>
          <span style={{ fontFamily:"'Lora',serif",fontSize:28,color:text }}>{Math.round(totalMl)}ml</span>
          <span style={{ fontSize:12,color:muted }}>~{recommended}ml recommended</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width:`${Math.min(100,Math.round(totalMl/recommended*100))}%` }} /></div>
        <p style={{ fontSize:11,color:muted,marginTop:8,lineHeight:1.5 }}>At 7–8 months on solids, offer ~60–120ml water/day. Milk still provides most hydration.</p>
      </div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px 2px" }}>
        <div className="section-title" style={{ margin:0,color:text }}>Water log</div>
        <button className="btn btn-primary" style={{ fontSize:12,padding:"8px 14px" }} onClick={openAdd}>+ Log water</button>
      </div>
      {logs.length===0 ? <div className="card" style={{ textAlign:"center",padding:"18px",color:muted,fontSize:13 }}>No water logged yet. Tap + to add.</div>
        : logs.map(log=>(
          <div key={log.ts} className="card" style={{ padding:"11px 16px",display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ fontSize:22,flexShrink:0 }}>💧</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:14,color:text }}>{log.amount} {log.unit}</div>
              <div style={{ fontSize:12,color:muted }}>{log.date} · <span style={{ fontWeight:700,color:text }}>{log.time}</span></div>
            </div>
            <div className="pill" style={{ background:`${t.primary}22`,color:t.primaryDark }}>~{log.unit==="oz"?ozToMl(parseFloat(log.amount)):parseFloat(log.amount)}ml</div>
            <IconBtn onClick={()=>openEdit(log)} hoverColor={t.primaryDark}>✏️</IconBtn>
            <IconBtn onClick={()=>deleteLog(log.ts)}>🗑️</IconBtn>
          </div>
        ))}
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ fontFamily:"'Lora',serif",fontSize:20,marginBottom:16 }}>{editEntry?"Edit water log":"Log water intake"}</h3>
            <DateTimeRow dateVal={form.dateVal} timeVal={form.timeVal} onDateChange={v=>setForm(p=>({...p,dateVal:v}))} onTimeChange={v=>setForm(p=>({...p,timeVal:v}))} />
            <div style={{ marginBottom:13 }}><div className="lbl" style={{ marginBottom:6,color:muted }}>Amount</div>
              <div style={{ display:"flex",gap:8 }}>
                <input type="number" placeholder={form.unit==="ml"?"e.g. 30":"e.g. 1"} value={form.amount} onChange={e=>setForm(p=>({...p,amount:e.target.value}))} style={{ flex:1 }} />
                <div className="seg" style={{ width:100,flexShrink:0 }}>
                  <button className={`seg-btn ${form.unit==="ml"?"active":""}`} onClick={()=>setForm(p=>({...p,unit:"ml"}))}>ml</button>
                  <button className={`seg-btn ${form.unit==="oz"?"active":""}`} onClick={()=>setForm(p=>({...p,unit:"oz"}))}>oz</button>
                </div>
              </div>
              {form.amount&&form.unit==="oz"&&<p style={{ fontSize:12,color:muted,marginTop:6 }}>{form.amount} oz ≈ {ozToMl(parseFloat(form.amount))}ml</p>}
            </div>
            <div style={{ background:`${t.primary}18`,borderRadius:10,padding:"9px 12px",marginBottom:14,fontSize:12,color:muted }}>💡 Offer in a small cup or sipper, not a bottle. Small sips after meals work best.</div>
            <div style={{ display:"flex",gap:9 }}><button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" style={{ flex:2 }} onClick={saveLog}>{editEntry?"Save changes":"Save"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── POOP TAB ─────────────────────────────────────────────────────────────────
function PoopTab({ showToast, logs, setLogs, confirmDelete }) {
  const { t, dark } = useTheme();
  const text=dark?t.darkText:t.text; const muted=dark?t.darkMuted:t.muted;
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ color:null, consistency:null, notes:"", dateVal:toDateInput(now()), timeVal:toTimeInput(now()) });
  const [warn, setWarn] = useState(null);
  const todayLogs = logs.filter(l=>l.dateVal===toDateInput(now()));

  function handleColorPick(c) { setForm(p=>({...p,color:c.id})); setWarn(c.warn?c.warnMsg:null); }
  function saveLog() { if(!form.color||!form.consistency) return; const ts=fromDateTimeInputs(form.dateVal,form.timeVal); setLogs(p=>[{...form,time:fmt(ts),date:fmtDate(ts),ts:now()},...p]); showToast("✓ Logged"); setShowModal(false); setForm({color:null,consistency:null,notes:"",dateVal:toDateInput(now()),timeVal:toTimeInput(now())}); setWarn(null); }
  function deleteLog(ts) { confirmDelete("This poop log entry will be removed.", ()=>{ setLogs(p=>p.filter(l=>l.ts!==ts)); showToast("🗑️ Removed"); }); }

  return (
    <div>
      <PageHeader icon="💩" title="Poop Tracker" subtitle="Log color, consistency and notes" />
      <div className="card" style={{ display:"flex",gap:14,alignItems:"center" }}>
        <div style={{ textAlign:"center",flex:1,borderRight:`1px solid ${t.primary}33`,paddingRight:14 }}>
          <div style={{ fontFamily:"'Lora',serif",fontSize:32,color:t.primary }}>{todayLogs.length}</div>
          <div style={{ fontSize:12,color:muted }}>Today's count</div>
        </div>
        <div style={{ flex:1 }}>
          {todayLogs.length===0 ? <div style={{ fontSize:13,color:muted }}>Nothing logged yet today</div>
            : <div><div style={{ fontSize:12,color:muted,marginBottom:5 }}>Latest</div><div style={{ fontSize:13,fontWeight:700,color:text }}>{POOP_COLORS.find(c=>c.id===todayLogs[0]?.color)?.label}</div><div style={{ fontSize:12,color:muted }}>{todayLogs[0]?.consistency} · {todayLogs[0]?.time}</div></div>}
        </div>
        <button className="btn btn-primary" style={{ fontSize:12,padding:"9px 14px",flexShrink:0 }} onClick={()=>setShowModal(true)}>+ Log</button>
      </div>
      <div className="section-title" style={{ fontSize:16 }}>Recent logs</div>
      {logs.length===0 && <p style={{ padding:"6px 16px",fontSize:13,color:muted }}>No logs yet.</p>}
      {logs.map((log,i)=>{ const cd=POOP_COLORS.find(c=>c.id===log.color); return (
        <div key={i} className="card" style={{ padding:"11px 16px",display:"flex",gap:12,alignItems:"center" }}>
          <div style={{ width:30,height:30,borderRadius:"50%",background:cd?.hex,border:`2px solid ${t.primary}44`,flexShrink:0 }} />
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:14,color:text }}>{cd?.label}</div>
            <div style={{ fontSize:12,color:muted }}>{log.consistency} · <span style={{ fontWeight:700,color:text }}>{log.date} {log.time}</span></div>
            {log.notes && <div style={{ fontSize:12,color:muted,marginTop:2,fontStyle:"italic" }}>"{log.notes}"</div>}
          </div>
          {cd?.warn && <span style={{ fontSize:16 }}>⚠️</span>}
          <IconBtn onClick={()=>deleteLog(log.ts)}>🗑️</IconBtn>
        </div>
      );})}
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ fontFamily:"'Lora',serif",fontSize:20,marginBottom:16 }}>Log a diaper</h3>
            <DateTimeRow dateVal={form.dateVal} timeVal={form.timeVal} onDateChange={v=>setForm(p=>({...p,dateVal:v}))} onTimeChange={v=>setForm(p=>({...p,timeVal:v}))} />
            <div className="lbl" style={{ marginBottom:10,color:muted }}>Color</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14 }}>
              {POOP_COLORS.map(c=>(
                <div key={c.id} onClick={()=>handleColorPick(c)} style={{ cursor:"pointer",textAlign:"center" }}>
                  <div style={{ width:"100%",paddingBottom:"100%",borderRadius:"50%",background:c.hex,position:"relative",border:form.color===c.id?`3px solid ${t.primary}`:"3px solid transparent",boxShadow:form.color===c.id?`0 0 0 2px ${t.primary}66`:"none",transition:"all .15s" }} />
                  <div style={{ fontSize:9,color:muted,marginTop:4,lineHeight:1.3 }}>{c.label}</div>
                </div>
              ))}
            </div>
            {warn && <div style={{ background:`${t.accent}33`,border:`1.5px solid ${t.accent}`,borderRadius:10,padding:"10px 12px",marginBottom:12,animation:"slideDown .25s ease" }}><div style={{ fontSize:13,color:t.primaryDark,lineHeight:1.5 }}>⚠️ {warn}</div></div>}
            <div className="lbl" style={{ marginBottom:8,color:muted }}>Consistency</div>
            <div style={{ display:"flex",gap:8,marginBottom:14 }}>
              {CONSISTENCY.map(c=><button key={c} onClick={()=>setForm(p=>({...p,consistency:c}))} className="btn" style={{ flex:1,fontSize:13,borderRadius:10,border:`2px solid ${form.consistency===c?t.primary:t.primary+"55"}`,background:form.consistency===c?t.primary:"transparent",color:form.consistency===c?t.text:muted }}>{c}</button>)}
            </div>
            <div className="lbl" style={{ marginBottom:6,color:muted }}>Notes (optional)</div>
            <textarea placeholder="Anything unusual to note..." value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} style={{ height:70,resize:"none",marginBottom:14 }} />
            <button className="btn btn-primary" style={{ width:"100%",opacity:(!form.color||!form.consistency)?.5:1 }} onClick={saveLog} disabled={!form.color||!form.consistency}>Save log</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SCAN TAB ─────────────────────────────────────────────────────────────────
function ScanTab({ showToast }) {
  const { t, dark } = useTheme();
  const text=dark?t.darkText:t.text; const muted=dark?t.darkMuted:t.muted;
  const [category, setCategory] = useState("supplement");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(); const cameraRef = useRef();
  const handleFile = useCallback(async(file)=>{ if(!file) return; setPreview(URL.createObjectURL(file)); setResult(null); setError(null); setScanning(true); setLoading(true); try { const b64=await fileToBase64(file); setScanning(false); setResult(await scanLabel(b64,file.type||"image/jpeg",category)); } catch { setScanning(false); setError("Couldn't analyse. Try a clearer photo of the label."); } finally { setLoading(false); } },[category]);
  const reset=()=>{ setPreview(null); setResult(null); setError(null); };

  return (
    <div>
      <PageHeader icon="🔍" title="Smart Label Scan" subtitle="Photo a supplement or formula — get baby-specific dosage instantly." />
      <div style={{ margin:"0 16px 4px" }}>
        <div style={{ background:`${t.primary}18`,border:`1.5px solid ${t.primary}44`,borderRadius:10,padding:"9px 12px",fontSize:12,color:t.primaryDark,lineHeight:1.5 }}>
          🎭 <strong>Demo mode</strong> — showing sample results. Enable real AI scanning with an API key.
        </div>
      </div>
      <div style={{ padding:"4px 16px" }}>
        <div className="seg">
          <button className={`seg-btn ${category==="supplement"?"active":""}`} onClick={()=>{ setCategory("supplement"); reset(); }}>💊 Supplement / Medicine</button>
          <button className={`seg-btn ${category==="formula"?"active":""}`} onClick={()=>{ setCategory("formula"); reset(); }}>🥛 Formula Tin</button>
        </div>
      </div>
      <div className="card" style={{ border:`2px dashed ${preview?t.primary:t.primary+"66"}`,padding:preview?0:20,overflow:"hidden",cursor:preview?"default":"pointer" }} onClick={!preview?()=>fileRef.current?.click():undefined}>
        {preview ? (
          <div style={{ position:"relative" }}>
            <img src={preview} alt="label" style={{ width:"100%",maxHeight:260,objectFit:"cover",display:"block",borderRadius:18 }} />
            {scanning && <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.4)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:"70%",height:2,background:t.primary,position:"absolute",animation:"scanLine 2s ease-in-out infinite" }} />
              <div style={{ color:"white",fontSize:13,fontWeight:700,animation:"blink 1.4s ease-in-out infinite",position:"relative" }}>Reading label…</div>
            </div>}
          </div>
        ) : (
          <div style={{ textAlign:"center",padding:"22px 14px" }}>
            <div style={{ fontSize:48,marginBottom:10 }}>📷</div>
            <p style={{ fontFamily:"'Lora',serif",fontSize:16,marginBottom:5,color:text }}>Take or upload a photo</p>
            <p style={{ fontSize:12,color:muted,lineHeight:1.5 }}>Point camera at the {category==="formula"?"formula tin feeding guide":"supplement label"}</p>
          </div>
        )}
      </div>
      <div style={{ display:"flex",gap:9,margin:"0 16px" }}>
        <button className="btn btn-primary" style={{ flex:1 }} onClick={()=>cameraRef.current?.click()}>📷 Camera</button>
        <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>fileRef.current?.click()}>🖼️ Upload</button>
        {preview && <button className="btn btn-ghost" style={{ padding:"12px 14px" }} onClick={reset}>✕</button>}
      </div>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])} />
      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])} />
      {loading&&!scanning && <div className="card"><div className="lbl" style={{ marginBottom:12,color:muted }}>Analysing…</div>{[80,60,92,55,70].map((w,i)=><div key={i} className="skeleton" style={{ height:12,width:`${w}%`,marginBottom:10 }} />)}</div>}
      {error && <div className="card" style={{ background:"#FFF0F0",border:"1.5px solid #F8C8C8" }}><p style={{ fontSize:13,color:"#C03030" }}>⚠️ {error}</p></div>}
      {result&&!loading && (
        <div style={{ animation:"fadeUp .4s ease" }}>
          <div className="card" style={{ background:`linear-gradient(135deg,${t.primary}18,${t.accent}18)`,border:`1.5px solid ${t.primary}44` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
              <div><div className="lbl" style={{ marginBottom:3,color:muted }}>Detected product</div><div style={{ fontFamily:"'Lora',serif",fontSize:18,lineHeight:1.3,color:text }}>{result.productName}</div></div>
              <div className="pill" style={{ background:`${t.primary}22`,color:t.primaryDark,flexShrink:0,marginLeft:8 }}>{result.confidence==="high"?"✓ Clear":result.confidence==="medium"?"~ Partial":"? Unclear"}</div>
            </div>
            <div style={{ display:"grid",gap:11 }}>
              {[{icon:"🏷️",label:"Label says",val:result.detectedDose},{icon:"👶",label:"For your baby (7–8 months)",val:result.recommendedForBaby,hi:true},{icon:"💡",label:"How to give",val:result.howToGive},...(result.warnings?[{icon:"⚠️",label:"Watch out",val:result.warnings,warn:true}]:[])].map((r,i)=>(
                <div key={i} style={{ background:r.hi?`${t.primary}18`:r.warn?`${t.accent}33`:"transparent",borderRadius:10,padding:(r.hi||r.warn)?"10px 12px":"2px 0" }}>
                  <div className="lbl" style={{ marginBottom:3,color:muted }}>{r.icon} {r.label}</div>
                  <div style={{ fontSize:14,color:text,lineHeight:1.55,fontWeight:r.hi?700:400 }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ background:`${t.primary}18`,border:`1.5px solid ${t.primary}44`,padding:"12px 16px" }}>
            <p style={{ fontSize:12,color:t.primaryDark,lineHeight:1.6 }}><strong>Always verify with your doctor.</strong> This is based on label info and general guidelines. Doctor's prescription takes priority.</p>
          </div>
          <div style={{ margin:"4px 16px 0" }}><button className="btn btn-ghost" style={{ width:"100%" }} onClick={reset}>🔄 Scan another</button></div>
        </div>
      )}
      {!preview && <div className="card" style={{ background:`${t.primary}18`,border:`1.5px solid ${t.primary}33` }}>
        <div className="lbl" style={{ marginBottom:9,color:muted }}>Tips for a good scan</div>
        {["Lay the bottle flat in good, even light","Ensure the dosage table is fully in frame","Avoid shadows or glare on the label text",category==="formula"?"Scan the 'Feeding Guide' panel on the tin":"Include the full 'How to use' section"].map((tip,i)=>(
          <div key={i} style={{ fontSize:13,color:muted,display:"flex",gap:8,marginBottom:7,lineHeight:1.5 }}><span style={{ color:t.primary,fontWeight:800,flexShrink:0 }}>{i+1}.</span> {tip}</div>
        ))}
      </div>}
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
// ─── DELETE CONFIRM MODAL ─────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  const { t, dark } = useTheme();
  const text = dark ? t.darkText : t.text;
  const muted = dark ? t.darkMuted : t.muted;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{ paddingBottom:30 }}>
        <div className="modal-handle" />
        <div style={{ textAlign:"center", padding:"8px 0 20px" }}>
          <div style={{ fontSize:36, marginBottom:12 }}>🗑️</div>
          <div style={{ fontFamily:"'Lora',serif", fontSize:18, color:text, marginBottom:8 }}>Delete this log?</div>
          <div style={{ fontSize:14, color:muted, lineHeight:1.5 }}>{message}</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-ghost" style={{ flex:1 }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" style={{ flex:1, background:"#E05050", color:"#fff" }} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // ── state — all initialised from localStorage ──────────────────────────────
  const [themeId,        setThemeId]        = useState(()=>lsGet("themeId","ocean"));
  const [dark,           setDark]           = useState(()=>lsGet("dark",false));
  const [tab,            setTab]            = useState("home");
  const [milkLogs,       setMilkLogs]       = useState(()=>lsGet("milkLogs",[]));
  const [feedInterval,   setFeedIntervalSt] = useState(()=>lsGet("feedInterval",null));
  const [nextFeedAt,     setNextFeedAt]     = useState(()=>lsGet("nextFeedAt",null));
  const [profile,        setProfile]        = useState(()=>lsGet("profile",{ name:"", dob:"", birthWeight:"", currentWeight:"", bloodGroup:"", doctorName:"", gender:"boy", custom:[], ragStartDate:"", milkTargetMl:700, waterTargetMl:120 }));
  const [supplements,    setSupplements]    = useState(()=>lsGet("supplements", [
    { id:"vitd", name:"Vitamin D",      dose:"0.5ml (800 IU)", timing:"Once daily",         timesPerDay:1, icon:"☀️" },
    { id:"iron", name:"Iron Drops",     dose:"1ml",            timing:"Once daily",          timesPerDay:1, icon:"💧" },
    { id:"bonn", name:"Bonnisan Drops", dose:"0.6ml",          timing:"Three times daily",   timesPerDay:3, icon:"🌿" },
  ]));

  // supp check-offs keyed by date so they auto-reset each day
  const [suppChecked,    setSuppChecked]    = useState(()=>lsGet(`suppChecked_${todayKey()}`,{}));

  // nutrition logs
  const [milkLogsFull,   setMilkLogsFull]  = useState(()=>lsGet("milkLogs",[]));
  const [poopLogs,       setPoopLogs]       = useState(()=>lsGet("poopLogs",[]));
  const [fruitLogs,      setFruitLogs]      = useState(()=>lsGet("fruitLogs",[]));
  const [waterLogs,      setWaterLogs]      = useState(()=>lsGet("waterLogs",[]));
  const [solidFoods,     setSolidFoods]     = useState(()=>lsGet("solidFoods",[{id:1,name:"Ragi Porridge",startDate: profile.ragStartDate || new Date(Date.now()-6*86400000).toISOString().split("T")[0],durationDays:21,timesPerDay:1,qtyPerServing:"2–3 tbsp"}]));
  const [fruitIntroduced,setFruitIntroduced]= useState(()=>lsGet("fruitIntroduced",{}));

  // UI state
  const [toast,          setToast]          = useState(null);
  const [showProfile,    setShowProfile]    = useState(false);
  const [showThemePicker,setShowThemePicker]= useState(false);
  const [deleteTarget,   setDeleteTarget]   = useState(null); // {msg, onConfirm}
  const toastTimer = useRef(null);
  const t = THEMES[themeId];

  // ── persist to localStorage on every change ────────────────────────────────
  useEffect(()=>lsSet("themeId",themeId),[themeId]);
  useEffect(()=>lsSet("dark",dark),[dark]);
  useEffect(()=>lsSet("milkLogs",milkLogs),[milkLogs]);
  useEffect(()=>lsSet("feedInterval",feedInterval),[feedInterval]);
  useEffect(()=>lsSet("nextFeedAt",nextFeedAt),[nextFeedAt]);
  useEffect(()=>lsSet("profile",profile),[profile]);
  useEffect(()=>lsSet("supplements",supplements),[supplements]);
  useEffect(()=>lsSet(`suppChecked_${todayKey()}`,suppChecked),[suppChecked]);
  useEffect(()=>lsSet("poopLogs",poopLogs),[poopLogs]);
  useEffect(()=>lsSet("fruitLogs",fruitLogs),[fruitLogs]);
  useEffect(()=>lsSet("waterLogs",waterLogs),[waterLogs]);
  useEffect(()=>lsSet("solidFoods",solidFoods),[solidFoods]);
  useEffect(()=>lsSet("fruitIntroduced",fruitIntroduced),[fruitIntroduced]);

  // ── first launch ───────────────────────────────────────────────────────────
  useEffect(()=>{ if(!profile.name) setShowProfile(true); },[]);

  // ── helpers ────────────────────────────────────────────────────────────────
  function showToast(msg) { setToast(msg); clearTimeout(toastTimer.current); toastTimer.current=setTimeout(()=>setToast(null),2300); }

  function setFeedInterval(v) { setFeedIntervalSt(v); lsSet("feedInterval",v); }

  function confirmDelete(msg, onConfirm) { setDeleteTarget({ msg, onConfirm }); }

  function handleDeleteMilk(ts) { confirmDelete("This milk feed log will be removed.", ()=>{ setMilkLogs(p=>p.filter(l=>l.ts!==ts)); showToast("🗑️ Log removed"); setDeleteTarget(null); }); }
  function handleEditMilk(updated) { setMilkLogs(p=>p.map(l=>l.ts===updated.ts?{...l,...updated}:l)); }
  function handleAddMilk(entry) { setMilkLogs(p=>[...p,entry]); showToast("🍼 Feed logged!"); }

  function handleSaveProfile(p) {
    setProfile(p);
    setSupplements(p.supplements||supplements);
    setShowProfile(false);
    showToast("✓ Profile saved");
  }
  function handlePickTheme(id) { setThemeId(id); showToast(`🎨 ${THEMES[id].name} applied!`); }

  const globalCSS = makeGlobal(t, dark);
  const textMuted = dark ? t.darkMuted : t.muted;

  const tabs = [
    { id:"home",      icon:"🏠", label:"Home" },
    { id:"milk",      icon:"🍼", label:"Milk" },
    { id:"nutrition", icon:"🥗", label:"Nutrition" },
    { id:"poop",      icon:"💩", label:"Poop" },
    { id:"scan",      icon:"🔍", label:"Scan" },
  ];

  return (
    <ThemeCtx.Provider value={{ t, dark }}>
      <style>{globalCSS}</style>
      <div className="app">
        {showThemePicker && (
          <ThemePickerScreen current={themeId} onPick={handlePickTheme} onClose={()=>setShowThemePicker(false)} />
        )}
        {showProfile && !showThemePicker && (
          <ProfileScreen
            profile={{ ...profile, supplements }}
            onSave={handleSaveProfile}
            onClose={()=>setShowProfile(false)}
            onOpenTheme={()=>setShowThemePicker(true)}
            dark={dark}
            onToggleDark={()=>setDark(p=>!p)}
          />
        )}
        {!showProfile && !showThemePicker && (
          <>
            {tab==="home" && (
              <HomeTab
                milkLogs={milkLogs} onAddMilk={handleAddMilk}
                suppChecked={suppChecked}
                onToggleSupp={id=>setSuppChecked(p=>{ const n={...p,[id]:!p[id]}; if(n[id]) showToast("✓ Supplement marked!"); return n; })}
                nextFeedAt={nextFeedAt} profile={profile} supplements={supplements}
              />
            )}
            {tab==="milk" && (
              <MilkTab
                logs={milkLogs}
                onAdd={e=>{ setMilkLogs(p=>[...p,e]); showToast("🍼 Feed logged!"); }}
                onEdit={handleEditMilk} onDelete={handleDeleteMilk}
                feedInterval={feedInterval} setFeedInterval={setFeedInterval}
                setNextFeedAt={setNextFeedAt} showToast={showToast}
              />
            )}
            {tab==="nutrition" && (
              <NutritionTab
                showToast={showToast}
                solidFoods={solidFoods} setSolidFoods={setSolidFoods}
                fruitLogs={fruitLogs} setFruitLogs={setFruitLogs}
                waterLogs={waterLogs} setWaterLogs={setWaterLogs}
                fruitIntroduced={fruitIntroduced} setFruitIntroduced={setFruitIntroduced}
                profile={profile}
                confirmDelete={confirmDelete}
              />
            )}
            {tab==="poop" && (
              <PoopTab
                showToast={showToast}
                logs={poopLogs} setLogs={setPoopLogs}
                confirmDelete={confirmDelete}
              />
            )}
            {tab==="scan" && <ScanTab showToast={showToast} />}

            <button onClick={()=>setShowProfile(true)} style={{ position:"fixed", top:18, right:16, zIndex:50, width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${t.primary},${t.accent})`, border:"none", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 10px ${t.primary}55` }}>
              {profile.gender==="girl"?"👧":"👦"}
            </button>

            <nav className="tab-bar">
              {tabs.map(tb=>(
                <div key={tb.id} className={`tab ${tab===tb.id?"active":""}`} onClick={()=>setTab(tb.id)}>
                  <div className="tab-icon">{tb.icon}</div>
                  <span style={{ color:tab===tb.id?t.primary:textMuted }}>{tb.label}</span>
                </div>
              ))}
            </nav>
          </>
        )}

        {deleteTarget && (
          <ConfirmModal
            message={deleteTarget.msg}
            onConfirm={deleteTarget.onConfirm}
            onCancel={()=>setDeleteTarget(null)}
          />
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </ThemeCtx.Provider>
  );
}
