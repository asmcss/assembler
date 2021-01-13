declare type UserSettings = {
    enabled: boolean;
    cache: string | null;
    breakpoints: {
        mode: string;
        settings: object;
        enabled: string[];
    };
    states: {
        enabled: string[];
    };
};
export declare function generateStyles(settings: UserSettings): string;
export declare function getUserSettings(dataset: {
    [key: string]: string;
}): UserSettings;
export {};
