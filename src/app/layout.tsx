import React from "react";
import { Raleway } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import LayoutProvider from "./layoutProvider";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicare",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <NextUIProvider>
          <LayoutProvider>{children}</LayoutProvider>
          <ToastContainer />
        </NextUIProvider>
      </body>
    </html>
  );
}
