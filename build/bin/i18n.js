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
        fs.mkdir(path.resolve(__dirname,`../../examples/pages/${lang.lang}`));
    }

    Object.keys(lang.pages).forEach(page=>{
        var templatePath = fs.resolve(__dirname,`../../examples/pages/template/${page}.tpl`);
        var content = fs.readFileSync(templatePath,'utf8');
        var outputPath = fa.resolve(__dirname,`../examples/pages/${lang.lang}`)
    })
});

