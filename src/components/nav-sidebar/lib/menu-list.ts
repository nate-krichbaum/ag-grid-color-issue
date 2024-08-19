import {
    Users,
    Settings,
    LucideIcon,
    Search,
    CircleGauge,
    Lightbulb,
    Globe,
    Download,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

export type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

export type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    const { theme } = useTheme();
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/sales",
                    label: "Sales",
                    active: pathname.includes("/sales"),
                    icon: CircleGauge,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/auth/users",
                    label: "Users",
                    active: pathname.includes("/auth/users"),
                    icon: Users,
                    submenus: [],
                },
                {
                    href: "/auth/account",
                    label: "Account",
                    active: pathname.includes("/auth/account"),
                    icon: Settings,
                    submenus: [],
                },
                {
                    href: "/auth/dark-mode",
                    label: "Dark Mode",
                    active: pathname.includes("/auth/dark-mode"),
                    icon: theme == "dark" ? Sun : Moon,
                    submenus: [],
                },
            ],
        },
    ];
}
