'use strict'

var postcss = require('postcss');//postcss API
var fs = require('fs');//node中的file system api
var path = require('path');//node中的path system api
var fontFile = fs.readFileSync(path.resolve(__dirname,'../../src/theme/src/icon.scss'),'utf-8');
var nodes = postcss.parse(fontFile).nodes;

var classList = [];

/*

解释下面的正则表达式匹配
\.   : 反斜杠是转义符，因为.在正则中表示匹配任意非换行符，这里为了匹配<.el-icon->所以要用转义符
()   : 捕获括号，用于捕获括号内匹配的字符或者字符串
[^:] : 匹配任意非<:>冒号的元素
+    : 匹配一个或者多个

**/
var reg = new RegExp(/\.el-icon-([^:]+):before/);

nodes.forEach((node)=>{
    var selector = node.selector || '';
    var arr = selector.match(reg);

    if(arr && arr[1]){
        classList.push(arr[1]);
    }
});

classList.reverse();
console.log(__dirname);
fs.writeFile(path.resolve(__dirname,"../../example/icon.json"),JSON.stringify(classList),(err)=>{
    // writeFile回调函数中一定要进行异常的处理，否则系统会比较难维护
    if(err){
        throw err;
    }
    console.log("icon.json file had been saved");
});



