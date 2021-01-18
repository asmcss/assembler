declare type PropertyInfo = {
    entry: string;
    property: string;
    name: string;
    value: string | null;
};
export declare const HASH_VAR_PREFIX = "--x-";
export declare const VAR_REGEX: RegExp;
export declare const PROPERTY_REGEX: RegExp;
export declare const STYLE_ATTR = "x-style";
export declare function handleStyleChange(element: HTMLElement, oldContent: string | null, content: string | null): void;
export declare function handleStyleRemoved(element: HTMLElement, content: string): void;
export declare function extract(attr: string, value?: string | string[] | null): PropertyInfo[];
export declare function getStyleEntries(content: string, resolve?: boolean): Map<string, PropertyInfo>;
export declare function getStyleProperties(content: string): Iterable<{
    property: string;
    name: string;
    entry: string;
}>;
export {};
