import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, Mail, MapPin, Download, ExternalLink,
  Users, ClipboardList, CalendarCheck, MessageSquare, UserCheck,
  FileText, HeartHandshake, Handshake, Truck, Package, ShieldCheck,
  Boxes, ClipboardCheck, LineChart, Wrench, Sparkles, ChevronRight,
  GraduationCap, Target, Zap, Compass, Gauge, ListChecks, Smile,
  UserPlus, PhoneCall, Sun, Moon
} from "lucide-react";
import BeyondPage from "./components/BeyondPage";

/* ---------------------------------------------------------------
   PROFILE DATA
--------------------------------------------------------------- */
const PROFILE_PHOTO = "/profile.jpg";

const PROFILE = {
  name: "Vishnu Kumar M",
  headline: "MBA | HR & Operations Professional",
  careerDirection: "Aspiring HR Generalist",
  subhead: "Building People, Processes & Better Workplaces",
  intro:
    "MBA graduate specializing in HR & Marketing with hands-on operations and people-coordination experience. Experienced in employee training, team coordination, SOP implementation, franchise support, inventory management, and quality control. Currently building practical expertise to grow into a well-rounded HR Generalist.",
  phone: "8248605506",
  email: "vishnu235kumar@gmail.com",
  location: "Coimbatore, Tamil Nadu",
  status: "OPEN TO OPPORTUNITIES",
  roles: "HR Executive • HR Trainee • Entry-Level HR",
  availability: "Immediate Joiner",
};

const STATS = [
  { value: 3, suffix: "+", label: "Years Operations Experience" },
  { value: 8, suffix: "", label: "Employees Managed" },
  { value: 3, suffix: "", label: "Franchise Outlets Supported" },
  { value: 30, suffix: "+", label: "Items Managed" },
];

const RESPONSIBILITIES = [
  "Coordinated day-to-day operations while managing and supporting a team of up to 8 employees.",
  "Trained new employees on work procedures, recipe preparation, quality standards, hygiene, stock handling, and opening/closing procedures.",
  "Allocated employee shifts and duties.",
  "Coordinated employee attendance and leave requirements.",
  "Supported employee issue resolution and handled workplace conflicts.",
  "Participated in candidate interviews when required.",
  "Created and implemented SOPs.",
  "Supported 3 franchise outlets with operational guidance and recipe assistance.",
  "Coordinated transportation of required materials between the central kitchen and franchise locations.",
  "Managed purchasing and stock levels across 30+ items.",
  "Helped reduce wastage and improve inventory control.",
  "Performed quality checks covering recipe accuracy, portion control, ingredient quality, hygiene, preparation processes, storage, and expiry dates.",
  "Maintained daily income and expense records using Google Sheets.",
  "Coordinated vendor-related activities.",
];

const HR_SKILLS = [
  { icon: GraduationCap, label: "Employee Training" },
  { icon: Users, label: "Team Coordination" },
  { icon: CalendarCheck, label: "Shift & Duty Allocation" },
  { icon: ClipboardList, label: "Attendance & Leave Coordination" },
  { icon: MessageSquare, label: "Employee Conflict Resolution" },
  { icon: UserCheck, label: "Candidate Interviewing" },
  { icon: FileText, label: "SOP Development" },
  { icon: HeartHandshake, label: "Employee Support" },
  { icon: Handshake, label: "Franchise / Client Coordination" },
  { icon: Truck, label: "Vendor Coordination" },
];

const OPS_SKILLS = [
  { icon: Package, label: "Purchase Management" },
  { icon: Boxes, label: "Inventory Management" },
  { icon: ClipboardCheck, label: "Stock Control" },
  { icon: ShieldCheck, label: "Quality Control" },
  { icon: FileText, label: "SOP Implementation" },
  { icon: Handshake, label: "Franchise Support" },
  { icon: Truck, label: "Vendor Coordination" },
  { icon: LineChart, label: "Process Management" },
  { icon: Gauge, label: "Cost Control" },
  { icon: Users, label: "Team Coordination" },
];

const TOOLS = [
  "MS Excel", "Google Sheets", "Google Drive", "Gmail", "Canva", "AI Tools", "POS / Billing Software",
];

