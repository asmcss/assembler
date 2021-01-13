declare type PropertyInfo = {
    entry: string;
    property: string;
    name: string;
    value: string | null;
};
declare type UserSettings = {
    enabled: boolean;
    cache: string | null;
    breakpoints: {
        mode: string;
        settings: object;
        enabled: string[];
    };
    states: {
        enabled: string[];
    };
};
export declare const domObserver: MutationObserver;
export declare function observe(element: HTMLElement, deep?: boolean): void;
export declare function extract(attr: string, value?: string | null): PropertyInfo[];
export declare function getStyleEntries(content: string, resolve?: boolean): Map<string, PropertyInfo>;
export declare function generateStyles(settings: UserSettings): string;
export declare function getStyleProperties(content: string): Iterable<{
    property: string;
    name: string;
}>;
export declare function getUserSettings(dataset: {
    [key: string]: string;
}): UserSettings;
export {};
