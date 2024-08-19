import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SideBarLayout from "@/components/nav-sidebar/sidebar-layout";

export const Route = createRootRoute({
    component: RouteComponent,
    errorComponent: ({ error }) => (
        <div>
            <h1>Oops! Something went wrong!</h1>
            <pre>{error.message}</pre>
        </div>
    ),
});

function RouteComponent() {
    const hideNabvRoutes = ["/login"];
    const matchRoute = useMatchRoute();

    const matchedHideNavRoutes = hideNabvRoutes.some((route) =>
        matchRoute({ to: route })
    );

    console.log("hideNabvRoutes", hideNabvRoutes);
    console.log("matchedHideNavRoutes", matchedHideNavRoutes);

    return (
        <>
            {!matchedHideNavRoutes ? (
                <>
                    <SideBarLayout />
                    <TanStackRouterDevtools />
                </>
            ) : (
                <>
                    <Outlet />
                    <TanStackRouterDevtools />
                </>
            )}
        </>
    );
}
