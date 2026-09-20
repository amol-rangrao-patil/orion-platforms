import { PlatformCapability, OfficeLocation } from '../types';

export const COMPANY_NAME = 'Orion Platforms';
export const COMPANY_LEGAL_NAME = 'Orion Platforms Pvt. Ltd.';
export const COMPANY_TAGLINE = 'Architecting Bespoke Enterprise Software & Scalable Cloud Topology';

export const COMPANY_SUMMARY = 
  'Orion Platforms is an IT software engineering & systems architecture firm. We design, engineer, and deploy tailor-made digital platforms, mission-critical web applications, native mobile systems, and scalable cloud architectures with 100% intellectual property transfer.';

// Elegant high-resolution vector SVG data URI for Orion Platforms logo
export const COMPANY_LOGO_SRC = 
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="%230f172a"/><path d="M50 16L80 33.5V66.5L50 84L20 66.5V33.5L50 16Z" stroke="%231a73e8" stroke-width="5" stroke-linejoin="round"/><path d="M50 28L68 39V61L50 72L32 61V39L50 28Z" fill="%231a73e8" fill-opacity="0.15" stroke="%2338bdf8" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="50" r="8" fill="%2338bdf8"/><circle cx="50" cy="16" r="4.5" fill="%2360a5fa"/><circle cx="80" cy="33.5" r="4.5" fill="%2360a5fa"/><circle cx="80" cy="66.5" r="4.5" fill="%2360a5fa"/><circle cx="50" cy="84" r="4.5" fill="%2360a5fa"/><circle cx="20" cy="66.5" r="4.5" fill="%2360a5fa"/><circle cx="20" cy="33.5" r="4.5" fill="%2360a5fa"/><path d="M35 50H65M50 35V65" stroke="%23ffffff" stroke-width="2.5" stroke-linecap="round"/></svg>';

export const COMPANY_CONTACT = {
  primaryEmail: 'contact.orionplatforms@gmail.com',
  solutionsEmail: 'info.orionplatforms@gmail.com',
  supportEmail: 'support.orionplatforms@gmail.com',
  phone: '+91 7499577784',
  supportHours: 'Mon – Fri: 9:00 AM – 6:30 PM IST (Emergency 24/7 SLA)'
};

export const COMPANY_COORDINATES = {
  coords: '16.69110, 73.99104',
  latitude: 16.69110,
  longitude: 73.99104,
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=16.69110,73.99104',
  embedMapUrl: 'https://maps.google.com/maps?q=16.69110,73.99104&hl=en&z=14&output=embed'
};

export const COMPANY_ADDRESS = {
  displayAddress: 'NH166G, Mhalunge, Kolhapur District, Maharashtra 416206, India',
  facility: 'Orion Engineering & Technology Center',
  street: 'NH166G, Mhalunge',
  district: 'Kolhapur',
  state: 'Maharashtra',
  pincode: '416206',
  country: 'India'
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Kolhapur (Headquarters)',
    role: 'Primary Technology & Engineering Center',
    address: 'NH166G, Mhalunge, Kolhapur, Maharashtra 416206, India',
    badge: 'Core Headquarters'
  }
];

export const COMPANY_SOCIAL = {
  instagram: {
    handle: '@orion_platforms',
    url: 'https://www.instagram.com/orion_platforms'
  }
};

export const SERVICE_CATEGORIES = [
  { id: 'custom-software', name: 'Custom Software & Enterprise Web Platforms' },
  { id: 'mobile-apps', name: 'Native & Cross-Platform Mobile Applications' },
  { id: 'cloud-devops', name: 'Cloud Infrastructure, Kubernetes & DevOps' },
  { id: 'managed-services', name: 'Managed IT Services, Database Systems & AMC' },
];

export const TIMELINE_OPTIONS = [
  'Immediate (< 2 Weeks)',
  'Standard (1 - 2 Months)',
  'Quarterly (3 - 6 Months)',
  'Long-term Enterprise (> 6 Months)'
];

export const COMPANY_SIZES = [
  'Startup / Early Stage (1 - 10)',
  'Growth Team (11 - 50)',
  'Mid-Market (51 - 200)',
  'Enterprise (200+)'
];

export const PROJECT_STAGES = [
  'Concept / Architecture Planning',
  'Prototype / MVP Needed',
  'Refactoring / Scaling Existing System',
  'Production Redesign & Migration'
];

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    id: 'custom-software',
    title: 'Enterprise Web & Bespoke Software',
    description: 'Full-cycle engineering of mission-critical web applications, enterprise ERP/CRM dashboards, and distributed backend systems tailored to your specific workflows.',
    badge: 'Full-Stack Architecture',
    iconName: 'Code',
    features: [
      'React & Next.js Frontends',
      'Node.js & Go Microservices',
      'PostgreSQL & Realtime Sync',
      'Enterprise RBAC & Auth'
    ]
  },
  {
    id: 'mobile-apps',
    title: 'Cross-Platform & Native Mobile Apps',
    description: 'High-performance iOS and Android mobile solutions built with smooth 60fps animations, offline-first syncing, and biometric device security.',
    badge: 'iOS & Android',
    iconName: 'Smartphone',
    features: [
      'React Native & Flutter Apps',
      'Offline-First Synchronization',
      'Push Notifications & Deep Links',
      'App Store & Play Store Deployment'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps Mesh',
    description: 'Automated CI/CD pipelines, container orchestration, and serverless architectures on AWS and Google Cloud with 99.99% uptime guarantees.',
    badge: 'Kubernetes & AWS / GCP',
    iconName: 'Cloud',
    features: [
      'Docker & Kubernetes Clusters',
      'Automated CI/CD Workflows',
      'Zero-Downtime Blue/Green Deploys',
      'Multi-Region Disaster Recovery'
    ]
  },
  {
    id: 'managed-services',
    title: 'Managed IT, Database & Support AMC',
    description: '24/7 proactive system telemetry monitoring, PostgreSQL performance tuning, security audits, and comprehensive Annual Maintenance Contracts.',
    badge: '24/7 SLA Support',
    iconName: 'Settings',
    features: [
      'Database Performance Tuning',
      'Security Audits & Patching',
      '2-Hour Rapid Response SLA',
      'Continuous Telemetry Monitoring'
    ]
  }
];
