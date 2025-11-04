import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import ReactMarkdown from 'react-markdown';
import { INFO_PAGE_QUERY, type Info } from '@/lib/queries/info';
import Footer from '@/components/Footer/Footer';




export default async function Page() {
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

  return (
    <div>
        <Menu/>
      <main className='infoContent'>
       
       <div className='blockInfo'>
        <div className='textInfo'>
  <ReactMarkdown>{info.infoText?.markdown ?? ''}</ReactMarkdown>
</div>

    <div className='infoLink'>
      link
      <div>
        <br />
 
</div>
<br />
    link2
      <div>
        <br />

</div>
    </div>
      </div>
<Footer/>
      </main>
     
    </div>
  );
}
