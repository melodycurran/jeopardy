import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "game/",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "/game/index.html"),
                play: resolve(__dirname, "/game/view/play.html"),
            },
        },
    },
});