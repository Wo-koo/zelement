<template>
  <transition name="z-alert-fade">
    <div
      v-show="visible"
      role="alert"
      class="z-alert"
      :class="[typeClass,center?'is-center':'is-'+effect]"
    >
      <i class="z-alert__icon" :class="[iconClass,isBigIcon]" v-if="showIcon"></i>
      <div class="z-alert__content">
        <span class="z-alert__title" :class="[isBoldTitle]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <!-- can't understand why there has one more description element -->
        <p class="z-alert__description" v-if="$slots.default && !description">
          <slot></slot>
        </p>
        <p class="z-alert__description" v-if="!$slots.default && description">{{ description }}</p>
      </div>
      <i
        class="z-alert__closebtn"
        :class="{'is-customed':closeText !== '','el-icon-close':closeText === ''}"
        v-show="closeable"
        @click="close()"
      ></i>
    </div>
  </transition>
</template>

<script>
const TYPE_CLASSES_MAP = {
  info: "z-icon-info",
  success: "z-icon-success",
  warning: "z-icon-warning",
  error: "z-icon-error"
};

export default {
  name: "ZAlert",

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
    closeText: {
      type: String,
      default: ""
    },
    showIcon:{
      type: Boolean,
      default: true,
    },
    center:{
      type: Boolean,
      default: true,
    },
    closeable:{
      type: Boolean,
      default: true,
    },
    closeText:{
      type: String,
      default: "",
    },
    effect:{
      type: String,
      default: 'light',
    }
  },

  data() {
    return {
      visible: true
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
      return TYPE_CLASSES_MAP[this.type]; // fallback value of type is 'info'
    },

    // why not put 'isBigIcon' in props ?
    // answer：因为在需求上是：当description不为empty时，图标就成为大图标，title加粗。
    isBigIcon(){
      return this.description || this.$slots.default ? 'is-big':'';
    },

    isBoldTitle(){
      return this.description || tyhis.$slots.default ? 'is-bold':'';
    }
  }
};
</script>