export { registerMixin } from "./mixins";
export { style } from "./helpers";
declare global {
    interface Document {
        adoptedStyleSheets: CSSStyleSheet[];
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
export declare function handleShadow(shadowRoot: ShadowRoot): boolean;
