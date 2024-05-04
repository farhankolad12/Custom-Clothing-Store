import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ui/ToastProvider";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothing Store",
  description: "Welcome to our custom clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <script src="/facebook-script.js" defer />

<noscript><img height="1" width="1" style={{ display: 'none' }}
src="https://www.facebook.com/tr?id=461794643020066&ev=PageView&noscript=1"
/></noscript>
        </head>
        <body className={`${roboto.className}`}>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
          <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
        </body>
      </html>
    </>
  );
}
