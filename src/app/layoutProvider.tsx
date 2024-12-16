"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/admin") ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
