export declare type UserSettings = {
    enabled: boolean;
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
};
declare type StyleType = string | {
    [key: string]: string;
};
export declare function getUserSettings(dataset: {
    [key: string]: string;
}): UserSettings;
export declare function style(...styles: (StyleType | StyleType[])[]): string;
export {};
