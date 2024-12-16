import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";

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
      <body className="antialiased overflow-hidden">
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
