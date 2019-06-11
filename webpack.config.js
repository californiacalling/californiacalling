const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

module.exports = [
  {
    entry: "./index.js",
    output: {
      publicPath: "./",
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },

    // target: "node",
    externals: ['express'],
    module: {
      rules: [
        {
          test: /\.(njk|nunjucks)$/,
          loader: 'nunjucks-loader'
        }
      ]
    },
    plugins: [
      new NunjucksWebpackPlugin({
        templates: [
          {
            from: './src/views/index.njk',
            to: './index.html'
          }
        ]
      })
    ]
  },
  {
    entry: ["./src/js/index.js", "./src/scss/styles.scss"],
    name: "scripts-styles",
    output: {
      publicPath: "./",
      filename: "scripts.js",
      path: path.resolve(__dirname, "dist")
    },

    watch: true,

    target: "node",

    resolve: {},

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{ loader: "babel-loader" }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "styles.css"
              }
            },
            {
              loader: "extract-loader"
            },
            {
              loader: "css-loader?-url"
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "./src/content/images/**/*",
          to: "./images/",
          flatten: true
        }
      ]),
      new CopyWebpackPlugin([
        {
          from: "./src/content/fonts/*",
          to: "./fonts/",
          flatten: true
        }
      ]),
      // new LiveReloadPlugin()
    ]
  }
];