const EDUCATION = [
  {
    degree: "MBA — HR & Marketing",
    school: "RVS Institute of Management Studies",
    period: "2021 – 2025",
    score: "CGPA: 7.22 / 10",
  },
  {
    degree: "B.Com",
    school: "Kongunadu Arts and Science College, Bharathiar University",
    period: "2018 – 2021",
    score: "CGPA: 6.63 / 10",
  },
  {
    degree: "12th Standard",
    school: "Shree Dharmasastha Matriculation Higher Secondary School",
    period: "March 2018",
    score: "72.75%",
  },
  {
    degree: "10th Standard",
    school: "MJ Vincent Matriculation Higher Secondary School",
    period: "March 2016",
    score: "81.4%",
  },
];

const STRENGTHS = [
  { icon: Zap, label: "Quick Learner" },
  { icon: Compass, label: "Adaptable" },
  { icon: Sparkles, label: "Willing to Learn" },
  { icon: Gauge, label: "Calm Under Pressure" },
  { icon: ListChecks, label: "Organized" },
  { icon: Smile, label: "Responsible" },
];

const LANGUAGES = [
  { name: "Tamil", level: "Fluent" },
  { name: "English", level: "Good comprehension; developing spoken fluency" },
];

const ROADMAP = ["Learn", "Apply", "Grow", "Become an HR Generalist"];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

