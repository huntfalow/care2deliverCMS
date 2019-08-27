"use strict";

var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        polyfills: "./src/polyfills.ts",
        vendors: "./src/vendors.ts",
        app: "./src/main.ts"


    },
    output: {
        path: "./public",
        filename: "app/[name].js",
        chunkFilename:"[id].chunk.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"],
        modules: ["./node_modules", "./src"]
    },
    module: {
        rules: [
          // {
          //       test: /\.(scss|sass)$/,
          //       exclude: "./src/app",
          //       use: [{
          //               loader: "css-loader",
          //               options: {
          //                   url: false
          //               }
          //           },
          //           {
          //               loader: "sass-loader",
          //               // options: {includePaths:[
          //               //   "./"
          //               // ]}
          //           }
          //       ]
          //   },
            {
                test: /\.(scss|sass)$/,
                // include: "./src/app",
                use: [{
                          loader: "raw-loader"
                      },
                      {
                          loader: "sass-loader",
                      }
                  ]
            },
            {
                test: /\.css$/,
                exclude: ".src/app",
                use: [{
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                }]
            },
            {
                test: /\.css$/,
                include: ".src/app",
                use: [{
                    loader: "raw-loader",
                }]
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // zelfde als use maar met 1 loader zonder options
            },
            {
                test: /\.ts$/,
                use: [{
                        loader: "awesome-typescript-loader"
                    },
                    {
                        loader: "angular2-template-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
          names:["app","vendor","polyfills"],
          async:true,
          children:true,
          minChunks:2
        }),new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ]
};
