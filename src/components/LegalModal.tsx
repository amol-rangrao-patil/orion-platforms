import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle } from 'lucide-react';
import { LegalModalType } from '../types';
import { COMPANY_NAME, COMPANY_LEGAL_NAME } from '../data/companyInfo';
import { useLanguage } from '../context/LanguageContext';

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { language, multilingual } = useLanguage();
  if (!type) return null;

  const companyName = multilingual[language]?.name || COMPANY_NAME;
  const companyLegal = multilingual[language]?.legal || COMPANY_LEGAL_NAME;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: `${companyName} Privacy Policy`,
          icon: <ShieldCheck className="w-5 h-5 text-[#1a73e8] dark:text-blue-400" />,
          lastUpdated: 'Updated September 2025',
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                At {companyLegal} (referred to as "{companyName}", "we", "our"), protecting the proprietary architecture and confidentiality of our clients is fundamental.
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">1. Data Ingestion & Scope</h4>
              <p>
                We only process business telemetry and inquiry information necessary to facilitate client consultations, architectural evaluations, and contractual software development services.
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">2. Zero Sale of Client Information</h4>
              <p>
                {companyName} does not sell, rent, or commercialize client data or contact lists under any circumstances. All client inquiries are kept under strict confidentiality.
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">3. Global Security Standards</h4>
              <p>
                Our infrastructure adheres to industry best practices, encrypted communication channels, and strict access controls to safeguard your data.
              </p>
            </div>
          )
        };

      case 'terms':
        return {
          title: `${companyName} Terms of Service`,
          icon: <FileText className="w-5 h-5 text-[#1a73e8] dark:text-blue-400" />,
          lastUpdated: 'Effective August 2025',
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                These Terms govern use of the {companyName} website, client inquiries, and scoping communications. Contracted deliverables are governed by customized Master Services Agreements (MSA).
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">1. Engagement & Scoping</h4>
              <p>
                Initial consultations, scoping sessions, and architectural evaluations are non-binding until formal execution of an {companyName} Project Agreement.
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">2. Intellectual Property Rights & Ownership</h4>
              <p>
                Upon project completion and contractual settlement, 100% of custom-developed source code, application assets, and documentation are handed over to the client.
              </p>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">3. Quality & Security Assurance</h4>
              <p>
                Our engineering workflows include continuous integration testing, code reviews, and vulnerability scans before deployment.
              </p>
            </div>
          )
        };

      case 'security':
        return {
          title: `${companyName} Security & NDA Protection`,
          icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          lastUpdated: 'Q3 2025 Verification',
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {companyName} implements strict technical safeguards to guarantee client code integrity and proprietary data isolation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">Standard Mutual NDA</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Available immediately prior to deep code discussions</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">Full Code Handover</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct Git repository transfer with zero vendor lock-in</div>
                  </div>
                </div>
              </div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm pt-2">Cryptographic Safeguards</h4>
              <p>
                All data in transit is protected via modern TLS 1.3 encryption, and development environments are strictly firewalled.
              </p>
            </div>
          )
        };

      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {content.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{content.title}</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">{content.lastUpdated}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {content.body}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>{COMPANY_LEGAL_NAME}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium transition-colors cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
