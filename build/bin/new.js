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
const componentName = process.argv[2]; // detail reference node.js
const componentName;

