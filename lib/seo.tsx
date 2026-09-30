import type { Metadata } from "next";
import { company } from "@/data/company";
import { ogImage } from "@/data/images";

export function pageMetadata({
  title,
  description,
  path = "/",
  image = ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${company.siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: company.name, images: [{ url: image }], type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    telephone: company.contact.phone,
    email: company.contact.email,
    image: ogImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.contact.address.slice(0, 2).join(", "),
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: company.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    sameAs: company.social.map((s) => s.href),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
