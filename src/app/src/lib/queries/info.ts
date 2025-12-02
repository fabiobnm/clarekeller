export type ExternalLink = {
  __typename: 'ExternalLink';
  id: string;
  title: string;
  link: string;
};

export type Info = {
  id: string;
  infoText?: { markdown: string | null } | null;
  links?: string | null;   // opzionale: campo scalar
  link2?: string | null;   // opzionale: campo scalar
  linksList?: ExternalLink[] | null;   // alias array
  linksList2?: ExternalLink[] | null;  // alias array
};

export const INFO_PAGE_QUERY = /* GraphQL */ `
  query InfoPage {
    infos(first: 1, orderBy: updatedAt_DESC) {
      id
      infoText { markdown }
      linksList: links {
        __typename
        ... on ExternalLink { id title link }
      }
      linksList2: link2 {
        __typename
        ... on ExternalLink { id title link }
      }
    }
  }
`;
