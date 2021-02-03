declare type MixinCallback = (...args: string[]) => {
    [key: string]: string;
} | string;
export declare function parseApplyAttribute(value: string | null): string | null;
export declare function registerMixin(name: string, callback: MixinCallback): void;
export {};
