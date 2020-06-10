<style lang="scss" scope>
    .headerWrapper{
        width:100%;
        height: 80px;
        box-sizing: border-box;
        position: fixed;
        top:0;
    }
    .header{
        height: 80px;
        background-color: #FFF;
        width: 100%;
        position: relative;
        .container{
            height: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid #DCDFE6;
            .logo{
                font-size: 3em;
                font-weight: bold;
                color:goldenrod;
            }
        }
        .nav{
            float: right;
            height: 100%;
            line-height: 80px; // 这个line-height是什么属性？
            background:transparent;
            padding: 0;
            margin: 0;
            &::before, &::after{
                display: table;
                content: "";
            }
            &::after{
                clear: both;// 这个clear也不太清楚起到的是什么作用
            }
        }
        .nav-item{
            float: left;
            list-style: none ;
            position: relative;
            margin: 0;
            a{
                display: block;
                text-decoration: none;
                color: #1989FA;
                padding: 0 22px;
                opacity: 0.5;
                &.active, &:hover{
                    opacity: 1;
                }

                &.active::after{
                    content: "";
                    display: inline-block;
                    position: absolute; 
                    bottom: 0;
                    left: calc(50% - 15px); // 50%是获取其ancestor's left
                    width: 30px;
                    height: 2px;
                    background-color: #409EEF;
                }
            }
        }
    }

</style>
<template>
    <div class="headerWrapper">
        <header class="header">
            <div class="container">
                <span class="logo">
                    ZElement 
                </span>
                <ul class="nav">
                    <li class="nav-item">
                        <router-link active-class="active" 
                        :to="`/${ lang }/guide`">
                            {{langConfig.guide}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link active-class="active" 
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