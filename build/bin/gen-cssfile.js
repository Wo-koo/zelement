/* 
用来生成css文件的
**/

const fs = require('fs');
const path = require('path');
var Components = require('../../components.json');
const themes = ['theme'];

Components = Object.keys(Components);
const basePath = path.resolve(__dirname,'../../src');

function fileExists(filePath){
    try{
        return fs.statSync(filePath).isFile();
    }catch(e){
        console(`${{filePath}} not exist files`);
        return false;
    }
}

themes.forEach(theme=>{
    let isScss = theme == 'theme' ? true :false;
    var indexContent = '';

    Components.forEach(key=>{
        var fileName = key + (isScss ? '.scss' : 'css');
        indexContent += '@import "./' + fileName + '"; \n';
        let filePath = path.resolve(basePath,'theme/src',fileName);
        if (!fileExists(filePath)) {
            console.warn(`scss file ${{fileName}} miss out!`);
            fs.writeFileSync(filePath,'','utf-8');
        }
    });
    fs.writeFileSync(path.resolve(basePath,'theme/src',isScss ? 'index.scss' :'index.css'),indexContent);
});


