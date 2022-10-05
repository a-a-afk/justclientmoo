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
                test: /\.ts$/,
                use: "ts-loader",
                // exclude: /node_modules/
            }
        ],
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"]
    }
}