// is the main file of md-loader
const{
    stripScript,
    stripTemplate,
    generatorInLineComponentText
} = require("./util");

const md = require('./config');

module.exports = function(source){
    const content = md.render(source);

    const startTag = '<!--zelement-demo:';
    const startTagLen = startTag.length;
    const endTag = ':zelement-demo-->';
    const endTagLen = endTag.length;

    let componentsString = "";
    let id = 0;
    let output = [];
    let start = 0;

    let commentStart = content.indexOf(startTag);
    let commentEnd = content.indexOf(endTag,commentStart+startTagLen);
    while (commentStart !== -1 && commentEnd !== -1) {
        output.push(content.slice(start,commentEnd)) // 在<!--element-demo标签之前的部分就是要输出的内容.
        
        const commentContent = content.slice(commentStart+startTagLen,commentEnd);
        const html = stripTemplate(commentContent);
        const script = stripScript(commentContent);
        let demoComponentContent =  generatorInLineComponentText(html,script);
        const demoComponentName = `zelement-demo${id}`;

        output.push(`<template slot="source"><${demoComponentName}/></template>`);
        componentsString += `$JSON.stringify(demoComponentName)}:${demoComponentContent},`;

        // reset the next point
        id++;
        start = commentEnd + endTagLen;
        commentStart = content.indexOf(startTag,start);
        commentEnd = content.indexOf(endTag,commentStart+ startTagLen);
    }

    // 这里搞不太懂为什么要有pageScript这个东西,需要打断点查看
    let pageScript = '';
    if(componentsString){
        pageScript = `<script>
        export default{
            name: 'component-doc',
            components:{
                ${componentsString}
            }
        }
        </script>`;
    } else if (content.indexOf('<script>') === 0) {
        start = content.indexOf('</script>') + '</script>'.length;
        pageScript = content.slice(0,start);        
    }

    output.push(content.slice(start));
    return `
    <template>
        <section class="content zelement-doc">
            ${output.join('')}
        </section>
    </template>
    ${pageScript}
    `;
};
