<template>
  <button 
  class="z-button"
  @click="handleClick"
  :class="[ 
  type ? 'z-button--' + type : '',
  size ? 'z-button--' + size : '',
  {
    'is-disabled': disabled,
    'is-plan': plan,
    'is-circle': circle,
    'is-round': round,
  }
  ]">
  <i class="z-icon-loading" v-if="loading"/> 
  <i :class="icon" v-if="icon && !loading"/>
  <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
        

<script>
export default {
  name: "ZButton",

  inject:{// 提供类似于context的概念，但是在这里是干嘛的暂时不清楚设计目的。
    zForm:{
      default:''
    },
    zFormItem:{
      default:''
    }
  },

  props:{
    type:{
      type: String,
      default: "default",
    },
    size:{
      type: String,
      default: 'normal',
    },
    icon:{
      type: String,
      default: ''
    },
    disabled:Boolean,
    plan: Boolean,
    circle: Boolean,
    round: Boolean,
    loading: Boolean,
  },
  computed:{
    buttonSize(){
      return this.size
    },
    buttonDisabled(){
      return this.disabled;
    }
  },
  methods:{
    handleClick(args){
      this.$emit('click',args); // $emit代表什么
    }
  }
};
</script>
