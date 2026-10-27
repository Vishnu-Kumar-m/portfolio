import React, { useState, useEffect, useRef } from "react";
import {
  Gamepad2,
  Cpu,
  Bike,
  UtensilsCrossed,
  Film,
  Globe,
  Brain,
  Lightbulb,
  Clock,
  Rocket,
  Video,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Target,
  Compass,
  Code,
  MapPin,
  TrendingUp,
  Terminal,
  Activity,
  Crosshair,
  Trophy,
  Flame,
  Radio,
  Volume2,
  Sword,
  Sliders,
  Sun,
  Moon
} from "lucide-react";
import { GameInfo, FloatingElement } from "../types";

/* ---------------------------------------------------------------
   GAME DATA & DEFINITIONS
--------------------------------------------------------------- */
const GAMES: GameInfo[] = [
  {
    id: "coc",
    name: "Clash of Clans",
    category: "Strategy • Mobile",
    description: "One of the games I keep coming back to.",
    iconType: "coc",
    longDescription:
      "Base building, strategy planning, clan warfare, and resource optimization. A classic mobile strategy game.",
  },
  {
    id: "bgmi",
    name: "BGMI",
    category: "Battle Royale • Mobile",
    description: "Battle royale gaming and casual matches.",
    iconType: "bgmi",
    longDescription:
      "Fast-paced tactical survival, team communication, split-second clutch plays, and intense zone rotations.",
  },
  {
    id: "drdriving",
    name: "Dr. Driving",
    category: "Driving • Mobile",
    description: "A simple driving game I enjoy playing.",
    iconType: "drdriving",
    longDescription:
      "Precision urban driving challenges, tight parking, traffic navigation, and casual mobile gameplay.",
  },
  {
    id: "random",
    name: "Random Mobile Games",
    category: "Mobile Gaming",
    description:
      "I like trying different mobile games whenever something catches my attention.",
    iconType: "random",
    longDescription:
      "Exploring novel gameplay mechanics, indie games, physics puzzles, and trending mobile releases.",
  },
];

/* ---------------------------------------------------------------
   EXTENDED FLOATING ELEMENTS & DYNAMIC LAYERS
--------------------------------------------------------------- */
const BG_PARTICLES = [
  { id: "p1", top: "12%", left: "8%", size: 4, dur: "24s", delay: "0s", anim: "floatParticleA" },
  { id: "p2", top: "28%", left: "88%", size: 6, dur: "32s", delay: "2s", anim: "floatParticleB" },
  { id: "p3", top: "62%", left: "12%", size: 5, dur: "20s", delay: "1s", anim: "floatParticleA" },
  { id: "p4", top: "75%", left: "82%", size: 4, dur: "26s", delay: "4s", anim: "floatParticleB" },
  { id: "p5", top: "42%", left: "45%", size: 6, dur: "22s", delay: "3s", anim: "floatParticleA" },
  { id: "p6", top: "88%", left: "25%", size: 5, dur: "28s", delay: "1.5s", anim: "floatParticleB" },
  { id: "p7", top: "18%", left: "75%", size: 4, dur: "25s", delay: "5s", anim: "floatParticleA" },
  { id: "p8", top: "92%", left: "70%", size: 5, dur: "30s", delay: "2.5s", anim: "floatParticleB" },
];

const MID_SHAPES = [
  { id: "m1", top: "22%", left: "20%", dur: "18s", delay: "0s", icon: Gamepad2, size: 26, anim: "floatMidA" },
  { id: "m2", top: "58%", left: "85%", dur: "24s", delay: "3s", icon: Target, size: 30, anim: "floatMidB" },
  { id: "m3", top: "35%", left: "6%", dur: "16s", delay: "1s", icon: Zap, size: 24, anim: "floatMidA" },
  { id: "m4", top: "82%", left: "78%", dur: "21s", delay: "2s", icon: Sliders, size: 28, anim: "floatMidB" },
  { id: "m5", top: "10%", left: "65%", dur: "19s", delay: "4s", icon: Shield, size: 26, anim: "floatMidA" },
];

const FLOATING_ITEMS = [
  { id: "f1", gameId: "coc", top: "10%", left: "6%", size: 52, dur: "14s", delay: "0s", anim: "floatFgA" },
  { id: "f2", gameId: "bgmi", top: "24%", left: "86%", size: 56, dur: "18s", delay: "2s", anim: "floatFgB" },
  { id: "f3", gameId: "drdriving", top: "52%", left: "8%", size: 48, dur: "16s", delay: "4s", anim: "floatFgC" },
  { id: "f4", gameId: "random", top: "70%", left: "84%", size: 52, dur: "20s", delay: "1s", anim: "floatFgD" },
  { id: "f5", gameId: "coc", top: "86%", left: "16%", size: 46, dur: "22s", delay: "3s", anim: "floatFgB" },
  { id: "f6", gameId: "bgmi", top: "38%", left: "91%", size: 44, dur: "15s", delay: "5s", anim: "floatFgC" },
  { id: "f7", gameId: "drdriving", top: "18%", left: "48%", size: 42, dur: "24s", delay: "2.5s", anim: "floatFgD" },
  { id: "f8", gameId: "random", top: "78%", left: "52%", size: 48, dur: "19s", delay: "3.5s", anim: "floatFgA" },
];

