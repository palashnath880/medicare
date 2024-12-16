"use client";
import React from "react";
import "cropperjs/dist/cropper.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NavMenu from "@/components/Admin/shared/NavMenu";

// new query client
const client = new QueryClient();

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <div className="w-full h-screen flex overflow-hidden">
        <div className="w-64 bg-primary bg-opacity-20">
          <div className="flex flex-col gap-5 pb-4 pt-4 h-full">
            <Link href="/admin" className="w-28 h-auto overflow-hidden mx-auto">
              <Image
                width={150}
                height={150}
                src="/images/text-logo.png"
                className="w-full h-auto mix-blend-multiply"
                alt="logo"
                priority={true}
              />
            </Link>
            <div className="flex-1 px-3">
              <NavMenu />
            </div>
            <div className="px-2">
              <Button
                fullWidth
                radius="sm"
                color="primary"
                className="justify-start"
                startContent={<FiLogOut className="h-4 w-4" />}
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-primary bg-opacity-10 flex-1 relative">
          <main className="overflow-y-auto absolute top-0 left-0 w-full h-full flex flex-col justify-between">
            <div className="px-3 py-3 ">{children}</div>
            <div className="flex px-3 justify-center py-5 border-t border-primary border-opacity-25">
              <p className="text-sm font-semibold">
                Copyright | Developed by{" "}
                <a
                  href="https://palashnath.netlify.app"
                  target="_blank"
                  className="underline"
                >
                  Palash Nath
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
