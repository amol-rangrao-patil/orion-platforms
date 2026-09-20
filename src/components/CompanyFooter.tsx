import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  ArrowUp, 
  ShieldCheck,
  Check,
  Copy,
  Clock,
  Award,
  Lock,
  Cpu,
  Layers,
  Share2,
  ArrowUpRight,
  Instagram
} from 'lucide-react';
import { 
  COMPANY_NAME, 
  COMPANY_LEGAL_NAME, 
  COMPANY_TAGLINE, 
  COMPANY_CONTACT, 
  COMPANY_SOCIAL
} from '../data/companyInfo';
import { LegalModalType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface CompanyFooterProps {
  onOpenLegalModal: (type: LegalModalType) => void;
}

export const CompanyFooter: React.FC<CompanyFooterProps> = ({ onOpenLegalModal }) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const { language, t, multilingual } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = (email: string, key: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(key);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300 relative overflow-hidden">
      
      {/* Top Institutional Badges Banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 py-5">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            
            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2 rounded-lg bg-blue-500/10 text-[#1a73e8] dark:text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base">100% IP Assignment</div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400">Zero vendor lock-in</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Award className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base">SLA 99.99% Uptime</div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400">High-availability architecture</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Lock className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base">Mutual NDA Guaranteed</div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400">Confidentiality assured</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 justify-center sm:justify-start">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base">&lt; 2h Direct Architect</div>
                <div className="text-[11px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400">No sales middlemen</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Corporate Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} 
                alt="ORION Logo" 
                className="h-8 w-auto object-contain select-none"
              />
              <div>
                <span className="font-['Outfit',sans-serif] text-lg sm:text-xl lg:text-2xl font-black text-slate-950 dark:text-white block tracking-tight">
                  <span className="text-[#1a73e8] dark:text-cyan-400">PLATFORMS</span>
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-mono font-medium">
                  Pvt. Ltd.
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              {COMPANY_TAGLINE}. Delivering bespoke enterprise software engineering, scalable cloud topologies, and institutional technology consulting with guaranteed intellectual property transfer.
            </p>

            {/* Direct Inboxes with One-Click Copy */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#1a73e8] dark:text-blue-400 shrink-0" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Inquiries:</span>
                  <a href={`mailto:${COMPANY_CONTACT.primaryEmail}`} className="font-mono font-bold text-slate-900 dark:text-white hover:text-[#1a73e8] dark:hover:text-blue-400 truncate">
                    {COMPANY_CONTACT.primaryEmail}
                  </a>
                </div>
                <button 
                  onClick={() => handleCopyEmail(COMPANY_CONTACT.primaryEmail, 'primary')}
                  className="p-1 hover:text-slate-950 dark:hover:text-white cursor-pointer ml-1.5"
                  title="Copy email"
                >
                  {copiedEmail === 'primary' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2 truncate">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Solutions:</span>
                  <a href={`mailto:${COMPANY_CONTACT.solutionsEmail}`} className="font-mono font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 truncate">
                    {COMPANY_CONTACT.solutionsEmail}
                  </a>
                </div>
                <button 
                  onClick={() => handleCopyEmail(COMPANY_CONTACT.solutionsEmail, 'solutions')}
                  className="p-1 hover:text-slate-950 dark:hover:text-white cursor-pointer ml-1.5"
                  title="Copy email"
                >
                  {copiedEmail === 'solutions' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Platform Sections Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#1a73e8] dark:text-blue-400" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => handleScrollTo(e, 'hero')}
                  className="hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>About</span>
                </a>
              </li>
              <li>
                <a 
                  href="#company-capabilities" 
                  onClick={(e) => handleScrollTo(e, 'company-capabilities')}
                  className="hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact-section" 
                  onClick={(e) => handleScrollTo(e, 'contact-section')}
                  className="hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a 
                  href="#headquarters-section" 
                  onClick={(e) => handleScrollTo(e, 'headquarters-section')}
                  className="hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>Headquarters</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Legal & Institutional Trust</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center space-x-1.5"
                >
                  <span>Privacy Policy & Client Data Protection</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center space-x-1.5"
                >
                  <span>Terms of Service & Engagement Framework</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal('security')}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-left flex items-center space-x-1.5"
                >
                  <span>Enterprise Security & NDA Assurance</span>
                </button>
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800 leading-relaxed">
              Every client engagement is covered by a bilateral NDA and formal IP transfer guarantees.
            </p>
          </div>

          {/* Dedicated Social Media Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Social Media</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Follow our official social channel for software architecture releases, system designs, and updates:
            </p>

            {/* Prominent Dedicated Instagram Card */}
            <motion.a
              href={COMPANY_SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="footer-instagram-social-card"
              className="p-3.5 rounded-xl border border-pink-200/90 dark:border-pink-900/50 bg-gradient-to-br from-pink-50/70 via-rose-50/40 to-white dark:from-pink-950/25 dark:via-slate-900 dark:to-slate-900 shadow-sm hover:shadow-md hover:border-pink-400 transition-all flex flex-col justify-between block group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-950 dark:text-white block">Instagram</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Official Channel</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <div className="pt-2 border-t border-pink-100 dark:border-pink-950/50 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {COMPANY_SOCIAL.instagram.handle}
                </span>
                <span className="inline-flex items-center space-x-1 text-pink-600 dark:text-pink-400 font-bold text-xs">
                  <span>Follow Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.a>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Smooth Scroll To Top */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>© {currentYear} {multilingual[language].name}. {t.footer.rightsReserved}</span>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-xs border border-slate-200/80 dark:border-slate-800"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>

    </footer>
  );
};
