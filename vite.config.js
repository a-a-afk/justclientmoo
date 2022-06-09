const { defineConfig } = require("vite");

module.exports = defineConfig({
    build: {
        lib: {
            entry: __dirname + "/src/main.ts",
            name: "justclient",
            fileName: (format) => `JustClient.${format}.js`
        }
    }
});