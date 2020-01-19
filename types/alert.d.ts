export type AlertType ='success' | 'warning' | 'info' | 'error';
export type AlertEffect = 'dark' | 'light';

export declare class ZAlert {
    title:string;

    type:AlertType;
}