import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label }: { label: string; href: string }) => {
  const pathname = usePathname();
  const url = `/admin${href}`.replace(/\/$/, "");
  const isActive = pathname === url;

  return (
    <li>
      <Link href={url}>
        <Button
          fullWidth
          radius="sm"
          color="primary"
          variant={isActive ? "solid" : "ghost"}
          className="justify-start font-medium"
        >
          {label}
        </Button>
      </Link>
    </li>
  );
};

export default function NavMenu() {
  const menus = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/doctors",
      label: "Doctors",
    },
    {
      href: "/degree",
      label: "Degree",
    },
  ];

  return (
    <ul className="space-y-2">
      {menus.map((menu, index) => (
        <NavLink key={index} {...menu} />
      ))}
    </ul>
  );
}
