import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/Footer/Footer';
import {
  INFO_PAGE_QUERY,
  type Info,
  type ExternalLink,
} from '@/lib/queries/info';

export default async function Page() {
  // ATTENZIONE: INFO_PAGE_QUERY deve avere gli alias:
  // linksList: links { ... }  e  linksList2: link2 { ... }
  const { infos } = await hygraph.request<{ infos: Info[] }>(INFO_PAGE_QUERY);
  const info = infos?.[0];

  if (!info) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Nessun contenuto &quot;Info&quot; trovato</h1>
        <p>Pubblica un record o controlla gli API ID (model/campi).</p>
      </main>
    );
  }

  // TENIAMO LE DUE LISTE SEPARATE
  const links1 = (info.linksList ?? []).filter(
    (x): x is ExternalLink => x?.__typename === 'ExternalLink'
  );
  const links2 = (info.linksList2 ?? []).filter(
    (x): x is ExternalLink => x?.__typename === 'ExternalLink'
  );

  return (
    <div>
      <Menu />
      <main className="infoContent">
        <div className="blockInfo animationOpacity">
          <div className="textInfo">
            <ReactMarkdown>{info.infoText?.markdown ?? ''}</ReactMarkdown>
          </div>

          <div className="infoLink">
            <div style={{ marginBottom: 12 }}>Links Title</div>
            {links1.length > 0 && (
              <ul>
                {links1.map((l) => (
                  <div key={l.id}>
                    <a
                      href={l.link}
                      className="infoLinkVoice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.title}
                    </a>
                  </div>
                ))}
              </ul>
            )}

            <div style={{ marginTop: 24, marginBottom: 12 }}>Links Title</div>
            {links2.length > 0 && (
              <ul>
                {links2.map((l) => (
                  <div key={l.id}>
                    <a
                      href={l.link}
                      className="infoLinkVoice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.title}
                    </a>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
