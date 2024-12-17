import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  // state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menus = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about-us",
      label: "About Us",
    },
    {
      path: "/services",
      label: "Services",
    },
    {
      path: "/doctors",
      label: "Doctors",
    },
  ];

  return (
    <header className="bg-primary bg-opacity-5 max-lg:relative">
      <div className="container mx-auto px-5 max-sm:px-3 py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="max-sm:w-12 max-sm:h-12 w-16 h-16 inline-block"
          >
            <Image
              alt="Logo"
              src="/images/text-logo.png"
              width={120}
              height={120}
              className="w-full h-full mix-blend-multiply"
            />
          </Link>
          <div
            className={`max-lg:absolute max-lg:z-10 max-lg:top-full max-lg:left-0 max-lg:bg-white max-lg:w-full max-lg:shadow-lg max-lg:origin-top max-lg:duration-150 ${
              isOpen ? "max-lg:scale-y-100" : "max-lg:scale-y-0"
            }`}
          >
            <ul className="flex max-lg:flex-col lg:items-center gap-3 lg:gap-10 max-lg:bg-primary max-lg:bg-opacity-5 max-lg:px-4 max-lg:py-7">
              {menus.map(({ label, path }, index) => (
                <li key={index} className="text-sm font-semibold">
                  <Link href={path}>{label}</Link>
                </li>
              ))}
              <li className="lg:hidden mt-4">
                <Link href={"/appointment"} className="w-full">
                  <Button radius="sm" color="primary" className="!px-5">
                    <span className="!font-medium !text-sm">
                      Book Appointment
                    </span>
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <Button
            isIconOnly
            color="primary"
            radius="sm"
            className="lg:hidden"
            onPress={() => setIsOpen(!isOpen)}
          >
            <FaBars className="w-5 h-5" />
          </Button>
          <Link href={"/appointment"} className="max-lg:hidden">
            <Button radius="sm" color="primary" className="!px-5">
              <span className="!font-medium !text-sm">Book Appointment</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
