import type { Metadata } from "next";
import {Noto_Sans_KR} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const noto_sans = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={noto_sans.className}>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
