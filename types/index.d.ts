export { registerMixin } from "./mixins";
export { style } from "./helpers";
declare global {
    interface Document {
        adoptedStyleSheets: CSSStyleSheet[];
    }
    interface Window {
        ShadyCSS?: any;
    }
    interface CSSStyleSheet {
        replace(css: string): any;
        replaceSync(css: string): any;
    }
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}
export declare function init(options?: {
    [key: string]: string;
}): boolean;
export declare function handleShadowRoot(shadowRoot: ShadowRoot, add?: boolean): boolean;
export declare function cssStyleSheet(): CSSStyleSheet;
