const navConfig = require('./nav.config');
const langs = require('./i18n/route');

// 不清楚这个部分是用来干嘛的
const LOAD_MAP = {
    'zh-CN': name=>{
        return r => require.ensure([],()=> // webpack require.ensure
            require(`./pages/zh-CN/${name}.vue`),
            error=>console.error(error),
            'zh-CN');
    }
};

const load = (lang,componentName)=>{
    return LOAD_MAP[lang](componentName);
};

const LOAD_DOCS_MAP = {
    'zh-CN':name=>{
        return r => require.ensure([],
            ()=> require(`./docs/zh-CN${name}.md`),
            error => console.error(error),
            'zh-CN');
    }
};

const loadDocs = function (lang,path) {
    return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = navConfig => {
    let route = [];
    Object.keys(navConfig).forEach((lang,index) => {
        let navs = navConfig[lang];
        route.push({ // 这里是vue的路由配置形式
            path:`/${lang}/component`,
            redirect:`${lang}/component/installation`,
            component:load(lang,'component'),
            children:[]
        });

        navs.forEach(nav=>{
            if(nav.groups){
                nav.groups.forEach(group=>{
                    group.list.forEach(nav =>{
                        addRoute(nav,lang,index);
                    })
                })
            };
        })
    });

    function addRoute(page, lang, index){
        const component = load(lang,page.path);
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
        route[index].children.push(child);
    };

    return route;
}

let route = registerRoute(navConfig); // add components routes

const generateMiscRoutes = function(lang){
    let indexRoute = {
        path: `/${lang}`, // 首页
        meta: {lang},
        name: 'home' + lang,
        component: load(lang,'index')
    }
}

langs.forEach(lang=>{
    route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
    path: '/play',
    name: 'play',
    component: require('./play/index')
});

const defaultPath = 'zh-CN';

route = route.concat([{
    path: '/',
    redirect: defaultPath
  }, {
    path: '*',
    redirect: defaultPath
  }]);
export default route;
