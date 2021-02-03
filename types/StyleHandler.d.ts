export declare const HASH_VAR_PREFIX = "--x-";
export declare const VAR_REGEX: RegExp;
export declare const PROPERTY_REGEX: RegExp;
export default class StyleHandler {
    handleStyleChange(element: HTMLElement, oldContent: string | null, content: string | null): void;
    handleStyleRemoved(element: HTMLElement, content: string): void;
    private extract;
    private getStyleEntries;
    private getStyleProperties;
}
