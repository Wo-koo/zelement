/* automatically generated by ./build/bin/build-entry.js */

import Alert from "./components/alert/index.js"
//import locale from 'zelement/src/locale'; // temp to comment the locale file

const components = [
     Alert,
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
  version: '0.1.19',
  // locale: locale.use,
  // i18n: locale.i18n,
     install,
  // CollapseTransition,
  // Loading,
  Alert
}