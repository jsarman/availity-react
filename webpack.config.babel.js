import webpack from 'webpack';
import path from 'path';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
    noParse: [
        /.*bower_components.*/
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['bower_components', 'node_modules'],
        alias: {
            'lodash': 'lodash-compat'
        }
    },
    devtool: 'cheap-module-eval-source-map',

    module: {
        loaders: [
            {
                test: /[\\\/]jquery\.js$/,
                loader: 'expose?$!expose?jQuery'
            }, // export jQuery and $ to global scope.
            {
                test: /[\\\/]lodash\.js$/,
                loader: 'expose?_'
            }, // export _ global scope.
            {
                test: /[\\\/]moment\.js$/,
                loader: 'expose?moment'
            },
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
                        publicPath: '../'
                    }
                )
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!autoprefixer-loader?{browsers: ["last 3 versions", "ie 8", "ie 9", "> 1%"]}!less-loader',
                    {
                        publicPath: '../'
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
        // ignore all the moment local files
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new BowerWebpackPlugin({
            excludes: [
                /.*\.(less|map)/,
                /glyphicons-.*\.(eot|svg|ttf|woff)/,
                /bootstrap.*\.css/,
                /select2.*\.(png|gif|css)/
            ]
        }),
        new BowerWebpackPlugin({
            excludes: [
                /.*\.(less|map)/,
                /glyphicons-.*\.(eot|svg|ttf|woff)/,
                /bootstrap.*\.css/,
                /select2.*\.(png|gif|css)/
            ]
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'lodash'
        }),
        // Use bundle name for extracting bundle css
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        })
    ]

};
