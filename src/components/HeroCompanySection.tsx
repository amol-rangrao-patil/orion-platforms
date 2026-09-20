import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Code,
  Smartphone,
  Cloud,
  Settings,
  ArrowDown, 
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Shield,
  Clock,
  Layers,
  Award,
  Terminal,
  Cpu,
  Zap,
  ChevronRight,
  Globe,
  RotateCw,
  Timer
} from 'lucide-react';
import { 
  PLATFORM_CAPABILITIES
} from '../data/companyInfo';
import { useLanguage, Language, MULTILINGUAL_NAMES } from '../context/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroCompanySectionProps {
  onScrollToContact: () => void;
  onSelectCapability?: (serviceId: string) => void;
}

export const HeroCompanySection: React.FC<HeroCompanySectionProps> = ({ 
  onScrollToContact,
  onSelectCapability 
}) => {
  const { language, setLanguage, t, cycleCount } = useLanguage();
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  // Subtitle rotator based on language
  useEffect(() => {
    const subInterval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % t.hero.rotatingSubtitles.length);
    }, 4500);
    return () => clearInterval(subInterval);
  }, [t.hero.rotatingSubtitles.length]);

  const handleManualReplay = () => {
    const LANGUAGES_CYCLE: ('en' | 'mr' | 'hi')[] = ['en', 'mr', 'hi'];
    const nextIdx = (LANGUAGES_CYCLE.indexOf(language) + 1) % LANGUAGES_CYCLE.length;
    setLanguage(LANGUAGES_CYCLE[nextIdx]);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'Settings':
        return <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const handleScopeService = (serviceId: string) => {
    if (onSelectCapability) {
      onSelectCapability(serviceId);
    }
    onScrollToContact();
  };

  // Structured Words for the Active Language Headline
  const getHeadlineParts = () => {
    if (language === 'mr') {
      return {
        word1: 'ओरियन',
        word2: 'प्लॅटफॉर्म्स'
      };
    }
    if (language === 'hi') {
      return {
        word1: 'ओरियन',
        word2: 'प्लेटफॉर्म्स'
      };
    }
    return {
      word1: 'ORION',
      word2: 'PLATFORMS'
    };
  };

  const { word1, word2 } = getHeadlineParts();

  // Animation variants for smooth, guaranteed full title visibility across languages
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.38, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -12, 
      scale: 0.98,
      transition: { 
        duration: 0.22, 
        ease: 'easeInOut' 
      } 
    }
  };

  const trustMetrics = [
    {
      icon: <Layers className="w-5 h-5" />,
      colorClass: 'text-[#1a73e8] dark:text-blue-400',
      value: '350+',
      label: t.hero.trustMetrics.projects.label,
      subtext: t.hero.trustMetrics.projects.subtext
    },
    {
      icon: <Award className="w-5 h-5" />,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      value: '99.4%',
      label: t.hero.trustMetrics.satisfaction.label,
      subtext: t.hero.trustMetrics.satisfaction.subtext
    },
    {
      icon: <Shield className="w-5 h-5" />,
      colorClass: 'text-indigo-600 dark:text-indigo-400',
      value: '100%',
      label: t.hero.trustMetrics.ipOwnership.label,
      subtext: t.hero.trustMetrics.ipOwnership.subtext
    },
    {
      icon: <Clock className="w-5 h-5" />,
      colorClass: 'text-amber-500 dark:text-amber-400',
      value: '< 2h',
      label: t.hero.trustMetrics.responseTime.label,
      subtext: t.hero.trustMetrics.responseTime.subtext
    }
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-14 lg:pb-20 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 scroll-mt-20">
      
      {/* Architectural Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid-light dark:bg-tech-grid-dark opacity-70 pointer-events-none radial-mask" />

      {/* Radiant Ambient Glow Lights - Subtle to preserve typography contrast */}
      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-1/6 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[130px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1, 1.12, 1]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-12 right-1/6 w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full bg-cyan-400/10 dark:bg-indigo-600/20 blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8 sm:mb-12 relative">
          
          {/* Animated Category Pill with Live Pulse */}
          <motion.div 
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -1 }}
            className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 mb-3 sm:mb-4 shadow-xs hover:border-blue-500/60 dark:hover:border-blue-500 transition-all duration-300 cursor-default max-w-full"
          >
            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-0.5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase font-['Space_Grotesk',sans-serif] truncate">
              <span>{t.hero.badge}</span>
            </span>
          </motion.div>

          {/* Main Display Headline with Stable Height to Prevent Any Text Overlap */}
          <div className="relative w-full">
            {/* Luminous Ambient Halo behind the company title */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 sm:w-[480px] h-28 bg-gradient-to-r from-blue-600/15 via-cyan-400/20 to-indigo-600/15 blur-2xl pointer-events-none rounded-full -z-10" />

            {/* Headline Container with balanced typography sizing */}
            <div className="min-h-[3.6rem] sm:min-h-[4.6rem] lg:min-h-[5.6rem] flex items-center justify-center">
              <h1 className="font-['Outfit',sans-serif] text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none px-1 relative select-none whitespace-nowrap">
                {/* Text Enter Animation running smoothly every 10 seconds */}
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={`hero-title-cycle-${cycleCount}-${language}`}
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="inline-flex items-center justify-center flex-nowrap whitespace-nowrap gap-x-2 sm:gap-x-3.5 md:gap-x-4 cursor-pointer max-w-full"
                    onClick={handleManualReplay}
                    title="Click to advance to next language immediately"
                  >
                    {/* First Word (ORION / ओरियन) - High Contrast & Crisp */}
                    <span className="inline-flex items-center font-black">
                      {language === 'en' ? (
                        <>
                          <span className="text-slate-950 dark:text-[#00F5D4] dark:drop-shadow-[0_0_24px_rgba(0,245,212,1)]">
                            O
                          </span>
                          <span className="text-slate-950 dark:text-white drop-shadow-xs">
                            RION
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-950 dark:text-white drop-shadow-xs">
                          {word1}
                        </span>
                      )}
                    </span>

                    {/* Second Word (PLATFORMS / प्लॅटफॉर्म्स / प्लेटफॉर्म्स) */}
                    <span className="inline-flex items-center font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-[#1a73e8] to-indigo-700 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 drop-shadow-xs dark:drop-shadow-[0_0_30px_rgba(0,240,255,0.45)]">
                      {word2}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            {/* Dynamic Rotating Subtitle - High contrast and legibility */}
            <div className="min-h-[2.2rem] sm:min-h-[2.6rem] flex items-center justify-center mt-1 mb-2 px-2">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={subtitleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="block font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 dark:text-slate-100 text-sm sm:text-base lg:text-lg font-bold tracking-tight text-center leading-normal max-w-3xl"
                >
                  <span className="text-[#1a73e8] dark:text-cyan-400">✦</span>{' '}
                  {t.hero.rotatingSubtitles[subtitleIndex] || t.hero.rotatingSubtitles[0]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* High-Readability & Contrast Lead Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl lg:max-w-3xl mb-5 sm:mb-6 font-normal px-2 sm:px-0"
          >
            {t.hero.summary}
          </motion.p>

          {/* Primary Action Buttons with Magnetic Elevation */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-md sm:max-w-none px-2 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onScrollToContact}
              id="hero-contact-cta"
              className="relative overflow-hidden inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-gradient-to-r from-[#1a73e8] via-blue-600 to-indigo-600 hover:from-[#1557b0] hover:to-indigo-700 text-white font-bold text-xs sm:text-sm lg:text-base shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer group"
            >
              {/* Shimmer Light Beam Sweep */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
              />
              <Zap className="relative z-10 w-4 h-4 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span className="relative z-10">{t.hero.ctaContact}</span>
              <ArrowDown className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#company-capabilities"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm lg:text-base border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 shadow-xs transition-all duration-200"
            >
              <span>{t.hero.ctaServices}</span>
              <ArrowUpRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </motion.a>
          </motion.div>

          {/* 4 Trust Metric Cards with Animated Count-Up - Fully Visible Above Fold */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 max-w-4xl lg:max-w-5xl mx-auto px-1 sm:px-0"
          >
            {trustMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 12px 24px -8px rgba(26, 115, 232, 0.18)"
                }}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none hover:border-blue-500 dark:hover:border-blue-500/50 backdrop-blur-md transition-all duration-300 text-center flex flex-col justify-between"
              >
                <div>
                  <div className={`flex items-center justify-center space-x-1.5 ${metric.colorClass} mb-1 sm:mb-1.5`}>
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.icon}
                    </motion.div>
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                      <AnimatedCounter value={metric.value} />
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold leading-tight">
                    {metric.label}
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug font-medium">
                  {metric.subtext}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* 4 Core Platform Capabilities Grid */}
        <div id="company-capabilities" className="pt-12 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1a73e8] dark:text-blue-300 text-xs sm:text-sm font-bold mb-3 border border-blue-200 dark:border-blue-500/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#1a73e8]" />
              <span>{t.capabilities.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
              {t.capabilities.heading}
            </h2>
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              {t.capabilities.subheading}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PLATFORM_CAPABILITIES.map((cap, cIdx) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: cIdx * 0.12 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015,
                  boxShadow: "0 24px 45px -12px rgba(26, 115, 232, 0.16)"
                }}
                className="group relative p-7 sm:p-9 lg:p-10 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/60 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-50/20 dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <motion.div 
                      whileHover={{ scale: 1.12, rotate: 4 }}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:border-blue-300 dark:group-hover:border-blue-700 shadow-xs transition-all duration-300"
                    >
                      {getIcon(cap.iconName)}
                    </motion.div>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 shadow-xs">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white mb-3 group-hover:text-[#1a73e8] dark:group-hover:text-blue-400 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="pt-5 border-t border-slate-200/70 dark:border-slate-800 mb-5">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cap.features.map((feat, fIdx) => (
                        <motion.li 
                          key={fIdx} 
                          whileHover={{ x: 3 }}
                          className="flex items-center space-x-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScopeService(cap.id)}
                    className="w-full py-3.5 lg:py-4 px-4 rounded-xl bg-white/90 dark:bg-slate-800/80 hover:bg-[#1a73e8] dark:hover:bg-[#1a73e8] text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white border border-slate-200/90 dark:border-slate-700/80 hover:border-[#1a73e8] dark:hover:border-[#1a73e8] text-sm sm:text-base font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs group/btn"
                  >
                    <span>{t.capabilities.scopeButton}</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
