<style lang="scss">
.page-component_scroll{
    height: calc(100% - 80px);
    margin-top: 80px;

    > .page-component_scroll{
        overflow-x: auto;
    }
}
.page-component{
    box-sizing: border-box;
    height: 100%;

    .page-component_nav{
        width: 360px;
        position: fixed;
        overflow: auto;
    }
}
</style>
<template>
    <el-scrollbar class="page-component_scroll" ref="componentScrollBar">
        <div class="page-container page-component">
            <el-scrollbar class="page-component_nav">
                <side-nav :data="navConfig[lang]" :base="lang"></side-nav>
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