import React from "react";
import { Raleway } from "next/font/google";
import "cropperjs/dist/cropper.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import "./globals.css";
import type { Metadata } from "next";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
