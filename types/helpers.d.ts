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
};
declare type StyleType = string | {
    [key: string]: string;
};
export declare const HASH_VAR_PREFIX = "--x-";
export declare const PROPERTY_REGEX: RegExp;
export declare function getUserSettings(dataset: {
    [key: string]: string;
}): UserSettings;
export declare function style(...styles: (StyleType | StyleType[])[]): string;
export {};
