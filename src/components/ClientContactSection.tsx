import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  CheckCircle2, 
  Building2, 
  User, 
  RefreshCw, 
  ExternalLink, 
  Cpu,
  Workflow,
  Clock,
  Plus,
  Sparkles,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Phone,
  ShieldCheck,
  Compass,
  Navigation,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import { 
  COMPANY_NAME, 
  COMPANY_CONTACT, 
  SERVICE_CATEGORIES, 
  TIMELINE_OPTIONS, 
  COMPANY_SIZES, 
  PROJECT_STAGES,
  COMPANY_COORDINATES
} from '../data/companyInfo';
import { ContactFormData, SubmissionResponse } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ClientContactSectionProps {
  selectedServiceId?: string;
  forceOpenForm?: boolean;
  onFormVisibilityChange?: (visible: boolean) => void;
}

const COMMON_REQUIREMENT_CHIPS = [
  'Full-Stack Web (React/Next.js)',
  'Mobile Apps (iOS & Android)',
  'Cloud Infrastructure (AWS/GCP)',
  'Custom ERP / CRM System',
  'PostgreSQL Database & APIs',
  'Authentication & Role Permissions',
  'Payment Gateway Integration',
  'Real-Time WebSocket Sync',
  'High-Concurrency Architecture'
];

