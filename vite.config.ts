import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: __dirname + "/src/main.ts",
            name: "justclient",
            fileName: (format) => `JustClient.${format}.js`
        }
    }
});