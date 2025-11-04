// src/lib/queries/info.ts

// ---- Tipi ----
export type ExternalLink = {
  __typename: 'ExternalLink';
  id: string;
  title: string;
  link: string;
};

export type Info = {
  id: string;
  infoText?: { markdown: string | null } | null;

  // Se nel tuo schema esistono anche campi scalar omonimi:
  links?: string | null;
  link2?: string | null;

  // Alias della query (ARRAY, non stringhe)
  linksList?: ExternalLink[] | null;
  linksList2?: ExternalLink[] | null;
};

// Utility: unisci e filtra solo gli ExternalLink
export function getAllExternalLinks(info?: Info | null): ExternalLink[] {
  const a = (info?.linksList ?? []).filter(
    (x): x is ExternalLink => x?.__typename === 'ExternalLink'
  );
  const b = (info?.linksList2 ?? []).filter(
    (x): x is ExternalLink => x?.__typename === 'ExternalLink'
  );
  return [...a, ...b];
}

// ---- Query (con alias per evitare collisione con campi scalar) ----
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
