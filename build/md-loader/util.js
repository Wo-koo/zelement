// these are uitls for md-loader

const {compileTemplate} = require('@vue/component-compiler-utils'); // ?
const compiler = require('vue-template-compiler');

// 剥离脚本部分
function stripScript(content){
    let script = content.match(/<(script)>([\s\S]+)<(\/script>)/);
    return script && script[2] ? script[2].trim() : ''; // 如果可以捕获script标签中的内容，则进行返回。否则返回为空
}

// 剥离样式部分
function stripStyle(content){
    let style = content.match(/<([css,scss])([\s\S])+<\/\1>/);
    return style && style[2] ?? style[2] : '';
}

// 剥离模版部分
function stripTemplate(content){

}

// ?
function pad(source){

}

function generatorInLineComponentText(template,script){

}

module.export = {
    stripScript,
    stripStyle,
    stripTemplate,
    generatorInLineComponentText,
}