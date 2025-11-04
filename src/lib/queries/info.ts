// Query + tipi per il modello "INFO"
export type Info = {
  infoText?: { markdown: string | null } | null;
};

export const INFO_PAGE_QUERY = /* GraphQL */ `
 query info {
    infos(first: 1, orderBy: updatedAt_DESC) {
    infoText{markdown}
    links{
  ... on ExternalLink {
    title
    link
     id
  }}
      link2{
  ... on ExternalLink {
    title
    link
     id
  }}
    }
  }
`;
