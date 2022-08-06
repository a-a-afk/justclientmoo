import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    build: {
        lib: {
            entry: __dirname + "/src/main.ts",
            name: "justclient",
            fileName: (format) => `JustClient.${format}.js`
        }
    },
    plugins: [react()]
});