import { useState, useEffect } from "react";

const STATUSES = ["Watchlist","Applied","Interview","Offer","Rejected"];
const STATUS_COLORS = {
  Watchlist: { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
  Applied:   { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" },
  Interview: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  Offer:     { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  Rejected:  { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
};
const MODE_COLORS = {
  "In-Person": { bg: "#FEF3C7", text: "#92400E" },
  "Remote":    { bg: "#DBEAFE", text: "#1E40AF" },
  "Hybrid":    { bg: "#EDE9FE", text: "#5B21B6" },
};

const INITIAL_JOBS = [
  { id:1, track:"Fast Track", company:"Rivian", role:"Service Support Advisor III", url:"https://rivian.com/careers", location:"Plymouth, MI", mode:"In-Person", pay:"$24.53–$27.26/hr · Est. $52K–$77K/yr", commute:"~35 min", repvue:"", summary:"Virtual point of contact for Rivian owners — vehicle education, charging & connectivity, roadside assistance, and service intake via phone, email, chat, and SMS.", dateApplied:"", followUp:"", status:"Applied", notes:"" },
  { id:2, track:"Fast Track", company:"Tesla", role:"Advisor, Sales", url:"https://www.tesla.com/careers", location:"Novi / Ann Arbor / West Bloomfield, MI", mode:"In-Person", pay:"Competitive hourly + commission", commute:"All within 45 min", repvue:"", summary:"Customer-facing front line at Tesla showrooms — greeting walk-ins, educating buyers on EV lineup, facilitating the sales process, and conducting vehicle deliveries.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:3, track:"Fast Track", company:"Lucid Motors", role:"Customer Care Specialist", url:"https://lucidmotors.com/careers", location:"Southfield, MI", mode:"In-Person", pay:"Competitive (check listing)", commute:"~15 min", repvue:"", summary:"Technical support for Lucid owners via phone, email, SMS, and chat — vehicle troubleshooting, knowledge base documentation, and expert-level product guidance.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:4, track:"Fast Track", company:"Apple", role:"At Home Advisor / Specialist", url:"https://jobs.apple.com/en-us/search?location=michigan-state972", location:"Remote (Advisor) or MI Retail", mode:"Remote", pay:"Competitive hourly + benefits", commute:"Remote", repvue:"", summary:"Remote customer support via phone, chat, and email — troubleshoot Apple products, provide technical guidance. Apple provides all equipment and training.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:5, track:"Fast Track", company:"Snout, Inc", role:"Business Development Rep", url:"https://jobs.gem.com/snout/", location:"Troy, MI", mode:"In-Person", pay:"$3,750/mo → $45K base / $90K OTE uncapped", commute:"~20 min", repvue:"", summary:"Outbound pipeline generation for a VC-backed vet wellness SaaS — prospecting into veterinary practices via phone, email, LinkedIn, and in-person to book discovery meetings. Contract-to-hire.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:22, track:"Fast Track", company:"Percepta", role:"Customer Care Rep I — Marketing", url:"https://www.percepta.com/careers/", location:"Dearborn, MI (Hybrid)", mode:"Hybrid", pay:"Competitive hourly + benefits", commute:"~20 min from Ferndale", repvue:"", summary:"Primary contact center for North America Ford and Lincoln dealers — handle dealer inquiries on contest/incentive programs, vehicle ordering, scheduling, and shipping. Hybrid with WFH flexibility after training.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Automotive CX — strong bridge from your EV interest. Ford/Lincoln dealer-facing." },
  { id:23, track:"Fast Track", company:"Percepta", role:"EV Customer Experience Specialist", url:"https://www.percepta.com/careers/", location:"Allen Park, MI", mode:"In-Person", pay:"Competitive hourly + benefits", commute:"~25 min from Ferndale", repvue:"", summary:"Support EV customers via phone, video chat, and online chat for an innovative mobility program. Provide expert product knowledge, troubleshoot issues, and build trust as a skilled advisor.", dateApplied:"", followUp:"", status:"Watchlist", notes:"EV-specific role at a TTEC joint venture. Great fit alongside your other EV applications." },
  { id:24, track:"Fast Track", company:"Carhartt", role:"Account Service Representative I", url:"https://careers.carhartt.com/", location:"Dearborn, MI (Remote)", mode:"Remote", pay:"$39K–$52K base", commute:"Remote", repvue:"", summary:"Manage and resolve order processing issues for assigned retail accounts — monitor order pool, manage fill rates, communicate availability issues, and coordinate with Sales, Planning, and logistics. Iconic Michigan brand.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Remote, Michigan-based company. 1-2 yrs customer service required — you exceed this." },
  { id:6, track:"Tech Sales", company:"HubSpot", role:"Outbound BDR", url:"https://www.hubspot.com/careers", location:"Remote (US)", mode:"Remote", pay:"$55K base / ~$80K OTE · Top: $120K–$170K", commute:"Remote", repvue:"84", summary:"Strategic outreach to prospective customers — uncover pain points, qualify leads, and book meetings for AEs. 3-level BDR career progression. No prior SDR experience required.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:7, track:"Tech Sales", company:"Gong", role:"SDR", url:"https://www.gong.io/company/careers", location:"Hybrid", mode:"Hybrid", pay:"~$62.5K base / $90K OTE", commute:"Remote/Hybrid", repvue:"88", summary:"Generate pipeline for a top revenue intelligence platform — prospect into target accounts, qualify leads, and work with the product you're selling daily. ~65% quota attainment.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:8, track:"Tech Sales", company:"Atlassian", role:"SDR", url:"https://www.atlassian.com/company/careers/all-jobs", location:"Remote Eligible", mode:"Remote", pay:"$67K base / $100K OTE · Top: $150K–$200K", commute:"Remote", repvue:"85", summary:"Build pipeline for Jira, Confluence, and Trello — multi-channel outreach using Salesforce, Gong, Outreach, and LinkedIn Navigator. No prior SDR experience required.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:9, track:"Tech Sales", company:"ZoomInfo", role:"SDR", url:"https://www.zoominfo.com/about/careers", location:"Hybrid", mode:"Hybrid", pay:"Competitive (verify on RepVue)", commute:"Remote/Hybrid", repvue:"86", summary:"Prospect into target accounts using ZoomInfo's own data platform — qualify leads and generate pipeline for the AE team. B2B intelligence tools used daily.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:10, track:"Tech Sales", company:"UserGems", role:"SDR/BDR", url:"https://www.usergems.com/careers", location:"Remote", mode:"Remote", pay:"Verify on RepVue", commute:"Remote", repvue:"94", summary:"AI pipeline generation platform tracking buyer job changes. One of the highest-rated sales orgs on RepVue (94 score, 7 Reppy Awards). Fully remote, VC-backed, growth-stage.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:18, track:"Tech Sales", company:"Datadog", role:"Sales Development Representative", url:"https://careers.datadoghq.com/sales/", location:"Denver / Remote-eligible", mode:"Hybrid", pay:"Competitive OTE · Top SDRs promote to AE", commute:"Remote/Hybrid", repvue:"83", summary:"Prospect, qualify, and generate leads for Datadog's cloud monitoring and security platform. Strong SDR-to-AE promotion track with top-tier sales training.", dateApplied:"", followUp:"", status:"Watchlist", notes:"RepVue: 83 score, 4.1 future outlook. Check if remote-eligible for MI." },
  { id:19, track:"Tech Sales", company:"Wasabi Technologies", role:"Business Development Representative", url:"https://www.wasabi.com/company/careers", location:"Remote (US)", mode:"Remote", pay:"~$50K base / $80K OTE", commute:"Remote", repvue:"84", summary:"Prospect and qualify leads for Wasabi's cloud storage platform — a fast-growing competitor to AWS S3. Fully remote, growth-stage company.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Cloud storage — good talking point given your tech curiosity and AI fluency." },
  { id:20, track:"Tech Sales", company:"ClearCompany", role:"Sales Development Representative", url:"https://www.clearcompany.com/careers", location:"Remote (US)", mode:"Remote", pay:"Competitive base + commission", commute:"Remote", repvue:"80", summary:"Generate pipeline for a leading HR tech / talent management SaaS platform. Outbound prospecting via phone, email, and LinkedIn to HR leaders. Fully remote.", dateApplied:"", followUp:"", status:"Watchlist", notes:"HR tech — your communication background from MSU is a direct selling point here." },
  { id:21, track:"Tech Sales", company:"Lumivero", role:"Business Development Representative", url:"https://www.lumivero.com/company/careers/", location:"Remote (US)", mode:"Remote", pay:"~$55K base / OTE verify listing", commute:"Remote", repvue:"78", summary:"Outbound prospecting to academic institutions and Fortune 1000 companies for market-leading research and decision-making software.", dateApplied:"", followUp:"", status:"Watchlist", notes:"MSU grad angle — you understand the academic buyer persona firsthand." },
  { id:11, track:"WFH Now", company:"Allstate", role:"Inside Sales Representative (Remote)", url:"https://www.allstate.jobs/", location:"Remote (MI eligible)", mode:"Remote", pay:"$17.50/hr base · $49K–$74K OTE (uncapped)", commute:"Remote", repvue:"66", summary:"Sell auto, home, and life insurance to warm inbound leads via phone, chat, and SMS. Allstate provides equipment, paid training, and helps you get licensed. Benefits from day one.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Will need P&C license — Allstate helps you get it before start date." },
  { id:12, track:"WFH Now", company:"Concentrix", role:"Inside Sales Rep – Financial (Remote)", url:"https://jobs.concentrix.com/job-search/", location:"Remote (MI eligible)", mode:"Remote", pay:"~$16–$20/hr · Est. $33K–$42K + incentives", commute:"Remote", repvue:"", summary:"Inbound/outbound sales and service for financial clients from home. Equipment and paid training provided. 80% of managers promoted from within. Fast interview process.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check for seasonal vs. permanent postings — permanent preferred." },
  { id:13, track:"WFH Now", company:"Concentrix", role:"Customer Service Rep – Financial (Remote)", url:"https://jobs.concentrix.com/job-search/", location:"Remote (MI eligible)", mode:"Remote", pay:"~$15–$19/hr · Est. $31K–$40K", commute:"Remote", repvue:"", summary:"Handle inbound customer inquiries for financial services clients via phone and chat. Work from home, equipment provided, paid training included. Quick hire — typically 1-2 weeks.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Fallback if inside sales role isn't available — same company, easier entry." },
  { id:14, track:"WFH Now", company:"Liberty Mutual", role:"Licensed Customer Service Rep (Remote)", url:"https://jobs.libertymutualgroup.com/", location:"Remote", mode:"Remote", pay:"Competitive hourly + benefits", commute:"Remote", repvue:"79", summary:"Service existing policyholders via inbound calls — handle policy changes, billing questions, and coverage reviews. Insurance license required or willingness to obtain.", dateApplied:"", followUp:"", status:"Watchlist", notes:"May need active P&C license — check listing." },
  { id:15, track:"WFH Now", company:"SelectQuote", role:"Sales Development Advisor (Remote)", url:"https://www.selectquote.com/careers", location:"Remote", mode:"Remote", pay:"Base + commission (verify listing)", commute:"Remote", repvue:"", summary:"Qualify inbound leads for insurance products — warm leads, no cold calling. No insurance license needed to start. High-volume, fast-paced phone sales environment.", dateApplied:"", followUp:"", status:"Watchlist", notes:"No license required — good quick-start option." },
  { id:16, track:"WFH Now", company:"BAO Inc.", role:"SDR / Outbound Rep (Remote)", url:"https://www.bao-inc.com/careers", location:"Remote", mode:"Remote", pay:"Base + uncapped commission", commute:"Remote", repvue:"", summary:"Book qualified meetings on behalf of major tech companies like SAP, Amazon, Salesforce, and Cisco. Outbound calling into enterprise accounts. Great resume builder for tech sales.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Strong stepping stone into tech sales AE roles." },
  { id:17, track:"WFH Now", company:"Agent Alliance", role:"Customer Service/Sales Rep (WFH)", url:"https://www.indeed.com/q-remote-customer-service-l-michigan-jobs.html", location:"Remote (MI — Canton/Ann Arbor area)", mode:"Remote", pay:"Competitive hourly", commute:"Remote", repvue:"", summary:"Remote customer service and sales support role — handle inbound inquiries, cross-sell products, and provide account assistance. Low barrier to entry, fast hiring.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check Indeed for latest active postings — they hire on rolling basis." },
  { id:25, track:"WFH Now", company:"Victra (Verizon)", role:"Wireless Sales Consultant", url:"https://www.victra.com/careers", location:"Madison Heights / Warren, MI", mode:"In-Person", pay:"$14–$20/hr base + uncapped commission · Top reps $80K+", commute:"~15–25 min from Ferndale", repvue:"", summary:"Verizon's largest premium retail partner — sell wireless devices, rate plans, accessories, and services in-store. Immediate openings across metro Detroit. Fast hiring, paid training.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Multiple MI locations hiring now. Good quick-start income while pursuing tech sales." },
  { id:26, track:"WFH Now", company:"JPMorgan Chase", role:"Virtual Banker I", url:"https://careers.jpmorgan.com/", location:"Detroit, MI (Remote/Hybrid)", mode:"Hybrid", pay:"Competitive hourly + Chase benefits", commute:"~20 min from Ferndale", repvue:"83", summary:"Engage clients over the phone through inbound calls — provide customer service, sales support, and product guidance for Chase banking products. Clear promotion path.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Top-tier brand for resume. Detroit-based with remote flexibility." },
  { id:27, track:"WFH Now", company:"Henry Ford Health", role:"Patient Services Specialist I (Remote)", url:"https://www.henryford.com/careers", location:"Troy, MI (Remote for MI residents)", mode:"Remote", pay:"Competitive hourly + healthcare benefits", commute:"Remote", repvue:"", summary:"Remote patient-facing role handling scheduling, insurance verification, and patient inquiries via phone. Michigan residents only. Full benefits from a major health system.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Healthcare industry — stable employer, great benefits. Remote for MI residents." },
];

const EMPTY_JOB = { id:0, track:"Fast Track", company:"", role:"", url:"", location:"", mode:"In-Person", pay:"", commute:"", repvue:"", summary:"", dateApplied:"", followUp:"", status:"Watchlist", notes:"" };

function Badge({ label, colors }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
      background: colors.bg, color: colors.text,
      border: `1px solid ${colors.border || "transparent"}`,
      whiteSpace: "nowrap", letterSpacing: "0.02em",
    }}>{label}</span>
  );
}

function OverdueDot({ followUp }) {
  if (!followUp) return null;
  const overdue = new Date(followUp) < new Date();
  return <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background: overdue?"#EF4444":"#10B981", marginRight:5 }} />;
}

function Btn({ children, onClick, active, danger, disabled, style: s }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{
      fontSize: 12, padding: "5px 12px", cursor: disabled ? "default" : "pointer",
      borderRadius: 8, border: "1px solid rgba(130,130,160,0.18)",
      background: active ? "#1a2744" : danger ? "#FEE2E2" : "rgba(255,255,255,0.75)",
      color: active ? "#fff" : danger ? "#991B1B" : "#1a2744",
      fontWeight: 500, transition: "all 0.15s ease",
      opacity: disabled ? 0.45 : 1, fontFamily: "inherit", ...s,
    }}>{children}</button>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {children}
    </div>
  );
}

