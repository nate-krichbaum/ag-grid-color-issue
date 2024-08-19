import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
// Import the generated route tree
import { router } from "./router";

const base_prefix = import.meta.env.VITE_APP_BASE_URL_PREFIX || "/";

console.log(base_prefix);

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RouterProvider
                router={router}
                basepath={base_prefix}
            ></RouterProvider>
        </ThemeProvider>
    );
}

export default App;
