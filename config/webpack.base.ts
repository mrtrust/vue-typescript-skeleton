import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { existsSync, mkdirSync } from 'fs';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import * as webpack from 'webpack';
import { Configuration } from 'webpack';


import chunkSplitPatterns from './build/chunk';
import htmlConfigFactory from './build/html';

function resolve(dir: string) {
    return join(__dirname, '..', dir);
}

// TODO: take a look why paths needed
// tslint:disable-next-line:no-var-requires
// var paths = require('../src/tsconfig.json').compilerOptions.paths;
//
// paths = Object.keys(paths).reduce((obj, key) => {
//   obj[key.replace('/*', '')] = resolve('./src/' + paths[key][0].replace('/*', '').replace('./', ''));
//
//   return obj;
// }, {});

export default (mode: 'development' | 'production'): Configuration => {
    const htmlConfig = htmlConfigFactory(mode);
    htmlConfig.favicon &&
        (htmlConfig.favicon = resolve('./src/' + htmlConfig.favicon));

    const buildExist = existsSync(resolve('./build'));

    if (!buildExist) {
        mkdirSync(resolve('./build'));
    }

    const faviconsExist = existsSync(resolve('./build/favicons'));

    if (!faviconsExist) {
        mkdirSync(resolve('./build/favicons'));
    }

    return {
        mode,
        output: {
            path: resolve('./build/' + mode),
            publicPath: '/',
            filename: 'js/[name].bundle.js',
            chunkFilename: 'js/[id].chunk.js',
        },
        stats: {
            cachedAssets: false,
            performance: true,
            modules: false,
            colors: true,

            env: true,
            version: false,
            children: false,
            chunkOrigins: true,
            chunksSort: 'size',
            assetsSort: 'size',
            modulesSort: 'size',

            excludeAssets(name) {
                const excludeFromLogs = [
                    /assets/,
                    /static/,
                    /favicon/,
                    /webpack-silent/,
                ];

                return excludeFromLogs.some(r => r.test(name));
            },
        },

        resolve: {
            extensions: ['.ts', '.js', '.pug', '.css', '.styl', '.json'],
            alias: {
                // ...paths,
                //
                // vue: 'vue/dist/vue.js'
                // 'vue$': 'vue/dist/vue.runtime.esm.js'
                vue$: 'vue/dist/vue.esm.js',
            },
        },

        module: {
            noParse: /.*tsconfig\.json$/,
            rules: [
                {
                    test: /\.styl$/,
                    use: [
                        mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: mode === 'development',
                                minimize: mode === 'production',
                            } as any,
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [require('autoprefixer')],
                            },
                        },
                        'stylus-loader',
                    ],
                    exclude: [/.*src\/themes\/.*/],
                },
                {
                    test: /\.styl$/,
                    use: [
                        mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: mode === 'development',
                                minimize: mode === 'production',
                            } as any,
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [require('autoprefixer')],
                            },
                        },
                        'stylus-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: mode === 'development',
                                minimize: mode === 'production',
                            } as any,
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [require('autoprefixer')],
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                removeAttributeQuotes: false,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: mode === 'development',
                                minimize: mode === 'production',
                            } as any,
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [require('autoprefixer')],
                            },
                        },
                    ],
                },
                {
                    test: [/\.d\.ts$/, /tsconfig.*\.json$/],
                    loader: 'ignore-loader',
                },
                {
                    test: /\.ts$/,
                    exclude: [/(\.d\.ts)/],
                    loader: 'ts-loader',
                    options: {
                        configFile: resolve('tsconfig.base.json'),
                        transpileOnly: true,
                    },
                },

                // TODO: do we need it?
                {
                    test: /\.js?$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader',
                },
                {
                    test: /\.pug$/,
                    loaders: [
                        {
                            loader: 'vue-template-loader',
                            options: {
                                functional: false,
                                transformAssetUrls: {
                                    img: 'src',
                                },
                            },
                        },
                        {
                            loader: 'pug-plain-loader',
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'static/[name].[ext]',
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'static/[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        optimization: {
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
            removeAvailableModules: true,
            removeEmptyChunks: true,
            runtimeChunk: {
                name: 'async-importer',
            },
            nodeEnv: mode,
            namedChunks: true,
            splitChunks: {
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'all',
                        enforce: true,
                        reuseExistingChunk: true,
                        name: true,
                    },
                    main: {
                        test: chunk =>
                            chunkSplitPatterns.every(
                                p =>
                                    !p.test(chunk.userRequest) &&
                                    !p.test(
                                        chunk._chunks.values().next().value
                                            .name,
                                    ),
                            ),
                        chunks: 'all',
                        enforce: true,
                        reuseExistingChunk: true,
                        name: true,
                    },
                },
            },
        },

        parallelism: 8,

        plugins: [
            new MiniCssExtractPlugin({
                filename:
                    mode === 'development'
                        ? '[name].css'
                        : '[name].[contenthash].css',
                chunkFilename:
                    mode === 'development'
                        ? '[name].css'
                        : '[name].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                ...htmlConfig,
                template: require('html-webpack-template'),
                inject: false,
                favicon: htmlConfig.favicon,
                title: htmlConfig.title,
                meta: htmlConfig.meta,
                env: { NODE_ENV: mode, ENV: mode },
                minify:
                    mode === 'production'
                        ? {
                              removeComments: true,
                              collapseWhitespace: true,
                              removeAttributeQuotes: true,
                              collapseBooleanAttributes: true,
                              minifyCSS: true,
                              minifyJS: true,
                          }
                        : false,
            }),
            new CleanWebpackPlugin(resolve('./build/' + mode), {
                allowExternal: true,
            }),
            new ForkTsCheckerWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(mode),
                'process.env.ENV': JSON.stringify(mode),
            }),
            new webpack.NamedModulesPlugin(),

            new CopyWebpackPlugin([
                {
                    from: './build/favicons',
                    to: './favicons',
                },
            ]),
        ],

        node: { __dirname: true },
    };
};
