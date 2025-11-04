import Menu from '@/components/Menu/MenuServer';
import { hygraph } from '@/lib/hygraph';
import { INFO_PAGE_QUERY, type Info } from '@/lib/queries/info';



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
      <main >
       <Menu/>
       <div style={{position:'absolute', top:'200px', display:'flex'}}>
        <div style={{  bottom:15, left:0, right:0, paddingLeft:15 , width:'33.33%'}}>
archive
</div>

    <div style={{marginLeft:'calc(16.66% + 30px)'}}>
      link
    </div>
      </div>

      </main>
     
    </div>
  );
}
