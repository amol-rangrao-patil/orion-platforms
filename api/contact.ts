type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

type ContactPayload = {
  clientType?: string;
  fullName?: string;
  email?: string;
  subject?: string;
  phone?: string;
  companyName?: string;
  role?: string;
  companySize?: string;
  industry?: string;
  projectName?: string;
  projectStage?: string;
  serviceCategory?: string;
  timeline?: string;
  message?: string;
  newsletterOptIn?: boolean;
};

declare const process: { env: Record<string, string | undefined> };

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'contact.orionplatforms@gmail.com';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const textValue = (value: unknown) => typeof value === 'string' ? value.trim() : '';

const createReferenceId = () => {
  const randomPart = globalThis.crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase();
  return `ORN-${new Date().getFullYear()}-${randomPart}`;
};

const sendCompanyEmail = async (referenceId: string, payload: ContactPayload) => {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    throw new Error('Email service is not configured.');
  }

  const subject = textValue(payload.subject) || 'Custom Software Project Inquiry';
  const rows = [
    ['Reference ID', referenceId],
    ['Full Name / Organization', textValue(payload.fullName)],
    ['Email', textValue(payload.email)],
    ['Phone', textValue(payload.phone) || 'Not specified'],
    ['Company', textValue(payload.companyName) || 'Not specified'],
    ['Role', textValue(payload.role) || 'Not specified'],
    ['Client Type', textValue(payload.clientType)],
    ['Industry', textValue(payload.industry) || 'Not specified'],
    ['Project', textValue(payload.projectName) || 'Not specified'],
    ['Service', textValue(payload.serviceCategory)],
    ['Timeline', textValue(payload.timeline)],
    ['Project Stage', textValue(payload.projectStage)],
    ['Message', textValue(payload.message)]
  ].map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [COMPANY_EMAIL],
      reply_to: textValue(payload.email),
      subject: `[${referenceId}] ${subject}`,
      html: `<div style="font-family:Arial,sans-serif;color:#0f172a"><h2>New Orion Platforms Inquiry</h2><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`
    })
  });

  if (!response.ok) {
    throw new Error('Email service rejected the inquiry.');
  }
};

const saveInquiry = async (referenceId: string, payload: ContactPayload, submittedAt: string) => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Database is not configured.');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      reference_id: referenceId,
      ...payload,
      submitted_at: submittedAt
    })
  });

  if (!response.ok) {
    throw new Error('Database rejected the inquiry. Check the Supabase table and service key.');
  }
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const payload = (request.body || {}) as ContactPayload;
  const fullName = textValue(payload.fullName);
  const email = textValue(payload.email);
  const subject = textValue(payload.subject);
  const message = textValue(payload.message);

  if (!fullName || !email || !subject || message.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    response.status(400).json({ error: 'Please provide valid required form details.' });
    return;
  }

  const referenceId = createReferenceId();
  const submittedAt = new Date().toISOString();

  try {
    await saveInquiry(referenceId, payload, submittedAt);
    await sendCompanyEmail(referenceId, payload);
    response.status(200).json({ referenceId, submittedAt });
  } catch (error) {
    console.error('Contact submission failed:', error);
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to save and email this inquiry right now.'
    });
  }
}
