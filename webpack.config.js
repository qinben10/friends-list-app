module.exports = {
    entry: ['./src/index.js'],
    mode: 'development',
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    devtool: 'source-maps',
}