import { style } from "./helpers";
export { registerMixin } from "./mixin";
export { style };
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
