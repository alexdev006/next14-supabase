"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit ">
          <Loader2 className="mr-2 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save
        </Button>
      )}
    </>
  );
}

export function TrashDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="destructive" size="icon" disabled>
          <Loader2 className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="destructive" size="icon" type="submit">
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
