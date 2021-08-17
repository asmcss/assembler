import type { UserSettings } from "./helpers";
declare type AssemblerEntry = {
    n: string;
    p: string;
    e: string;
};
export default class StyleHandler {
    readonly style: CSSStyleSheet;
    private readonly settings;
    private tracker;
    private mediaSettings;
    private desktopFirst;
    private readonly breakpoints;
    private rules;
    private readonly padding;
    private readonly selectorAttribute;
    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Set<string>);
    get userSettings(): UserSettings;
    handleStyleChange(element: HTMLElement, content: string | null, old: AssemblerEntry[]): AssemblerEntry[];
    handleStyleRemoved(element: HTMLElement, old: AssemblerEntry[]): AssemblerEntry[];
    private extract;
    private getStyleEntries;
    private getResolvedProperties;
    private generateCSS;
    private getRuleIndex;
}
export {};
