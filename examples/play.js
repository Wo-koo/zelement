import Vue from 'vue';
import App from './play/index.vue';
import ZElement from 'main/index.js';

Vue.use(ZElement);

new Vue({
    render:h=>h(App)
}).$mount('#app');