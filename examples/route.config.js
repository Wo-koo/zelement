import navConfig from './nav.config';
import langs from './i18n/route';

const LOAD_MAP = {
    'zh-CN': name => {
        return r => require.ensure([], () =>
            r(require(`./pages/zh-CN/${name}.vue`)),
            'zh-CN');
    },
    'en-US': name => {
        return r => require.ensure([], () =>
            r(require(`./pages/en-US/${name}.vue`)),
            'en-US');
    }
};

const LOAD_DOCS_MAP = {
    'zh-CN': path => {
        return r => require.ensure([], () =>
            r(require(`./docs/zh-CN${path}.md`)),
            'zh-CN');
    },
    'en-US': path => {
        return r => require.ensure([], () =>
            r(require(`./docs/en-US${path}.md`)),
            'en-US');
    }
};

const loadDocs = function (lang, path) {
    return LOAD_DOCS_MAP[lang](path);
};

const load = function (lang, path) {
    return LOAD_MAP[lang](path);
};

// 依据lang载入导航的路由节点
const registerRoute = (navConfig) => {
    let route = [];
    Object.keys(navConfig).forEach((lang, index) => {
        let navs = navConfig[lang];
        route.push({
            path: `/${lang}/component`,
            redirect: `/${lang}/component/installation`,
            component: load(lang, 'component'),
            children: []
        });
        
        navs.forEach(nav => {
            if (nav.href) return;
            if (nav.groups) {
                nav.groups.forEach(group => {
                    group.list.forEach(nav => {
                        addRoute(nav, lang, index);
                    });
                });
            } else if (nav.children) {
                nav.children.forEach(nav => {
                    addRoute(nav, lang, index);
                });
            } else {
                addRoute(nav, lang, index);
            }
        });
    });

    function addRoute(page, lang, index) {
        const component = page.path === '/changelog'
            ? load(lang, 'changelog')
            : loadDocs(lang, page.path);
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description,
                lang
            },
            name: 'component-' + lang + (page.title || page.name),
            component: component.default || component
        };

        route[index].children.push(child);
    }

    return route;
};

let route = registerRoute(navConfig);

route.push({
    path: '/play',
    name: 'play',
    component: require('./play/index.vue')
});

let defaultPath = '/en-US';


route = route.concat([{
    path: '/',
    redirect: defaultPath
}, {
    path: '*',
    redirect: defaultPath
}]);

export default route;