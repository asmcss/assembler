export declare type UserSettings = {
    enabled: boolean;
    generate: boolean;
    constructable: boolean;
    cache: string | null;
    cacheKey: string;
    breakpoints: {
        mode: string;
        settings: object;
        enabled: string[];
    };
    states: {
        enabled: string[];
    };
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
export declare function getStyleProperties(content: string): Iterable<{
    property: string;
    name: string;
    entry: string;
}>;
export declare function getClasses(content: string): string;
export declare function style(...styles: (StyleType | StyleType[])[]): string;
export {};
