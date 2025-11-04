import styles from "./page.module.css";
import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import { HOME_PAGES_QUERY, type HomePage } from '@/lib/queries/home';

export default async function Page() {
  const { homePages } = await hygraph.request<{ homePages: HomePage[] }>(HOME_PAGES_QUERY);
  const home = homePages?.[0];

  if (!home) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Nessun contenuto &quot;Homepage&quot; trovato</h1>
        <p>Pubblica un record o controlla gli API ID (model/campi).</p>
      </main>
    );
  }

  // Tipizza le immagini per evitare "never" e l'errore su .id
  const imgs = (home.images ?? []) as Array<{ url: string; id?: string | null }>;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Menu />

        {/* Barra fissa in basso con link + carousel */}
        <div className="Carousel">
          <div className="socials">
            <a style={{ marginRight: '10px' }} href={home.instagram}>INSTAGRAM</a>
            <a style={{ marginRight: '10px' }} href={home.threads}>THREADS</a>
            <a style={{ marginRight: '10px' }} href={home.x}>X</a>
            <a className="copy">{home.copyright}</a>
          </div>

          {/* CAROUSEL: traccia duplicata per loop infinito */}
          {imgs.length ? (
            <div className="carouselViewport" aria-label="Galleria immagini">
              <div className="carouselTrack">
                {/* 1ª sequenza */}
                {imgs.map((img, i) => (
                  <div className="carouselItem" key={`${img.id ?? img.url}-${i}`}>
                    <img
                      src={img.url}
                      className="imgHomeNew"
                      alt={`Image ${i + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* 2ª sequenza (duplicato) */}
                {imgs.map((img, i) => (
                  <div className="carouselItem" key={`dup-${img.id ?? img.url}-${i}`}>
                    <img
                      src={img.url}
                      className="imgHomeNew"
                      alt={`Image duplicate ${i + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
