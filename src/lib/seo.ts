export const seoConfig = {
  siteName: "Founder Glenn",
  siteUrl: "https://founderglenn.com",
  titleTemplate: "%s | Founder Glenn",
  defaultTitle: "Founder Glenn",
  defaultDescription: "Founder Glenn — Author, Physicist, and builder of systems for creators.",
  defaultOgImage: "/og-image.jpg",
  person: {
    name: "Founder Glenn",
    alternateName: "Shakur Raqon Ziyār Glenn",
    url: "https://founderglenn.com",
    jobTitle: "Author, Technologist, Systems Builder",
    description:
      "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
    image: "/og-image.jpg",
    sameAs: [
      "https://x.com/founderglenn?s=21",
      "https://www.tiktok.com/@founderglenn",
      "https://youtube.com/@founderglenn?si=njoP06j7vR7axNqc",
    ],
    knowsAbout: [
      "Creator infrastructure",
      "Publishing systems",
      "Technology strategy",
      "Product design",
      "Brand systems",
    ],
  },
  organization: {
    name: "Founder Glenn",
    url: "https://founderglenn.com",
    logo: "/og-image.jpg",
    sameAs: [
      "https://x.com/founderglenn?s=21",
      "https://www.tiktok.com/@founderglenn",
      "https://youtube.com/@founderglenn?si=njoP06j7vR7axNqc",
    ],
  },
} as const;

export type ArticleSchemaInput = {
  urlPath: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
};

export type BookSchemaInput = {
  urlPath: string;
  name: string;
  description: string;
  image?: string;
  isbn?: string;
  inLanguage?: string;
  bookFormat?: string;
  publisher?: string;
};

export function buildAbsoluteUrl(pathOrUrl: string = "/"): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, seoConfig.siteUrl).toString();
}

export function resolveOgImage(image?: string): string {
  return buildAbsoluteUrl(image || seoConfig.defaultOgImage);
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    sameAs: seoConfig.organization.sameAs,
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.organization.name,
    url: seoConfig.organization.url,
    logo: buildAbsoluteUrl(seoConfig.organization.logo),
    sameAs: seoConfig.organization.sameAs,
    founder: {
      "@type": "Person",
      name: seoConfig.person.name,
      alternateName: seoConfig.person.alternateName,
      url: seoConfig.person.url,
    },
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.person.name,
    alternateName: seoConfig.person.alternateName,
    url: seoConfig.person.url,
    image: buildAbsoluteUrl(seoConfig.person.image),
    description: seoConfig.person.description,
    jobTitle: seoConfig.person.jobTitle,
    knowsAbout: seoConfig.person.knowsAbout,
    sameAs: seoConfig.person.sameAs,
    worksFor: {
      "@type": "Organization",
      name: seoConfig.organization.name,
      url: seoConfig.organization.url,
    },
    affiliation: {
      "@type": "Organization",
      name: seoConfig.organization.name,
      url: seoConfig.organization.url,
    },
  };
}

export function buildProfilePageSchema(urlPath: string = "/about") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: buildAbsoluteUrl(urlPath),
    name: `${seoConfig.person.name} | About`,
    mainEntity: buildPersonSchema(),
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: resolveOgImage(input.image),
    author: {
      "@type": "Person",
      name: seoConfig.person.name,
      url: seoConfig.person.url,
    },
    publisher: {
      "@type": "Organization",
      name: seoConfig.organization.name,
      url: seoConfig.organization.url,
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl(seoConfig.organization.logo),
      },
    },
    mainEntityOfPage: buildAbsoluteUrl(input.urlPath),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
  };
}

export function buildBookSchema(input: BookSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: input.name,
    description: input.description,
    image: resolveOgImage(input.image),
    url: buildAbsoluteUrl(input.urlPath),
    author: {
      "@type": "Person",
      name: seoConfig.person.name,
      alternateName: seoConfig.person.alternateName,
      url: seoConfig.person.url,
    },
    publisher: {
      "@type": "Organization",
      name: input.publisher || seoConfig.organization.name,
      url: seoConfig.organization.url,
    },
    inLanguage: input.inLanguage || "en-US",
    bookFormat: input.bookFormat || "https://schema.org/EBook",
    isbn: input.isbn,
  };
}
