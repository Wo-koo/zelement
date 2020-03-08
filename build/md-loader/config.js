const Config = require('markdown-it-chain'); // based on webpack-chain
const anchorPlugin = require('markdown-it-anchor'); // 锚
const containers = require('markdown-it-container'); 
const config = new Config();

config
    .options.html(true).end()

    .plugin('author').use(anchorPlugin).end()

    .plugin('containers').end()

    const md = config.toMd();

    module.exports = md;