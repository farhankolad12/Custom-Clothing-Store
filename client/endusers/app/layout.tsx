import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ui/ToastProvider";
import Script from "next/script";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    dataLayer: any;
  }
}

export const metadata: Metadata = {
  title: {
    default: "Essentials By LA",
    template: "%s - Essentials By LA",
  },
  description:
    "Welcome to Essentials By LA, your premier destination for the latest fashion trends and wardrobe essentials. Explore our curated collection of stylish clothing, from casual wear to formal attire, for men, women, and children. With a focus on quality, affordability, and diversity, we offer something for every style and occasion. Shop confidently with secure transactions, fast shipping, and hassle-free returns. Elevate your wardrobe and express your unique style with Essentials By LA today.",
  openGraph: {
    type: "website",
    url: "https://essentialsbyla.com",
    title: "Essentials By LA",
    description:
      "Welcome to Essentials By LA, your premier destination for the latest fashion trends and wardrobe essentials. Explore our curated collection of stylish clothing, from casual wear to formal attire, for men, women, and children. With a focus on quality, affordability, and diversity, we offer something for every style and occasion. Shop confidently with secure transactions, fast shipping, and hassle-free returns. Elevate your wardrobe and express your unique style with Essentials By LA today",
    images: {
      url: "/open-graph-img.jpeg",
    },
    siteName: "Essentials by LA",
  },
  alternates: {
    canonical: "https://www.essentialsbyla.com",
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "customized tote bags with names",
    "customized tote bags india",
    "t shirt tote bag",
    "design on tote bag",
    "tote bags embroidered",
    "t-shirt tote bag",
    "personalised tote bags india",
    "printed tote bag",
    "q-tees tote bags",
    "reusable bag from t-shirt",
    "customized t shirts near me",
    "customized tshirts for men",
    "order customized t shirts",
    "custom t shirt examples",
    "customized t shirts couples",
    "customized t shirts online",
    "customized t shirts mumbai",
    "girls personalised t shirts",
    "kpop customized tshirts",
    "printed hoodies for men",
    "custom printed hoodies",
    "printed hoodies for men under 1200",
    "printed hoodies and sweatshirts",
    "embroidered hoodies anime",
    "back printed hoodies",
    "butterfly printed hoodies",
    "hoodie printing shop near me",
    "full printed hoodies",
    "custom hoodies india",
    "3d printed hoodies india",
    "printed hoodies jacket",
    "printed oversized t shirt under 500",
    "best printed oversized t shirt",
    "graphic printed oversized t shirt",
    "back printed oversized t shirt",
    "t shirt name printing price",
    "oversized t shirt 5xl",
    "best custom accessories",
    "customized gifts and accessories",
    "customized gifts app",
    "personalized accessories for ",
    "fancy accessories",
    "personalised accessories holder",
    "keychain accessories ideas",
    "custom keychain ideas",
    "name customized pendant",
    "personalised party accessories",
    "printed shirts for men",
    "best tote bags for women luxury",
    "best tote bags for college students",
    "best printed t shirts",
    "best printed hoodies",
    "best custom hoodies",
    "best of billie eilish",
    "best oversized t shirt for mens",
    "best oversized t shirt for women",
    "best handbags in Mumbai",
    "best handbags for women",
    "best handbags for women under 1000",
    "best handbags for college girl",
    "best luxury handbags for moms",
    "best tshirts online",
    "best shirts for men under 500",
    "best shirts for summer",
    "best shirts for skinny guys",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0B0VE36B84"
        />
        <Script strategy="afterInteractive" src="/google-analytics-script.js" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://api.essentialsbyla.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script src="/facebook-script.js" defer />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=979444420235515&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${montserrat.className}`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
