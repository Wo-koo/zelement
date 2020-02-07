import Vue from "vue";

import { ZAlert } from './alert'

// TS cannot merge imported class with namespace, so declare subclasses instead

/** Alert Component */
export class Alert extends ZAlert {}