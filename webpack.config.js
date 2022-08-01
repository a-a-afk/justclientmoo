const {resolve} = require("path");

module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "Justclient.js",
        path: resolve(__dirname, "webpack_dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"]
    }
}