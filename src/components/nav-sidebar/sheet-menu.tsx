import { Link } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/nav-sidebar/menu";
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="bg-background-sidebar border-none text-primary-side sm:w-72 px-3 h-full flex flex-col"
                side="left"
            >
                <SheetHeader>
                    <Button
                        className="text-primary-side flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <h1 className="font-bold text-lg">Test</h1>
                            <h2 className="font-light text-sm">Testing</h2>
                        </Link>
                    </Button>
                </SheetHeader>
                <Menu isOpen />
            </SheetContent>
        </Sheet>
    );
}
