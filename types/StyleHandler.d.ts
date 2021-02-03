import { UserSettings } from "./helpers";
export declare const VAR_REGEX: RegExp;
export declare const PROPERTY_REGEX: RegExp;
export default class StyleHandler {
    private style;
    private settings;
    private tracker;
    private mediaSettings;
    private desktopMode;
    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Map<string, boolean>);
    handleStyleChange(element: HTMLElement, oldContent: string | null, content: string | null): void;
    handleStyleRemoved(element: HTMLElement, content: string): void;
    private extract;
    private getStyleEntries;
    private getStyleProperties;
    private generateCSS;
}
