import { UserSettings } from "./helpers";
declare type UserFunctionCallback = (settings: UserSettings, ...args: string[]) => {
    [key: string]: string;
} | string;
export declare function parseApplyAttribute(settings: UserSettings, value: string | null): string | null;
export declare function registerMixin(name: string, callback: UserFunctionCallback): void;
export {};
