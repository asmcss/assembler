import { UserSettings } from "./helpers";
export default class StyleHandler {
    private style;
    private settings;
    private tracker;
    private mediaSettings;
    private desktopMode;
    private rules;
    private readonly padding;
    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Map<string, boolean>);
    get userSettings(): UserSettings;
    handleStyleChange(element: HTMLElement, oldContent: string | null, content: string | null): void;
    handleStyleRemoved(element: HTMLElement, content: string): void;
    private extract;
    private getStyleEntries;
    private getStyleProperties;
    private generateCSS;
    private getRuleIndex;
}
