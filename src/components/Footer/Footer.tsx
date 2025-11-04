// src/components/Menu/MenuServer.tsx
import { hygraph } from '@/lib/hygraph';
import { HOME_PAGES_QUERY, type HomePage } from '@/lib/queries/home';


type MenuProps = {
  page?: string;
  itemBasis?: string;
  className?: string;
};

export default async function MenuServer({ page = 'default', itemBasis = '16.66%', className }: MenuProps) {
  const { homePages } = await hygraph.request<{ homePages: HomePage[] }>(HOME_PAGES_QUERY);
  const home = homePages?.[0] || null;

  return (
    <div>
<img style={{paddingInline:'15px', marginTop:'80px'}} src={home.logoDesktop?.url} alt="" />
  <div style={{ position:'relative',bottom:15,paddingInline:15,}}>
       <a style={{marginRight:'10px'}} href={home.instagram}>INSTAGRAM</a>
       <a style={{marginRight:'10px'}} href={home.threads}>THREADS</a>
       <a style={{marginRight:'10px'}} href={home.x}>X</a>

        <a style={{position:'absolute', right:'15px'}}>{home.copyright}</a>
        </div>
        </div>
  );
}
