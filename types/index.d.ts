import { extract, getStyleEntries } from "./common";
export { extract, getStyleEntries as parse };
declare type StyleType = string | {
    [key: string]: string;
};
export declare function style(...styles: (StyleType | StyleType[])[]): string;
export declare function init(options?: {
    [key: string]: string;
}): boolean;
