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
    let style = content.match(/<(style)\s*>([\s\S]+)+<\/\1>/);
    return style && style[2] ? style[2].trim() : '';
}

// 剥离出模版部分，剔除其他部分，剩余的就是template的部分
function stripTemplate(content){
    content = content.trim();
    if (!content) {
        return content;
    }
    return content.replice(/<(style|script)>[\s\S]+<\/\1>/,'').trim();
}

// 这个地方不是很清楚，按行分割以后，套用表达式语句是干嘛用的？
function pad(source){
    return source.split(/\r?\n/).map(line=>`${line}`).join('\n');
}

function generatorInLineComponentText(template,script){
    const templateOptions = {
        source: `<div>${template}</div>`, //？？
        filename: 'inline-component', // ？？这个地方的配置目前不是很懂
        compiler: compiler
    };

    const complied = compileTemplate(templateOptions);
    
    //tips
    if (complied.tips && complied.tips.length) {
        complied.tips.forEach(tip=>{
            console.warn(tip);
        })
    }

    // errors
    if (complied.errors && complied.errors.length) {
        complied.errors.forEach(error=>{
            console.error(error);
        })
    }

    let demoComponentContent = `${complied.code}`;
    script = script.trim();
    if (script) {
        script = script.replice(/export\s+default/,'const democomponentExport = ')
    }else{
        script = 'const democomponentExport = {}';
    }

    demoComponentContent = `(function(){
        ${demoComponentContent}
        ${script}
        return{ // 这几个返回参数是如何确定的不清楚
            render,
            staticRenderFns,
            ...democomponentExprot
        }
    })()`;

    return demoComponentContent;
}

module.export = {
    stripScript,
    stripStyle,
    stripTemplate,
    generatorInLineComponentText,
}