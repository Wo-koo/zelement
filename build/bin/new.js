console.log();

process.on('exit',exitCode=>{ // node进程退出时触发
    console.log('exit code is ' + exitCode);
    if (exitCode && exitCode == 0) {
        console.log("new.js execute successfully");
    } else {
        console.log("new.js execute failed");
    }
});

if (!process.argv[2]) {
    console.error('[component name] - please enter new component name');
    process.exit(1); // exit code 0: success, 1:failure
}

const path = require('path');
const fs =  require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentName = process.argv[2]; //process.argv detail reference node.js
const componentChineseName = process.argv[3] || componentName;
const ComponentName = uppercamelcase(componentName);
const componentPath = path.resolve(__dirname,'../../src/components',componentName);
const Files = [
    {
        // component's index file template
        filename: 'index.js',
        content:`import ${ComponentName} from './src/${ComponentName}';

        ${ComponentName}.install = function(Vue){
            Vue.component(${ComponentName}.name, ${ComponentName});
        }

        export default ${ComponentName};
        `
    },
    // component's vue file template
    {
        filename:`src/${ComponentName}.vue`,
        content:`<template>
        <div class='z-${componentName}'></div>
        </template>
        
        <script>
        
        export default{
            name:"Z${ComponentName}",
        };
        </script>`
    }
];

// add new component to components.json
const componentFile = require('../../components.json');
if (componentFile[componentName]) {
    console.error(`${componentName} component already exit`);
    process.exit(1);
}

componentFile[componentName] = `./src/components/${componentName}/index.js`;
fileSave(path.join(__dirname,'../../components.json'))
    .write(JSON.stringify(componentFile,null,'   '),'utf8')
    .end('\n');

// to create new component
Files.forEach(item=>{
    fileSave(path.join(componentPath,item.filename))
        .write(item.content,'utf8')
        .end('\n');
});

// to add new component to nav.config.json 这个部分有待改进，因为编码还是有点僵硬，无法进行精确的匹配插入
const navConfigFile = require('../../examples/nav.config.json');
Object.keys(navConfigFile).forEach(lang=>{
    let groups = navConfigFile[lang][0].groups;
    groups[groups.length - 1].list.push({
        path: `/${componentName}`,
        title: `${ComponentName} ${componentChineseName}`
    })
});

fileSave(path.join(__dirname , '../../examples/nav.config.json'))
    .write(JSON.stringify(navConfigFile,null,''),'utf8')
    .end('\n');

console.log('Done');


