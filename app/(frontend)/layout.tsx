import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MobileCta } from "@/components/layout/MobileCta";
import { Preloader } from "@/components/layout/Preloader";
import { getCompany, getNavigation } from "@/lib/content";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";
import { company } from "@/data/company";
import { ogImage } from "@/data/images";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — House Construction Company in Tamil Nadu`,
    template: `%s · ${company.name}`,
  },
  description:
    "Residential builders designing and constructing independent houses, custom homes and luxury villas across Tamil Nadu — with transparent construction packages and turnkey delivery.",
  keywords: [
    "House Construction Company",
    "Residential Construction",
    "Villa Construction",
    "Home Builders",
    "Independent House Construction",
    "Turnkey House Construction",
    "House Construction in Tamil Nadu",
    "Villa Construction in Tamil Nadu",
    "Residential Builders",
  ],
  openGraph: { type: "website", locale: "en_IN", siteName: company.name, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [c, nav] = await Promise.all([getCompany(), getNavigation()]);
  return (
    <html lang="en-IN">
      <body className="min-h-screen overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Providers>
          <Preloader name={c.shortName} />
          <SmoothScroll />
          <Navbar items={nav.main} company={c} />
          <main id="main">{children}</main>
          <Footer company={c} nav={nav.footer} />
          <MobileCta phoneHref={c.contact.phoneHref} whatsappHref={c.contact.whatsappHref} />
        </Providers>
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
