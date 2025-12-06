// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeuralNote",
  description: "AI Document-Editing App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js" 
          strategy="lazyOnload" 
        />
      <link href="https://cdn.jsdelivr.net/npm/flowbite-typography@1.0.3/dist/flowbite-typography.min.css" rel="stylesheet" />


      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}