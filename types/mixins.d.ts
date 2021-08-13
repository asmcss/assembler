import type { UserSettings } from "./helpers";
declare type UserFunctionCallbackResult = {
    [key: string]: string;
} | string;
declare type UserFunctionCallback = (() => UserFunctionCallbackResult) | ((settings: UserSettings) => UserFunctionCallbackResult) | ((settings: UserSettings, ...args: string[]) => UserFunctionCallbackResult);
export declare function parseApplyAttribute(settings: UserSettings, value: string | null): string | null;
export declare function registerMixin(name: string, callback: UserFunctionCallback): void;
export {};
