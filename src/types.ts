export type ClientType = 'company' | 'personal';

export interface ContactFormData {
  clientType: ClientType;
  fullName: string;
  email: string;
  subject?: string;
  phone?: string;
  companyName?: string;
  role?: string;
  companySize?: string;
  industry?: string;
  projectName?: string;
  projectStage?: string;
  serviceCategory: string;
  timeline: string;
  message: string;
  newsletterOptIn?: boolean;
}

export interface SubmissionResponse {
  formspreeStatus: 'success' | 'fallback';
  referenceId: string;
  timestamp: string;
  clientName: string;
  email: string;
  clientType: ClientType;
  companyOrProject: string;
  serviceCategory: string;
}

export type LegalModalType = 'privacy' | 'terms' | 'security' | null;

export interface PlatformCapability {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
  features: string[];
}

export interface OfficeLocation {
  city: string;
  role: string;
  address: string;
  badge: string;
}
