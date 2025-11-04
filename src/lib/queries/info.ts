// src/lib/queries/info.ts

export type ExternalLink = {
  __typename: 'ExternalLink';
  id: string;
  title: string;
  link: string;
};

export type Info = {
  id: string;
  infoText?: { markdown: string | null } | null;

  // Se nello schema hai ANCHE campi testuali "links"/"link2", mantienili:
  links?: string | null;
  link2?: string | null;

  // Alias dei campi relazionali (ARRAY di ExternalLink)
  linksList?: ExternalLink[] | null;
  linksList2?: ExternalLink[] | null;
};

export const INFO_PAGE_QUERY = /* GraphQL */ `
  query InfoPage {
    infos(first: 1, orderBy: updatedAt_DESC) {
      id
      infoText { markdown }

      linksList: links {
        __typename
        ... on ExternalLink {
          id
          title
          link
        }
      }

      linksList2: link2 {
        __typename
        ... on ExternalLink {
          id
          title
          link
        }
      }
    }
  }
`;
