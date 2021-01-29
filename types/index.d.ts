import { observeShadow } from "./observers";
export { observeShadow };
export { extract, getStyleEntries as parse } from "./handlers";
export { style, registerMixin } from "./mixin";
export declare function init(options?: {
    [key: string]: string;
}): boolean;
