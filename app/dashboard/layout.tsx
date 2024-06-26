import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import DashboardNav from "@/components/dashboardNav";
import { User } from "@/types/User";
import prisma from "../lib/db";

async function getData({ firstname, email, id, lastname, profileImage }: User) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstname ?? ""} ${lastname ?? ""}`;
    await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getData({
    email: user.email as string,
    id: user.id as string,
    lastname: user.family_name as string,
    firstname: user.given_name as string,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <h1>
            <DashboardNav />
          </h1>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
