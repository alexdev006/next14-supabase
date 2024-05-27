import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";

import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { TrashDeleteButton } from "@/components/submitButton";

async function getData(userId: string) {
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function deleteNote(formData: FormData) {
    "use server";

    const noteId = formData.get("noteId") as string;

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    revalidatePath("/dashboard");
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your notes</h1>
          <p className="text-lg text-muted-foreground ">
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create note</Link>
        </Button>
      </div>
      {data.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You dont have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            Please create note so that you can see right here.
          </p>
          <Button asChild>
            <Link href="/dashboard/new">Create note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data.map(({ id, title, createdAt }) => (
            <Card key={id} className="flex items-center justify-between p-4">
              <div className="">
                <h2 className="font-semibold text-xl text-primary">{title}</h2>
                <p>
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(createdAt))}
                </p>
              </div>
              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input name="noteId" type="hidden" value={id} />
                  <TrashDeleteButton />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
