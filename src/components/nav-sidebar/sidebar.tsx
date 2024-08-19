import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { useStore } from "@/components/nav-sidebar/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/nav-sidebar/menu";
import { useSidebarToggle } from "@/components/nav-sidebar/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/nav-sidebar/sidebar-toggle";

export function Sidebar() {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <aside
                className={cn(
                    "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-background-sidebar",
                    sidebar?.isOpen === false ? "w-[90px]" : "w-72"
                )}
            >
                <SidebarToggle
                    isOpen={sidebar?.isOpen}
                    setIsOpen={sidebar?.setIsOpen}
                />
                <div className="relative text-primary-side h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md bg-background-sidebar">
                    <Button
                        className={cn(
                            "transition-transform ease-in-out duration-300 mb-1",
                            sidebar?.isOpen === false
                                ? "translate-x-1"
                                : "translate-x-0"
                        )}
                        variant="link"
                        asChild
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <h1
                                className={cn(
                                    "font-bold text-primary-side text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                    sidebar?.isOpen === false
                                        ? "-translate-x-96 opacity-0 hidden"
                                        : "translate-x-0 opacity-100"
                                )}
                            >
                                Tets <br />
                            </h1>
                            <h2
                                className={cn(
                                    "font-light text-primary-side text-sm whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                    sidebar?.isOpen === false
                                        ? "-translate-x-96 opacity-0 hidden"
                                        : "translate-x-0 opacity-100"
                                )}
                            >
                                By Testing
                            </h2>
                        </Link>
                    </Button>
                    <Menu isOpen={sidebar?.isOpen} />
                </div>
            </aside>
        </>
    );
}
