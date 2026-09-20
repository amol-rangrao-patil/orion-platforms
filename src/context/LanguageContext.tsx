import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr' | 'hi';

export interface MultilingualInfo {
  name: string;
  legal: string;
  sub: string;
  langLabel: string;
  badge: string;
}

export const MULTILINGUAL_NAMES: Record<Language | 'ja' | 'de', MultilingualInfo> = {
  en: {
    name: 'ORION PLATFORMS',
    legal: 'Orion Platforms Tech Pvt. Ltd.',
    sub: 'Systems & IT Engineering',
    langLabel: 'English',
    badge: 'Global Standard'
  },
  mr: {
    name: 'ओरियन प्लॅटफॉर्म्स',
    legal: 'ओरियन प्लॅटफॉर्म्स टेक प्रायव्हेट लिमिटेड',
    sub: 'सिस्टम्स आणि आयटी इंजिनिअरिंग',
    langLabel: 'मराठी',
    badge: 'मुख्यालय कोल्हापूर'
  },
  hi: {
    name: 'ओरियन प्लेटफॉर्म्स',
    legal: 'ओरियन प्लेटफॉर्म्स टेक प्राइवेट लिमिटेड',
    sub: 'सिस्टम और आईटी इंजीनियरिंग',
    langLabel: 'हिंदी',
    badge: 'मुख्यालय कोल्हापुर'
  },
  ja: {
    name: 'オリオン プラットフォーム',
    legal: 'オリオン プラットフォーム テック',
    sub: 'システム＆ITエンジニアリング',
    langLabel: '日本語',
    badge: 'テクノロジー'
  },
  de: {
    name: 'ORION PLATTFORMEN',
    legal: 'Orion Plattformen Tech',
    sub: 'System- & IT-Engineering',
    langLabel: 'Deutsch',
    badge: 'Technologie'
  }
};

