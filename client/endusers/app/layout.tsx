import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ui/ToastProvider";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essentials By LA",
  description:
    "Welcome to Essentials By LA, your premier destination for the latest fashion trends and wardrobe essentials. Explore our curated collection of stylish clothing, from casual wear to formal attire, for men, women, and children. With a focus on quality, affordability, and diversity, we offer something for every style and occasion. Shop confidently with secure transactions, fast shipping, and hassle-free returns. Elevate your wardrobe and express your unique style with Essentials By LA today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.essentialsbyla.com" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta property="og:title" content="Essentials By LA: Home" />
        <meta property="og:url" content="https://www.essentialsbyla.com" />

        <meta property="og:site_name" content="IN Essentials By LA" />

        <meta property="og:type" content="website" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        <link rel="icon" href="/logo-withbg.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo-withbg.png" />
        <script src="/facebook-script.js" defer />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=461794643020066&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${roboto.className}`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
      </body>
    </html>
  );
}
