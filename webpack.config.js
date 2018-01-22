const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entrys = {};
glob.sync('./components/*/*.js').forEach(entry => {
  const entryPath = path.parse(entry);
  const chunkName = entryPath.dir.split(/\\|\//).slice(2).join('');
  entrys[chunkName] = entry;
  
  const demo_path = path.resolve(entryPath.dir, 'example/index.js');
  if(fs.existsSync(demo_path)){
    entrys[`${chunkName}_demo`] = demo_path;
  }
});

// console.log(entrys);
module.exports = {
  entry: entrys,
  output: {
    path: __dirname + '/dist',
    filename: '[name]_bundle.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.ProvidePlugin({
    //  React: 'react',
    //  ReactDOM: 'react-dom'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        loader: ["style-loader", "css-loader", "less-loader" ].join('!'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2', 'react'],
            plugins: ['transform-runtime'],
          }
        }
      }
    ]
  },
  devtool: 'source-map'
}