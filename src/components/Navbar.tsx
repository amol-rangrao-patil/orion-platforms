import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Layers, 
  Mail, 
  Home, 
  MapPin, 
  ChevronRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { COMPANY_NAME } from '../data/companyInfo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { OrionBrandWordmark } from './OrionBrandWordmark';

interface NavbarProps {
  onScrollToContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToContact }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const NAV_ITEMS = [
    { label: t.nav.about, href: '#hero', icon: Home },
    { label: t.nav.services, href: '#company-capabilities', icon: Layers },
    { label: t.nav.contact, href: '#contact-section', icon: Mail },
  ];

  // Smooth animated scroll depth tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Track active section and scroll state for dynamic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['hero', 'company-capabilities', 'contact-section', 'headquarters-section'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          if (scrollPosition >= elementTop) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }
      setActiveSection('#hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop view or on Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScrollToHeadquarters = useCallback(() => {
    setActiveSection('#headquarters-section');
    setMobileMenuOpen(false);
    const element = document.getElementById('headquarters-section');
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);

    if (href === '#contact-section' && onScrollToContact) {
      onScrollToContact();
      return;
    }

    if (href === '#hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [onScrollToContact]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800 shadow-sm shadow-blue-500/5' 
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-800/60'
      }`}
    >
      {/* Top Scroll Depth Animated Progress Bar */}
      <div 
        id="navbar-scroll-progress-container"
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-slate-200/30 dark:bg-slate-800/30 overflow-hidden pointer-events-none z-50"
      >
        <motion.div 
          style={{ scaleX }}
          className="h-full w-full bg-gradient-to-r from-blue-600 via-[#1a73e8] to-sky-400 origin-left shadow-[0_0_8px_rgba(26,115,232,0.6)]"
        />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name with Provided Design */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          id="navbar-brand-btn"
          aria-label={`${COMPANY_NAME} Home`}
          className="flex items-center space-x-2.5 sm:space-x-3.5 group cursor-pointer select-none py-1 min-w-0"
        >
          {/* Logo in image format matching active light/dark theme */}
          <motion.div 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center shrink-0"
          >
            <img 
              src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'} 
              alt="ORION Platforms Pvt. Ltd. Logo" 
              className="h-10 sm:h-12 w-auto max-w-[250px] object-contain select-none mix-blend-multiply dark:mix-blend-screen"
            />
          </motion.div>
        </a>

        {/* Center Navigation Links: Clean, spacious, and readable for Desktop */}
        <nav className="hidden lg:flex items-center space-x-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 backdrop-blur-md shadow-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 lg:px-5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  isActive 
                    ? 'text-[#1a73e8] dark:text-blue-400 font-bold' 
                    : 'text-slate-800 dark:text-slate-200 hover:text-[#1a73e8] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-300/90 dark:border-slate-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-[#1a73e8] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Light/Dark Mode & Mobile Menu Trigger */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

          {/* Light / Dark Mode Switcher */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2.5 rounded-full border border-slate-300/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 backdrop-blur-md transition-all cursor-pointer shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </motion.button>

          {/* Direct Headquarters Action Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScrollToHeadquarters}
            id="navbar-headquarters-cta-btn"
            title="Navigate to Headquarters"
            className="hidden md:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#1a73e8] to-blue-600 hover:from-[#1557b0] hover:to-blue-700 text-white text-xs lg:text-sm font-bold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.nav.headquarters}</span>
          </motion.button>

          {/* Mobile menu trigger with smooth animation */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="navbar-mobile-menu-btn"
            className="p-2 sm:p-2.5 rounded-xl lg:hidden border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 backdrop-blur-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1a73e8] dark:text-blue-400" /> : <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Animated Overlay Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay for outside click closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-16 sm:top-18 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Floating Drawer Menu with Crisp Styling */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl overflow-hidden lg:hidden"
            >
              
              {NAV_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.18 }}
                    onClick={(e) => handleNavClick(e, item.href)}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1a73e8] dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-bold shadow-xs'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 active:bg-slate-200 dark:active:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#1a73e8] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#1a73e8] dark:text-blue-400 translate-x-0.5' : 'text-slate-400'}`} />
                  </motion.a>
                );
              })}

              {/* Mobile Headquarters CTA */}
              <button
                onClick={handleScrollToHeadquarters}
                className="w-full mt-2 py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-sm shadow-blue-500/25 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.nav.headquarters}</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
