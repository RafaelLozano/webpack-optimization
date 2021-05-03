const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports={
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]',
        clean: true,

    },
    resolve:{
        extensions:['js'],
        alias:{
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),

        }
    },
    module:{
        rules: [
            {
              // Test declara que extensión de archivos aplicara el loader
              test: /\.js$/,
              // Use es un arreglo u objeto donde dices que loader aplicaras
              use: {
                loader: "babel-loader"
              },
              // Exclude permite omitir archivos o carpetas especificas
              exclude: /node_modules/
            },
            {
                test: /\.css$/i, //expresion regular
                //cual es elemento que vamos a tenr
                  //Nosotros podemos usar el use con un objeto o un arreglo segun la configuracion 
                    // del plugin
                use:[MiniCssExtracPlugin.loader, 'css-loader'], 
          
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                    limit: 1000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath: "./assets/fonts/", 
                    publicPath: "../assets/fonts/", 
                    esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtracPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({ 
            patterns: [ 
                { 
                    from: path.resolve(__dirname, "src", "assets/images"), 
                    to: "assets/images" 
                } 
            ] 
        }), 
        new Dotenv(),
        
    ],
    optimization: 
    { 
        minimize: true, 
        minimizer: [ 
            new CssMinimizerPlugin(), 
            new TerserPlugin() 
        ] 
    }

}