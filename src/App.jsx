import { useState, useEffect } from "react";

const STATUSES = ["Watchlist","Applied","Interview","Offer","Rejected"];
const STATUS_COLORS = {
  Watchlist: { bg: "#EEF2FF", text: "#4338CA", border: "#C7D2FE" },
  Applied:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  Interview: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
  Offer:     { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
  Rejected:  { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
};
const TRACK_COLORS = {
  "Fast Track": { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
  "Tech Sales":  { bg: "#EEF2FF", text: "#4338CA", border: "#C7D2FE" },
  "WFH Now":     { bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
};
const MODE_COLORS = {
  "In-Person": { bg: "#FEF3E2", text: "#B45309" },
  "Remote":    { bg: "#E8F0FE", text: "#1D4ED8" },
  "Hybrid":    { bg: "#F3E8FE", text: "#7C3AED" },
};
const AI_MODES = [
  { id: "analyze", label: "Analyze JD" },
  { id: "cover",   label: "Draft outreach" },
  { id: "next",    label: "Next steps" },
];

const INITIAL_JOBS = [
  { id:1, track:"Fast Track", company:"Rivian", role:"Service Support Advisor III", url:"https://rivian.com/careers", location:"Plymouth, MI", mode:"In-Person", pay:"$24.53–$27.26/hr · Est. $52K–$77K/yr", commute:"~35 min", repvue:"", summary:"Virtual point of contact for Rivian owners — vehicle education, charging & connectivity, roadside assistance, and service intake via phone, email, chat, and SMS.", dateApplied:"", followUp:"", status:"Applied", notes:"" },
  { id:2, track:"Fast Track", company:"Tesla", role:"Advisor, Sales", url:"https://www.tesla.com/careers", location:"Novi / Ann Arbor / West Bloomfield, MI", mode:"In-Person", pay:"Competitive hourly + commission", commute:"All within 45 min", repvue:"", summary:"Customer-facing front line at Tesla showrooms — greeting walk-ins, educating buyers on EV lineup, facilitating the sales process, and conducting vehicle deliveries.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:3, track:"Fast Track", company:"Lucid Motors", role:"Customer Care Specialist", url:"https://lucidmotors.com/careers", location:"Southfield, MI", mode:"In-Person", pay:"Competitive (check listing)", commute:"~15 min", repvue:"", summary:"Technical support for Lucid owners via phone, email, SMS, and chat — vehicle troubleshooting, knowledge base documentation, and expert-level product guidance.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:4, track:"Fast Track", company:"Apple", role:"At Home Advisor / Specialist", url:"https://jobs.apple.com/en-us/search?location=michigan-state972", location:"Remote (Advisor) or MI Retail", mode:"Remote", pay:"Competitive hourly + benefits", commute:"Remote", repvue:"", summary:"Remote customer support via phone, chat, and email — troubleshoot Apple products, provide technical guidance. Apple provides all equipment and training. Specialist role is in-store.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:5, track:"Fast Track", company:"Snout, Inc", role:"Business Development Rep", url:"https://jobs.gem.com/snout/", location:"Troy, MI", mode:"In-Person", pay:"$3,750/mo → $45K base / $90K OTE uncapped", commute:"~20 min", repvue:"", summary:"Outbound pipeline generation for a VC-backed vet wellness SaaS — prospecting into veterinary practices via phone, email, LinkedIn, and in-person to book discovery meetings. Contract-to-hire.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:6, track:"Tech Sales", company:"HubSpot", role:"Outbound BDR", url:"https://www.hubspot.com/careers", location:"Remote (US)", mode:"Remote", pay:"$55K base / ~$80K OTE · Top: $120K–$170K", commute:"Remote", repvue:"84", summary:"Strategic outreach to prospective customers — uncover pain points, qualify leads, and book meetings for AEs. 3-level BDR career progression. No prior SDR experience required.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:7, track:"Tech Sales", company:"Gong", role:"SDR", url:"https://www.gong.io/company/careers", location:"Hybrid", mode:"Hybrid", pay:"~$62.5K base / $90K OTE", commute:"Remote/Hybrid", repvue:"88", summary:"Generate pipeline for a top revenue intelligence platform — prospect into target accounts, qualify leads, and work with the product you're selling daily. ~65% quota attainment.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:8, track:"Tech Sales", company:"Atlassian", role:"SDR", url:"https://www.atlassian.com/company/careers/all-jobs", location:"Remote Eligible", mode:"Remote", pay:"$67K base / $100K OTE · Top: $150K–$200K", commute:"Remote", repvue:"85", summary:"Build pipeline for Jira, Confluence, and Trello — multi-channel outreach using Salesforce, Gong, Outreach, and LinkedIn Navigator. No prior SDR experience required. ~58% attainment.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:9, track:"Tech Sales", company:"ZoomInfo", role:"SDR", url:"https://www.zoominfo.com/about/careers", location:"Hybrid", mode:"Hybrid", pay:"Competitive (verify on RepVue)", commute:"Remote/Hybrid", repvue:"86", summary:"Prospect into target accounts using ZoomInfo's own data platform — qualify leads and generate pipeline for the AE team. B2B intelligence tools used daily. ~55% attainment.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:10, track:"Tech Sales", company:"UserGems", role:"SDR/BDR", url:"https://www.usergems.com/careers", location:"Remote", mode:"Remote", pay:"Verify on RepVue", commute:"Remote", repvue:"94", summary:"AI pipeline generation platform tracking buyer job changes. One of the highest-rated sales orgs on RepVue (94 score, 7 Reppy Awards). Fully remote, VC-backed, growth-stage.", dateApplied:"", followUp:"", status:"Watchlist", notes:"" },
  { id:11, track:"WFH Now", company:"Allstate", role:"Inside Sales Representative (Remote)", url:"https://www.allstate.jobs/job/21692552/licensed-sales-professional-lsp-remote-mi-michigan-mi/", location:"Remote (MI eligible)", mode:"Remote", pay:"$17.50/hr base · $49K–$74K OTE (uncapped)", commute:"Remote", repvue:"", summary:"Sell auto, home, and life insurance to warm inbound leads via phone, chat, and SMS. Allstate provides equipment, paid training, and will help you get licensed (P&C or Personal Lines) before start. Benefits from day one. Fast hiring pipeline.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Will need P&C license — Allstate helps you get it before start date." },
  { id:12, track:"WFH Now", company:"Concentrix", role:"Inside Sales Rep – Financial (Remote)", url:"https://jobs.concentrix.com/job-search/", location:"Remote (MI eligible)", mode:"Remote", pay:"~$16–$20/hr · Est. $33K–$42K + incentives", commute:"Remote", repvue:"", summary:"Inbound/outbound sales and service for financial clients from home. Concentrix provides equipment and paid training. 80% of managers promoted from within. High-volume hiring, fast interview process.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check for seasonal vs. permanent postings — permanent preferred." },
  { id:13, track:"WFH Now", company:"Concentrix", role:"Customer Service Rep – Financial (Remote)", url:"https://jobs.concentrix.com/job-search/", location:"Remote (MI eligible)", mode:"Remote", pay:"~$15–$19/hr · Est. $31K–$40K", commute:"Remote", repvue:"", summary:"Handle inbound customer inquiries for financial services clients via phone and chat. Work from home, equipment provided, paid training included. Quick hire timeline — typically 1-2 weeks from application to offer.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Fallback if inside sales role isn't available — same company, easier entry." },
  { id:14, track:"WFH Now", company:"Liberty Mutual", role:"Licensed Customer Service Rep (Remote)", url:"https://jobs.libertymutualgroup.com/", location:"Remote", mode:"Remote", pay:"Competitive hourly + benefits", commute:"Remote", repvue:"", summary:"Service existing policyholders via inbound calls — handle policy changes, billing questions, and coverage reviews. Insurance license required or willingness to obtain. Strong benefits package.", dateApplied:"", followUp:"", status:"Watchlist", notes:"May need active P&C license — check listing." },
  { id:15, track:"WFH Now", company:"SelectQuote", role:"Sales Development Advisor (Remote)", url:"https://www.selectquote.com/careers", location:"Remote", mode:"Remote", pay:"Base + commission (verify listing)", commute:"Remote", repvue:"", summary:"Qualify inbound leads for insurance products — warm leads, no cold calling. No insurance license needed to start. High-volume, fast-paced phone sales environment. Quick onboarding.", dateApplied:"", followUp:"", status:"Watchlist", notes:"No license required — good quick-start option." },
  { id:16, track:"WFH Now", company:"BAO Inc.", role:"SDR / Outbound Rep (Remote)", url:"https://www.bao-inc.com/careers", location:"Remote", mode:"Remote", pay:"Base + uncapped commission", commute:"Remote", repvue:"", summary:"Book qualified meetings on behalf of major tech companies like SAP, Amazon, Salesforce, and Cisco. Outbound calling into enterprise accounts. Great resume builder for tech sales — work with top-tier brands from day one.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Strong stepping stone into tech sales AE roles." },
  { id:17, track:"WFH Now", company:"Agent Alliance", role:"Customer Service/Sales Rep (WFH)", url:"https://www.indeed.com/q-remote-customer-service-l-michigan-jobs.html", location:"Remote (MI — Canton/Ann Arbor area)", mode:"Remote", pay:"Competitive hourly", commute:"Remote", repvue:"", summary:"Remote customer service and sales support role — handle inbound inquiries, cross-sell products, and provide account assistance. Multiple MI-based postings active. Low barrier to entry, fast hiring.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check Indeed for latest active postings — they hire on rolling basis." },
  { id:28, track:"Tech Sales", company:"Hostaway", role:"SDR (April Hiring Class)", url:"https://careers.hostaway.com/o/sales-development-representative-100-remote-north-america", location:"Remote (US)", mode:"Remote", pay:"~$50K base / $80K OTE · Top: $130K–$150K", commute:"Remote", repvue:"", summary:"Property management SaaS for short-term rentals (Airbnb, Vrbo, Booking.com). Outbound prospecting via cold calling, email, and social selling. April class closes April 11th. Unicorn-status, high-growth. 64/36 pay split.", dateApplied:"", followUp:"", status:"Watchlist", notes:"URGENT — April class closing April 11th, 2026. Apply ASAP. Strong fit: your consultative sales + outbound experience." },
  { id:29, track:"Tech Sales", company:"OnPay", role:"Sales Development Representative", url:"https://www.onpay.com/about/careers", location:"Remote (US)", mode:"Remote", pay:"Base + bonus + stock options", commute:"Remote", repvue:"", summary:"Fast-growing payroll & HR SaaS platform. SDR team fields inbound inquiries and supports AEs. Top-rated payroll product. 4 weeks PTO, full benefits, 401(k) match, remote flexibility.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Mortgage background = direct advantage here. You understand payroll, small biz pain points, and financial products." },
  { id:30, track:"Tech Sales", company:"SambaSafety", role:"Sales Development Representative", url:"https://www.sambasafety.com/careers", location:"Remote (US)", mode:"Remote", pay:"Competitive base + commission", commute:"Remote", repvue:"", summary:"Driver risk management SaaS platform. Engage prospects, qualify leads, and support AE team. 4.9 stars on Glassdoor, recognized as Top Workplace. Uses Salesforce, SalesLoft, LinkedIn Navigator, ZoomInfo.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Glassdoor 4.9 stars. Strong culture. Straightforward product to learn — risk management for fleets." },
  { id:31, track:"Tech Sales", company:"Canonical", role:"Sales Development Representative", url:"https://canonical.com/careers", location:"Remote (Global)", mode:"Remote", pay:"Competitive base + commission", commute:"Remote", repvue:"", summary:"The company behind Ubuntu — one of the most widely used open-source platforms globally. SDRs drive sales inquiries for cloud solutions. Fully remote, global team. Standing out as a non-traditional candidate is an asset here.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Interesting angle: open-source + cloud. Your tech curiosity and AI fluency are selling points." },
  { id:32, track:"Tech Sales", company:"Motive", role:"Sales Development Representative", url:"https://gomotive.com/careers/", location:"Remote-eligible", mode:"Remote", pay:"Competitive OTE · Strong SDR→AE track", commute:"Remote", repvue:"", summary:"Fleet management and IoT platform — telematics, safety, spend management for physical economy businesses. Growing aggressively, hires SDRs in classes with structured promotion to AE.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check careers page for current SDR class openings. Strong SDR-to-AE pipeline." },
  { id:33, track:"WFH Now", company:"Raymond James", role:"New Accounts Service Associate", url:"https://www.raymondjames.com/careers", location:"Southfield, MI", mode:"In-Person", pay:"Paid training + benefits", commute:"~15 min from Ferndale", repvue:"", summary:"Fortune 500 financial services firm with a major operations hub in Southfield. Paid training class starting June 2026. Client-facing role supporting financial advisors. Strong benefits, long-term career path.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Paid training starts June 2026 — apply now for pipeline. Southfield location is one of their 3 main hubs." },
  { id:34, track:"WFH Now", company:"Raymond James", role:"Customer Account Associate", url:"https://www.raymondjames.com/careers", location:"Southfield, MI", mode:"In-Person", pay:"Est. $38K–$56K", commute:"~15 min from Ferndale", repvue:"", summary:"Client-facing operations role at Raymond James Southfield hub. Handle customer accounts, transfers, and administrative support for financial advisors. Stable Fortune 500 employer with full benefits.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Currently posted and actively hiring. Your mortgage/finance background is a direct fit." },
  { id:35, track:"WFH Now", company:"NTT DATA", role:"Customer Care Associate", url:"https://www.nttdata.com/global/en/careers", location:"Detroit, MI (Remote)", mode:"Remote", pay:"$20/hr", commute:"Remote", repvue:"", summary:"Global IT services company. Remote customer care role based in Detroit metro. $20/hr. Better resume line than generic call center — NTT DATA is a recognized global tech brand.", dateApplied:"", followUp:"", status:"Watchlist", notes:"$20/hr remote. Global IT services company — good brand on resume while pursuing tech sales." },
  { id:36, track:"WFH Now", company:"CVS / Aetna", role:"Customer Service Rep – Behavioral Health", url:"https://jobs.cvshealth.com/", location:"Remote", mode:"Remote", pay:"Competitive hourly + benefits", commute:"Remote", repvue:"", summary:"Remote customer service for behavioral health division. Monday–Friday schedule. Healthcare is stable, CVS/Aetna is a major employer with benefits from day one. Clear M-F hours, no weekends.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Mon–Fri 11am–7:30pm EST. No weekends. Stable healthcare employer with immediate benefits." },
  { id:37, track:"WFH Now", company:"Concentrix", role:"Customer Service / Tech Support – Tech Products (Remote)", url:"https://jobs.concentrix.com/job-search/", location:"Remote (MI eligible)", mode:"Remote", pay:"~$16–$20/hr", commute:"Remote", repvue:"", summary:"Tech product support from home — troubleshoot and assist customers with technology products via phone and chat. Equipment provided, paid training. More interesting than financial services track if you prefer tech.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Tech-focused version of Concentrix role. Apply to multiple Concentrix listings to increase odds." },
  { id:38, track:"Tech Sales", company:"BuildingLink", role:"Sales Development Representative", url:"https://builtin.com/job/us-remote-sales-development-representative-sdr/2371199", location:"Remote (US)", mode:"Remote", pay:"$60K base / $80K OTE · Flexible PTO", commute:"Remote", repvue:"", summary:"Entry-level SDR role at a property management SaaS company. Cold calling, email, and personalized video outreach. BuildingLink provides full training and a clear path to Account Executive. Fully remote-first with flexible PTO.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Entry-level friendly — they explicitly mention training and mentorship. Good stepping stone to AE." },
  { id:39, track:"Tech Sales", company:"Polestar", role:"Customer Experience Advisor", url:"https://about.polestar.com/careers/jobs/", location:"Remote (contract)", mode:"Remote", pay:"Competitive hourly · Contract-to-hire", commute:"Remote", repvue:"", summary:"Remote customer experience role for the Polestar EV brand — own the customer journey via phone, email, and chat. Brand ambassador role with potential conversion to full-time. Automotive CX meets EV — perfect overlap with your Fast Track targets.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Contract-to-hire. Strong overlap with your EV track. Polestar is premium brand — great resume line. Check about.polestar.com/careers for current openings." },
  { id:40, track:"Fast Track", company:"Electrify America", role:"Customer Support Representative", url:"https://www.electrifyamerica.com/careers/", location:"Remote", mode:"Remote", pay:"$26–$45/hr est.", commute:"Remote", repvue:"", summary:"America's largest public EV charging network — remote customer support via phone, chat, and SMS helping EV drivers with charging issues. Operated via Agero partnership. Strong EV brand, fully remote, directly tied to the EV ecosystem you're targeting.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Check electrifyamerica.com/careers and Agero careers for active postings. EV-specific brand — excellent alongside Rivian/Tesla applications." },
  { id:41, track:"Tech Sales", company:"Rippling", role:"Sales Development Representative (Outbound)", url:"https://ats.rippling.com/rippling/jobs/1a4b7784-718d-4180-9f71-5f6c07c469a1", location:"Remote (US)", mode:"Remote", pay:"$69K–$99K OTE est.", commute:"Remote", repvue:"", summary:"Outbound SDR at one of the fastest-growing HR/IT/Finance SaaS platforms. Prospect and qualify new customers and channel partners. High-velocity top-of-funnel role with strong upside. Rippling is a unicorn-status company with rapid growth.", dateApplied:"", followUp:"", status:"Watchlist", notes:"Competitive role at a top-tier SaaS company. Your consultative mortgage background is a strong angle for HR/payroll product selling." },
];

function Badge({ label, colors }) {
  return <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:12, background:colors.bg, color:colors.text, border:`1px solid ${colors.border||colors.bg}`, whiteSpace:"nowrap" }}>{label}</span>;
}

function OverdueDot({ followUp }) {
  if (!followUp) return null;
  const overdue = new Date(followUp) < new Date();
  return <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background: overdue?"#EF4444":"#10B981", marginRight:5, flexShrink:0 }} title={overdue?"Follow-up overdue":"Upcoming"} />;
}

function JobCard({ job, aiPanel, setAiPanel, aiMode, setAiMode, aiResult, setAiResult, jdInput, setJdInput, aiLoading, runAI, updateStatus, openForm, deleteJob, editingNotes, setEditingNotes, saveNotes }) {
  const [localNotes, setLocalNotes] = useState("");
  return (
    <div style={{ background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"14px 16px", marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:4 }}>
            <span style={{ fontWeight:500, fontSize:15 }}>{job.company}</span>
            <span style={{ fontSize:13, color:"var(--color-text-secondary)" }}>— {job.role}</span>
            {job.repvue && <span style={{ fontSize:11, fontWeight:700, padding:"1px 6px", borderRadius:4, background:"#1a2744", color:"#fff" }}>RepVue {job.repvue}</span>}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <Badge label={job.status} colors={STATUS_COLORS[job.status]} />
            <Badge label={job.mode} colors={{ bg: MODE_COLORS[job.mode]?.bg||"#f3f4f6", text: MODE_COLORS[job.mode]?.text||"#374151", border: MODE_COLORS[job.mode]?.bg||"#f3f4f6" }} />
            <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>{job.location}</span>
          </div>
          <p style={{ margin:"6px 0 0", fontSize:13, color:"var(--color-text-secondary)", lineHeight:1.55 }}>{job.pay}</p>
        </div>
        <div style={{ display:"flex", gap:5, alignItems:"center", flexShrink:0, flexWrap:"wrap" }}>
          <select value={job.status} onChange={e=>updateStatus(job.id,e.target.value)}
            style={{ fontSize:12, padding:"3px 6px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", cursor:"pointer" }}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={()=>{ setAiPanel(aiPanel?.id===job.id?null:job); setAiResult(""); setJdInput(""); }}
            style={{ fontSize:12, padding:"3px 10px", cursor:"pointer", background:aiPanel?.id===job.id?"var(--color-background-info)":"transparent", color:aiPanel?.id===job.id?"var(--color-text-info)":"var(--color-text-primary)", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>AI</button>
          <button onClick={()=>openForm(job)} style={{ fontSize:12, padding:"3px 8px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Edit</button>
          <button onClick={()=>deleteJob(job.id)} style={{ fontSize:12, padding:"3px 8px", cursor:"pointer", color:"var(--color-text-danger)", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Del</button>
        </div>
      </div>

      <p style={{ margin:"10px 0 0", fontSize:13, color:"var(--color-text-secondary)", lineHeight:1.6, borderLeft:"2px solid var(--color-border-tertiary)", paddingLeft:10 }}>{job.summary}</p>

      <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:8, flexWrap:"wrap" }}>
        {job.dateApplied && <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>Applied {job.dateApplied}</span>}
        {job.followUp && <span style={{ fontSize:12, color:"var(--color-text-secondary)", display:"flex", alignItems:"center" }}><OverdueDot followUp={job.followUp} />Follow-up {job.followUp}</span>}
        {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:"var(--color-text-info)", textDecoration:"none" }}>Job link ↗</a>}
      </div>

      {/* Notes */}
      <div style={{ marginTop:10, borderTop:"0.5px solid var(--color-border-tertiary)", paddingTop:8 }}>
        {editingNotes===job.id ? (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <textarea value={localNotes} onChange={e=>setLocalNotes(e.target.value)} rows={3}
              style={{ fontSize:13, padding:8, borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", resize:"vertical", width:"100%", boxSizing:"border-box" }} />
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={()=>saveNotes(job.id, localNotes)} style={{ fontSize:12, padding:"3px 10px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Save</button>
              <button onClick={()=>setEditingNotes(null)} style={{ fontSize:12, padding:"3px 10px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
            <p style={{ margin:0, fontSize:13, color: job.notes?"var(--color-text-primary)":"var(--color-text-tertiary)" }}>{job.notes||"No interview notes yet."}</p>
            <button onClick={()=>{ setEditingNotes(job.id); setLocalNotes(job.notes||""); }} style={{ fontSize:12, padding:"2px 8px", cursor:"pointer", flexShrink:0, border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Edit notes</button>
          </div>
        )}
      </div>

      {/* AI Panel */}
      {aiPanel?.id===job.id && (
        <div style={{ marginTop:12, borderTop:"0.5px solid var(--color-border-tertiary)", paddingTop:10 }}>
          <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
            {AI_MODES.map(m=>(
              <button key={m.id} onClick={()=>{ setAiMode(m.id); setAiResult(""); }}
                style={{ fontSize:12, padding:"4px 12px", cursor:"pointer", background:aiMode===m.id?"var(--color-background-info)":"transparent", color:aiMode===m.id?"var(--color-text-info)":"var(--color-text-secondary)", fontWeight:aiMode===m.id?500:400, border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>
                {m.label}
              </button>
            ))}
          </div>
          {(aiMode==="analyze"||aiMode==="cover") && (
            <textarea placeholder="Paste job description here (optional but recommended)..." value={jdInput} onChange={e=>setJdInput(e.target.value)} rows={3}
              style={{ width:"100%", fontSize:13, padding:8, borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", resize:"vertical", boxSizing:"border-box", marginBottom:8 }} />
          )}
          <button onClick={()=>runAI(job)} disabled={aiLoading} style={{ fontSize:13, padding:"6px 14px", cursor:"pointer", marginBottom:10, border:"0.5px solid var(--color-border-secondary)", borderRadius:6, background:aiLoading?"var(--color-background-secondary)":"var(--color-background-primary)" }}>
            {aiLoading?"Running...": `Run — ${AI_MODES.find(m=>m.id===aiMode)?.label}`}
          </button>
          {aiResult && (
            <div style={{ fontSize:13, lineHeight:1.7, background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"10px 14px", whiteSpace:"pre-wrap", color:"var(--color-text-primary)" }}>
              {aiResult}
            </div>
          )}
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jst_jobs_v2");
      const deletedIds = new Set(JSON.parse(localStorage.getItem("jst_deleted_ids") || "[]"));
      if (saved) {
        const savedJobs = JSON.parse(saved);
        const savedIds = new Set(savedJobs.map(j => j.id));
        const newJobs = INITIAL_JOBS.filter(j => !savedIds.has(j.id) && !deletedIds.has(j.id));
        const merged = [...savedJobs, ...newJobs];
        setJobs(merged);
        if (newJobs.length > 0) localStorage.setItem("jst_jobs_v2", JSON.stringify(merged));
      } else {
        setJobs(INITIAL_JOBS);
        localStorage.setItem("jst_jobs_v2", JSON.stringify(INITIAL_JOBS));
      }
    } catch { setJobs(INITIAL_JOBS); }
    setLoaded(true);
  }, []);

  const save = async (updated) => {
    setJobs(updated);
    try { localStorage.setItem("jst_jobs_v2", JSON.stringify(updated)); } catch {}
  };

  const openForm = (job = null) => setForm(job ? { ...job } : { id: Date.now(), track:"Fast Track", company:"", role:"", url:"", location:"", mode:"In-Person", pay:"", commute:"", repvue:"", summary:"", dateApplied:"", followUp:"", status:"Watchlist", notes:"" });

  const submitForm = async () => {
    if (!form.company || !form.role) return;
    const exists = jobs.find(j => j.id === form.id);
    await save(exists ? jobs.map(j => j.id === form.id ? form : j) : [form, ...jobs]);
    setForm(null);
  };

  const deleteJob = async (id) => {
    await save(jobs.filter(j => j.id !== id));
    if (aiPanel?.id === id) setAiPanel(null);
    try {
      const deleted = JSON.parse(localStorage.getItem("jst_deleted_ids") || "[]");
      localStorage.setItem("jst_deleted_ids", JSON.stringify([...deleted, id]));
    } catch {}
  };

  const updateStatus = async (id, status) => save(jobs.map(j => j.id === id ? { ...j, status } : j));

  const saveNotes = async (id, notes) => {
    await save(jobs.map(j => j.id === id ? { ...j, notes } : j));
    setEditingNotes(null);
  };

  const runAI = async (job) => {
    setAiLoading(true); setAiResult("");
    const prompts = {
      analyze: `You are a career advisor. Analyze this job for Carter — a sales professional with ~6.5 years experience in mortgage lending (UWM Account Executive 4.5 yrs, Align Lending MLO), now targeting tech sales SDR/BDR and EV/service advisor roles. He has a BA in Communication from Michigan State.\n\nJob: ${job.role} at ${job.company}\nLocation: ${job.location}\nPay: ${job.pay}\n${jdInput ? `\nJob description:\n${jdInput}` : ""}\n\nProvide: 1) Fit score (1-10) with brief reasoning, 2) Top 3 talking points from his background, 3) Any red flags or concerns. Be direct and concise.`,
      cover: `Write a confident, concise outreach message (LinkedIn DM or email) for Carter applying to: ${job.role} at ${job.company}.\nHis background: ~6.5 yrs sales (mortgage lending/UWM AE), BA Communication from MSU, targeting tech/EV sales.\n${jdInput ? `\nContext from JD: ${jdInput.slice(0,500)}` : ""}\n\nUnder 150 words. No fluff. Sound human, not templated.`,
      next: `You are a job search coach. Carter is applying to ${job.role} at ${job.company}.\nStatus: ${job.status} | Date applied: ${job.dateApplied||"unknown"} | Follow-up date: ${job.followUp||"not set"}\nNotes: ${job.notes||"none"}\n\nGive 2-3 specific, actionable next steps for this exact stage. No generic advice.`
    };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{ role:"user", content: prompts[aiMode] }] })
      });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text || "No response.");
    } catch { setAiResult("Error reaching AI. Try again."); }
    setAiLoading(false);
  };

  const stats = STATUSES.reduce((a,s) => ({ ...a, [s]: jobs.filter(j=>j.status===s).length }), {});
  const fastTrack = jobs.filter(j => j.track==="Fast Track" && (filterStatus==="All"||j.status===filterStatus));
  const techSales = jobs.filter(j => j.track==="Tech Sales" && (filterStatus==="All"||j.status===filterStatus));
  const wfhNow = jobs.filter(j => j.track==="WFH Now" && (filterStatus==="All"||j.status===filterStatus));

  if (!loaded) return <div style={{ padding:"2rem", color:"var(--color-text-secondary)", fontSize:14 }}>Loading...</div>;

  const cardProps = { aiPanel, setAiPanel, aiMode, setAiMode, aiResult, setAiResult, jdInput, setJdInput, aiLoading, runAI, updateStatus, openForm, deleteJob, editingNotes, setEditingNotes, saveNotes };

  return (
    <div style={{ fontFamily:"var(--font-sans)", padding:"1.25rem", maxWidth:900, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
        <div>
          <h2 style={{ margin:0, fontSize:18, fontWeight:500 }}>Job search tracker</h2>
          <p style={{ margin:"2px 0 0", fontSize:13, color:"var(--color-text-secondary)" }}>{jobs.length} roles · March 2026</p>
        </div>
        <button onClick={()=>openForm()} style={{ fontSize:13, padding:"6px 14px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6, background:"var(--color-background-primary)" }}>+ Add role</button>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:"1.25rem" }}>
        {STATUSES.map(s=>(
          <div key={s} onClick={()=>setFilterStatus(filterStatus===s?"All":s)}
            style={{ background:filterStatus===s?STATUS_COLORS[s].bg:"var(--color-background-secondary)", border:`0.5px solid ${filterStatus===s?STATUS_COLORS[s].border:"var(--color-border-tertiary)"}`, borderRadius:"var(--border-radius-md)", padding:"8px 10px", cursor:"pointer", textAlign:"center", transition:"all 0.15s ease" }}>
            <div style={{ fontSize:18, fontWeight:500, color:STATUS_COLORS[s].text }}>{stats[s]||0}</div>
            <div style={{ fontSize:11, color:"var(--color-text-secondary)", marginTop:2 }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Track 1 */}
      {fastTrack.length > 0 && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0 12px" }}>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
            <span style={{ fontSize:12, fontWeight:500, color:"#065F46", whiteSpace:"nowrap" }}>Track 1 · Fast Track — High Opportunity</span>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
          </div>
          {fastTrack.map(job => <JobCard key={job.id} job={job} {...cardProps} />)}
        </>
      )}

      {/* Track 2 */}
      {techSales.length > 0 && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0 12px" }}>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
            <span style={{ fontSize:12, fontWeight:500, color:"#4338CA", whiteSpace:"nowrap" }}>Track 2 · Tech Sales — SDR/BDR (RepVue Vetted)</span>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
          </div>
          {techSales.map(job => <JobCard key={job.id} job={job} {...cardProps} />)}
        </>
      )}

      {/* Track 3 */}
      {wfhNow.length > 0 && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0 12px" }}>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
            <span style={{ fontSize:12, fontWeight:500, color:"#9A3412", whiteSpace:"nowrap" }}>Track 3 · WFH Now — Remote, Hiring Fast</span>
            <div style={{ flex:1, height:"0.5px", background:"var(--color-border-tertiary)" }} />
          </div>
          {wfhNow.map(job => <JobCard key={job.id} job={job} {...cardProps} />)}
        </>
      )}

      {fastTrack.length===0 && techSales.length===0 && wfhNow.length===0 && (
        <div style={{ textAlign:"center", padding:"3rem 0", color:"var(--color-text-secondary)", fontSize:14 }}>No roles match that filter.</div>
      )}

      {/* Add/Edit Modal */}
      {form && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}
          onClick={e=>{ if(e.target===e.currentTarget) setForm(null); }}>
          <div style={{ background:"var(--color-background-primary)", borderRadius:"var(--border-radius-lg)", border:"0.5px solid var(--color-border-tertiary)", padding:"1.5rem", width:"100%", maxWidth:480, boxSizing:"border-box", margin:"1rem", maxHeight:"90vh", overflowY:"auto" }}>
            <h3 style={{ margin:"0 0 1.25rem", fontSize:16, fontWeight:500 }}>{jobs.find(j=>j.id===form.id)?"Edit role":"Add role"}</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[["Company","company",""],["Role","role",""],["URL","url","https://..."],["Location","location",""],["Pay","pay",""],["Commute","commute",""],["RepVue Score","repvue",""],["Date applied","dateApplied","YYYY-MM-DD"],["Follow-up date","followUp","YYYY-MM-DD"]].map(([lbl,key,ph])=>(
                <div key={key}>
                  <label style={{ fontSize:12, color:"var(--color-text-secondary)", display:"block", marginBottom:4 }}>{lbl}</label>
                  <input value={form[key]||""} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph}
                    style={{ width:"100%", fontSize:13, padding:"6px 10px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", boxSizing:"border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize:12, color:"var(--color-text-secondary)", display:"block", marginBottom:4 }}>Track</label>
                <select value={form.track} onChange={e=>setForm({...form,track:e.target.value})}
                  style={{ width:"100%", fontSize:13, padding:"6px 10px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)" }}>
                  <option>Fast Track</option><option>Tech Sales</option><option>WFH Now</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, color:"var(--color-text-secondary)", display:"block", marginBottom:4 }}>Mode</label>
                <select value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})}
                  style={{ width:"100%", fontSize:13, padding:"6px 10px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)" }}>
                  <option>In-Person</option><option>Remote</option><option>Hybrid</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, color:"var(--color-text-secondary)", display:"block", marginBottom:4 }}>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}
                  style={{ width:"100%", fontSize:13, padding:"6px 10px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)" }}>
                  {STATUSES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, color:"var(--color-text-secondary)", display:"block", marginBottom:4 }}>Summary</label>
                <textarea value={form.summary||""} onChange={e=>setForm({...form,summary:e.target.value})} rows={3}
                  style={{ width:"100%", fontSize:13, padding:"6px 10px", borderRadius:6, border:"0.5px solid var(--color-border-secondary)", background:"var(--color-background-secondary)", color:"var(--color-text-primary)", resize:"vertical", boxSizing:"border-box" }} />
              </div>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:"1.25rem", justifyContent:"flex-end" }}>
              <button onClick={()=>setForm(null)} style={{ fontSize:13, padding:"6px 14px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6 }}>Cancel</button>
              <button onClick={submitForm} disabled={!form.company||!form.role} style={{ fontSize:13, padding:"6px 14px", cursor:"pointer", border:"0.5px solid var(--color-border-secondary)", borderRadius:6, opacity:(!form.company||!form.role)?0.5:1 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
