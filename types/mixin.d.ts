declare type MixinCallback = (...args: string[]) => {
    [key: string]: string;
};
declare type StyleType = string | {
    [key: string]: string;
};
export declare const APPLY_ATTR = "x-apply";
export declare function handleApplyAttribute(element: HTMLElement, value: string | null): void;
export declare function registerMixin(name: string, callback: MixinCallback): void;
export declare function style(...styles: (StyleType | StyleType[])[]): string;
export {};
