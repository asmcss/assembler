export declare type UserSettings = {
    enabled: boolean;
    generate: boolean;
    constructable: boolean;
    cache: string | null;
    cacheKey: string;
    desktopFirst: boolean;
    breakpoints: string[];
    media: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    states: string[];
    scopes: string[];
    xStyleAttribute: string;
    selectorAttribute: string;
    registeredProperties: {
        name: string;
        aliases: string[];
    }[];
};
export interface MixinContext {
    readonly userSettings: UserSettings;
    readonly currentElement: HTMLElement | null;
}
declare type StyleType = string | {
    [key: string]: string;
};
export declare const HASH_VAR_PREFIX = "--asm-";
export declare const HASH_CLASS_PREFIX = "asm";
export declare const PROPERTY_REGEX: RegExp;
export declare function getUserSettings(dataset: {
    [key: string]: string;
}): UserSettings;
export declare function style(item: StyleType | StyleType[]): string;
export declare function trim(value: string): string;
export declare function nonEmptyString(value: string): boolean;
export declare function uniqueItems(value: any, index: number, self: any[]): boolean;
export {};
