const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
  	output: {
    	path: path.resolve(__dirname, 'dist/scripts/'),
    	filename: 'scripts.js'
  	},
	mode: 'development',
	watch: true,
	// devtool: false,
	devtool: 'source-map',
	optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],
    },
	module: {
		rules: [
		{
			test: /\.js$/,
			enforce: "pre",
			use: ["source-map-loader"],
		},
		],
	},
};
