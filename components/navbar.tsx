import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="border border-b-2 p-2 flex justify-between h-[5vh] items-center">
      <div className="">Logo</div>
      <div className="">Nav</div>
      <div className="flex gap-x-2">
        <Button>Sign in</Button>
        <Button variant="secondary">Sign up</Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
