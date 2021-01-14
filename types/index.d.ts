import { extract, getStyleEntries as parse } from "./handlers";
import { style, registerMixin } from "./mixin";
export { extract, parse, style, registerMixin };
export declare function init(options?: {
    [key: string]: string;
}): boolean;
