var express = require("express");
var webpack = require("webpack");
var historyApiFallback  = require("connect-history-api-fallback");

var config = require("./webpack.config.dev.js");

var app = express();
var compiler = webpack(config);

app.use(historyApiFallback({
  verbose: false,
}));

app.use(require("webpack-dev-middleware")(compiler, {
  contentBase: __dirname,
  noInfo: true,
  publicPath: "/",
  hot: true,
}));

app.use(require("webpack-hot-middleware")(compiler));

app.listen(3000, "localhost", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3000");
});
