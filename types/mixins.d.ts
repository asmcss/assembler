import type { UserSettings, MixinContext } from "./helpers";
declare type UserFunctionCallbackResult = {
    [key: string]: string;
} | string;
declare type UserFunctionCallback = (() => UserFunctionCallbackResult) | ((settings: UserSettings) => UserFunctionCallbackResult) | ((settings: UserSettings, ...args: string[]) => UserFunctionCallbackResult);
export declare function resolveMixin(context: MixinContext, name: string, args: string[]): string;
export declare function registerMixin(name: string, callback: UserFunctionCallback): void;
export {};
