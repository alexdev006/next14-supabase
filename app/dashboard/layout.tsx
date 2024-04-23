import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import DashboardNav from "@/components/dashboardNav";
import { redirect } from "next/navigation";

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
