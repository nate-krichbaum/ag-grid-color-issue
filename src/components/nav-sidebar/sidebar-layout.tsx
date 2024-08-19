"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/components/nav-sidebar/hooks/use-store";
// import { Footer } from "@/components/nav-sidebar/footer";
import { Sidebar } from "@/components/nav-sidebar/sidebar";
import { useSidebarToggle } from "@/components/nav-sidebar/hooks/use-sidebar-toggle";
import { Outlet } from "@tanstack/react-router";
import { ContentLayout } from "@/components/nav-sidebar/content-layout";
import { BreadcrumbTrail } from "@/components/nav-sidebar/breadcrumb-trail";
import { getMenuList, Group, Menu, Submenu } from "./lib/menu-list";

export function filterCurrentTree({
    menuList,
}: {
    menuList: Group[];
}): Group[] {
    return menuList
        .map((group: Group) => {
            const activeMenus = group.menus
                .filter(
                    (menu: Menu) =>
                        menu.active ||
                        menu.submenus.some((submenu: Submenu) => submenu.active)
                )
                .map((menu: Menu) => ({
                    ...menu,
                    submenus: menu.submenus.filter(
                        (submenu: Submenu) => submenu.active
                    ),
                }));

            return {
                ...group,
                menus: activeMenus,
            };
        })
        .filter((group: Group) => group.menus.length > 0);
}

function extractMenuItems(group: Group): MenuItem[] {
    return group.menus.flatMap((menuGroup: Menu) => {
        const topLevelItem: MenuItem = {
            href: "",
            label: menuGroup.label,
        };

        const submenuItems = menuGroup.submenus?.map((submenu: Submenu) => ({
            href: submenu.href,
            label: submenu.label,
        }));

        return [topLevelItem, ...submenuItems];
    });
}

export function pathExists(data: Group[], path: string): boolean {
    for (const group of data) {
        for (const menu of group.menus) {
            if (menu.href === path) {
                return true;
            }
            for (const submenu of menu.submenus) {
                if (submenu.href === path) {
                    return true;
                }
            }
        }
    }
    return false;
}

export interface MenuItem {
    href: string;
    label: string;
}

export default function SideBarLayout() {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const pathname = window.location.pathname;
    const base_prefix = import.meta.env.VITE_APP_BASE_URL_PREFIX || "/";
    const menuList = getMenuList(pathname);
    const currentTree = filterCurrentTree({ menuList });

    // Extract the menu items for Breadcrumb and Page Title
    // Or, handle home and 404 pages
    const menuItems: MenuItem[] =
        currentTree.length > 0
            ? extractMenuItems(currentTree[0])
            : // This is regex equivalent of replaceAll("/", "")
              pathname.replace(/\//g, "") === base_prefix.replace(/\//g, "")
              ? [{ href: base_prefix, label: "Home" }]
              : [{ href: base_prefix, label: "Not Found" }];

    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                <ContentLayout title={menuItems[menuItems.length - 1].label}>
                    <BreadcrumbTrail menuItems={menuItems} />
                    <Outlet />
                </ContentLayout>
            </main>
            {/* <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                <Footer />
            </footer> */}
        </>
    );
}
