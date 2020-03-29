var components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var endOfLine = require('os').EOL;
var path = require('path');

var OUTPUT_PATH = path.resolve(__dirname+'../../../src/index.js');
var IMPORT_TEMPLATE = "import {{name}} from \"\.\/components\/{{component}}\/index.js\"";
var INSTALL_COMPONENT_TEMPLATE = ' {{name}}';
var MAIN_TEMPLATE = `/* automatically generated by ./build/bin/build-entry.js */

{{include}}
//import locale from 'zelement/src/locale'; // temp to comment the locale file

const components = [
    {{install}},
    //CollapseTransition
];

const install = function(Vue,opts={}){
    //locale.use(opt.locale);
    //locale.i18n(opt.i18n);//这里要搞清楚什么是i18n

    components.forEach(component=>{
        Vue.component(component.name,component);
    });

    // Vue.use(InfiniteScroll);
    // Vue.use(Loading.directive);

    // Vue.prototype.$ELEMENT = {
    //     size: opts.size || '',
    //     zIndex: opts.zIndex || 2000
    // };

    // Vue.prototype.$loading = Loading.service;
    // Vue.prototype.$msgbox = MessageBox;
    // Vue.prototype.$alert = MessageBox.alert;
    // Vue.prototype.$confirm = MessageBox.confirm;
    // Vue.prototype.$prompt = MessageBox.prompt;
    // Vue.prototype.$notify = Notification;
    // Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  console.log('install function done');
}
else{
  console.log('install function fails');
}

export default {
  version: '{{version}}',
  // locale: locale.use,
  // i18n: locale.i18n,
  // install,
  // CollapseTransition,
  // Loading,
{{list}}
}`;

// delete Components.font; // 这个语句不太明白

var ComponentNames = Object.keys(components);
var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name=>{
    //render import template
    var componentName = uppercamelcase(name);
    includeComponentTemplate.push(render(IMPORT_TEMPLATE,{
        name: componentName,
        component: name
    }));

    //render install template 这里有点疑问，为什么要单独处理install的模板
    if (['Loading', 'MessageBox', 'Notification', 'Message', 'InfiniteScroll'].indexOf(componentName) === -1) {
        installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
          name: componentName,
          component: name
        }));
      };

    if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`);

});

var mainTemplate = render(MAIN_TEMPLATE,{
    include:includeComponentTemplate.join(endOfLine),
    install:installTemplate.join(','+endOfLine),
    version:process.env.version || require('../../package.json').version,
    list:listTemplate.join(','+endOfLine)
})

fs.writeFileSync(OUTPUT_PATH,mainTemplate);
console.log('build-entry.js had created');
