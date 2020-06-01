<style lang="scss" scope>
    .headerWrapper{
        height: 80px;
    }
    .header{
        height: 80px;
        background-color: #FFF;
        width: 100%;
        position: relative;
        .container{
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
            background-color: greenyellow;
            &::before, &::after{
                display: table;
                content: "";
            }
            &::after{
                clear: both;
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