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
}
export declare function init(options?: {
    [key: string]: string;
}): boolean;
