<template>
  <transition name="z-alert-fade">
    <div :v-show="visible" role="alert" class="z-alert" :class="[typeClass]">
      <i class="z-alter__icon" :class="[iconClass, isBigIcon]"></i>
      <div class="z-alter__content">
        <span class="z-alter__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="z-alter__description" v-if="description">{{ description }}</p>
      </div>
      <i class="z-alter__closebtn" @click="close()"></i>
    </div>
  </transition>
</template>

<script>
const TYPE_CLASSES_MAP = {
  success: "z-icon-success",
  warning: "z-icon-warning",
  error: "z-icon-error"
};

export default {
  name: 'ZAlert',
  
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible:true
    };
  },

  methods: {
    close() {
      this.visible = false;
      //vm.$emit( eventName, […args] )
      this.$emit("close");
    }
  },

  computed: {
    typeClass: function() {
      return `z-alert-${this.type}`;
    },

    iconClass: function() {
      return TYPE_CLASSES_MAP[this.type] || "z-icon-info";
    }
  }
};
</script>