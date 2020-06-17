<style lang="scss">
.page-component_scroll{
    height: calc(100% - 80px);
    margin-top: 80px;
}

.page-component{
    box-sizing: border-box;
    height: 100%;

    .page-component_nav{
        width: 240px;
        position: fixed;
        margin-top: 80px;
        top:0;
        bottom:0;
        overflow-y: auto;
        transition: padding-top .3s;
    }

    .side-nav{
        height: 100%;
        padding-top: 50px;
    }

    .page-component_content{
        box-sizing: border-box;
        padding-left: 270px;
        padding-bottom: 100px;
    }
}
</style>
<template>
    <el-scrollbar class="page-component_scroll" ref="componentScrollBar">
        <div class="page-container page-component">
            <el-scrollbar class="page-component_nav">
                <side-nav :data="navConfig[lang]" :base="`/${lang}/component`"></side-nav>
            </el-scrollbar>
            <div class="page-component_content">
                <router-view class="content"></router-view>
            </div>
            <el-backtop>
            </el-backtop>
        </div>
    </el-scrollbar>
</template>
<script>
import navConfig from '../../nav.config.json';

export default {
    data(){
        return{
            lang:this.$route.meta.lang || 'zh-CN',
            navConfig,
        }
    }
}
</script>