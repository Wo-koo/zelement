<style lang="scss">
    .side-nav{
        width: 100%;
        box-sizing: border-box;
        li{
            list-style: none;
        }
        ul{
            padding: 0;
            margin: 0;
            overflow: hidden;
        }

        .nav-item{
            a{            
                text-decoration: none;
                color: #333;
                font-size: 16px;
                line-height: 40px;
                display:block;
                font-weight: bold;
                
                &.active{
                    color: #409eff;
                }
            }

            .nav-group_name{
                font-size: 12px;
                color: #999;
                line-height: 26px;
                margin-top: 15px;
            }

            .nav-item{
                a{
                    font-size: 14px;
                    display: block;
                    height: 40px;
                    color: #444;
                    line-height: 40px;
                    font-weight: normal;

                    &:hover,
                    &.activef{
                        color:#409eff;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="side-nav">
        <ul>
            <li class="nav-item" v-for="(item, key) in data" :key="key">
                <template v-if="item.groups">
                    <div class="nav-group" v-for="(group, key) in item.groups" :key="key">
                        <div class="nav-group_name">{{group.groupName}}</div>
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