import Link from "next/link";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { NavItem } from "@/types/NavItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Setting", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
] as const;

interface UserNavProps {
  name: string;
  email: string;
  image: string;
}

const getFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase();
};

export default function UserNav({ name, email, image }: UserNavProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-10 w-10 rounded-full" variant="ghost">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={image} alt="avatar image" />
              <AvatarFallback>{getFirstLetter(name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs font leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {navItems.map(({ name, href, icon: Icon }: NavItem) => (
              <DropdownMenuItem asChild key={name}>
                <Link
                  href={href}
                  className="w-full justify-between flex items-center"
                >
                  {name}
                  <span>
                    <Icon className="w-4 h-4" />
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full flex justify-between items-center"
            asChild
          >
            <LogoutLink>
              Logout
              <span>
                <DoorClosed className="w-4 h-4" />
              </span>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
