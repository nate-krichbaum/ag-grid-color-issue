import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const base_prefix = import.meta.env.VITE_APP_BASE_URL_PREFIX || "/";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Create a new router instance
export const router = createRouter({
    routeTree,
    basepath: base_prefix,
});
