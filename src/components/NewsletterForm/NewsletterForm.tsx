'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          // honeypot: campo hidden; lasciarlo vuoto in uso reale
          honeypot: (document.getElementById('company') as HTMLInputElement)?.value || ''
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setOk(false);
        setErr(data?.error || 'Errore');
      } else {
        setOk(true);
        setEmail('');
        setName('');
      }
    } catch {
      setOk(false);
      setErr('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420, marginInline:'auto' }}>
      <label>
        Email*
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={loading}
          style={{ width: '100%', padding: '10px', border: '1px solid #000' }}
        />
      </label>

      <label>
        Nome
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome (opzionale)"
          autoComplete="name"
          disabled={loading}
          style={{ width: '100%', padding: '10px', border: '1px solid #000' }}
        />
      </label>

      {/* Honeypot anti-bot (nascosto a vista/AT) */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label>
          Company
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* GDPR/consenso (se serve per UE) */}
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" required disabled={loading} />
        <span>Acconsento a ricevere email (puoi disiscriverti in qualsiasi momento).</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{ padding: '12px 18px', border: '1px solid #000', background: 'red' }}
      >
        {loading ? 'Iscrizione…' : 'Iscriviti'}
      </button>

      {ok === true && <p style={{ color: 'green' }}>Controlla la tua email per confermare l’iscrizione.</p>}
      {ok === false && <p style={{ color: 'crimson' }}>Errore: {err}</p>}
    </form>
  );
}
