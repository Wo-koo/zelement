import Vue from 'vue'

/** ElementUI component common definition */
export declare class ZElemntComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type ZElemntComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type ZElemntComponentHorizontalAlignment = 'left' | 'center' | 'right'