export const ClientContactSection: React.FC<ClientContactSectionProps> = ({ 
  selectedServiceId,
  forceOpenForm,
  onFormVisibilityChange
}) => {
  const { language, t, multilingual } = useLanguage();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [formData, setFormData] = useState<ContactFormData>({
    clientType: 'company',
    fullName: '',
    email: '',
    subject: 'Custom Software Development',
    phone: '',
    companyName: '',
    role: '',
    companySize: COMPANY_SIZES[0],
    industry: '',
    projectName: '',
    projectStage: PROJECT_STAGES[0],
    serviceCategory: SERVICE_CATEGORIES[0].id,
    timeline: TIMELINE_OPTIONS[0],
    message: '',
    newsletterOptIn: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [istTime, setIstTime] = useState<string>('');

  // Map hero capability IDs to service category IDs and open form if triggered
  useEffect(() => {
    if (selectedServiceId) {
      setIsFormVisible(true);
      const match = SERVICE_CATEGORIES.find(s => s.id === selectedServiceId || s.id.startsWith(selectedServiceId));
      if (match) {
        setFormData(prev => ({ ...prev, serviceCategory: match.id }));
      }
    }
  }, [selectedServiceId]);

  // Sync forceOpenForm from external triggers (like hero buttons)
  useEffect(() => {
    if (forceOpenForm) {
      setIsFormVisible(true);
    }
  }, [forceOpenForm]);

  const handleToggleForm = (visible: boolean) => {
    setIsFormVisible(visible);
    if (onFormVisibilityChange) {
      onFormVisibilityChange(visible);
    }
    if (visible) {
      setTimeout(() => {
        const el = document.getElementById('project-scoping-form-container');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(new Date());
        setIstTime(timeString);
      } catch {
        setIstTime('09:30:00 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/meaoarok';

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleAddChip = (chipText: string) => {
    setFormData(prev => {
      if (prev.message.includes(chipText)) return prev;
      const separator = prev.message.trim() ? '\n- ' : 'Key Requirements:\n- ';
      return {
        ...prev,
        message: prev.message + separator + chipText
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name or company name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject?.trim()) {
      newErrors.subject = 'Please specify the subject or project topic.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide a brief message or project requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const subjectLine = formData.subject?.trim() || 'Custom Software Project Inquiry';

    const payload = {
      _subject: `[Inquiry] ${subjectLine} from ${formData.fullName} - ${COMPANY_NAME}`,
      _replyto: formData.email,
      clientType: formData.clientType,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: subjectLine,
      projectName: formData.projectName,
      projectStage: formData.projectStage,
      serviceCategory: formData.serviceCategory,
      timeline: formData.timeline,
      industry: formData.industry,
      message: formData.message,
      newsletterOptIn: formData.newsletterOptIn,
      ...(formData.clientType === 'company' ? {
        companyName: formData.companyName,
        role: formData.role,
        companySize: formData.companySize
      } : {}),
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null) as { error?: string; message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Formspree rejected the submission.');
      }
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Unable to send the inquiry right now.');
      setIsSubmitting(false);
      return;
    }

    const referenceId = `ORN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const submittedAt = new Date().toISOString();

    setSubmissionResult({
      formspreeStatus: 'success',
      referenceId,
      timestamp: submittedAt,
      clientName: formData.fullName,
      email: formData.email,
      clientType: formData.clientType,
      companyOrProject: formData.fullName,
      serviceCategory: subjectLine
    });

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      clientType: 'company',
      fullName: '',
      email: '',
      companyName: '',
      role: '',
      companySize: COMPANY_SIZES[0],
      industry: '',
      projectName: '',
      projectStage: PROJECT_STAGES[0],
      serviceCategory: SERVICE_CATEGORIES[0].id,
      timeline: TIMELINE_OPTIONS[0],
      message: '',
      newsletterOptIn: false
    });
    setSubmissionResult(null);
    setSubmissionError(null);
    setErrors({});
  };

  const currentCategoryName = SERVICE_CATEGORIES.find(s => s.id === formData.serviceCategory)?.name || 'Custom Software Development';

  const engagementTimeline = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/60 p-5 dark:border-blue-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-400">Engagement Protocol</div>
          <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">What happens next</h4>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live desk
        </span>
      </div>
      <div className="space-y-3">
        {[
          ['01', 'Inquiry received', 'Your technical details reach our engineering desk securely.'],
          ['02', 'Architect review', 'A senior architect reviews your scope and requirements.'],
          ['03', 'Direct response', 'Expect a clear next step within two business hours.']
        ].map(([step, title, description], index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.25 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-[10px] font-bold text-white shadow-sm shadow-blue-500/30">{step}</span>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{title}</div>
              <div className="mt-0.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">{description}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ x: ['-120%', '360%'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />
    </motion.div>
  );

  return (
    <section id="contact-section" className="py-16 sm:py-20 lg:py-24 bg-slate-50/50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 relative scroll-mt-20 lg:scroll-mt-24">
      
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1a73e8] dark:text-blue-400 text-xs font-semibold mb-3 border border-blue-200/60 dark:border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Direct Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.contact.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.contact.subheading}
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email Inboxes & Kolhapur HQ (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Direct Email Channels */}
            <motion.div 
              id="contact-desks"
              whileHover={{ y: -4 }}
              className="scroll-mt-24 p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/50 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                  {t.contact.directEmailChannels}
                </h3>
                <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{t.contact.activeDesks}</span>
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
                {t.contact.technicalLines}
              </p>

              <div className="space-y-3.5">
                {/* Primary Email */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-[#1a73e8] dark:text-blue-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Primary Inquiries</div>
                      <a
                        href={`mailto:${COMPANY_CONTACT.primaryEmail}`}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors truncate block font-mono mt-0.5"
                      >
                        {COMPANY_CONTACT.primaryEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(COMPANY_CONTACT.primaryEmail, 'primary')}
                    title="Copy email address"
                    aria-label="Copy primary email"
                    className="p-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    {copiedField === 'primary' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-in zoom-in" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>

                {/* Solutions Email */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:border-emerald-400/60 dark:hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Software Architecture Desk</div>
                      <a
                        href={`mailto:${COMPANY_CONTACT.solutionsEmail}`}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block font-mono mt-0.5"
                      >
                        {COMPANY_CONTACT.solutionsEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(COMPANY_CONTACT.solutionsEmail, 'solutions')}
                    title="Copy email address"
                    aria-label="Copy architecture email"
                    className="p-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    {copiedField === 'solutions' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-in zoom-in" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>

                {/* Support Email */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between group hover:border-sky-400/60 dark:hover:border-sky-500/50 transition-all"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Technical Support & AMC</div>
                      <a
                        href={`mailto:${COMPANY_CONTACT.supportEmail}`}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate block font-mono mt-0.5"
                      >
                        {COMPANY_CONTACT.supportEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(COMPANY_CONTACT.supportEmail, 'support')}
                    title="Copy email address"
                    aria-label="Copy support email"
                    className="p-2.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    {copiedField === 'support' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-in zoom-in" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Direct Coordination & Rapid Response SLA Card */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-lg bg-blue-500/10 text-[#1a73e8] dark:text-blue-400">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Institutional Commitments</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  SLA: &lt; 2 Hours
                </span>
              </div>

              <div className="space-y-3 pt-1 text-xs text-slate-700 dark:text-slate-200">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Zero Intermediaries:</strong> Speak directly with senior systems architects who will design and oversee your implementation.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Automatic Mutual NDA:</strong> Comprehensive confidentiality protection prior to sharing technical documents or schemas.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-950 dark:text-white">Full IP Ownership:</strong> Complete source code, Docker configs, CI/CD scripts, and docs handed over upon delivery.</span>
                </div>
              </div>

              {/* Direct Phone hotline */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-[#1a73e8] dark:text-blue-400" />
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Direct Hotline:</span>
                  <a href={`tel:${COMPANY_CONTACT.phone}`} className="font-mono font-bold text-slate-950 dark:text-white hover:text-[#1a73e8] dark:hover:text-blue-400 transition-colors">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(COMPANY_CONTACT.phone, 'phone')}
                  className="p-1.5 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy telephone"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>

            {isFormVisible && engagementTimeline}
          </motion.div>

          {/* Right Column: Scoping & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            {!isFormVisible ? (
              <>
              /* Hidden by default: Clean, prominent, animated card prompting user to open the form */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative Top Pill */}
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#1a73e8] dark:text-blue-400 mb-3.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Architecture & Scoping</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-3 tracking-tight">
                  Scope Your Next Enterprise Project
                </h3>

                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Our structured project scoping questionnaire lets you submit technical parameters, milestones, and system requirements directly to senior software architects in Kolhapur under full confidentiality and NDA protection.
                </p>

                {/* 3 Pillars of Trust */}
                <div className="space-y-3.5 mb-8 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-950 dark:text-white">Structured Scoping: </span>
                      <span>Dedicated options for Company / Enterprise SLA or Individual / Startup MVP.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-950 dark:text-white">Complete IP Guarantee: </span>
                      <span>Full repository, documentation, and source code ownership transferred on delivery.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-950 dark:text-white">Direct Architect Response: </span>
                      <span>Review within &lt; 2 business hours without telemarketing intermediaries.</span>
                    </div>
                  </div>
                </div>

                {/* Prominent Action Button to Open the Form */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToggleForm(true)}
                  id="open-scoping-form-btn"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#1a73e8] via-blue-600 to-indigo-600 hover:from-[#1557b0] hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer group"
                >
                  <FileCheck2 className="w-5 h-5" />
                  <span>{t.contact.openForm}</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </motion.button>
              </motion.div>
              <div className="mt-6">{!isFormVisible && engagementTimeline}</div>
              </>
            ) : (
              /* The Short Animated Form Revealed with Close/Collapse button */
              <motion.div 
                id="project-scoping-form-container"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative p-[1.5px] rounded-2xl bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-indigo-500/40 animate-shimmer-flow shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/15 transition-all overflow-hidden"
              >
                <div className="p-6 sm:p-7 rounded-[15px] bg-white dark:bg-slate-900 relative">
                  {/* Form Top Control Bar with Hide Button */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-[#1a73e8] dark:text-cyan-400">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-['Outfit',sans-serif] text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                            {t.contact.directProjectInquiry}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Response &lt;2h</span>
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">Formspree · meaoarok</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          Direct encrypted transmission to {multilingual[language].name} Engineering Desk
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleToggleForm(false)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80"
                      title="Hide inquiry form"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                      <span>{t.contact.hideForm}</span>
                    </motion.button>
                  </div>
                
                  {submissionResult ? (
                    /* Submission Confirmation Receipt */
                    <div className="py-6 text-center animate-in zoom-in-95 duration-200">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                        <Check className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-2 font-['Outfit',sans-serif]">
                        Inquiry Transmitted Successfully
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-5">
                        Thank you, <span className="font-semibold text-slate-950 dark:text-white">{submissionResult.clientName}</span>. Your project inquiry has been queued at our engineering desk.
                      </p>

                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left max-w-sm mx-auto mb-6 space-y-2.5 text-xs sm:text-sm font-mono">
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 font-sans">Reference ID:</span>
                          <span className="font-bold text-[#1a73e8] dark:text-cyan-400">{submissionResult.referenceId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400 font-sans">Contact:</span>
                          <span className="text-slate-900 dark:text-slate-200 truncate max-w-[170px] text-right font-sans">{submissionResult.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400 font-sans">Subject:</span>
                          <span className="text-slate-900 dark:text-slate-200 truncate max-w-[170px] text-right font-sans">{submissionResult.serviceCategory}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={`https://wa.me/917499577784?text=${encodeURIComponent(`Hello Orion Platforms, I submitted an inquiry with Reference ID ${submissionResult.referenceId} regarding ${submissionResult.serviceCategory}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp Engineering Desk</span>
                        </a>

                        <button
                          onClick={handleReset}
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>New Inquiry</span>
                        </button>
                      </div>
                    </div>
                ) : (
                /* Compact Animated Short Form */
                <motion.form
                  onSubmit={handleSubmit}
                  noValidate
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                  }}
                  className="space-y-4"
                >
                  {submissionError && (
                    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
                      {submissionError} Please try again or contact us directly by email or WhatsApp.
                    </div>
                  )}

                  {/* Engagement Type */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      How are you contacting us?
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { value: 'company' as const, label: 'Company / Enterprise', description: 'For business and organization projects' },
                        { value: 'personal' as const, label: 'Individual Client', description: 'For personal projects and individual needs' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            clientType: option.value,
                            ...(option.value === 'personal' ? { companyName: '', role: '', companySize: '' } : {})
                          })}
                          className={`text-left rounded-xl border px-4 py-3 transition-all cursor-pointer ${
                            formData.clientType === option.value
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-500/30'
                              : 'border-slate-200 bg-slate-50 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-950/70'
                          }`}
                        >
                          <span className="block text-sm font-bold text-slate-900 dark:text-white">{option.label}</span>
                          <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{option.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Field 1: Full Name */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} className="space-y-1.5">
                    <label 
                      htmlFor="fullName"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-[#1a73e8] dark:text-cyan-400" />
                        <span>{t.contact.fullName}</span>
                      </span>
                      <span className="text-rose-500 text-xs">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Rajesh Sharma / Tech Solutions"
                        className={`w-full pl-4 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border ${
                          errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-[#1a73e8] dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20'
                        } text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none transition-all duration-200`}
                      />
                    </div>
                    {errors.fullName && (
                      <span className="text-xs text-rose-500 font-medium block animate-in fade-in">{errors.fullName}</span>
                    )}
                  </motion.div>

                  {/* Field 2: Email Address */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} className="space-y-1.5">
                    <label 
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#1a73e8] dark:text-cyan-400" />
                        <span>{t.contact.email}</span>
                      </span>
                      <span className="text-rose-500 text-xs">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full pl-4 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border ${
                          errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-[#1a73e8] dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20'
                        } text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none transition-all duration-200`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-rose-500 font-medium block animate-in fade-in">{errors.email}</span>
                    )}
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Phone / WhatsApp <span className="text-slate-400 normal-case font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., +91 7499577784"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 focus:border-[#1a73e8] dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </motion.div>
                  </div>

                  {/* Company Details: only for company inquiries */}
                  {formData.clientType === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-3 rounded-xl border border-blue-200/70 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-4 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-400">
                        <Building2 className="w-3.5 h-3.5" />
                        Company Details
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          id="companyName"
                          type="text"
                          value={formData.companyName || ''}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Company name"
                          className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-950 dark:text-white placeholder-slate-400 text-sm outline-none"
                        />
                        <input
                          id="role"
                          type="text"
                          value={formData.role || ''}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="Your role / designation"
                          className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-950 dark:text-white placeholder-slate-400 text-sm outline-none"
                        />
                        <select
                          id="companySize"
                          value={formData.companySize || COMPANY_SIZES[0]}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white text-sm outline-none"
                        >
                          {COMPANY_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                        </select>
                        <input
                          id="industry"
                          type="text"
                          value={formData.industry || ''}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          placeholder="Industry (e.g., Healthcare, SaaS)"
                          className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-950 dark:text-white placeholder-slate-400 text-sm outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Field 3: Subject / Topic with Animated Quick Select Pills */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="subject"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#1a73e8] dark:text-cyan-400" />
                        <span>{t.contact.subject}</span>
                      </span>
                      <span className="text-rose-500 text-xs">*</span>
                    </label>

                    <input
                      id="subject"
                      type="text"
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Custom Software Development, Mobile App MVP"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border ${
                        errors.subject ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-[#1a73e8] dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20'
                      } text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none transition-all duration-200`}
                    />
                    {errors.subject && (
                      <span className="text-xs text-rose-500 font-medium block animate-in fade-in">{errors.subject}</span>
                    )}

                    {/* Quick Selection Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        'Custom Software',
                        'Web & Mobile Apps',
                        'Cloud & DevOps',
                        'IT AMC & Support',
                        'Enterprise ERP/CRM'
                      ].map((preset, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: preset })}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            formData.subject === preset
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30 font-semibold'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-cyan-400'
                          }`}
                        >
                          {preset}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Project Scope Details */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4"
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Project Scope</div>
                    <input
                      id="projectName"
                      type="text"
                      value={formData.projectName || ''}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      placeholder="Project name or short idea"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-950 dark:text-white placeholder-slate-400 text-sm outline-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <select
                        id="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white text-sm outline-none"
                      >
                        {SERVICE_CATEGORIES.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
                      </select>
                      <select
                        id="projectStage"
                        value={formData.projectStage}
                        onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white text-sm outline-none"
                      >
                        {PROJECT_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                      </select>
                      <select
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white text-sm outline-none"
                      >
                        {TIMELINE_OPTIONS.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
                      </select>
                    </div>
                  </motion.div>

                  {/* Field 4: Message */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span>{t.contact.message}</span>
                      <span className="text-rose-500 text-xs">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your project requirements, goals, or questions..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border ${
                        errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-[#1a73e8] dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20'
                      } text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none transition-all duration-200 resize-none`}
                    />
                    {errors.message && (
                      <span className="text-xs text-rose-500 font-medium block animate-in fade-in">{errors.message}</span>
                    )}
                  </div>

                  {/* Dual Animated Action Buttons: Direct Formspree Transmission + WhatsApp */}
                  <div className="pt-2 space-y-2.5">
                    <motion.button
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      id="submit-contact-form-btn"
                      className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1a73e8] via-blue-600 to-indigo-600 hover:from-[#1557b0] hover:to-indigo-700 disabled:opacity-60 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 cursor-pointer disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting to Orion Engineering...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          <span>{t.contact.submit}</span>
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`https://wa.me/917499577784?text=${encodeURIComponent(`Hello Orion Platforms! My name is ${formData.fullName || 'Client'}, inquiring about: ${formData.subject || 'Software Services'}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Direct WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleToggleForm(false)}
                        className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer inline-flex items-center space-x-1"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </button>
                    </div>

                    <div className="relative h-8 overflow-hidden rounded-lg border border-blue-200/60 bg-blue-50/60 px-3 dark:border-blue-900/60 dark:bg-blue-950/20">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                      />
                      <div className="relative flex h-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-cyan-300">
                        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Secure intake channel active</span>
                        <span>Ready to transmit</span>
                      </div>
                    </div>
                  </div>

                </motion.form>
              )}

                </div>
            </motion.div>
          )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DEDICATED SEPARATE LINE: OUR LOCATIONS & HEADQUARTERS CARD                */}
        {/* ========================================================================= */}
        <div id="headquarters-section" className="mt-14 sm:mt-20 scroll-mt-24">
          
          {/* Section Heading: Dedicated to Kolhapur Headquarters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1a73e8] dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200 dark:border-blue-500/30 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Headquarters</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Corporate & Engineering Headquarters
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-2xl">
                Located at NH166G, Mhalunge, Kolhapur District, Maharashtra 416206, India — serving as our sole core engineering center and system architecture headquarters.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Kolhapur Operations</span>
              </span>
            </div>
          </div>

          {/* Headquarters Master Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          >
            {/* Top Bar inside HQ Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#1a73e8]/10 dark:bg-blue-500/20 text-[#1a73e8] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a73e8] dark:text-blue-400">
                      Sole Engineering Headquarters
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold uppercase tracking-wider">
                      Live IST Desk
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mt-0.5">
                    Kolhapur Engineering & Technology Center
                  </h4>
                </div>
              </div>

              {/* Status Chips & Navigation Action */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Live Clock */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold border border-slate-200/80 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{istTime || 'Kolhapur IST'}</span>
                </div>

                {/* GPS Coordinates Chip */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs font-mono text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                  <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>16.69110, 73.99104</span>
                  <button
                    onClick={() => handleCopy('16.69110, 73.99104', 'hq_coords')}
                    title="Copy GPS coordinates"
                    className="ml-1 p-0.5 text-emerald-700 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-white cursor-pointer"
                  >
                    {copiedField === 'hq_coords' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Direct Google Maps Directions */}
                <a
                  href={COMPANY_COORDINATES.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Navigate on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Split Content: Map & Physical Details + Kolhapur Desk Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Map & Physical Facility (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Address Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        NH166G, Mhalunge, Kolhapur District
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                        Maharashtra 416206, India
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                        <span>Office Hours: Mon – Fri (9:00 AM – 6:30 PM IST)</span>
                        <span>•</span>
                        <span>Emergency Hotline: 24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Map Embed */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-inner relative group">
                  <iframe
                    title="Orion Platforms Kolhapur Headquarters (16.69110, 73.99104)"
                    src={COMPANY_COORDINATES.embedMapUrl}
                    className="w-full h-64 sm:h-72 lg:h-80 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-sm flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Headquarters Geo-Marker (16.69110, 73.99104)</span>
                  </div>
                </div>

                {/* Facility Technical Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span>Systems Lab</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-snug">
                      Distributed computing, low-latency microservices, and Kubernetes clusters.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <Workflow className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Agile Pods</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-snug">
                      Dedicated client scrum rooms with transparent GitHub & CI/CD deployment mirrors.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                      <span>SecOps Grid</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-snug">
                      Dual-redundant optical gigabit links, ISO/IEC aligned security, and zero downtime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Kolhapur Headquarters Operations & Visitor Desk (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-[#1a73e8] dark:text-blue-400" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Headquarters Facility Details
                    </h5>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    Kolhapur, India
                  </span>
                </div>

                {/* Kolhapur Primary Card */}
                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/90 dark:border-blue-900/60 ring-1 ring-blue-500/20 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-slate-950 dark:text-white">
                          Kolhapur Headquarters
                        </span>
                        <span className="relative inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#1a73e8] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          <span>Primary HQ</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 mt-1.5 leading-relaxed">
                        NH166G, Mhalunge, Kolhapur District, Maharashtra 416206, India
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-blue-100 dark:border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Coordinates</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 text-xs">16.69110, 73.99104</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-blue-100 dark:border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Local Timezone</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 text-xs">Asia/Kolkata (IST)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      <Compass className="w-3.5 h-3.5 text-blue-500" />
                      <span>Latitude: 16.69110° N</span>
                    </div>

                    <a
                      href={COMPANY_COORDINATES.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-[#1a73e8] hover:text-blue-700 dark:text-blue-400 transition-colors"
                    >
                      <span>Google Map Pin</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Direct Contact Points at HQ */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#1a73e8] dark:text-blue-400" />
                    <span>Official Headquarters Inboxes</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Headquarters Desk:</span>
                    <a href={`mailto:${COMPANY_CONTACT.primaryEmail}`} className="font-mono font-semibold hover:text-[#1a73e8] text-slate-900 dark:text-slate-100 transition-colors">
                      {COMPANY_CONTACT.primaryEmail}
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Direct Telephone:</span>
                    <a href={`tel:${COMPANY_CONTACT.phone}`} className="font-mono font-semibold hover:text-[#1a73e8] text-slate-900 dark:text-slate-100 transition-colors">
                      {COMPANY_CONTACT.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-1 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Operating Schedule:</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">Mon – Fri (9 AM – 6:30 PM IST)</span>
                  </div>
                </div>

                {/* Direct On-Site Meeting Scheduling */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-100 to-blue-50/70 dark:from-slate-900 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Planning an On-Site Visit?</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">Schedule an architectural briefing at our headquarters.</div>
                  </div>
                  <a
                    href={`mailto:${COMPANY_CONTACT.primaryEmail}?subject=On-Site%20Headquarters%20Visit%20Request`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-colors font-bold shrink-0 shadow-xs"
                  >
                    Schedule Visit
                  </a>
                </div>

              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
