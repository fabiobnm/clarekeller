// Query + tipi per il modello "Home Page"
export type HomePage = {
  title: string;
  subtitle: string;
  logoDesktop?: { url: string }; // opzionale, adegua all'API ID reale
};

export const HOME_PAGES_QUERY = /* GraphQL */ `
 query HomePages {
    homePages(first: 1, orderBy: updatedAt_DESC) {
    logoDesktop{url}
    logoMobile{url}
    images{url}
    instagram
    threads
    x
    copyright
    }
  }
`;

