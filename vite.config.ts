import path from "path";
import { readFileSync } from "node:fs";
import {
    defineConfig,
    loadEnv,
    Plugin,
    createFilter,
    transformWithEsbuild,
} from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
    setEnv(mode);
    return {
        plugins: [
            TanStackRouterVite(),
            viteReact(),
            svgr(),
            envPlugin(),
            basePlugin(),
            htmlPlugin(mode),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        base: "./",
        server: {
            port: 3000,
        },
        build: {
            outDir: "build",
            assetsDir: "static",
        },
    };
});

function setEnv(mode: string) {
    Object.assign(process.env, loadEnv(mode, ".", ["PUBLIC_URL"]));
    process.env.NODE_ENV ||= mode;
    const { homepage } = JSON.parse(readFileSync("package.json", "utf-8"));
    process.env.PUBLIC_URL ||= homepage
        ? `${homepage.startsWith("http") || homepage.startsWith("/") ? homepage : `/${homepage}`}`.replace(
              /\/$/,
              ""
          )
        : "";
}

function envPlugin(): Plugin {
    return {
        name: "env-plugin",
        config(_, { mode }) {
            const env = loadEnv(mode, ".", ["PUBLIC_URL"]);
            return {
                define: Object.fromEntries(
                    Object.entries(env).map(([key, value]) => [
                        `process.env.${key}`,
                        JSON.stringify(value),
                    ])
                ),
            };
        },
    };
}

function basePlugin(): Plugin {
    return {
        name: "base-plugin",
        config(_, { mode }) {
            const { PUBLIC_URL } = loadEnv(mode, ".", ["PUBLIC_URL"]);
            return {
                base: PUBLIC_URL || "",
            };
        },
    };
}

function htmlPlugin(mode: string): Plugin {
    const env = loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"]);
    return {
        name: "html-plugin",
        transformIndexHtml: {
            order: "pre",
            handler(html) {
                return html.replace(
                    /%(.*?)%/g,
                    (match, p1) => env[p1] ?? match
                );
            },
        },
    };
}
