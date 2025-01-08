import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | G Developments",
    default: "G Developments",
  },
  description:
    "Real Estate developer blending timeless design with comfortable living",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <head>
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        />
      </head>
      <body className="antialiased overflow-hidden bg-white">
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
