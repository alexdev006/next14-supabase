"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/NavItem";
import { navItems } from "./userNav";

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {navItems.map(({ name, href, icon: Icon }: NavItem) => (
        <Link href={href} key={name}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === href ? "bg-accent" : "bg-transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4 text-primary" />
            <span>{name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
