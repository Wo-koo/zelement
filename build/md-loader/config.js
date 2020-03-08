const Config = require('markdown-it-chain'); // based on webpack-chain

const config = new Config();

config
    .options.html(true).end()

    .plugin('author').end()

    .plugin('containers').end()

    const md = config.toMd();

    module.exports = md;