// to cover default fence render of markeDown 
// still to make understand the fence is what.

module.exports = md =>{
    const defaultRender = md.renderer.rules.fence; // 这个部分比较迷惑，是如何知道这种形式的写法的？
    md.renderer.rules.fence = (tokens, idx, options, env, self) =>{
        const token = tokens[idx];
        // to judge weather the fence is included in :::demo
        const preToken = tokens[idx -1];
        const isInDemoContainer = preToken && preToken.nesting == 1 && preToken.info.trim().match(/^demo\s*(.*)$/);

        if (token.info === 'html' && isInDemoContainer) {
            return `<template><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
        }
        return defaultRender(tokens, idx, options, env, self);
    }
}