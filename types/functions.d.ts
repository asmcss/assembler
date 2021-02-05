declare type UserFunctionCallback = (...args: string[]) => {
    [key: string]: string;
} | string;
export declare function parseApplyAttribute(value: string | null): string | null;
export declare function registerFunction(name: string, callback: UserFunctionCallback): void;
export {};
