var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(options) {

    var devtool;
    var entry = {};
    var plugins;
    var loaders = [
        {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "url-loader?limit=10000&name=resources/images/[name]-[hash].[ext]",
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&name=resources/fonts/[name]-[hash].[ext]&mimetype=application/font-woff",
        },
    ];

    if (options.production) {
        devtool = "source-map";
        entry["app"] = "./src/main.js";
        plugins = [
            new ExtractTextPlugin("resources/css/[name]-[chunkhash].css", {
                allChunks: true,
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new HtmlWebpackPlugin({
                chunks: ["app"],
                filename: "index.html",
                template: path.join(__dirname, "static", "index.html"),
                minify: { // Minifying it while it is parsed
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
                inject: true,
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production"),
                    // "_PRODUCT": JSON.stringify(product),
                },
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    warnings: false,
                },
                mangle: {
                    except: ["$super", "$", "exports", "require"],
                },
                output: {
                    comments: false,
                },
            }),
        ];
        loaders.push({
            test: /\.js$/,
            loader: "babel",
            include: path.join(__dirname, "src"),
            query: {
                "presets": ["react", "es2015", "stage-0"],
            },
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap"),
        }, {
            test: /\.css$/,
            include: path.resolve("./static/katex"),
            loader: ExtractTextPlugin.extract("style", "css"),
        });
    }
    // development
    else {
        devtool = "source-map";
        entry["app"] = [
            "webpack-hot-middleware/client",
            "./src/main.js",
        ]
        plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new HtmlWebpackPlugin({
                chunks: ["app"],
                template: path.join(__dirname, "static", "/index.html"),
                filename: "index.html",
                inject: true,
            }),
        ];
        loaders.push ({
            test: /\.js$/,
            loader: "babel",
            query: {
                "presets": ["react", "es2015", "stage-0"],
                "plugins": [
                    ["react-transform", {
                        "transforms": [{
                            "transform": "react-transform-hmr",
                            "imports": ["react"],
                            "locals": ["module"],
                        }, {
                            "transform": "react-transform-catch-errors",
                            "imports": ["react", "redbox-react"],
                        }],
                    }],
                ],
            },
            include: path.join(__dirname, "src"),
        }, {
            test: /\.scss$/,
            loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap",
        }, {
            test: /\.css$/,
            include: path.resolve("./static/katex"),
            loader: "style-loader!css-loader",
        });
    }

    return {
        devtool: devtool,
        entry: entry,
        output: {
            path: path.join(__dirname, "dist"),
            filename: "resources/js/[name]-[hash].js",
            publicPath: "/",
        },
        plugins: plugins,
        module: {
            loaders: loaders,
        },
        resolve: {
            modulesDirectories: [
                "static",
                "src",
                "node_modules",
            ],
            extensions: ["", ".js", ".jsx", ".scss", ".css"],
        },

    }

}
