import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

export default defineConfig(({ command }) => {
    const config = {
        base: command === "build" ? "/FilmHead-React/" : "/",
        plugins: [react()],
        server: {
            port: 3000,
        },
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, "index.html"),
                },
            },
        },
    };

    // 👇 After build, copy index.html → 404.html
    if (command === "build") {
        config.plugins.push({
            name: "copy-404",
            closeBundle() {
                const indexHtml = resolve(__dirname, "dist/index.html");
                const notFoundHtml = resolve(__dirname, "dist/404.html");
                fs.copyFileSync(indexHtml, notFoundHtml);
                console.log("✔ 404.html generated for GitHub Pages");
            },
        });
    }

    return config;
});
