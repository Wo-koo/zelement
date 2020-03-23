// to assemble the markDown about.
const Config = require('markdown-it-chain'); // based on webpack-chain
const anchorPlugin = require('markdown-it-anchor'); // 锚
const containers = require('./containers'); 
const overWriteFenceRule = require('./fence');

const config = new Config();

config
    .options.html(true).end()

    .plugin('author').use(anchorPlugin).end()

    .plugin('containers').use(containers).end()

    const md = config.toMd();
    overWriteFenceRule(md);

    module.exports = md;