// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
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
        {/* We are ONLY loading CSS here. All JavaScript has been removed. */}
        {/* <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/flowbite-typography@1.0.3/dist/flowbite-typography.min.css" rel="stylesheet" /> */}
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
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