<template>
    <transition name="z-alter-fade">
        <div>
            <i class="icon"></i>
            <div class="content">
                <span class="title">
                    <slot class="title"></slot>
                </span>
                <p class="description"></p>
                <p class="description"></p>
            </div>
            <i class="closeBtn"></i>
        </div>
    </transition>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'info'
        },
        visible:{
            type:Boolean,
            default:false
        },
    },

    data(){
        return{
            visible
        }
    },

    methods:{
        close(){
            // todo
        }
    },

    computed:{

    },
}
</script>