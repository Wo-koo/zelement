import Vue from 'vue';
import App from './play/index.vue';
import ZElement from 'main/index.js';
import ElementUI from 'element-ui';
import "../src/theme/src/alert.scss";

Vue.use(ZElement);
Vue.use(ElementUI);

new Vue({  // eslint-disable-line
    render: h => h(App)
}).$mount('#app');