export interface Translations {
  nav: {
    about: string;
    services: string;
    contact: string;
    headquarters: string;
    techPvtLtd: string;
    hqBadge: string;
    sectionCount: string;
  };
  hero: {
    badge: string;
    tagline: string;
    summary: string;
    ctaContact: string;
    ctaServices: string;
    enterAnimNotice: string;
    nameInOtherLang: string;
    cycleNotice: string;
    trustMetrics: {
      projects: { label: string; subtext: string };
      satisfaction: { label: string; subtext: string };
      ipOwnership: { label: string; subtext: string };
      responseTime: { label: string; subtext: string };
    };
    rotatingSubtitles: string[];
  };
  capabilities: {
    sectionTag: string;
    heading: string;
    subheading: string;
    scopeButton: string;
  };
  contact: {
    sectionTag: string;
    heading: string;
    subheading: string;
    fastResponseBadge: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    whatsAppButton: string;
    hideButton: string;
    openForm: string;
    directProjectInquiry: string;
    hideForm: string;
    directEmailChannels: string;
    activeDesks: string;
    technicalLines: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
  footer: {
    rightsReserved: string;
    backToTop: string;
    topBadges: {
      ip: { title: string; sub: string };
      sla: { title: string; sub: string };
      nda: { title: string; sub: string };
      architect: { title: string; sub: string };
    };
    navigationTitle: string;
    legalTitle: string;
    socialTitle: string;
  };
  hq: {
    facilityTitle: string;
    facilitySubtitle: string;
    techSpecsTitle: string;
    visitNotice: string;
    openInMaps: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      headquarters: 'Headquarters',
      techPvtLtd: 'Tech Pvt. Ltd.',
      hqBadge: 'HQ Kolhapur',
      sectionCount: '4 Core Sections'
    },
    hero: {
      badge: 'Orion Platforms • Systems & IT Engineering',
      tagline: 'Architecting Bespoke Enterprise Software & Scalable Cloud Topology',
      summary: 'Orion Platforms is an IT software engineering & systems architecture firm. We design, engineer, and deploy tailor-made digital platforms, mission-critical web applications, native mobile systems, and scalable cloud architectures with 100% intellectual property transfer.',
      ctaContact: 'Submit Project Inquiry',
      ctaServices: 'Explore Architecture Services',
      enterAnimNotice: 'Title Enter Animation Active',
      nameInOtherLang: 'Company Name in Other Languages',
      cycleNotice: 'Cycles every 10s',
      trustMetrics: {
        projects: {
          label: 'Bespoke Projects Delivered',
          subtext: 'Across 14+ Industry Sectors'
        },
        satisfaction: {
          label: 'Client SLA Satisfaction',
          subtext: 'Rigorous Quality Engineering'
        },
        ipOwnership: {
          label: 'Client Code & IP Handover',
          subtext: 'Zero Vendor Lock-in'
        },
        responseTime: {
          label: 'Direct Architect Response',
          subtext: 'No Sales Intermediaries'
        }
      },
      rotatingSubtitles: [
        "Bespoke Enterprise Software & High-Availability Cloud Infrastructure",
        "High-Performance Full-Stack Web & Cross-Platform Mobile Architectures",
        "Scalable Kubernetes Microservices & Distributed PostgreSQL Clusters",
        "Institutional Security Standards with 100% Intellectual Property Handover"
      ]
    },
    capabilities: {
      sectionTag: 'Engineering Disciplines',
      heading: 'Enterprise Architectural Capabilities',
      subheading: 'Production-ready solutions engineered with precision, high-concurrency throughput, and long-term maintainability.',
      scopeButton: 'Scope This Capability'
    },
    contact: {
      sectionTag: 'Direct Technical Engagement',
      heading: 'Initiate Enterprise Scoping',
      subheading: 'Discuss system architectures, SLAs, and technical timelines directly with our engineering desk.',
      fastResponseBadge: 'Response < 2h SLA',
      fullNameLabel: 'Full Name / Organization',
      fullNamePlaceholder: 'e.g., Rajesh Sharma / Tech Solutions',
      emailLabel: 'Official / Work Email',
      emailPlaceholder: 'name@company.com',
      subjectLabel: 'Subject / Requirement',
      subjectPlaceholder: 'e.g., Custom Software Development, Mobile App MVP',
      messageLabel: 'Project Message / Scope',
      messagePlaceholder: 'Briefly describe your project requirements, goals, or questions...',
      submitButton: 'Transmit Inquiry',
      submittingButton: 'Transmitting to Orion Engineering...',
      whatsAppButton: 'Direct WhatsApp',
      hideButton: 'Hide',
      openForm: 'Open Ingestion Terminal',
      directProjectInquiry: 'Direct Project Inquiry',
      hideForm: 'Hide Ingestion Terminal',
      directEmailChannels: 'Direct Engineering Email Desks',
      activeDesks: 'Active Engineering Channels',
      technicalLines: 'Verified Technical Inquiries Only',
      fullName: 'Full Name / Organization',
      email: 'Corporate / Work Email',
      subject: 'Subject / Requirement',
      message: 'Project Message / Scope',
      submit: 'Transmit Inquiry'
    },
    footer: {
      rightsReserved: 'All rights reserved.',
      backToTop: 'Back to Top',
      topBadges: {
        ip: { title: '100% IP Transfer', sub: 'Complete Code Ownership' },
        sla: { title: '99.4% SLA Compliance', sub: 'Contractual Reliability' },
        nda: { title: 'Strict Bilateral NDA', sub: 'Institutional Secrecy' },
        architect: { title: 'Direct Architect Access', sub: 'Zero Account Managers' }
      },
      navigationTitle: 'Navigation',
      legalTitle: 'Institutional Governance',
      socialTitle: 'Connect & Ecosystem'
    },
    hq: {
      facilityTitle: 'Orion Engineering & Technology Center',
      facilitySubtitle: 'Primary Technology Headquarters & Systems Operations',
      techSpecsTitle: 'Facility Technical Infrastructure',
      visitNotice: 'Client visits and technical architecture reviews by prior appointment.',
      openInMaps: 'Open Coordinates in Google Maps'
    }
  },
  mr: {
    nav: {
      about: 'परिचय',
      services: 'सेवा व तंत्रज्ञान',
      contact: 'प्रकल्प संपर्क',
      headquarters: 'मुख्यालय कोल्हापूर',
      techPvtLtd: 'टेक प्रायव्हेट लिमिटेड',
      hqBadge: 'मुख्यालय कोल्हापूर',
      sectionCount: '४ मुख्य विभाग'
    },
    hero: {
      badge: 'ओरियन प्लॅटफॉर्म्स • सिस्टीम्स आणि आयटी इंजिनिअरिंग',
      tagline: 'प्रगत एंटरप्राइज सॉफ्टवेअर आणि स्केलेबल क्लाउड सिस्टीम्स इंजिनिअरिंग',
      summary: 'ओरियन प्लॅटफॉर्म्स ही एक अग्रगण्य आयटी सॉफ्टवेअर आणि सिस्टीम आर्किटेक्चर संस्था आहे. आम्ही १००% बौद्धिक संपदा (IP) मालकी हस्तांतरणासह कस्टम डिजिटल प्लॅटफॉर्म्स, वेब ॲप्लिकेशन्स, मोबाइल ॲप्स आणि उच्च दर्जाची क्लाउड इन्फ्रास्ट्रक्चर विकसित करतो.',
      ctaContact: 'प्रकल्प चौकशी पाठवा',
      ctaServices: 'सेवा व तंत्रज्ञान पाहा',
      enterAnimNotice: 'टायटल ॲनिमेशन सक्रिय',
      nameInOtherLang: 'कंपनीचे नाव इतर भाषांमध्ये',
      cycleNotice: 'दर १० सेकंदांनी पुन्हा ॲनिमेट होते',
      trustMetrics: {
        projects: {
          label: 'यशस्वी वितरित प्रकल्प',
          subtext: '१४+ विविध उद्योग क्षेत्रांमध्ये'
        },
        satisfaction: {
          label: 'क्लायंट SLA समाधान',
          subtext: 'अचूक आणि दर्जेदार इंजिनिअरिंग'
        },
        ipOwnership: {
          label: '१००% कोड व IP मालकी',
          subtext: 'कोणतेही व्हेन्डर लॉक-इन नाही'
        },
        responseTime: {
          label: 'थेट इंजिनिअर प्रतिसाद',
          subtext: 'मध्यस्थांशिवाय थेट संपर्क'
        }
      },
      rotatingSubtitles: [
        "सानुकूल एंटरप्राइज सॉफ्टवेअर आणि हाय-अवेलेबिलिटी क्लाउड इन्फ्रास्ट्रक्चर",
        "हाय-परफॉर्मन्स फुल-स्टॅक वेब आणि मोबाइल ॲप आर्किटेक्चर",
        "स्केलेबल कुबरनेटीस मायक्रोसर्व्हिसेस आणि डिस्ट्रिब्युटेड डेटाबेस क्लस्टर्स",
        "१००% आयपी आणि सोर्स कोड मालकी हस्तांतरणासह संस्थात्मक सुरक्षा"
      ]
    },
    capabilities: {
      sectionTag: 'तांत्रिक कौशल्ये व सेवा',
      heading: 'एंटरप्राइज सिस्टीम्स आणि इंजिनिअरिंग क्षमता',
      subheading: 'अचूकता, उच्च सुरक्षितता आणि दीर्घकालीन स्केलेबिलिटीसह विकसित केलेली आधुनिक सॉफ्टवेअर सिस्टीम्स.',
      scopeButton: 'या सेवेविषयी चर्चा करा'
    },
    contact: {
      sectionTag: 'थेट तांत्रिक संपर्क',
      heading: 'प्रकल्पाची तांत्रिक चर्चा सुरू करा',
      subheading: 'आपल्या सॉफ्टवेअर सिस्टीम्स, सुरक्षितता आणि विकास कालावधीबद्दल आमच्या मुख्य इंजिनिअर्सशी थेट संपर्क साधा.',
      fastResponseBadge: 'प्रतिसाद < २ तास SLA',
      fullNameLabel: 'पूर्ण नाव / कंपनीचे नाव',
      fullNamePlaceholder: 'उदा. राजेश पाटील / टेक इनोव्हेशन्स',
      emailLabel: 'अधिकृत ईमेल आयडी',
      emailPlaceholder: 'name@company.com',
      subjectLabel: 'विषय / प्रकल्पाची गरज',
      subjectPlaceholder: 'उदा. सानुकूल सॉफ्टवेअर डेव्हलपमेंट, मोबाइल ॲप',
      messageLabel: 'प्रकल्पाचे स्वरूप व माहिती',
      messagePlaceholder: 'आपल्या प्रकल्पाच्या गरजा, उद्दिष्टे किंवा तांत्रिक प्रश्न थोडक्यात लिहा...',
      submitButton: 'चौकशी पाठवा',
      submittingButton: 'ओरियन इंजिनिअरिंगकडे पाठवत आहे...',
      whatsAppButton: 'थेट व्हॉट्सॲप संपर्क',
      hideButton: 'बंद करा',
      openForm: 'प्रकल्प चौकशी फॉर्म उघडा',
      directProjectInquiry: 'थेट प्रकल्प चौकशी',
      hideForm: 'चौकशी फॉर्म बंद करा',
      directEmailChannels: 'थेट इंजिनिअरिंग ईमेल डेस्क',
      activeDesks: 'सक्रिय इंजिनिअरिंग चॅनल्स',
      technicalLines: 'फक्त सत्यापित तांत्रिक चौकशीसाठी',
      fullName: 'पूर्ण नाव / कंपनीचे नाव',
      email: 'अधिकृत कार्य ईमेल',
      subject: 'विषय / प्रकल्पाची गरज',
      message: 'प्रकल्पाचे स्वरूप व माहिती',
      submit: 'चौकशी पाठवा'
    },
    footer: {
      rightsReserved: 'सर्व हक्क राखीव.',
      backToTop: 'वर जा',
      topBadges: {
        ip: { title: '१००% आयपी ट्रान्सफर', sub: 'संपूर्ण कोड मालकी' },
        sla: { title: '९९.४% SLA पूर्तता', sub: 'विश्वासार्ह सेवा करार' },
        nda: { title: 'कडक द्विपक्षीय NDA', sub: 'पूर्ण गोपनीयतेची हमी' },
        architect: { title: 'थेट आर्किटेक्ट संपर्क', sub: 'मध्यस्थांशिवाय चर्चा' }
      },
      navigationTitle: 'विभाग',
      legalTitle: 'कायदेशीर नियम व सुरक्षा',
      socialTitle: 'संपर्क व सोशल'
    },
    hq: {
      facilityTitle: 'ओरियन इंजिनिअरिंग व टेक्नॉलॉजी सेंटर',
      facilitySubtitle: 'मुख्य तांत्रिक मुख्यालय आणि सिस्टीम्स ऑपरेशन्स',
      techSpecsTitle: 'मुख्यालय तांत्रिक पायाभूत सुविधा',
      visitNotice: 'क्लायंट भेटी आणि तांत्रिक पुनरावलोकने पूर्व नियोजनानुसार आयोजित केली जातात.',
      openInMaps: 'गुगल मॅप्सवर स्थान उघडा'
    }
  },
  hi: {
    nav: {
      about: 'परिचय',
      services: 'सेवाएं व तकनीक',
      contact: 'प्रोजेक्ट संपर्क',
      headquarters: 'मुख्यालय कोल्हापुर',
      techPvtLtd: 'टेक प्राइवेट लिमिटेड',
      hqBadge: 'मुख्यालय कोल्हापुर',
      sectionCount: '४ मुख्य अनुभाग'
    },
    hero: {
      badge: 'ओरियन प्लेटफॉर्म्स • सिस्टम्स और आईटी इंजीनियरिंग',
      tagline: 'उन्नत एंटरप्राइज सॉफ्टवेयर और स्केलेबल क्लाउड इंफ्रास्ट्रक्चर इंजीनियरिंग',
      summary: 'ओरियन प्लेटफॉर्म्स एक अग्रणी आईटी सॉफ्टवेयर और सिस्टम आर्किटेक्चर कंपनी है। हम 100% बौद्धिक संपदा (आईपी) स्वामित्व हस्तांतरण के साथ कस्टम डिजिटल प्लेटफॉर्म, वेब एप्लिकेशन, मोबाइल सिस्टम और उच्च-उपलब्धता क्लाउड इंफ्रास्ट्रक्चर का निर्माण करते हैं।',
      ctaContact: 'प्रोजेक्ट इन्क्वायरी भेजें',
      ctaServices: 'हमारी तकनीकी सेवाएं देखें',
      enterAnimNotice: 'शीर्षक एनीमेशन सक्रिय',
      nameInOtherLang: 'कंपनी का नाम अन्य भाषाओं में',
      cycleNotice: 'हर १० सेकंड में फिर से एनिमेट होता है',
      trustMetrics: {
        projects: {
          label: 'सफल वितरित प्रोजेक्ट्स',
          subtext: '१४+ प्रमुख उद्योग क्षेत्रों में'
        },
        satisfaction: {
          label: 'क्लाइंट SLA संतुष्टि',
          subtext: 'सटीक और उच्च-गुणवत्ता इंजीनियरिंग'
        },
        ipOwnership: {
          label: '१००% कोड व आईपी स्वामित्व',
          subtext: 'कोई विक्रेता लॉक-इन नहीं'
        },
        responseTime: {
          label: 'सीधा इंजीनियर परामर्श',
          subtext: 'बिना किसी मध्यस्थ के सीधा संपर्क'
        }
      },
      rotatingSubtitles: [
        "कस्टम एंटरप्राइज सॉफ्टवेयर और उच्च-उपलब्धता क्लाउड इंफ्रास्ट्रक्चर",
        "हाई-परफॉर्मेंस फुल-स्टैक वेब और मोबाइल ऐप आर्किटेक्चर",
        "स्केलेबल कुबेरनेट्स माइक्रोसर्विसेज और डिस्ट्रीब्यूटेड डेटाबेस क्लस्टर्स",
        "१००% बौद्धिक संपदा हस्तांतरण के साथ संस्थागत सुरक्षा मानक"
      ]
    },
    capabilities: {
      sectionTag: 'इंजीनियरिंग क्षमताएं',
      heading: 'एंटरप्राइज सिस्टम्स और तकनीकी क्षमताएं',
      subheading: 'सटीकता, उच्च सुरक्षा और दीर्घकालिक मापनीयता के साथ निर्मित आधुनिक सॉफ्टवेयर सिस्टम्स।',
      scopeButton: 'इस सेवा के बारे में पूछें'
    },
    contact: {
      sectionTag: 'सीधा तकनीकी संपर्क',
      heading: 'प्रोजेक्ट तकनीकी चर्चा शुरू करें',
      subheading: 'अपने सिस्टम आर्किटेक्चर, सुरक्षा और डिलीवरी समयसीमा के बारे में हमारे इंजीनियरों से सीधे चर्चा करें।',
      fastResponseBadge: 'प्रतिक्रिया < २ घंटे SLA',
      fullNameLabel: 'पूरा नाम / कंपनी का नाम',
      fullNamePlaceholder: 'उदा. राजेश शर्मा / टेक सॉल्यूशंस',
      emailLabel: 'आधिकारिक कार्य ईमेल',
      emailPlaceholder: 'name@company.com',
      subjectLabel: 'विषय / प्रोजेक्ट आवश्यकता',
      subjectPlaceholder: 'उदा. कस्टम सॉफ्टवेयर डेवलपमेंट, मोबाइल ऐप',
      messageLabel: 'प्रोजेक्ट का विवरण',
      messagePlaceholder: 'अपनी आवश्यकताओं, लक्ष्यों या तकनीकी प्रश्नों का संक्षिप्त विवरण दें...',
      submitButton: 'इन्क्वायरी भेजें',
      submittingButton: 'ओरियन इंजीनियरिंग को भेजा जा रहा है...',
      whatsAppButton: 'सीधा व्हाट्सएप संपर्क',
      hideButton: 'बंद करें',
      openForm: 'प्रोजेक्ट इन्क्वायरी फॉर्म खोलें',
      directProjectInquiry: 'सीधा प्रोजेक्ट संपर्क',
      hideForm: 'इन्क्वायरी फॉर्म बंद करें',
      directEmailChannels: 'सीधे इंजीनियरिंग ईमेल डेस्क',
      activeDesks: 'सक्रिय इंजीनियरिंग चैनल्स',
      technicalLines: 'केवल सत्यापित तकनीकी पूछताछ के लिए',
      fullName: 'पूरा नाम / कंपनी का नाम',
      email: 'आधिकारिक कार्य ईमेल',
      subject: 'विषय / प्रोजेक्ट आवश्यकता',
      message: 'प्रोजेक्ट का विवरण',
      submit: 'इन्क्वायरी भेजें'
    },
    footer: {
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
      backToTop: 'शीर्ष पर जाएं',
      topBadges: {
        ip: { title: '१००% आईपी ट्रांसफर', sub: 'पूर्ण कोड स्वामित्व' },
        sla: { title: '९९.४% SLA अनुपालन', sub: 'विश्वसनीय सेवा स्तर' },
        nda: { title: 'कठोर द्विपक्षीय NDA', sub: 'पूर्ण गोपनीयता सुरक्षा' },
        architect: { title: 'सीधा आर्किटेक्ट संपर्क', sub: 'बिना बिचौलियों के सीधा संवाद' }
      },
      navigationTitle: 'नेविगेशन',
      legalTitle: 'कानूनी शासन व सुरक्षा',
      socialTitle: 'सोशल व नेटवर्क'
    },
    hq: {
      facilityTitle: 'ओरियन इंजीनियरिंग व टेक्नोलॉजी सेंटर',
      facilitySubtitle: 'मुख्य तकनीकी मुख्यालय और सिस्टम्स ऑपरेशंस',
      techSpecsTitle: 'मुख्यालय तकनीकी आधारभूत संरचना',
      visitNotice: 'क्लाइंट बैठकें और तकनीकी समीक्षाएं पूर्व सूचना के अनुसार आयोजित की जाती हैं।',
      openInMaps: 'गूगल मैप्स पर स्थान देखें'
    }
  }
};

const LANGUAGES_CYCLE: Language[] = ['en', 'mr', 'hi'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  companyName: string;
  companyLegalName: string;
  multilingual: typeof MULTILINGUAL_NAMES;
  countdown: number;
  cycleCount: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [countdown, setCountdown] = useState<number>(10);
  const [cycleCount, setCycleCount] = useState<number>(0);

  // Automatic 10-second language rotation: en -> mr -> hi -> en
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setLanguageState((prevLang) => {
        const idx = LANGUAGES_CYCLE.indexOf(prevLang);
        const nextIdx = (idx + 1) % LANGUAGES_CYCLE.length;
        return LANGUAGES_CYCLE[nextIdx];
      });
      setCycleCount((c) => c + 1);
      setCountdown(10);
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 10));
    }, 1000);

    return () => {
      clearInterval(cycleInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCountdown(10);
    setCycleCount((c) => c + 1);
  };

  const currentMultilingual = MULTILINGUAL_NAMES[language];

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t: TRANSLATIONS['en'], // All website content stays in English as requested
        companyName: currentMultilingual.name,
        companyLegalName: currentMultilingual.legal,
        multilingual: MULTILINGUAL_NAMES,
        countdown,
        cycleCount
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
