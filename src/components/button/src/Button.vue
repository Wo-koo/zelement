<template>
  <button 
  class="z-button"
  @click="handleClick"
  :class="[ 
  type ? 'z-button--' : '',
  size ? 'z-button--' : '',
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
  methods:{
    handleClick(args){
      this.$emit('click',args);
    }
  }
};
</script>
