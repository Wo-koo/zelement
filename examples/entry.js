// to build the entry chunk
import Vue from 'vue';
import VueRouter from 'vue-router';
import ZElement from 'main/index.js';
import entry from './app';
import routes from './route.config';

Vue.use(ZElement);
Vue.use(VueRouter);

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