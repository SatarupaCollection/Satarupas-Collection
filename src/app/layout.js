
import "./globals.css";
import Navbar from "./components/Navbar";
import Head from "next/head";


import { StateProvider } from "./data/Context";
import { Footer } from "./components/Footer";

import {AuthProvider} from './AuthProvider';

<link rel="icon" href="/logo1.jpg" sizes="any" />
export const metadata = {
  title: "Satarupa's Collection",
  description: "Satarupa's Collection is a collection of my beautiful art, crafts, and textiles. I am a beautiful designer. I craft beautiful crafts, textiles, and art."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./logo1.jpg" sizes="any" />
        <link rel="icon" href="/logo1.jpg" sizes="any" />
      </Head>
      <AuthProvider>
        <StateProvider>
        <body className={`antialiased`}>
          
          <Navbar />
          {children}
          <Footer />
        </body>
        </StateProvider>
      </AuthProvider>
    </html>
  );
}
