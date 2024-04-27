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
        </head>
        <body className={`${roboto.className}`}>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
          <script src="https://checkout.razorpay.com/v1/checkout.js" />
        </body>
      </html>
    </>
  );
}
