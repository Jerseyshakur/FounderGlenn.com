import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SiteNavDrawer from "@/components/SiteNavDrawer";
import { ShopifyRuntime } from "@/components/shopify/ShopifyRuntime";
import RouteAnalyticsTracker from "@/components/analytics/RouteAnalyticsTracker";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import ZapierDevTestTrigger from "@/components/zapier/ZapierDevTestTrigger";
import { buildSiteUrl } from "@/lib/media";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WXCF8SL7";
const GA_MEASUREMENT_ID = "G-8Y2YH8FPG1";

export const metadata: Metadata = {
  title: {
    default: "Founder Glenn",
    template: "%s | Founder Glenn",
  },
  description: "Founder Glenn - Author, Physicist, and builder of systems for creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogFeedUrl = buildSiteUrl("/rss/blog.xml");
  const founderGlennPodcastFeedUrl = buildSiteUrl("/rss/founder-glenn-podcast.xml");
  const foundationFeedUrl = buildSiteUrl("/rss/foundation.xml");
  const codexFeedUrl = buildSiteUrl("/rss/codex.xml");

  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Founder Glenn Blog RSS" href={blogFeedUrl} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Founder Glenn Podcast RSS"
          href={founderGlennPodcastFeedUrl}
        />
        <link rel="alternate" type="application/rss+xml" title="The Foundation RSS" href={foundationFeedUrl} />
        <link rel="alternate" type="application/rss+xml" title="The Founder Glenn Codex RSS" href={codexFeedUrl} />
        <Script src="https://cdn.shopify.com/storefront/web-components.js" strategy="afterInteractive" />
        {/* Always ensure dataLayer exists so custom events can queue safely. */}
        <Script id="analytics-datalayer-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
          `}
        </Script>
        {GTM_ID ? (
          /* GTM is the single traffic controller when present. */
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : GA_MEASUREMENT_ID ? (
          /* Fallback: direct GA only when GTM is not configured. */
          <>
            <Script
              id="ga-script"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <RouteAnalyticsTracker />
        <AnalyticsClickTracker />
        <ZapierDevTestTrigger />
        <SiteNavDrawer />
        <ShopifyRuntime />
        {children}
      </body>
    </html>
  );
}
