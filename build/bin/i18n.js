// 生成examples下的pages下相关的文件和docs文件夹下的相关文件

'use strict'

var fs = require('fs');
var path = require('path');
var langConfig = require('../../examples/i18n/page.json');

// 通过statSync函数来判断是否有对应文件存在，如果不存在则创建对应的文件夹
langConfig.forEach(lang=>{
    try {
        fs.statSync(path.resolve(__dirname,`../../examples/pages/${lang.lang}`))
    } catch (error) {
        fs.mkdirSync(path.resolve(__dirname,`../../examples/pages/${lang.lang}`));
        console.error(error);
    }

    Object.keys(lang.pages).forEach(page=>{
        var templatePath = path.resolve(__dirname,`../../examples/pages/template/${page}.tpl`);
        var content = fs.readFileSync(templatePath,'utf8');
        var outputPath = path.resolve(__dirname,`../../examples/pages/${lang.lang}/${page}.vue`)
        var keyValuePairs = lang.pages[page];

        Object.keys(keyValuePairs).forEach(key=>{
            content = content.replace(new RegExp(`<%=\\s*${key}\s*>`,'g'),keyValuePairs[key]);
        });

        fs.writeFileSync(outputPath,content);
    })
});

