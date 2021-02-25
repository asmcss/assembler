import { style, getClasses } from "./helpers";
export { registerMixin } from "./mixins";
export { style, getClasses };
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
