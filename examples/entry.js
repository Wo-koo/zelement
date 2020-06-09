// to build the entry chunk
import Vue from 'vue';
import VueRouter from 'vue-router';
import ZElement from 'main/index.js';
import entry from './app';
import routes from './route.config';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import ElementUI from 'element-ui';

Vue.use(ZElement);
Vue.use(ElementUI);// temp use ElementUI API
Vue.use(VueRouter);
Vue.component('main-header',MainHeader);
Vue.component('side-nav',SideNav);

// create the router instance and pass the 'routes' option
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes // short for routes: routes
});

// router hook
// router.afterEach(route=>{
//     // to do
// });

new Vue({
    ...entry,
    router,
}).$mount('#app'); // this place throw can't find error