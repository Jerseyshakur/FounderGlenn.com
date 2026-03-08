import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SiteNavDrawer from "@/components/SiteNavDrawer";
import { ShopifyRuntime } from "@/components/shopify/ShopifyRuntime";
import RouteAnalyticsTracker from "@/components/analytics/RouteAnalyticsTracker";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";

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
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.shopify.com/storefront/web-components.js" strategy="afterInteractive" />
        {GTM_ID ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
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
        <SiteNavDrawer />
        <ShopifyRuntime />
        {children}
      </body>
    </html>
  );
}
