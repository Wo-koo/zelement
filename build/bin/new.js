console.log();

process.on('exit',exitCode=>{ // node进程退出时触发
    console.log('exit code is ' + exitCode);
});

if (!process.argv[2]) {
    console.error('[component name] - please enter new component name');
    process.exit("component name null");
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
if (componentFile[componentname]) {
    console.error(`${componentname} component already exit`);
    process.exit(`${componentname} already exit`);
}
componentFile[componentname] = `./src/components/${componentname}/index.js`;
fileSave(path.join(__dirname,'../../components.json'))
    .write(JSON.stringify(componentFile,null," "),'utf8')
    .end('\n');

// to create new component
Files.forEach(item=>{
    fileSave(path.join(componentPath,item.filename))
        .write(item.content,'utf8')
        .end('\n');
});


