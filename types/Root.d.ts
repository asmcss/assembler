declare class RootClass {
    private cache;
    private scopes;
    private registeredProperties;
    constructor();
    private initialize;
    private getComputedStyles;
    private getValue;
    getRegisteredScopes(): string[];
    getRegisteredProperties(): {
        name: string;
        aliases: string[];
    }[];
    getPropertyValue(property: string): string;
}
export declare const Root: RootClass;
export {};
