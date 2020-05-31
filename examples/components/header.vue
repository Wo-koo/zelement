<template>
    <div class="headerWrapper">
        <header class="header">
            <div class="container">
                <slot>
                    ZElement 
                </slot>
                <ul class="nav">
                    <li class="nav-item">
                        <router-link active-class="active" 
                        :to="`/${ lang }/guide`">
                            {{langConfig.guide}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link acctive-class="active" 
                        :to="`/${ lang }/component`">
                        {{langConfig.components}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
import componentLang from "../i18n/component.json";

export default {
    computed:{
        lang(){
            return this.$route.path.split('/')[1] || 'zh-CN';
        },
        langConfig(){
            return componentLang.filter(item=>item.lang === this.lang)[0].header;
        }
    }
}
</script>