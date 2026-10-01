import React, { useState } from 'react';
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  UserRound,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LeaderProfile {
  name: string;
  role: 'Founder' | 'Co-founder';
  image: string;
  email: string;
  linkedin: string;
  github?: string;
  bio: string;
  work: string[];
}

const founder: LeaderProfile = {
  name: 'Amol Patil',
  role: 'Founder',
  image: '/founders/amol-patil.jpeg',
  email: 'contact.orionplatforms@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amol-rangrao-patil',
  github: 'https://github.com/amol-rangrao-patil',
  bio: 'Founder of Orion Platforms, shaping the company vision and leading product, engineering, and technology strategy.',
  work: ['Founded Orion Platforms', 'Leading product and engineering direction', 'Building enterprise software and cloud solutions']
};

const coFounders: LeaderProfile[] = [
  {
    name: 'Abhishek Shikarkhane',
    role: 'Co-founder',
    image: '/founders/abhishek-shikarkhane.png',
    email: 'contact.orionplatforms@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhishek-shikarkhane-4491b2293',
    bio: 'Co-founder helping turn product ideas into reliable, practical, and user-focused technology solutions.',
    work: ['Product planning and execution', 'Supporting platform engineering', 'Collaborating on client solutions']
  },
  {
    name: 'Sanket Yadav',
    role: 'Co-founder',
    image: '/founders/sanket-yadav.jpeg',
    email: 'contact.orionplatforms@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sanket-yadav-3aa9312b7',
    bio: 'Co-founder contributing to technology execution, product development, and the continued growth of Orion Platforms.',
    work: ['Product development support', 'Technology execution', 'Contributing to scalable solutions']
  },
  {
    name: 'Sainath Sale',
    role: 'Co-founder',
    image: '/app-icon-512.png',
    email: 'contact.orionplatforms@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sainath-sale-1a20a932b',
    bio: 'Co-founder focused on collaborative delivery, useful digital products, and strong execution across the team.',
    work: ['Digital product development', 'Team collaboration and delivery', 'Supporting technical initiatives']
  }
];

