/* 
 * Copyright 2021 Zindex Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type UserSettings = {
    enabled: boolean,
    generate: boolean,
    constructable: boolean,
    cache: string|null,
    cacheKey: string,
    breakpoints: {mode: string, settings: object, enabled: string[]},
    states: {enabled: string[]}
    scopes: string[]
};
type StyleType = string|{[key: string]: string};
const regex = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;

export const HASH_VAR_PREFIX = '--x-';

export function getUserSettings(dataset: {[key: string]: string}): UserSettings {
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const generate = dataset.generate === undefined ? true : dataset.generate === 'true';
    const constructable = dataset.constructable === undefined ? true : dataset.constructable === 'true';
    const mode = dataset.mode || 'desktop-first';
    const isDesktopFirst = mode === "desktop-first";
    const cache = dataset.cache === undefined ? null : dataset.cache;
    const cacheKey = dataset.cacheKey === undefined ? "opis-assembler-cache" : dataset.cacheKey;
    const dataScopes = dataset.scopes === undefined ? [] : getStringItemList(dataset.scopes);
    const scopes = ["", "placeholder", "before", "after", "first-letter", "first-line",
        "l1", "l2", "sibling", "child", "dark", "light", "text-clip"];

    for (let i = 0, l = dataScopes.length; i < l; i++) {
        const scope = dataScopes[i];
        if (scopes.indexOf(scope) < 0) {
            scopes.push(scope);
        }
    }

    // Consider all bp
    let breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

    if (isDesktopFirst) {
        // handle desktop-first - no xl, reverse
        breakpoints.pop();
        breakpoints.reverse();
    } else {
        // handle mobile-first - no xs
        breakpoints.shift();
    }

    if (dataset.breakpoints) {
        const allowed = getStringItemList(dataset.breakpoints.toLowerCase());
        if (allowed.length) {
            breakpoints = breakpoints.filter(v => allowed.indexOf(v) !== -1);
        } else {
            breakpoints = [];
        }
    }

    // Add all
    breakpoints.unshift('all');

    const states = dataset.states === undefined
        ? ["normal", "hover"]
        : getStringItemList(dataset.states.toLowerCase());
    if (states.indexOf("normal") === -1) {
        // always add normal state
        states.unshift("normal");
    }

    const xs = dataset.breakpointXs || "512px";
    const sm = dataset.breakpointSm || (isDesktopFirst ? "768px" : "512px");
    const md = dataset.breakpointMd || (isDesktopFirst ? "1024px" : "768px");
    const lg = dataset.breakpointLg || (isDesktopFirst ? "1280px" : "1024px");
    const xl = dataset.breakpointXl || "1280px";


    return  {
        enabled,
        generate,
        constructable,
        cache,
        cacheKey,
        scopes,
        breakpoints: {
            mode,
            settings: {xs, sm, md, lg, xl},
            enabled: breakpoints,
        },
        states: {
            enabled: states
        }
    };
}

export function style(...styles: (StyleType|StyleType[])[]): string {
    let str = [];


    for (const item of styles) {
        if (typeof item === 'string') {
            str.push(item.trim());
        } else if (Array.isArray(item)) {
            str.push(style(...item));
        } else {
            for (const key in item) {
                const itemValue = item[key];
                if (itemValue === undefined) {
                    continue;
                }
                const property = key.replace(regex, '$1-$2').toLowerCase();
                if (itemValue === null) {
                    str.push(property);
                } else {
                    str.push(property + ':' + itemValue);
                }
            }
        }
    }

    return str.join('; ');
}

function getStringItemList(value: string, unique: boolean = true): string[] {
    const items = value
        .replace(/[,;]/g, ' ')
        .split(/\s\s*/g)
        .map(v => v.trim())
        .filter(v => v !== '');

    if (unique) {
        return items.filter((value, index, self) => self.indexOf(value) === index);
    }

    return items;
}