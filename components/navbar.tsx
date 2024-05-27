import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import UserNav from "./userNav";

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="border border-b bg-background p-2 flex justify-between h-[5vh] items-center">
      <Link href="/">
        <h1>
          Logo
          <span className="text-primary"> Saas</span>
        </h1>
      </Link>

      <div className="flex gap-x-2">
        {(await isAuthenticated()) ? (
          <UserNav
            email={user?.email as string}
            image={user?.picture as string}
            name={user?.given_name as string}
          />
        ) : (
          <>
            <LoginLink>
              <Button>Sign in</Button>
            </LoginLink>
            <RegisterLink>
              <Button variant="secondary">Sign up</Button>
            </RegisterLink>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
