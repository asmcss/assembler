import { style, getClasses } from "./helpers";
export { registerFunction } from "./functions";
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
