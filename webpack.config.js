const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: { outputPath: "css/", name: "[name].min.css" },
                    },
                    // Translates CSS into CommonJS
                    // MiniCssExtractPlugin.loader,
                    // "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    // plugins: [new MiniCssExtractPlugin()],

    mode: "development",
};
