const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config = {
	entry: './Main.js',
	output: {
		publicPath: '/',
		path: path.resolve(__dirname),
		filename: 'bundled.js'
	},
	plugins: [
		// new Dotenv(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index-template.html'
		})
	],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							['@babel/preset-env', { targets: { node: '12' } }]
						]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /(node_modules)/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			}
		]
	}
};

if (currentTask == 'webpackDev' || currentTask == 'dev') {
	config.devtool = 'source-map';
	config.devServer = {
		port: 5000,
		contentBase: path.join(__dirname),
		hot: true,
		historyApiFallback: { index: 'index.html' }
	};
}

if (currentTask == 'webpackBuild') {
	config.plugins.push(new CleanWebpackPlugin());
	config.mode = 'production';
	config.output = {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js'
	};
}

module.exports = config;
