const path = require("path");


module.exports = {
    target: "node",
    mode: "production",
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
};