function ProfileModal({ profile, onClose }: { profile: LeaderProfile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-lg" role="dialog" aria-modal="true" aria-label={`${profile.name} profile`}>
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl dark:bg-slate-900">
        <button type="button" onClick={onClose} aria-label="Close profile" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:scale-105 hover:text-blue-600 dark:bg-slate-950/90 dark:text-slate-200 dark:hover:text-cyan-300">
          <X className="h-5 w-5" />
        </button>
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-6 pb-8 pt-10 text-center">
          <img src={profile.image} onError={(event) => { event.currentTarget.src = '/app-icon-512.png'; }} alt={`${profile.name} profile`} className="mx-auto translate-y-2 h-36 w-36 rounded-full border-4 border-white/90 object-cover object-[center_20%] shadow-2xl" />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />{profile.role}</div>
          <h2 className="mt-1 text-3xl font-black text-white">{profile.name}</h2>
        </div>
        <div className="space-y-5 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{profile.bio}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-blue-600 hover:border-blue-400 dark:border-slate-700 dark:text-cyan-300"><Mail className="h-4 w-4 shrink-0" /> <span className="break-all">{profile.email}</span></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-blue-600 hover:border-blue-400 dark:border-slate-700 dark:text-cyan-300"><Linkedin className="h-4 w-4 shrink-0" /> LinkedIn profile</a>
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-blue-600 hover:border-blue-400 dark:border-slate-700 dark:text-cyan-300"><Github className="h-4 w-4 shrink-0" /> GitHub profile</a>}
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">What they have worked on</h3>
            <div className="space-y-2">{profile.work.map((item) => <div key={item} className="flex gap-2 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-slate-800 dark:bg-blue-950/30 dark:text-slate-100"><CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-300" />{item}</div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderCard({ profile, founderCard = false, index = 0 }: { profile: LeaderProfile; founderCard?: boolean; index?: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <ProfileModal profile={profile} onClose={() => setModalOpen(false)} />}
      <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.35 }} className={`group relative overflow-hidden rounded-3xl border bg-white/65 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/55 ${founderCard ? 'border-blue-300/80 shadow-blue-900/10 dark:border-blue-800/80' : 'border-slate-200/80 dark:border-slate-800/80'}`}>
        <motion.div animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }} className="h-1.5 bg-gradient-to-r from-blue-700 via-cyan-400 to-emerald-400" />
        <div className={founderCard ? 'grid lg:grid-cols-[260px_1fr]' : ''}>
          <div className={`relative flex items-center justify-center overflow-hidden bg-white/35 p-6 backdrop-blur-xl dark:bg-slate-900/30 ${founderCard ? 'min-h-[260px]' : 'min-h-[180px]'}`}>
            <motion.div animate={{ background: ['linear-gradient(135deg, rgba(37,99,235,0.22), rgba(6,182,212,0.16), rgba(16,185,129,0.12))', 'linear-gradient(225deg, rgba(6,182,212,0.18), rgba(16,185,129,0.18), rgba(37,99,235,0.22))', 'linear-gradient(315deg, rgba(16,185,129,0.14), rgba(37,99,235,0.2), rgba(6,182,212,0.18))'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 opacity-90" />
            <div className="absolute inset-0 bg-tech-grid-light opacity-30 dark:bg-tech-grid-dark" />
            <button type="button" onClick={() => setModalOpen(true)} aria-label={`Open ${profile.name} profile`} className="group/avatar relative rounded-full focus:outline-none focus:ring-4 focus:ring-cyan-300/50">
              <motion.img src={profile.image} onError={(event) => { event.currentTarget.src = '/app-icon-512.png'; }} alt={`${profile.name} profile`} animate={{ y: [6, 1, 6] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }} whileHover={{ scale: 1.07, rotate: 2 }} className={`${founderCard ? 'h-44 w-44' : 'h-32 w-32'} rounded-full border-4 border-white/90 object-cover object-[center_20%] shadow-2xl`} />
              <span className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg dark:bg-slate-900 dark:text-cyan-300"><UserRound className="h-5 w-5" /></span>
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-300">{profile.role}</p><span className="h-1 w-1 rounded-full bg-emerald-500" /><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active leadership</span></div>
            <h2 className={`${founderCard ? 'text-3xl' : 'text-xl'} mt-2 font-black text-slate-950 dark:text-white`}>{profile.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{profile.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2"><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-cyan-300"><Mail className="h-3.5 w-3.5" /> Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-cyan-300"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a></div>
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Leadership contribution</p><div className="mt-3 grid gap-2">{profile.work.slice(0, 2).map((item) => <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />{item}</div>)}</div></div>
            <button type="button" onClick={() => setModalOpen(true)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline dark:text-cyan-300"><BriefcaseBusiness className="h-4 w-4" /> Open full profile</button>
          </div>
        </div>
      </motion.article>
    </>
  );
}

export const FoundersPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"><a href="/" aria-label="Back to Orion Platforms home"><img src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'} alt="ORION Platforms" className="h-10 w-auto max-w-[220px] object-contain" /></a><a href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"><ArrowLeft className="h-4 w-4" /> {t.nav.about}</a></div></header>
      <main className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20"><div className="absolute inset-0 bg-tech-grid-light opacity-50 dark:bg-tech-grid-dark" /><div className="relative mx-auto max-w-6xl">
        <section className="relative mb-14 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-blue-700 via-cyan-400 to-emerald-400" />
          <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-blue-200/70 dark:border-blue-900/70" />
          <div className="absolute right-14 top-14 h-16 w-16 rounded-full border border-cyan-300/60 dark:border-cyan-700/60" />
          <div className="relative">
            <div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-cyan-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Leadership directory</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }} className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl dark:text-white">People who turn<br /><span className="text-blue-600 dark:text-cyan-300">ideas into systems.</span></motion.h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">A focused leadership team building useful software, dependable platforms, and long-term technology partnerships.</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-7 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"><span className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800">Orion Platforms</span><span className="h-1 w-1 rounded-full bg-emerald-500" /><span>Systems & IT engineering</span></motion.div>
            </div>
          </div>
        </section>
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-300">01 profile</p><h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Founder</h2></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-cyan-300">Company leadership</span></div><LeaderCard profile={founder} founderCard /></motion.section>
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5 }} className="mt-16"><div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-300">03 profiles</p><h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Co-founders</h2></div><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">The founding team</span></div><div className="grid gap-5 md:grid-cols-3">{coFounders.map((profile, index) => <LeaderCard key={profile.name} profile={profile} index={index} />)}</div></motion.section>
      </div></main>
    </div>
  );
};

export default FoundersPage;