/* Custom Game Icon Renderer */
function GameIcon({ iconType, size = 24, className = "" }: { iconType: string; size?: number; className?: string }) {
  switch (iconType) {
    case "coc":
      return <Shield size={size} className={className} />;
    case "bgmi":
      return <Crosshair size={size} className={className} />;
    case "drdriving":
      return <Compass size={size} className={className} />;
    default:
      return <Gamepad2 size={size} className={className} />;
  }
}

/* Audio Visualizer Equalizer Bar */
function EqualizerBars({ count = 8 }: { count?: number }) {
  return (
    <div className="flex items-end gap-1 h-5 px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-500/30">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            height: `${25 + ((i * 37) % 75)}%`,
            animationDuration: `${0.4 + (i % 5) * 0.25}s`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Scroll reveal hook */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

function BeyondReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; key?: React.Key }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? "translateY(0)" : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN BEYOND PAGE COMPONENT
--------------------------------------------------------------- */
export default function BeyondPage({ onBack, dark: initialDark = true }: { onBack: () => void; dark?: boolean }) {
  const [dark, setDark] = useState<boolean>(initialDark);
  const [activePopupGame, setActivePopupGame] = useState<GameInfo | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (initialDark !== undefined) {
      setDark(initialDark);
    }
  }, [initialDark]);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close popup on global click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".floating-game-element") && !target.closest(".game-popup")) {
        setActivePopupGame(null);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Visual Shockwave Ripple on Click
  const handlePageClick = (e: React.MouseEvent) => {
    const ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClickRipples((prev) => [...prev.slice(-5), ripple]);
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 600);
  };

  const handleElementInteraction = (game: GameInfo, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(rect.left + rect.width / 2, 140), window.innerWidth - 140);
    const y = rect.top < 220 ? rect.bottom + 12 : rect.top - 12;
    setPopupPos({ x, y });
    setActivePopupGame(game);
  };

  return (
    <div className={`beyond-root ${dark ? "" : "light-mode"}`} onClick={handlePageClick}>
      <style>{`
        .beyond-root {
          --bg-beyond: #050811;
          --bg-card: rgba(11, 16, 32, 0.75);
          --glass-border: rgba(0, 240, 255, 0.2);
          --neon-cyan: #00F0FF;
          --neon-purple: #B026FF;
          --neon-emerald: #10B981;
          --neon-amber: #F59E0B;
          --neon-rose: #FF2A85;
          --text-main: #F1F5F9;
          --text-muted: #94A3B8;
          font-family: 'Sora', 'Inter', ui-sans-serif, system-ui, sans-serif;
          background: var(--bg-beyond);
          color: var(--text-main);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .beyond-root.light-mode {
          --bg-beyond: #F5F7FB;
          --bg-card: #FFFFFF;
          --glass-border: rgba(20, 30, 50, 0.12);
          --neon-cyan: #2563EB;
          --neon-purple: #7C3AED;
          --neon-emerald: #059669;
          --neon-amber: #D97706;
          --neon-rose: #E11D48;
          --text-main: #131A2A;
          --text-muted: #5B6474;
        }

        .beyond-root.light-mode .beyond-scanlines {
          opacity: 0.04;
          background: linear-gradient(
            rgba(255, 255, 255, 0) 50%, 
            rgba(0, 0, 0, 0.04) 50%
          );
        }

        .beyond-root.light-mode .beyond-grid {
          background-image: 
            linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px);
        }

        .beyond-root.light-mode .cyber-laser-beam {
          opacity: 0.25;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.3);
        }

        /* Light mode text colors */
        .beyond-root.light-mode .text-white {
          color: #0F172A !important;
        }

        .beyond-root.light-mode .text-slate-200 {
          color: #1E293B !important;
        }

        .beyond-root.light-mode .text-slate-300 {
          color: #334155 !important;
        }

        .beyond-root.light-mode .text-slate-400 {
          color: #64748B !important;
        }

        /* Light mode borders */
        .beyond-root.light-mode .border-slate-800,
        .beyond-root.light-mode .border-slate-800\/80,
        .beyond-root.light-mode .border-slate-700\/80 {
          border-color: rgba(203, 213, 225, 0.8) !important;
        }

        /* Top Back & Theme buttons in light mode */
        .beyond-root.light-mode .bg-slate-900\/90 {
          background-color: rgba(255, 255, 255, 0.95) !important;
          border-color: rgba(203, 213, 225, 0.9) !important;
          color: #1E293B !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06) !important;
        }

        .beyond-root.light-mode .bg-slate-900\/90:hover {
          border-color: #2563EB !important;
          color: #0F172A !important;
        }

        /* HUD status bar in light mode */
        .beyond-root.light-mode .hud-status-bar {
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(37, 99, 235, 0.25) !important;
          color: #475569 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Hero Gradient Title in Light Mode */
        .beyond-root.light-mode h1 {
          background-image: linear-gradient(to right, #1D4ED8, #7C3AED, #E11D48) !important;
          filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.15));
        }

        /* Tagline Box in light mode */
        .beyond-root.light-mode .neon-tagline-box {
          background: #FFFFFF !important;
          border-color: #2563EB !important;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.15), inset 0 0 10px rgba(37, 99, 235, 0.05) !important;
        }

        .beyond-root.light-mode .neon-tagline-box p {
          color: #1D4ED8 !important;
        }

        /* Color text accents in light mode */
        .beyond-root.light-mode .text-cyan-200 { color: #0369A1 !important; }
        .beyond-root.light-mode .text-purple-200 { color: #6B21A8 !important; }
        .beyond-root.light-mode .text-cyan-300 { color: #0284C7 !important; }
        .beyond-root.light-mode .text-cyan-400 { color: #2563EB !important; }
        .beyond-root.light-mode .text-purple-300,
        .beyond-root.light-mode .text-purple-400 { color: #7C3AED !important; }
        .beyond-root.light-mode .text-emerald-300,
        .beyond-root.light-mode .text-emerald-400 { color: #059669 !important; }
        .beyond-root.light-mode .text-amber-300,
        .beyond-root.light-mode .text-amber-400 { color: #D97706 !important; }
        .beyond-root.light-mode .text-rose-400 { color: #E11D48 !important; }

        /* Cards in light mode */
        .beyond-root.light-mode .beyond-card {
          background: #FFFFFF !important;
          border-color: rgba(203, 213, 225, 0.9) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04) !important;
        }

        .beyond-root.light-mode .beyond-card:hover {
          border-color: rgba(37, 99, 235, 0.5) !important;
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.12) !important;
        }

        /* Cyber corner marker in light mode */
        .beyond-root.light-mode .beyond-card::after {
          color: rgba(37, 99, 235, 0.4) !important;
        }

        /* Dark badge backgrounds in light mode */
        .beyond-root.light-mode .bg-cyan-950\/80,
        .beyond-root.light-mode .bg-cyan-950\/60 {
          background-color: #F0F9FF !important;
          border-color: rgba(14, 165, 233, 0.35) !important;
        }

        .beyond-root.light-mode .bg-purple-950\/80,
        .beyond-root.light-mode .bg-purple-950\/60 {
          background-color: #FAF5FF !important;
          border-color: rgba(168, 85, 247, 0.35) !important;
        }

        .beyond-root.light-mode .bg-emerald-950\/80,
        .beyond-root.light-mode .bg-emerald-950\/60 {
          background-color: #ECFDF5 !important;
          border-color: rgba(16, 185, 129, 0.35) !important;
        }

        .beyond-root.light-mode .bg-amber-950\/80,
        .beyond-root.light-mode .bg-amber-950\/60 {
          background-color: #FFFBEB !important;
          border-color: rgba(245, 158, 11, 0.35) !important;
        }

        .beyond-root.light-mode .bg-slate-900 {
          background-color: #F1F5F9 !important;
          border-color: #CBD5E1 !important;
          color: #0F172A !important;
        }

        /* Equalizer bar background in light mode */
        .beyond-root.light-mode .bg-slate-900\/80 {
          background-color: #F1F5F9 !important;
          border-color: rgba(37, 99, 235, 0.3) !important;
        }

        .beyond-root.light-mode .bg-cyan-400 {
          background-color: #2563EB !important;
        }

        /* Mission path steps in light mode */
        .beyond-root.light-mode .mission-step {
          background: #FFFFFF !important;
          border-color: rgba(203, 213, 225, 0.9) !important;
          color: #0F172A !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
        }

        .beyond-root.light-mode .mission-step:hover {
          border-color: #2563EB !important;
        }

        /* Floating elements & popup tooltips in light mode */
        .beyond-root.light-mode .floating-game-element {
          background: rgba(255, 255, 255, 0.92) !important;
          border: 1px solid rgba(37, 99, 235, 0.35) !important;
          color: #2563EB !important;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.15) !important;
        }

        .beyond-root.light-mode .floating-game-element::before {
          border-color: rgba(37, 99, 235, 0.3) !important;
        }

        .beyond-root.light-mode .floating-game-element:hover {
          color: #1D4ED8 !important;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3), inset 0 0 15px rgba(37, 99, 235, 0.1) !important;
        }

        .beyond-root.light-mode .game-popup {
          background: rgba(255, 255, 255, 0.97) !important;
          border: 1px solid #2563EB !important;
          box-shadow: 0 12px 36px rgba(37, 99, 235, 0.2) !important;
          color: #0F172A !important;
        }

        .beyond-root.light-mode .mid-shape {
          color: rgba(37, 99, 235, 0.25) !important;
        }

        .beyond-root.light-mode .bg-particle {
          background: rgba(37, 99, 235, 0.3) !important;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.3) !important;
        }

        /* HUD Tag in Light Mode */
        .beyond-root.light-mode .hud-tag {
          background: #E0F2FE !important;
          border-color: rgba(37, 99, 235, 0.35) !important;
          color: #1D4ED8 !important;
        }

        /* Food Costing Tool CTA Button in Light Mode */
        .beyond-root.light-mode .bg-amber-500 {
          background-color: #D97706 !important;
          color: #FFFFFF !important;
        }

        .beyond-root.light-mode .bg-amber-500:hover {
          background-color: #B45309 !important;
        }

        /* Footer in Light Mode */
        .beyond-root.light-mode footer {
          border-color: rgba(203, 213, 225, 0.8) !important;
        }

        /* ---------------- Scanlines & Grid FX ---------------- */
        .beyond-scanlines {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          opacity: 0.35;
        }

        .beyond-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(circle at 50% 30%, black, transparent 85%);
          mask-image: radial-gradient(circle at 50% 30%, black, transparent 85%);
        }

        .cyber-laser-beam {
          position: fixed; left: 0; width: 100%; height: 2px; pointer-events: none; z-index: 0;
          background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-purple), transparent);
          box-shadow: 0 0 15px var(--neon-cyan);
          opacity: 0.4;
          animation: laserSweep 12s linear infinite;
        }

        @keyframes laserSweep {
          0% { top: -5%; }
          100% { top: 105%; }
        }

        /* ---------------- Shockwave Ripple FX ---------------- */
        .shockwave-ripple {
          position: fixed; pointer-events: none; z-index: 99;
          width: 80px; height: 80px; border-radius: 50%;
          border: 2px solid var(--neon-cyan);
          transform: translate(-50%, -50%) scale(0.2);
          opacity: 1;
          box-shadow: 0 0 20px var(--neon-cyan);
          animation: shockwaveExpand 0.6s cubic-bezier(0, 0.5, 0.5, 1) forwards;
        }

        @keyframes shockwaveExpand {
          to {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
            border-color: var(--neon-purple);
          }
        }

        /* ---------------- Floating Game Elements & Dynamic Layers ---------------- */
        .floating-container {
          position: fixed; inset: 0; pointer-events: none; z-index: 2;
          overflow: hidden;
        }

        .bg-particle {
          position: absolute; pointer-events: none; border-radius: 50%;
          background: rgba(0, 240, 255, 0.35);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
          animation: ease-in-out infinite alternate;
        }

        @keyframes floatParticleA {
          0% { transform: translate(0, 0) scale(0.9); opacity: 0.2; }
          50% { transform: translate(45px, -65px) scale(1.3); opacity: 0.6; }
          100% { transform: translate(-30px, 40px) scale(0.8); opacity: 0.2; }
        }

        @keyframes floatParticleB {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-50px, 60px) scale(1.4); opacity: 0.7; }
          100% { transform: translate(40px, -50px) scale(0.9); opacity: 0.25; }
        }

        .mid-shape {
          position: absolute; pointer-events: none; display: flex; align-items: center; justify-content: center;
          color: rgba(0, 240, 255, 0.3);
          animation: ease-in-out infinite alternate;
        }

        @keyframes floatMidA {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, 35px) rotate(180deg); }
          100% { transform: translate(30px, -25px) rotate(360deg); }
        }

        @keyframes floatMidB {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(35px, -45px) rotate(-180deg); }
          100% { transform: translate(-35px, 30px) rotate(-360deg); }
        }

        .floating-game-element {
          position: absolute; pointer-events: auto; cursor: pointer;
          border-radius: 18px;
          background: rgba(11, 17, 34, 0.85);
          border: 1px solid rgba(0, 240, 255, 0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          color: var(--neon-cyan);
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.2);
          transition: transform 0.3s cubic-bezier(.16,1,.3,1), border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
          animation: ease-in-out infinite alternate;
        }

        /* Spinning HUD Ring around Floating Icons */
        .floating-game-element::before {
          content: '';
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1px dashed rgba(0, 240, 255, 0.4);
          animation: hudSpin 10s linear infinite;
        }

        @keyframes hudSpin {
          to { transform: rotate(360deg); }
        }

        .floating-game-element:hover,
        .floating-game-element:active {
          animation-play-state: paused !important;
          transform: scale(1.28) translateY(-4px) !important;
          border-color: var(--neon-cyan);
          color: #FFFFFF;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.3);
          z-index: 50;
        }

        @keyframes floatFgA {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(35px, -40px) rotate(12deg); }
          100% { transform: translate(-20px, 25px) rotate(-8deg); }
        }
        @keyframes floatFgB {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -35px) rotate(-15deg); }
          100% { transform: translate(25px, 30px) rotate(10deg); }
        }
        @keyframes floatFgC {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, 35px) rotate(8deg); }
          66% { transform: translate(-25px, -20px) rotate(-10deg); }
          100% { transform: translate(15px, 15px) rotate(5deg); }
        }
        @keyframes floatFgD {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, 20px) rotate(-12deg); }
          100% { transform: translate(30px, -30px) rotate(15deg); }
        }

        /* ---------------- Interactive Popup ---------------- */
        .game-popup {
          position: fixed; z-index: 100;
          transform: translate(-50%, -100%);
          width: 270px;
          background: rgba(8, 13, 26, 0.95);
          border: 1px solid var(--neon-cyan);
          border-radius: 18px;
          padding: 16px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 10px 40px rgba(0, 240, 255, 0.35);
          animation: popupFade 0.25s cubic-bezier(.16,1,.3,1);
          pointer-events: auto;
        }

        @keyframes popupFade {
          from { opacity: 0; transform: translate(-50%, -90%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }

        /* ---------------- HUD Elements & Cyber Cards ---------------- */
        .beyond-card {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative; overflow: hidden;
        }

        /* Cyberpunk Corner Bracket Markers */
        .beyond-card::after {
          content: '+';
          position: absolute; top: 8px; right: 12px;
          color: rgba(0, 240, 255, 0.4); font-family: monospace; font-size: 14px; font-weight: bold;
        }

        .beyond-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 240, 255, 0.5);
          box-shadow: 0 14px 40px rgba(0, 240, 255, 0.18);
        }

        .hud-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 14px; border-radius: 999px;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: var(--neon-cyan);
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* Glowing Neon Tagline Box */
        .neon-tagline-box {
          position: relative;
          background: rgba(11, 16, 32, 0.9);
          border: 1px solid var(--neon-cyan);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(0, 240, 255, 0.1);
          animation: taglinePulse 3s ease-in-out infinite alternate;
        }

        @keyframes taglinePulse {
          0% { border-color: rgba(0, 240, 255, 0.6); box-shadow: 0 0 20px rgba(0, 240, 255, 0.25); }
          100% { border-color: rgba(176, 38, 255, 0.8); box-shadow: 0 0 35px rgba(176, 38, 255, 0.4); }
        }

        .neon-glow-cyan { text-shadow: 0 0 14px rgba(0, 240, 255, 0.7); }
        .neon-glow-purple { text-shadow: 0 0 14px rgba(176, 38, 255, 0.7); }

        /* Timeline Mission Path */
        .mission-path {
          display: flex; gap: 12px; overflow-x: auto; padding-bottom: 12px;
          scrollbar-width: none;
        }
        .mission-path::-webkit-scrollbar { display: none; }

        .mission-step {
          flex: 0 0 auto;
          background: rgba(11, 17, 34, 0.85);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: 14px;
          padding: 14px 18px;
          display: flex; align-items: center; gap: 10px;
          font-size: 0.85rem; font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .mission-step:hover {
          border-color: var(--neon-cyan);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .mission-path { flex-direction: column; gap: 8px; }
          .mission-step { width: 100%; }
        }

        /* ✦ Back to Professional Portfolio Link */
        .beyond-back-link {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 500;
          opacity: 0.75;
          letter-spacing: 0.02em;
          background: none; border: none; cursor: pointer;
          padding: 8px 16px;
          transition: opacity 0.25s ease, color 0.25s ease, text-shadow 0.25s ease;
          text-decoration: none;
        }

        .beyond-back-link:hover {
          opacity: 1;
          color: var(--neon-cyan);
          text-shadow: 0 0 12px rgba(0, 240, 255, 0.7);
        }

        /* Health & Mana HUD Bar */
        .hud-status-bar {
          display: flex; align-items: center; gap: 16px;
          font-family: monospace; font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(8, 13, 26, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 12px; padding: 6px 14px;
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-game-element, .cyber-laser-beam { animation: none !important; }
          .beyond-root * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Grid Overlay & Scanlines */}
      <div className="beyond-scanlines" />
      <div className="beyond-grid" />
      <div className="cyber-laser-beam" />

      {/* Click Shockwave Ripples */}
      {clickRipples.map((r) => (
        <div
          key={r.id}
          className="shockwave-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}

      {/* Multi-layered Dynamic Gaming Background */}
      <div className="floating-container" aria-label="Dynamic gaming environment layers">
        {/* Layer 1: Background Particles */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px)`,
            transition: "transform 0.1s ease-out",
            pointerEvents: "none",
          }}
        >
          {BG_PARTICLES.map((p) => (
            <div
              key={p.id}
              className="bg-particle"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animationName: p.anim,
                animationDuration: p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Layer 2: Midground Abstract Shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)`,
            transition: "transform 0.1s ease-out",
            pointerEvents: "none",
          }}
        >
          {MID_SHAPES.map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.id}
                className="mid-shape"
                style={{
                  top: m.top,
                  left: m.left,
                  animationName: m.anim,
                  animationDuration: m.dur,
                  animationDelay: m.delay,
                }}
              >
                <IconComponent size={m.size} />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Foreground Game Icons */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.9}px)`,
            transition: "transform 0.15s ease-out",
            pointerEvents: "none",
          }}
        >
          {FLOATING_ITEMS.map((item) => {
            const game = GAMES.find((g) => g.id === item.gameId)!;
            return (
              <div
                key={item.id}
                className="floating-game-element"
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.size,
                  height: item.size,
                  animationName: item.anim,
                  animationDuration: item.dur,
                  animationDelay: item.delay,
                }}
                onMouseEnter={(e) => handleElementInteraction(game, e)}
                onClick={(e) => handleElementInteraction(game, e)}
                onTouchEnd={(e) => handleElementInteraction(game, e)}
                title={game.name}
              >
                <GameIcon iconType={game.iconType} size={item.size * 0.46} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Popup on hover / tap */}
      {activePopupGame && popupPos && (
        <div
          className="game-popup"
          style={{ left: popupPos.x, top: popupPos.y }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <GameIcon iconType={activePopupGame.iconType} size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{activePopupGame.name}</h4>
              <p className="text-xs text-cyan-400 font-semibold">{activePopupGame.category}</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">{activePopupGame.description}</p>
          <div className="flex items-center justify-between text-[10px] text-cyan-300/80 border-t border-cyan-900/50 pt-2 font-mono">
            <span>STATUS: READY</span>
            <span className="flex items-center gap-1"><Flame size={10} className="text-amber-400" /> TAP TO EXPLORE</span>
          </div>
        </div>
      )}

      {/* Main Beyond Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-24">
        {/* Top Navigation & Gaming HUD Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-400/80 transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer shadow-lg flex items-center justify-center"
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Gaming HUD Status Indicators */}
          <div className="hud-status-bar">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">HP 100%</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-cyan-400 font-bold">MP 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <EqualizerBars count={6} />
              <span className="text-cyan-300 font-bold hidden md:inline">144 FPS</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-20 text-center">
          <BeyondReveal>
            <div className="inline-flex items-center gap-2 mb-4 hud-tag">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              PLAYER PROFILE • LEVEL 99
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              BEYOND THE RESUME
            </h1>

            {/* TAGLINE PROMINENT DISPLAY */}
            <div className="my-6">
              <div className="neon-tagline-box px-6 py-3.5 rounded-2xl inline-block max-w-xl">
                <p className="text-cyan-300 font-extrabold tracking-widest uppercase text-base sm:text-lg text-shadow-cyan flex items-center justify-center gap-2.5">
                  <Sparkles size={20} className="text-purple-400 animate-spin" />
                  "Be More Than A Gamer - Be A Soul"
                  <Sparkles size={20} className="text-cyan-400 animate-spin" />
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              A deeper look at the curiosity, gaming spirit, creativity, and drive behind the professional.
            </p>
          </BeyondReveal>

          <BeyondReveal delay={150}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="beyond-card text-left border-cyan-500/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2 font-mono">
                  <Shield size={14} /> MINDSET 01
                </div>
                <p className="text-sm text-cyan-200 italic font-medium">
                  "I simply enjoy learning how things work."
                </p>
              </div>
              <div className="beyond-card text-left border-purple-500/40">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-2 font-mono">
                  <Zap size={14} /> MINDSET 02
                </div>
                <p className="text-sm text-purple-200 italic font-medium">
                  "I like discovering things that could be useful in the future."
                </p>
              </div>
            </div>
          </BeyondReveal>
        </section>

        {/* GAMES I PLAY SECTION */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-lg">
                  <Gamepad2 size={28} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    GAMES I PLAY
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">SELECTED TITLES &amp; STRATEGY</p>
                </div>
              </div>
              <EqualizerBars count={10} />
            </div>
          </BeyondReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {GAMES.map((game, i) => (
              <BeyondReveal key={game.id} delay={i * 80}>
                <div className="beyond-card h-full flex flex-col justify-between group hover:border-cyan-400/60">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-md">
                        <GameIcon iconType={game.iconType} size={28} />
                      </div>
                      <span className="text-xs font-semibold text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 font-mono">
                        {game.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      {game.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      "{game.description}"
                    </p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-3 mt-2">
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {game.longDescription}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                      <span>MASTERY: HIGH</span>
                      <span className="flex items-center gap-1"><Trophy size={12} className="text-amber-400" /> ACTIVE PLAYER</span>
                    </div>
                  </div>
                </div>
              </BeyondReveal>
            ))}
          </div>
        </section>

        {/* AI & TECHNOLOGY SECTION */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shadow-lg">
                <Cpu size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  AI &amp; TECHNOLOGY
                </h2>
                <p className="text-xs text-slate-400 font-mono">BUILDING &amp; EXPERIMENTING</p>
              </div>
            </div>
          </BeyondReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Trying new AI tools", icon: Brain, badge: "AI CREATOR" },
              { title: "Creating websites/apps", icon: Code, badge: "VIBE CODING" },
              { title: "AI image generation", icon: Sparkles, badge: "PROMPT CRAFT" },
              { title: "Coding / vibe coding", icon: Terminal, badge: "RAPID BUILD" },
              { title: "Exploring new gadgets", icon: Zap, badge: "TECH ENTHUSIAST" },
              { title: "Crypto / trading", icon: TrendingUp, badge: "FINANCE" },
            ].map((item, i) => (
              <BeyondReveal key={item.title} delay={i * 60}>
                <div className="beyond-card flex items-center justify-between gap-3 hover:border-purple-500/60 group">
                  <div className="flex items-center gap-3">
                    <item.icon className="text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0" size={22} />
                    <span className="text-sm font-semibold text-slate-200">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
                    {item.badge}
                  </span>
                </div>
              </BeyondReveal>
            ))}
          </div>
        </section>

        {/* EXPLORING SECTION */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shadow-lg">
                <Bike size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  EXPLORING
                </h2>
                <p className="text-xs text-slate-400 font-mono">ROADS, NATURE &amp; JOURNEYS</p>
              </div>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="beyond-card border-emerald-500/40">
              <div className="flex flex-wrap gap-2.5 mb-6">
                {[
                  "Bike rides",
                  "Long rides",
                  "Exploring new places",
                  "Nature",
                  "Beaches",
                  "Mountains",
                  "Road trips",
                  "Trying new places",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-sm hover:border-emerald-400 transition-colors"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-300 italic font-medium">
                "No fixed destination yet. Just a growing list of places waiting to be explored."
              </p>
            </div>
          </BeyondReveal>
        </section>

        {/* FOOD & CREATIVITY */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shadow-lg">
                <UtensilsCrossed size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  FOOD &amp; CREATIVITY
                </h2>
                <p className="text-xs text-slate-400 font-mono">CUISINE &amp; SOP CRAFTING</p>
              </div>
            </div>
          </BeyondReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Trying different foods",
              "Street food",
              "Cooking",
              "Exploring restaurants",
              "Creating new recipes",
              "Creating different SOPs",
            ].map((item, i) => (
              <BeyondReveal key={item} delay={i * 60}>
                <div className="beyond-card hover:border-amber-500/60">
                  <span className="text-sm font-semibold text-slate-200">✦ {item}</span>
                </div>
              </BeyondReveal>
            ))}
          </div>
        </section>

        {/* ENTERTAINMENT & PLAYER PROFILE */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <BeyondReveal>
            <div className="beyond-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <Film className="text-rose-400" size={24} />
                <h3 className="text-xl font-bold text-white">ENTERTAINMENT</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-rose-400" /> Movies
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-rose-400" /> Web series
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-rose-400" /> YouTube
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-rose-400" /> Gaming content
                </li>
              </ul>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="beyond-card h-full flex flex-col justify-center text-center border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              <div className="inline-flex items-center justify-center gap-2 mb-3">
                <Globe className="text-cyan-400 animate-spin" size={24} style={{ animationDuration: '15s' }} />
                <span className="text-xs font-bold text-cyan-400 tracking-widest font-mono">PLAYER BADGE</span>
              </div>
              <p className="text-2xl font-black tracking-wider text-white mb-2">
                EXPLORER • FOODIE • GAMER
              </p>
              <p className="text-xs text-cyan-300 font-mono">"BE MORE THAN A GAMER - BE A SOUL"</p>
            </div>
          </BeyondReveal>
        </div>

        {/* CURIOSITY SECTION */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shadow-lg">
                <Brain size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  CURIOSITY
                </h2>
                <p className="text-xs text-slate-400 font-mono">DRIVE TO UNDERSTAND</p>
              </div>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="beyond-card">
              <div className="grid sm:grid-cols-2 gap-3.5 mb-6">
                {[
                  "How AI tools work",
                  "How websites/apps are built",
                  "Business ideas",
                  "Food/business operations",
                  "Finance & crypto",
                  "New gadgets/technology",
                  "Random things just because I'm curious",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-cyan-300 italic font-semibold border-t border-slate-800 pt-4">
                "I like understanding how things work, and I enjoy finding things that might become useful later."
              </p>
            </div>
          </BeyondReveal>
        </section>

        {/* SOMETHING I BUILT */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shadow-lg">
                <Lightbulb size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  SOMETHING I BUILT
                </h2>
                <p className="text-xs text-slate-400 font-mono">REAL-WORLD SOLUTION</p>
              </div>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="beyond-card border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 uppercase">
                    FEATURED PROJECT
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">FOOD COSTING TOOL</h3>
                </div>
                <a
                  href="https://food-costing.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm inline-flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 hover:scale-105"
                >
                  OPEN FOOD COSTING TOOL <ExternalLink size={16} />
                </a>
              </div>

              {/* Story visualizer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-center">
                {["PROBLEM", "IDEA", "BUILD", "USEFUL"].map((step, idx) => (
                  <div
                    key={step}
                    className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono"
                  >
                    0{idx + 1}. {step}
                  </div>
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                A friend started a cloud kitchen in February 2026. I needed to upload prices for Swiggy and Zomato, and doing food-costing/pricing calculations manually was inconvenient. So I created a simple food-costing website to make the process easier.
              </p>
              <p className="text-sm text-amber-300 italic font-medium">
                "I found a practical problem and built a simple tool to make it easier."
              </p>
            </div>
          </BeyondReveal>
        </section>

        {/* MY PERFECT DAY */}
        <section className="mb-20">
          <BeyondReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shadow-lg">
                <Clock size={28} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  MY PERFECT DAY
                </h2>
                <p className="text-xs text-slate-400 font-mono">MISSION CHECKPOINTS</p>
              </div>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="mission-path">
              {[
                "WAKE UP",
                "BIKE RIDE",
                "EXPLORE A NEW PLACE",
                "TRY SOME FOOD",
                "COME HOME",
                "GAMING",
                "MOVIE / WEB SERIES",
                "EXPLORE AN AI TOOL",
              ].map((step, idx) => (
                <div key={step} className="mission-step">
                  <span className="text-cyan-400 text-xs font-mono font-bold">CHK {idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </BeyondReveal>
        </section>

        {/* WHAT'S NEXT & MAYBE SOMEDAY */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <BeyondReveal>
            <div className="beyond-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="text-cyan-400" size={24} />
                <h3 className="text-xl font-bold text-white">WHAT'S NEXT</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                <li>✦ Build my own app/business</li>
                <li>✦ Travel to specific places</li>
                <li>✦ Build something with AI</li>
                <li>✦ Learn multiple skills</li>
                <li>✦ Build a gaming/content brand</li>
                <li>✦ Explore more of the world</li>
              </ul>
              <p className="text-xs text-cyan-300 italic">
                "No fixed list yet. I just want to explore more of the world."
              </p>
            </div>
          </BeyondReveal>

          <BeyondReveal delay={100}>
            <div className="beyond-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <Video className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold text-white">MAYBE SOMEDAY</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Right now, I mostly consume content. But I'd like to create something of my own someday."
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-purple-300">
                {["Gaming", "AI / Technology", "Travel / Bike rides", "Food", "Short-form content"].map(
                  (c) => (
                    <span key={c} className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 font-mono">
                      {c}
                    </span>
                  )
                )}
              </div>
            </div>
          </BeyondReveal>
        </div>

        {/* Back Link to Main Portfolio */}
        <div className="text-center mb-12">
          <button onClick={onBack} className="beyond-back-link">
            ✦ Back to Professional Portfolio
          </button>
        </div>

        {/* Gaming Footer */}
        <footer className="border-t border-slate-800/80 pt-8 pb-12 text-center">
          <p className="text-xs font-bold text-cyan-400 tracking-widest font-mono mb-1">PLAYER PROFILE • LEVEL 99</p>
          <h3 className="text-2xl font-black text-white mb-1">VISHNU KUMAR M</h3>
          <p className="text-xs font-extrabold text-cyan-300 tracking-wider font-mono mb-6">
            "BE MORE THAN A GAMER - BE A SOUL"
          </p>
          
        </footer>
      </main>
    </div>
  );
}
