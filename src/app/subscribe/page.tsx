import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import ReactMarkdown from 'react-markdown';
import { SUBSCRIBE_PAGE_QUERY, type Subscribe } from '@/lib/queries/subscribe';
import Footer from '@/components/Footer/Footer';




export default async function Page() {
  const { subscribes } = await hygraph.request<{ infos: Subscribe[] }>(SUBSCRIBE_PAGE_QUERY);
  const subscribe = subscribes?.[0];

  if (!subscribe) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Nessun contenuto "Info" trovato</h1>
        <p>Pubblica un record o controlla gli API ID (model/campi).</p>
      </main>
    );
  }


  return (
    <div>
      <main >
       <Menu/>
       <div style={{position:'absolute', top:'200px', display:'flex'}}>


    <div style={{marginLeft:'0', textAlign:'center', width:'100vW', paddingInline: 'calc(16.66% + 15px)'}}>
        <ReactMarkdown>{subscribe.text?.markdown ?? ''}</ReactMarkdown>
      
    </div>
      </div>

      </main>
    </div>
  );
}