const IS = () => ({
  width: "100%", fontSize: 14, padding: "10px 12px", borderRadius: 10,
  border: "1px solid rgba(130,130,160,0.18)", background: "rgba(255,255,255,0.85)",
  color: "#1a2744", boxSizing: "border-box", outline: "none", fontFamily: "inherit",
});

function JobCard({ job, onStatusChange, onEdit, onDelete, onAI, aiOpen, aiMode, setAiMode, aiResult, setAiResult, jdInput, setJdInput, aiLoading, runAI, editingNotes, setEditingNotes, saveNotes }) {
  const [localNotes, setLocalNotes] = useState("");
  return (
    <div style={{
      background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.45)", borderRadius: 16,
      padding: "18px 20px", marginBottom: 12,
      boxShadow: "0 1px 4px rgba(0,0,0,0.03), 0 4px 14px rgba(0,0,0,0.02)",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:6 }}>
            <span style={{ fontWeight:700, fontSize:16, color:"#1a2744" }}>{job.company}</span>
            <span style={{ fontSize:13, color:"#6B7280" }}>— {job.role}</span>
            {job.repvue && <span style={{ fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:6, background:"linear-gradient(135deg,#1a2744,#2c5f8a)", color:"#fff", letterSpacing:"0.04em" }}>RV {job.repvue}</span>}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <Badge label={job.status} colors={STATUS_COLORS[job.status]} />
            <Badge label={job.mode} colors={{ bg:MODE_COLORS[job.mode]?.bg||"#f3f4f6", text:MODE_COLORS[job.mode]?.text||"#374151" }} />
            <span style={{ fontSize:12, color:"#9CA3AF" }}>{job.location}</span>
          </div>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"#6B7280" }}>{job.pay}</p>
        </div>
        <div style={{ display:"flex", gap:5, alignItems:"center", flexShrink:0, flexWrap:"wrap" }}>
          <select value={job.status} onChange={e=>onStatusChange(job.id,e.target.value)}
            style={{ fontSize:12, padding:"5px 8px", borderRadius:8, border:"1px solid rgba(130,130,160,0.18)", background:"rgba(255,255,255,0.8)", color:"#1a2744", cursor:"pointer", fontFamily:"inherit" }}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
          <Btn onClick={()=>onAI(job)} active={aiOpen}>{aiOpen?"Close":"AI"}</Btn>
          <Btn onClick={()=>onEdit(job)}>Edit</Btn>
          <Btn onClick={()=>onDelete(job.id)} danger>Del</Btn>
        </div>
      </div>

      <p style={{ margin:"12px 0 0", fontSize:13, color:"#4B5563", lineHeight:1.65, borderLeft:"3px solid rgba(26,39,68,0.1)", paddingLeft:12 }}>{job.summary}</p>

      <div style={{ display:"flex", alignItems:"center", gap:14, marginTop:10, flexWrap:"wrap" }}>
        {job.dateApplied && <span style={{ fontSize:12, color:"#9CA3AF" }}>Applied {job.dateApplied}</span>}
        {job.followUp && <span style={{ fontSize:12, color:"#9CA3AF", display:"flex", alignItems:"center" }}><OverdueDot followUp={job.followUp} />Follow-up {job.followUp}</span>}
        {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:"#2c5f8a", textDecoration:"none", fontWeight:600 }}>Apply ↗</a>}
      </div>

      <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid rgba(130,130,160,0.08)" }}>
        {editingNotes===job.id ? (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <textarea value={localNotes} onChange={e=>setLocalNotes(e.target.value)} rows={3} style={{ ...IS(), resize:"vertical", fontSize:13 }} placeholder="Add notes..." />
            <div style={{ display:"flex", gap:6 }}>
              <Btn onClick={()=>saveNotes(job.id, localNotes)}>Save</Btn>
              <Btn onClick={()=>setEditingNotes(null)}>Cancel</Btn>
            </div>
          </div>
        ) : (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
            <p style={{ margin:0, fontSize:13, color:job.notes?"#4B5563":"#D1D5DB", fontStyle:job.notes?"normal":"italic" }}>{job.notes||"No notes yet"}</p>
            <Btn onClick={()=>{setEditingNotes(job.id);setLocalNotes(job.notes||"");}} style={{ flexShrink:0 }}>{job.notes?"Edit":"Add note"}</Btn>
          </div>
        )}
      </div>

      {aiOpen && (
        <div style={{ marginTop:14, paddingTop:12, borderTop:"1px solid rgba(130,130,160,0.08)" }}>
          <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
            {[{id:"analyze",label:"Analyze JD"},{id:"cover",label:"Draft outreach"},{id:"next",label:"Next steps"}].map(m=>(
              <Btn key={m.id} onClick={()=>{setAiMode(m.id);setAiResult("");}} active={aiMode===m.id}>{m.label}</Btn>
            ))}
          </div>
          {(aiMode==="analyze"||aiMode==="cover") && (
            <textarea placeholder="Paste job description (optional)..." value={jdInput} onChange={e=>setJdInput(e.target.value)} rows={3} style={{ ...IS(), resize:"vertical", fontSize:13, marginBottom:10 }} />
          )}
          <Btn onClick={()=>runAI(job)} disabled={aiLoading} style={{ marginBottom:10 }}>
            {aiLoading?"Running...":"Run — "+[{id:"analyze",label:"Analyze JD"},{id:"cover",label:"Draft outreach"},{id:"next",label:"Next steps"}].find(m=>m.id===aiMode)?.label}
          </Btn>
          {aiResult && <div style={{ fontSize:13, lineHeight:1.75, background:"rgba(26,39,68,0.04)", borderRadius:12, padding:"14px 16px", whiteSpace:"pre-wrap", color:"#1a2744" }}>{aiResult}</div>}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(null);
  const [aiPanel, setAiPanel] = useState(null);
  const [aiMode, setAiMode] = useState("analyze");
  const [jdInput, setJdInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingNotes, setEditingNotes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jst_jobs_v4");
      if (saved) { setJobs(JSON.parse(saved)); }
      else { setJobs(INITIAL_JOBS); localStorage.setItem("jst_jobs_v4", JSON.stringify(INITIAL_JOBS)); }
    } catch { setJobs(INITIAL_JOBS); }
    setLoaded(true);
  }, []);

  const save = (updated) => { setJobs(updated); try { localStorage.setItem("jst_jobs_v4", JSON.stringify(updated)); } catch {} };

  const openForm = (job) => {
    if (job && job.id) setForm({ ...job });
    else setForm({ ...EMPTY_JOB, id: Date.now() });
  };

  const submitForm = async () => {
    if (!form || !form.company || !form.role) return;
    const exists = jobs.find(j => j.id === form.id);
    await save(exists ? jobs.map(j => j.id === form.id ? form : j) : [form, ...jobs]);
    setForm(null);
  };

  const deleteJob = async (id) => { await save(jobs.filter(j=>j.id!==id)); if(aiPanel?.id===id)setAiPanel(null); };
  const updateStatus = async (id, status) => save(jobs.map(j=>j.id===id?{...j,status}:j));
  const saveNotes = async (id, notes) => { await save(jobs.map(j=>j.id===id?{...j,notes}:j)); setEditingNotes(null); };

  const runAI = async (job) => {
    setAiLoading(true); setAiResult("");
    const prompts = {
      analyze:`You are a career advisor. Analyze this job for Carter — a sales professional with ~6.5 years experience in mortgage lending (UWM AE 4.5 yrs, Align Lending MLO), targeting tech sales SDR/BDR and EV/service advisor roles. BA in Communication from MSU.\n\nJob: ${job.role} at ${job.company}\nLocation: ${job.location}\nPay: ${job.pay}\n${jdInput?`\nJD:\n${jdInput}`:""}\n\nProvide: 1) Fit score (1-10), 2) Top 3 talking points, 3) Red flags. Be concise.`,
      cover:`Write a confident outreach message (LinkedIn DM or email) for Carter applying to: ${job.role} at ${job.company}.\nBackground: ~6.5 yrs sales (mortgage/UWM AE), BA Communication MSU, targeting tech/EV sales.\n${jdInput?`\nJD context: ${jdInput.slice(0,500)}`:""}\n\nUnder 150 words. No fluff. Sound human.`,
      next:`Job search coach. Carter applying to ${job.role} at ${job.company}.\nStatus: ${job.status} | Applied: ${job.dateApplied||"unknown"} | Follow-up: ${job.followUp||"not set"}\nNotes: ${job.notes||"none"}\n\nGive 2-3 specific next steps for this stage.`
    };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompts[aiMode]}]})
      });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text||"No response.");
    } catch { setAiResult("Error. Try again."); }
    setAiLoading(false);
  };

  const filterJobs = (list) => {
    let f = list;
    if (filterStatus!=="All") f=f.filter(j=>j.status===filterStatus);
    if (searchQuery.trim()) { const q=searchQuery.toLowerCase(); f=f.filter(j=>j.company.toLowerCase().includes(q)||j.role.toLowerCase().includes(q)||j.location.toLowerCase().includes(q)); }
    return f;
  };

  const stats = STATUSES.reduce((a,s)=>({...a,[s]:jobs.filter(j=>j.status===s).length}),{});
  const fastTrack = filterJobs(jobs.filter(j=>j.track==="Fast Track"));
  const techSales = filterJobs(jobs.filter(j=>j.track==="Tech Sales"));
  const wfhNow = filterJobs(jobs.filter(j=>j.track==="WFH Now"));

  if (!loaded) return <div style={{ minHeight:"100vh", background:"linear-gradient(145deg,#f0f4f8,#e8edf5,#f5f0eb)", display:"flex", alignItems:"center", justifyContent:"center" }}><p style={{ color:"#9CA3AF" }}>Loading...</p></div>;

  const cp = {
    onStatusChange:updateStatus, onEdit:openForm, onDelete:deleteJob,
    onAI:(job)=>{setAiPanel(aiPanel?.id===job.id?null:job);setAiResult("");setJdInput("");},
    aiMode, setAiMode, aiResult, setAiResult, jdInput, setJdInput, aiLoading, runAI,
    editingNotes, setEditingNotes, saveNotes,
  };

  const Track = ({label,color,jobs:tj}) => {
    if(!tj.length) return null;
    return (<>
      <div style={{ display:"flex", alignItems:"center", gap:14, margin:"28px 0 14px" }}>
        <div style={{ flex:1, height:1, background:"rgba(130,130,160,0.12)" }} />
        <span style={{ fontSize:11, fontWeight:700, color, whiteSpace:"nowrap", letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</span>
        <span style={{ fontSize:11, color:"#9CA3AF", fontWeight:600, background:"rgba(130,130,160,0.08)", padding:"2px 8px", borderRadius:10 }}>{tj.length}</span>
        <div style={{ flex:1, height:1, background:"rgba(130,130,160,0.12)" }} />
      </div>
      {tj.map(job=><JobCard key={job.id} job={job} {...cp} aiOpen={aiPanel?.id===job.id} />)}
    </>);
  };

  return (
    <div style={{ fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh", background:"linear-gradient(145deg,#f0f4f8 0%,#e8edf5 40%,#f5f0eb 100%)", backgroundAttachment:"fixed" }}>
      <div style={{ maxWidth:880, margin:"0 auto", padding:"32px 20px 80px" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, flexWrap:"wrap", marginBottom:20 }}>
          <div>
            <h1 style={{ margin:0, fontSize:24, fontWeight:800, color:"#1a2744", letterSpacing:"-0.03em" }}>Job Search Tracker</h1>
            <p style={{ margin:"4px 0 0", fontSize:13, color:"#9CA3AF" }}>{jobs.length} roles · March 2026</p>
          </div>
          <button onClick={()=>openForm(null)} style={{
            fontSize:14, padding:"10px 22px", cursor:"pointer", borderRadius:12, fontWeight:700,
            background:"#1a2744", color:"#fff", border:"none", fontFamily:"inherit",
            boxShadow:"0 2px 8px rgba(26,39,68,0.2)",
          }}>+ Add Role</button>
        </div>

        <input type="text" placeholder="Search companies, roles, locations..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
          style={{ ...IS(), background:"rgba(255,255,255,0.65)", backdropFilter:"blur(12px)", marginBottom:20 }} />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:28 }}>
          {STATUSES.map(s=>(
            <div key={s} onClick={()=>setFilterStatus(filterStatus===s?"All":s)} style={{
              background:filterStatus===s?STATUS_COLORS[s].bg:"rgba(255,255,255,0.5)",
              backdropFilter:"blur(12px)",
              border:`1.5px solid ${filterStatus===s?STATUS_COLORS[s].border:"rgba(255,255,255,0.4)"}`,
              borderRadius:14, padding:"12px 8px", cursor:"pointer", textAlign:"center",
              transition:"all 0.2s ease",
              boxShadow:filterStatus===s?`0 2px 10px ${STATUS_COLORS[s].border}44`:"0 1px 3px rgba(0,0,0,0.02)",
            }}>
              <div style={{ fontSize:22, fontWeight:800, color:STATUS_COLORS[s].text }}>{stats[s]||0}</div>
              <div style={{ fontSize:11, color:"#6B7280", marginTop:2, fontWeight:500 }}>{s}</div>
            </div>
          ))}
        </div>

        <Track label="Fast Track — High Opportunity" color="#065F46" jobs={fastTrack} />
        <Track label="Tech Sales — SDR/BDR (RepVue Vetted)" color="#4338CA" jobs={techSales} />
        <Track label="WFH Now — Remote, Hiring Fast" color="#9A3412" jobs={wfhNow} />

        {!fastTrack.length && !techSales.length && !wfhNow.length && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#9CA3AF" }}>No roles match that filter.</div>
        )}

        {/* Modal */}
        {form && (
          <div style={{ position:"fixed", inset:0, background:"rgba(15,20,35,0.4)", backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}
            onClick={e=>{if(e.target===e.currentTarget)setForm(null);}}>
            <div style={{
              background:"rgba(255,255,255,0.96)", backdropFilter:"blur(20px)",
              borderRadius:20, border:"1px solid rgba(255,255,255,0.5)",
              padding:28, width:"100%", maxWidth:560, boxSizing:"border-box",
              margin:16, maxHeight:"90vh", overflowY:"auto",
              boxShadow:"0 24px 64px rgba(0,0,0,0.15)",
            }}>
              <h2 style={{ margin:"0 0 24px", fontSize:20, fontWeight:800, color:"#1a2744" }}>
                {jobs.find(j=>j.id===form.id)?"Edit Role":"Add New Role"}
              </h2>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <FormField label="Company *">
                  <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="e.g. HubSpot" style={IS()} autoFocus />
                </FormField>
                <FormField label="Role *">
                  <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="e.g. Outbound BDR" style={IS()} />
                </FormField>
                <FormField label="Track">
                  <select value={form.track} onChange={e=>setForm({...form,track:e.target.value})} style={IS()}>
                    <option>Fast Track</option><option>Tech Sales</option><option>WFH Now</option>
                  </select>
                </FormField>
                <FormField label="Mode">
                  <select value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})} style={IS()}>
                    <option>In-Person</option><option>Remote</option><option>Hybrid</option>
                  </select>
                </FormField>
                <FormField label="Location">
                  <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="e.g. Remote (US)" style={IS()} />
                </FormField>
                <FormField label="Pay">
                  <input value={form.pay} onChange={e=>setForm({...form,pay:e.target.value})} placeholder="e.g. $55K / $80K OTE" style={IS()} />
                </FormField>
                <FormField label="Apply URL">
                  <input value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://..." style={IS()} />
                </FormField>
                <FormField label="RepVue Score">
                  <input value={form.repvue} onChange={e=>setForm({...form,repvue:e.target.value})} placeholder="e.g. 84" style={IS()} />
                </FormField>
                <FormField label="Date Applied">
                  <input type="date" value={form.dateApplied} onChange={e=>setForm({...form,dateApplied:e.target.value})} style={IS()} />
                </FormField>
                <FormField label="Follow-up Date">
                  <input type="date" value={form.followUp} onChange={e=>setForm({...form,followUp:e.target.value})} style={IS()} />
                </FormField>
                <FormField label="Status">
                  <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={IS()}>
                    {STATUSES.map(s=><option key={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Commute">
                  <input value={form.commute} onChange={e=>setForm({...form,commute:e.target.value})} placeholder="e.g. ~20 min" style={IS()} />
                </FormField>
              </div>

              <div style={{ marginTop:16 }}>
                <FormField label="Summary">
                  <textarea value={form.summary||""} onChange={e=>setForm({...form,summary:e.target.value})} rows={3} placeholder="Brief role description..." style={{ ...IS(), resize:"vertical" }} />
                </FormField>
              </div>
              <div style={{ marginTop:12 }}>
                <FormField label="Notes">
                  <textarea value={form.notes||""} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} placeholder="Interview notes, reminders..." style={{ ...IS(), resize:"vertical" }} />
                </FormField>
              </div>

              <div style={{ display:"flex", gap:10, marginTop:24, justifyContent:"flex-end" }}>
                <button onClick={()=>setForm(null)} style={{ fontSize:14, padding:"10px 20px", cursor:"pointer", borderRadius:12, border:"1px solid rgba(130,130,160,0.18)", background:"rgba(255,255,255,0.8)", color:"#1a2744", fontWeight:600, fontFamily:"inherit" }}>Cancel</button>
                <button onClick={submitForm} disabled={!form.company||!form.role} style={{
                  fontSize:14, padding:"10px 24px", cursor:(!form.company||!form.role)?"default":"pointer",
                  borderRadius:12, border:"none", fontWeight:700, fontFamily:"inherit",
                  background:(!form.company||!form.role)?"#D1D5DB":"#1a2744", color:"#fff",
                  opacity:(!form.company||!form.role)?0.5:1,
                  boxShadow:(!form.company||!form.role)?"none":"0 2px 8px rgba(26,39,68,0.2)",
                }}>Save Role</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
