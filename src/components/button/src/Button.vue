<template>
  <button 
  class="z-button"
  :type="nativeType">

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
    
  }
};
</script>
