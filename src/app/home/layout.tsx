import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - Blackbelt It",
  description: "Homepage do usuário",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
  
      
      
      <body className={inter.className}>{children}</body>
    </html>
  );
}
