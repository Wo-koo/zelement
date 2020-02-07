import { ZElemntComponent } from './component'

export type AlertType ='success' | 'warning' | 'info' | 'error';
export type AlertEffect = 'dark' | 'light';

export declare class ZAlert extends ZElemntComponent {
    title:string;

    type:AlertType;
}