/* ---------------------------------------------------------------
   UTILITY HOOKS & COMPONENTS
--------------------------------------------------------------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; key?: React.Key }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 1100;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setN(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
      else setN(value);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value">
        {n}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function BackgroundFX() {
  const dots = [
    { top: "12%", left: "8%", size: 6, dur: "9s" },
    { top: "22%", left: "82%", size: 4, dur: "11s" },
    { top: "38%", left: "18%", size: 5, dur: "8s" },
    { top: "55%", left: "70%", size: 7, dur: "12s" },
    { top: "68%", left: "12%", size: 4, dur: "10s" },
    { top: "78%", left: "88%", size: 5, dur: "9.5s" },
  ];

  return (
    <div className="vp-bgfx" aria-hidden="true">
      <div className="vp-grid-overlay" />
      <div className="vp-wave" style={{ top: "5%" }} />
      <div className="vp-wave" style={{ bottom: "-6%", animationDelay: "9s", animationDirection: "reverse" }} />
      {dots.map((d, i) => (
        <span
          key={i}
          className="vp-dot"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, animationDuration: d.dur }}
        />
      ))}
    </div>
  );
}

function RoadmapBar() {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {ROADMAP.map((step, i) => (
          <React.Fragment key={step}>
            <span className="vp-glass px-4 py-2 text-sm font-medium" style={{ color: "var(--text)" }}>{step}</span>
            {i < ROADMAP.length - 1 && <ChevronRight size={16} style={{ color: "var(--muted)" }} />}
          </React.Fragment>
        ))}
      </div>
      <div className="vp-roadmap-line">
        <div className={`vp-roadmap-fill ${visible ? "vp-in" : ""}`} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN APPLICATION
--------------------------------------------------------------- */
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [avatarError, setAvatarError] = useState(false);
  const [route, setRoute] = useState(() =>
    typeof window !== "undefined" && window.location.pathname === "/beyond" ? "beyond" : "home"
  );

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname === "/beyond" ? "beyond" : "home");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, "", path);
    setRoute(path === "/beyond" ? "beyond" : "home");
    window.scrollTo(0, 0);
  }, []);

  // IntersectionObserver for Section Active State
  useEffect(() => {
    if (route !== "home") return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [route]);

  // Scroll active nav button into view
  useEffect(() => {
    const activeBtn = document.querySelector(`[data-nav-id="${activeSection}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeSection]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const downloadVCard = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Vishnu Kumar M",
      "TEL;TYPE=CELL:8248605506",
      "EMAIL:vishnu235kumar@gmail.com",
      "ADR:;;Coimbatore;Tamil Nadu;;;India",
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Vishnu_Kumar_M.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  if (route === "beyond") {
    return <BeyondPage dark={dark} onBack={() => navigate("/")} />;
  }

  return (
    <div className={dark ? "vp-root vp-dark" : "vp-root vp-light"}>
      <style>{`
        .vp-root {
          --bg: #070B14;
          --bg-2: #0B1120;
          --glass: rgba(255,255,255,0.05);
          --glass-border: rgba(255,255,255,0.10);
          --glass-strong: rgba(255,255,255,0.08);
          --text: #E9EDF5;
          --muted: #93A0B4;
          --blue: #4C8DFF;
          --purple: #9B6BFF;
          --cyan: #35D6D0;
          --accent-grad: linear-gradient(120deg, var(--blue), var(--purple) 55%, var(--cyan));
          font-family: 'Sora', 'Inter', ui-sans-serif, system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .vp-root.vp-light {
          --bg: #F5F7FB;
          --bg-2: #FFFFFF;
          --glass: rgba(20,30,50,0.04);
          --glass-border: rgba(20,30,50,0.10);
          --glass-strong: rgba(20,30,50,0.06);
          --text: #131A2A;
          --muted: #5B6474;
        }
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .vp-root * { box-sizing: border-box; }
        .vp-body-font { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        .vp-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.35;
          z-index: 0;
          animation: vp-float 22s ease-in-out infinite;
        }
        @keyframes vp-float {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.08); }
        }

        /* Clean Top Header Bar */
        .vp-header {
          position: relative; z-index: 30;
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          max-width: 72rem; margin: 0 auto;
        }

        /* -------------------------------------------------------------
           PROFESSIONAL HORIZONTAL NAVIGATION STRIP
           Placed immediately AFTER Home/Hero, BEFORE About Me
        ------------------------------------------------------------- */
        .vp-horizontal-navbar {
          position: fixed; top: 82px; left: 50%; transform: translateX(-50%); z-index: 50;
          max-width: 52rem; width: calc(100% - 32px); margin: 0;
          padding: 6px 12px;
          background: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          display: flex; align-items: center; justify-content: flex-start;
        }
        @media (min-width: 640px) {
          .vp-horizontal-navbar {
            justify-content: center;
          }
        }
        .vp-light .vp-horizontal-navbar {
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .vp-nav-container {
          display: flex; align-items: center; gap: 6px;
          overflow-x: auto;
          width: 100%;
          justify-content: flex-start;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2px 4px;
        }
        @media (min-width: 640px) {
          .vp-nav-container {
            justify-content: center;
          }
        }
        .vp-nav-container::-webkit-scrollbar { display: none; }

        .vp-nav-button {
          background: none; border: none; cursor: pointer;
          color: var(--muted);
          font-size: 0.85rem; font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
          white-space: nowrap;
          transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          position: relative;
        }
        .vp-nav-button:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.06);
        }
        .vp-nav-button.active {
          color: #FFFFFF;
          background: var(--accent-grad);
          box-shadow: 0 4px 14px rgba(76, 141, 255, 0.35);
        }
        .vp-light .vp-nav-button.active {
          color: #070B14;
        }

        main section[id] { scroll-margin-top: 80px; }

        .vp-glass {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .vp-glass-strong {
          background: var(--glass-strong);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
        }

        .vp-card-hover { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .vp-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(140,150,255,0.35);
          box-shadow: 0 12px 32px rgba(60,80,200,0.15);
        }

        .vp-gradient-text {
          background: var(--accent-grad);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .vp-btn-primary {
          background: var(--accent-grad);
          color: #08101f;
          font-weight: 600;
          border-radius: 999px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter .2s ease;
          box-shadow: 0 10px 30px rgba(76,141,255,0.25);
        }
        .vp-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.06); }

        .vp-btn-ghost {
          border: 1px solid var(--glass-border);
          color: var(--text);
          border-radius: 999px;
          background: var(--glass);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .vp-btn-ghost:hover { border-color: rgba(140,150,255,0.5); transform: translateY(-2px); }

        .stat-card { text-align: center; padding: 20px 8px; }
        .stat-value {
          font-family: 'Sora', sans-serif; font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          background: var(--accent-grad);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .stat-label { color: var(--muted); font-size: 0.85rem; margin-top: 4px; }

        .vp-timeline-line {
          position: absolute; left: 15px; top: 8px; bottom: 8px; width: 2px;
          background: linear-gradient(var(--blue), var(--purple), var(--cyan));
          opacity: 0.5;
        }
        .vp-timeline-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--accent-grad);
          box-shadow: 0 0 0 4px var(--glass);
        }

        .vp-roadmap-line { position: relative; height: 2px; background: var(--glass-border); overflow: hidden; }
        .vp-roadmap-fill {
          position: absolute; inset: 0; background: var(--accent-grad);
          transform: scaleX(0); transform-origin: left;
          transition: transform 1.4s cubic-bezier(.2,.8,.2,1);
        }
        .vp-roadmap-fill.vp-in { transform: scaleX(1); }

        .vp-toggle {
          width: 44px; height: 24px; border-radius: 999px;
          background: var(--glass-strong); border: 1px solid var(--glass-border);
          position: relative; cursor: pointer; transition: background 0.2s ease;
        }
        .vp-toggle-knob {
          position: absolute; top: 2px; width: 18px; height: 18px; border-radius: 50%;
          background: var(--accent-grad); transition: left 0.25s ease;
        }

        .vp-contact-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 18px 22px;
          border-bottom: 1px solid var(--glass-border); flex-wrap: wrap;
        }
        .vp-contact-row > a { margin-left: auto; }
        .vp-contact-card { border-radius: 24px; padding: 12px 8px; }
        .vp-contact-value { transition: color 0.2s ease; }
        .vp-contact-value:hover { color: var(--blue) !important; text-decoration: underline; text-underline-offset: 3px; }

        .vp-focus:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; border-radius: 8px; }

        .vp-badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #34D399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.25); animation: vp-pulse 2s ease-in-out infinite;
        }
        @keyframes vp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .vp-hero-title { font-family: 'Sora', sans-serif; font-weight: 800; letter-spacing: -0.02em; }

        .vp-avatar-ring {
          position: relative; width: 72px; height: 72px; border-radius: 50%; padding: 3px;
          background: var(--accent-grad); flex-shrink: 0; transition: transform 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
        }
        .vp-avatar-ring:hover {
          transform: scale(1.06);
        }
        .vp-avatar-inner {
          width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
          background: var(--glass); border: 1px solid var(--glass-border);
          display: flex; align-items: center; justify-content: center;
        }
        .vp-avatar-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ✦ Beyond the Resume Link (Tiny, subtle, muted discovery link) */
        .beyond-resume-discovery {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          color: var(--muted);
          font-size: 0.82rem;
          font-weight: 500;
          opacity: 0.65;
          letter-spacing: 0.02em;
          background: none; border: none; cursor: pointer;
          padding: 8px 16px;
          transition: opacity 0.25s ease, color 0.25s ease, text-shadow 0.25s ease;
          text-decoration: none;
        }
        .beyond-resume-discovery:hover {
          opacity: 1;
          color: var(--cyan);
          text-shadow: 0 0 10px rgba(53, 214, 208, 0.5);
        }

        .vp-bgfx { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .vp-grid-overlay {
          position: absolute; inset: -10%;
          background-image:
            linear-gradient(var(--glass-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
          background-size: 56px 56px; opacity: 0.35;
          -webkit-mask-image: radial-gradient(circle at 50% 10%, black, transparent 65%);
          mask-image: radial-gradient(circle at 50% 10%, black, transparent 65%);
        }
        .vp-dot {
          position: absolute; border-radius: 50%; background: var(--accent-grad); opacity: 0.5;
          animation: vp-dot-drift ease-in-out infinite alternate;
        }
        @keyframes vp-dot-drift { from { transform: translate(0,0); } to { transform: translate(24px, -34px); } }

        @media (prefers-reduced-motion: reduce) {
          .vp-root * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Layered Background Graphics */}
      <BackgroundFX />

      {/* Top Header Bar */}
      <header className="vp-header">
        <button
          onClick={() => scrollTo("home")}
          className="vp-hero-title text-xl font-bold vp-focus"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}
        >
          Vishnu Kumar
        </button>

        <button
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
          className="vp-toggle vp-focus"
          style={{ border: "none" }}
        >
          <span className="vp-toggle-knob" style={{ left: dark ? 22 : 2 }} />
          <Sun size={12} style={{ position: "absolute", left: 4, top: 5, opacity: dark ? 0 : 1, color: "#F5A524" }} />
          <Moon size={12} style={{ position: "absolute", right: 4, top: 5, opacity: dark ? 1 : 0, color: "#93A0B4" }} />
        </button>
      </header>

      <main className="relative z-10 vp-body-font">
        {/* ============================================================
            HOME / HERO SECTION
        ============================================================ */}
        <section id="home" className="max-w-6xl mx-auto px-6 pt-24 pb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 vp-glass px-4 py-1.5 mb-6" style={{ borderRadius: 999 }}>
              <span className="vp-badge-dot" />
              <span className="text-sm" style={{ color: "var(--text)" }}>{PROFILE.status}</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center gap-4 mb-4">
              <div className="vp-avatar-ring">
                <div className="vp-avatar-inner">
                  {!avatarError ? (
                    <img
                      src={PROFILE_PHOTO}
                      alt="Vishnu Kumar M"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <span className="font-bold text-lg text-cyan-400">VK</span>
                  )}
                </div>
              </div>
              <h1 className="vp-hero-title leading-tight" style={{ fontSize: "31px" }}>
                {PROFILE.name}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-2xl mb-1" style={{ color: "var(--text)" }}>
              {PROFILE.headline}
            </p>
            <p className="text-sm md:text-base mb-3" style={{ color: "var(--muted)" }}>
              {PROFILE.careerDirection}
            </p>
            <p className="text-lg md:text-xl vp-gradient-text mb-6 font-semibold">{PROFILE.subhead}</p>
          </Reveal>

          <Reveal delay={300}>
            <p className="max-w-2xl mb-4" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              {PROFILE.intro}
            </p>
            <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
              {PROFILE.roles} &nbsp;•&nbsp; {PROFILE.availability}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("resume")} className="vp-btn-primary vp-focus px-6 py-3 text-sm flex items-center gap-2" style={{ border: "none", cursor: "pointer" }}>
                View Resume <ExternalLink size={16} />
              </button>
              <button onClick={() => scrollTo("contact")} className="vp-btn-ghost vp-focus px-6 py-3 text-sm" style={{ cursor: "pointer" }}>
                Contact Me
              </button>
              <a
                href="/resume.pdf"
                download="Vishnu_Kumar_M_Resume.pdf"
                className="vp-btn-ghost vp-focus px-6 py-3 text-sm flex items-center gap-2"
                style={{ textDecoration: "none", color: "var(--text)", cursor: "pointer" }}
              >
                Download Resume <Download size={16} />
              </a>
            </div>
          </Reveal>
        </section>

        {/* ============================================================
            PART 2 & 5 & 7 & 8: PROFESSIONAL HORIZONTAL NAVIGATION BAR
            POSITION: IMMEDIATELY AFTER HERO, IMMEDIATELY BEFORE ABOUT ME
        ============================================================ */}
        <nav className="vp-horizontal-navbar" aria-label="Professional Section Navigation">
          <div className="vp-nav-container">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-nav-id={link.id}
                onClick={() => scrollTo(link.id)}
                className={`vp-nav-button ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ============================================================
            ABOUT ME
        ============================================================ */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">About Me</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="vp-glass p-8 mb-10">
              <p className="mb-4" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                I am an MBA graduate specializing in HR &amp; Marketing with practical experience in operations, employee coordination, training, SOP implementation, franchise support, purchasing, inventory management, and quality control.
              </p>
              <p className="mb-4" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                My experience has given me hands-on exposure to working with employees, training new team members, allocating duties, coordinating attendance and leave, resolving workplace issues, supporting franchise teams, and maintaining operational standards.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                My long-term goal is to build a career as an HR Generalist and gain practical exposure across recruitment, employee relations, HR operations, training and development, performance management, and other core HR functions.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="vp-glass">
                  <Stat value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            EXPERIENCE
        ============================================================ */}
        <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-2">Professional Experience</h2>
            <p className="mb-10" style={{ color: "var(--muted)" }}>
              Operations experience with strong people-management and HR-related responsibilities.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="vp-glass-strong p-6 md:p-8 mb-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>Food Scientist - Multi-Brand Cloud Kitchen</h3>
                </div>
                <span className="text-sm" style={{ color: "var(--muted)" }}>April 2022 – December 2025</span>
              </div>
              <p className="text-sm mb-2 vp-gradient-text font-semibold">Operations &amp; Administration</p>
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {PROFILE.location}
                </span>
                <a
                  href="https://www.foodscientist.co.in/home-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-cyan-500 hover:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
                >
                  <ExternalLink size={12} /> www.foodscientist.co.in
                </a>
              </div>
            </div>
          </Reveal>

          <div className="relative pl-10">
            <div className="vp-timeline-line" />
            {RESPONSIBILITIES.map((r, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="relative mb-5">
                  <span className="vp-timeline-dot absolute" style={{ left: -34, top: 6 }} />
                  <div className="vp-glass vp-card-hover p-4 text-sm" style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                    {r}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            SKILLS
        ============================================================ */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-2">HR &amp; People Skills</h2>
            <p className="mb-8 text-sm" style={{ color: "var(--muted)" }}>
              Practical, hands-on exposure gained through operations — actively building toward a full HR Generalist skill set.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {HR_SKILLS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="vp-glass vp-card-hover p-5 text-center h-full flex flex-col items-center gap-3">
                  <s.icon size={22} style={{ color: "var(--blue)" }} />
                  <span className="text-xs" style={{ color: "var(--text)" }}>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">Operations &amp; Business Skills</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {OPS_SKILLS.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="vp-glass vp-card-hover p-5 text-center h-full flex flex-col items-center gap-3">
                  <s.icon size={22} style={{ color: "var(--purple)" }} />
                  <span className="text-xs" style={{ color: "var(--text)" }}>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">Tools &amp; Technology</h2>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <div className="vp-glass vp-card-hover px-5 py-3 flex items-center gap-2">
                  <Wrench size={16} style={{ color: "var(--cyan)" }} />
                  <span className="text-sm" style={{ color: "var(--text)" }}>{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            EDUCATION
        ============================================================ */}
        <section id="education" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">Education</h2>
          </Reveal>
          <div className="relative pl-10 mb-16">
            <div className="vp-timeline-line" />
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 120}>
                <div className="relative mb-6">
                  <span className="vp-timeline-dot absolute" style={{ left: -34, top: 22 }} />
                  <div className="vp-glass vp-card-hover p-5 md:p-6">
                    <div className="flex items-start gap-3 mb-1">
                      <GraduationCap size={18} style={{ color: "var(--blue)", flexShrink: 0, marginTop: 2 }} />
                      <h3 className="font-semibold" style={{ color: "var(--text)" }}>{e.degree}</h3>
                    </div>
                    <p className="text-sm mb-2 break-words" style={{ color: "var(--muted)" }}>{e.school}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: "var(--muted)" }}>
                      <span>{e.period}</span>
                      <span className="vp-gradient-text font-semibold">{e.score}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Career Goal */}
          <Reveal>
            <div className="vp-glass-strong p-8 mb-16">
              <div className="flex items-center gap-2 mb-4">
                <Target size={20} style={{ color: "var(--cyan)" }} />
                <h2 className="vp-hero-title text-2xl">My Career Goal</h2>
              </div>
              <p className="mb-8" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                To grow into a well-rounded HR Generalist by gaining practical experience across recruitment, HR operations, employee relations, training and development, performance management, and other core HR functions.
              </p>
              <RoadmapBar />
            </div>
          </Reveal>

          {/* Strengths */}
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">Professional Strengths</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {STRENGTHS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <div className="vp-glass vp-card-hover p-5 flex items-center gap-3">
                  <s.icon size={18} style={{ color: "var(--blue)" }} />
                  <span className="text-sm" style={{ color: "var(--text)" }}>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Languages */}
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">Languages</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {LANGUAGES.map((l, i) => (
              <Reveal key={l.name} delay={i * 100}>
                <div className="vp-glass p-5">
                  <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>{l.name}</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>{l.level}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            RESUME
        ============================================================ */}
        <section id="resume" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="vp-hero-title text-3xl mb-8">My Resume</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="vp-glass-strong p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-4">
                <div className="vp-glass p-4" style={{ borderRadius: 14 }}>
                  <FileText size={28} style={{ color: "var(--blue)" }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--text)" }}>{PROFILE.name}</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>MBA — HR &amp; Marketing</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="vp-btn-primary vp-focus px-5 py-2.5 text-sm inline-flex items-center gap-2"
                  style={{ textDecoration: "none" }}
                >
                  View Resume <ExternalLink size={15} />
                </a>
                <a
                  href="/resume.pdf"
                  download="Vishnu_Kumar_M_Resume.pdf"
                  className="vp-btn-ghost vp-focus px-5 py-2.5 text-sm inline-flex items-center gap-2"
                  style={{ textDecoration: "none", color: "var(--text)" }}
                >
                  Download PDF <Download size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================================================
            CONTACT
        ============================================================ */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="vp-hero-title text-4xl md:text-5xl mb-4">Let's Connect</h2>
              <p className="max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
                I'm open to new HR opportunities, conversations, and ways to connect.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="vp-glass-strong vp-contact-card max-w-3xl mx-auto mb-6 overflow-hidden">
              <div className="vp-contact-row">
                <div className="flex items-center gap-4">
                  <span className="vp-glass p-3" style={{ borderRadius: 14 }}><Phone size={18} style={{ color: "var(--blue)" }} /></span>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>Phone</p>
                    <a href="tel:8248605506" className="font-medium vp-contact-value" style={{ color: "var(--text)", textDecoration: "none" }}>
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
                <a href="tel:8248605506" className="vp-btn-ghost px-4 py-2 text-sm inline-flex items-center gap-2 ml-auto" style={{ textDecoration: "none", color: "var(--blue)" }}>
                  <PhoneCall size={15} /> Call Me
                </a>
              </div>

              <div className="vp-contact-row">
                <div className="flex items-center gap-4">
                  <span className="vp-glass p-3" style={{ borderRadius: 14 }}><Mail size={18} style={{ color: "var(--purple)" }} /></span>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>Email</p>
                    <a href={`mailto:${PROFILE.email}`} className="font-medium vp-contact-value" style={{ color: "var(--text)", textDecoration: "none" }}>
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <a href={`mailto:${PROFILE.email}`} className="vp-btn-ghost px-4 py-2 text-sm inline-flex items-center gap-2 ml-auto" style={{ textDecoration: "none", color: "var(--purple)" }}>
                  <Mail size={15} /> Email Me
                </a>
              </div>

              <div className="vp-contact-row" style={{ borderBottom: "none" }}>
                <div className="flex items-center gap-4">
                  <span className="vp-glass p-3" style={{ borderRadius: 14 }}><MapPin size={18} style={{ color: "var(--cyan)" }} /></span>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>Location</p>
                    <span className="font-medium" style={{ color: "var(--text)" }}>{PROFILE.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex justify-center max-w-3xl mx-auto mb-6">
              <button onClick={downloadVCard} className="vp-btn-primary px-6 py-3 text-sm flex items-center justify-center gap-2" style={{ border: "none", cursor: "pointer" }}>
                <UserPlus size={18} /> Save Contact
              </button>
            </div>
          </Reveal>
        </section>

        {/* ============================================================
            PART 9: TINY "BEYOND THE RESUME" DISCOVERY LINK
            At the VERY END of professional portfolio, immediately before existing footer
        ============================================================ */}
       <div className="text-center py-6">
          <button
            onClick={() => navigate("/beyond")}
            className="beyond-resume-discovery"
            title="Discover more"
          >
            ✦ Beyond the Resume
          </button>
        </div>

        {/* ============================================================
            EXISTING FOOTER
        ============================================================ */}
        <footer className="border-t px-6 py-10 text-center" style={{ borderColor: "var(--glass-border)" }}>
          <p className="vp-hero-title" style={{ color: "var(--text)" }}>{PROFILE.name}</p>
          <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>MBA | HR &amp; Operations</p>
          <p className="text-sm italic mb-4" style={{ color: "var(--muted)" }}>Building my career in HR, one opportunity at a time.</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>© 2026 {PROFILE.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
