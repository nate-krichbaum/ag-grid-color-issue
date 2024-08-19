import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/nav-sidebar/user-nav";
import { SheetMenu } from "@/components/nav-sidebar/sheet-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    // <header className="sticky top-0 text-primary-side z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
    <header className="sticky top-0 text-primary z-10 w-full shadow backdrop-blur supports-[backdrop-filter]:bg-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
