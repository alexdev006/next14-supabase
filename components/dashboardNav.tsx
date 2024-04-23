"use client";

import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Setting", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

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
