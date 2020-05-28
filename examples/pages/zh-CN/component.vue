<style scoped>

</style>
<template>
    <el-scrollbar class="page-component_scroll" ref="componentScrollBar">
        <div class="page-container page-component">
            <el-scrollbar class="page-component_nav">
                <side-nav><!-- ? -->
                </side-nav>
            </el-scrollbar>
            <div class="page-component_content">
                <roter-view class="content"></roter-view>
            </div>
            <el-backtop>
            </el-backtop>
        </div>
    </el-scrollbar>
</template>