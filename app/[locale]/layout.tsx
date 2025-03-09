import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | GCF",
    default: "GCF",
  },
  description: "GCF",
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
      <head></head>
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
