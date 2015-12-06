import webpack from 'webpack';
import path from 'path';
var BowerWebpackPlugin = require("bower-webpack-plugin");

export default {
    entry: {
        index: './app/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        library: 'availity-react',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.join(__dirname, "bower_components")]
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    "stage": 0,
                    "plugins": ["react-transform:after"],
                    "extra": {
                        "react-transform": {
                            "transforms": [{
                                "transform": "react-transform-hmr",
                                "imports": ["react"],
                                "locals": ["module"]
                            }, {
                                "transform": "react-transform-catch-errors",
                                "imports": ["react", "redbox-react"]
                            }]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css',
                    {
                        publicPath: '.'
                    }
                )
            },

            {
                // test should match the following:
                //
                //  '../fonts/availity-font.eot?18704236'
                //  '../fonts/availity-font.eot'
                //
                test: /\.(ttf|woff|eot|svg).*/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(\.jpe?g|png|gif)$/,
                loader: 'file?name=images/[name].[ext]'
            },
        ]
    },
    plugins: [
        new BowerWebpackPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]

};

