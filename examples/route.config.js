const navConfig = require('./nav.config');
const lang = require('./i18n/route');

// 不清楚这个部分是用来干嘛的
const LOAD_MAP = {
    'zh-CN': {}
};

const load = (name,path)=>{
    return LOAD_MAP[lang](path);
}

const LOAD_DOCS_MAP = {
    'zh-CN':path=>{
        return r => require.ensure([],()=> r(require(`./docs/zh-CN${path}.md`)),'zh-CN'); // require.ensure是干嘛的
    }
}

const loadDocs = function (lang,path) {
    return LOAD_DOCS_MAP[lang](path);
}
