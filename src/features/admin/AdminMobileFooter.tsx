"use client";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsPiggyBankFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

function AdminMobileFooter() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Payments",
      link: "/admin/",
      icon: BsPiggyBankFill,
    },
    {
      title: "Profile",
      link: "/admin/profile",
      icon: FaUser,
    },
  ];

  return (
    <div className="sticky bottom-0 border-t md:hidden">
      <Container className="flex justify-between py-1">
        {menuItems.map((menu) => (
          <Link
            href={menu.link}
            key={menu.link}
            className={cn(
              "flex w-full items-center justify-center py-2 text-foreground/50 transition-all hover:bg-secondary",
              menu.link === pathname && "text-foreground",
            )}
          >
            <menu.icon size={20} />
          </Link>
        ))}
      </Container>
    </div>
  );
}

export default AdminMobileFooter;
