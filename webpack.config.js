var path = require("path");

module.exports = {
  entry: [
        "webpack/hot/dev-server",
        path.resolve(__dirname, "./app/components/Main.js")
    ],
  output: {
        path : path.resolve(__dirname,'public','js'),
        filename: "bundle.js"
    },
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
  }
}
