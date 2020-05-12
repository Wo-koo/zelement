<template>
  <button 
  class="z-button"
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
    disabled:Boolean,
    plan: Boolean,
    circle: Boolean,
    round: Boolean,
  }
};
</script>
