"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownRight, ArrowRight, BookOpen, BrainCircuit, CalendarDays, ChevronRight, Compass, GraduationCap, LibraryBig, Menu, Sparkles, Trophy, X } from "lucide-react";
import type { CampusPlace } from "@/components/campus/CampusScene";

const CampusScene = dynamic(() => import("@/components/campus/CampusScene"), { ssr: false, loading: () => <div className="h-full animate-pulse rounded-3xl bg-white/5" /> });

const destinations = [
  { title: "Study Hall", detail: "Structured subjects and study paths", icon: BookOpen, href: "/study", tint: "#c0a6ff" },
  { title: "AI Research Lab", detail: "Your intelligent learning companion", icon: BrainCircuit, href: "/ai-tutor", tint: "#8de1e8" },
  { title: "Daily Editorial", detail: "Ideas that shape the day", icon: CalendarDays, href: "/editorials", tint: "#f0a6d8" },
  { title: "Achievements", detail: "Your milestones and progress", icon: Trophy, href: "/achievements", tint: "#efc58e" },
];

export default function HomePage() {
  const [selected, setSelected] = useState<CampusPlace | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lite, setLite] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 text-violet-200"><GraduationCap size={22}/></div>
          <div><div className="display text-sm font-extrabold tracking-[.13em]">DIGITAL UNIVERSITY</div><div className="text-[10px] tracking-[.25em] text-violet-200/65">LEARN BEYOND BOUNDARIES</div></div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          <Link className="hover:text-white" href="/library">Library</Link><Link className="hover:text-white" href="/study">Study spaces</Link><Link className="hover:text-white" href="/classes">Classes</Link><Link className="hover:text-white" href="/exams">Examinations</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/library" className="hidden rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 hover:bg-white/10 sm:block">Open library</Link>
          <button aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/15 p-2 md:hidden">{menuOpen ? <X size={18}/> : <Menu size={18}/>}</button>
        </div>
      </header>
      {menuOpen && <div className="glass relative z-30 mx-4 grid gap-3 rounded-2xl p-5 text-sm md:hidden"><Link href="/library">Library</Link><Link href="/study">Study spaces</Link><Link href="/classes">Classes</Link><Link href="/exams">Examinations</Link></div>}

      <section className="relative mx-auto max-w-[1600px] px-4 pb-10 md:px-8">
        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px]"/>
        <div className="relative z-10 mx-auto max-w-3xl pt-5 text-center md:pt-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.22em] text-violet-100"><Sparkles size={12}/> A new way to experience learning</div>
          <h1 className="display text-4xl font-semibold leading-[1.08] md:text-6xl">Your knowledge has a <span className="bg-gradient-to-r from-[#f3a7dc] via-[#c3a7ff] to-[#86e7ed] bg-clip-text text-transparent">universe.</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/55 md:text-base">Explore your campus, step into a library of living books, and build your learning journey one discovery at a time.</p>
        </div>

        <div className="relative mt-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="relative h-[470px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0b20] shadow-[0_30px_100px_#03020b99] md:h-[590px]">
            {!lite ? <CampusScene onSelect={setSelected} selectedId={selected?.id ?? null}/> : <div className="soft-grid flex h-full items-center justify-center p-5"><div className="grid w-full max-w-lg grid-cols-2 gap-3">{["Main Academy","Grand Library","Lecture Theatre","Examination Hall"].map((name) => <button key={name} onClick={() => setSelected({id:name,name,subtitle:"Explore this learning destination",color:"#c4a7ff",position:[0,0,0],route:name==="Grand Library"?"/library":name==="Lecture Theatre"?"/classes":name==="Examination Hall"?"/exams":"/academy"})} className="glass rounded-2xl p-6 text-left text-sm hover:border-violet-300/40">{name}<ArrowDownRight className="mt-5 text-violet-200" size={18}/></button>)}</div></div>}
            <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[.2em] text-white/65 backdrop-blur">Campus world · Interactive map</div>
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              <button onClick={() => setLite(!lite)} className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[11px] text-white/75 backdrop-blur hover:bg-white/10">{lite ? "Enter 3D campus" : "Switch to 2D map"}</button>
              <span className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-white/50 backdrop-blur">Select a building to explore</span>
            </div>
            {selected && <div className="glass absolute bottom-5 right-5 w-[min(290px,calc(100%-40px))] rounded-2xl p-4 shadow-2xl">
              <button aria-label="Close destination panel" onClick={() => setSelected(null)} className="absolute right-3 top-3 text-white/50 hover:text-white"><X size={15}/></button>
              <div className="text-[10px] uppercase tracking-[.2em] text-violet-200">Campus destination</div><div className="display mt-2 text-lg font-bold">{selected.name}</div><p className="mt-1 text-xs text-white/55">{selected.subtitle}</p>
              <Link href={selected.route} className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#171226]">Enter destination <ArrowRight size={15}/></Link>
            </div>}
          </div>

          <aside className="flex flex-col gap-3">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-2 text-xs text-violet-200"><Compass size={15}/> YOUR UNIVERSITY</div>
              <h2 className="display mt-3 text-2xl font-semibold">A world built for curiosity.</h2>
              <p className="mt-2 text-xs leading-5 text-white/50">Every destination opens a real learning space. Your journey starts here.</p>
              <Link href="/library" className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs hover:bg-white/10">Visit Grand Library <ChevronRight size={15}/></Link>
            </div>
            {destinations.map(({title,detail,icon:Icon,href,tint}) => <Link key={title} href={href} className="glass group flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-white/25"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5" style={{color:tint}}><Icon size={19}/></div><div className="min-w-0 flex-1"><div className="text-sm font-semibold">{title}</div><div className="mt-0.5 text-[11px] text-white/45">{detail}</div></div><ArrowRight size={15} className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white"/></Link>)}
          </aside>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-between gap-2 border-t border-white/8 px-6 py-6 text-[10px] tracking-wide text-white/35 md:flex-row md:px-10"><span>© 2026 DIGITAL UNIVERSITY · A NEW LEARNING UNIVERSE</span><span>Explore · Read · Practice · Grow</span></footer>
    </main>
  );
}
