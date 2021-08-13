import { UserSettings } from "./helpers";
export default class StyleHandler {
    readonly style: CSSStyleSheet;
    private readonly settings;
    private tracker;
    private mediaSettings;
    private desktopFirst;
    private breakpoints;
    private rules;
    private readonly padding;
    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Set<string>);
    get userSettings(): UserSettings;
    handleStyleChange(element: HTMLElement, oldContent: string | null, content: string | null): void;
    handleStyleRemoved(element: HTMLElement, content: string): void;
    private extract;
    private getStyleEntries;
    private getStyleProperties;
    private generateCSS;
    private getRuleIndex;
}
