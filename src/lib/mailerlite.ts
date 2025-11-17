// src/lib/mailerlite.ts
const ML_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';

export function getMailerLiteConfig() {
  const apiKey = process.env.MAILERLITE_API_KEY ?? '';
  const groupId = process.env.MAILERLITE_GROUP_ID ?? '';
  if (!apiKey || !groupId) {
    throw new Error('MAILERLITE_API_KEY o MAILERLITE_GROUP_ID mancanti (configura su Vercel).');
  }
  return { apiKey, groupId, endpoint: ML_ENDPOINT };
}

export async function subscribeToMailerLite(params: { email: string; name?: string }) {
  const { apiKey, groupId, endpoint } = getMailerLiteConfig();
  const payload = {
    email: params.email,
    fields: params.name ? { name: params.name } : undefined,
    groups: [groupId],
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.error?.message ||
      (Array.isArray(data?.errors) ? data.errors.map((e: any) => e?.message).join(', ') : 'MAILERLITE_ERROR');
    throw new Error(msg);
  }
  return data;
}
