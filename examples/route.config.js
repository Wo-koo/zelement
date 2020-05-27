const navConfig = require('./nav.config');
const langs = require('./i18n/route');

const LOAD_MAP = {
    'zh-CN': name=>{
        return r => require.ensure([],()=> // webpack require.ensure
            r(require(`./pages/zh-CN/${name}.vue`)),
            error => console.error(error),
            'zh-CN');
    }
};

const load = (lang,name)=>{
    return LOAD_MAP[lang](name);
};

const LOAD_DOCS_MAP = {
    'zh-CN':path=>{
        return r => require.ensure([],()=>
            r(require(`./docs/zh-CN${path}.md`)), // path for example: '/alert'
            error => console.error(error),
            'zh-CN');
    }
};

const loadDocs = function (lang,path) {
    return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = navConfig => {
    let route = []; // to save route's info
    Object.keys(navConfig).forEach((lang,index) => {
        let navs = navConfig[lang];
        // pages下的component.vue组件是起什么作用的
        route.push({
            path:`/${lang}/component`,
            redirect:`${lang}/component/`,
            component:load(lang,'component'),
            children:[]
        });

        navs.forEach(nav=>{
            if(nav.groups){// 如果nav.groups存在，则说明这个部分是控件组部分
                nav.groups.forEach(group=>{
                    group.list.forEach(nav =>{
                        addRoute(nav,lang,index);
                    });
                });
            };
        });
    });

    function addRoute(page, lang, index){
        const component = loadDocs(lang,page.path); // 这里最好打上断点查看数据形式
        let child = {
            path: page.path.slice(1),
            meta:{
                title: page.title || page.name,
                description: page.description,
                lang
            },
            name: 'component-' + lang + (page.title || page.name),
            component: component.default || component
        }
        route[index].children.push(child); // component.default这里指的是什么？
    };
    return route;// 返回存储的路由信息  
};

let route = registerRoute(navConfig); // add components routes

const generateMiscRoutes = function(lang){
    let indexRoute = {
        path: `/${lang}`,
        meta: {lang},
        name: 'home' + lang,
        component: load(lang,'index') // 加载首页
    }
    return [indexRoute];
};

langs.forEach(lang=>{
    route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
    path: '/play',
    name: 'play',
    component: require('./play/index.vue') //这个地方实际上是component:require('./play/index.vue)但是无法正常加载。原因有待分析
});

let defaultPath = '/zh-CN';

route = route.concat([
    {path: '/', redirect: defaultPath},
    {page: '*', redirect: defaultPath}
]);

export default route;