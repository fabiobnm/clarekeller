// src/app/info/page.tsx
import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { INFO_PAGE_QUERY, type Info, getAllExternalLinks } from '@/lib/queries/info';

export default async function Page() {
  const { infos } = await hygraph.request<{ infos: Info[] }>(INFO_PAGE_QUERY);
  const info = infos?.[0] ?? null;

  if (!info) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Nessun contenuto &quot;Info&quot; trovato</h1>
        <p>Pubblica un record o controlla gli API ID (model/campi).</p>
      </main>
    );
  }

  const links = getAllExternalLinks(info);

  return (
    <div>
      <main>
        <Menu />
        <div style={{ position: 'absolute', top: '200px', display: 'flex' }}>
          <div style={{ paddingLeft: 15, width: '33.33%' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {info.infoText?.markdown ?? ''}
            </ReactMarkdown>
          </div>

          <div style={{ marginLeft: 'calc(16.66% + 30px)' }}>
            {links.length > 0 && (
              <ul>
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.link}
                      className="infoLinkVoice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
