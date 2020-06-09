<style lang="scss">

</style>
<template>
    <div class="side-nav">
        <ul>
            <li class="nav-item" v-for="(item, key) in data" :key="key">
                <template v-if="item.groups">
                    <div class="nav-group" v-for="(group, key) in item.groups" :key="key">
                        <div class="nav-group_description">{{group.groupName}}</div>
                        <ul class="nav-list">
                            <li class="nav-item" v-for="(item,key) in group.list" :key="key">
                                <router-link acvtive-class="active" :to="base + item.path" v-text="item.title"/>
                            </li>
                        </ul>
                    </div>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { NavConfig } from "../nav.config";

export default {
    props:{
        data:Array,
        base:String,
    }
}
</script>