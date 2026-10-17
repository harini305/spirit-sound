import { SITE_URL, business } from "@/content/site";

// Builds per-page metadata with a canonical on the production domain (never the staging host).
export function pageMetadata({ title, description, path, og }) {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_US",
      url: `${SITE_URL}${path}`,
      title,
      description,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${SITE_URL}/#store`,
  name: business.name,
  description: business.tagline,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/media/og/home.jpg`,
  logo: `${SITE_URL}/icon.png`,
  telephone: business.phoneE164,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.street}, ${business.address.locality}`,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapsLink,
  sameAs: [business.instagram, business.tripadvisor],
};
