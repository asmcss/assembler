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
    desktopFirst: boolean,
    breakpoints: string[],
    media: {xs: string, sm: string, md: string, lg:string, xl:string},
    states: string[],
    scopes: string[],
    xStyleAttribute: string,
};
type StyleType = string|{[key: string]: string};
const regex = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;

export const HASH_VAR_PREFIX = '--asm-';
export const HASH_CLASS_PREFIX = 'asm';
export const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?:(?<scope>[-a-zA-Z0-9]+)!)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;

export function getUserSettings(dataset: {[key: string]: string}): UserSettings {
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const generate = dataset.generate === undefined ? false : dataset.generate === 'true';
    const constructable = dataset.constructable === undefined ? true : dataset.constructable === 'true';
    const desktopFirst = dataset.mode === undefined ? false : dataset.mode === 'desktop-first';
    const cache = dataset.cache === undefined ? null : dataset.cache;
    const cacheKey = dataset.cacheKey === undefined ? "assembler-css-cache" : dataset.cacheKey;
    const dataScopes = dataset.scopes === undefined ? [] : getStringItemList(dataset.scopes);
    const scopes = ["", "text-clip", "selection", "placeholder", "before", "after", "first-letter", "first-line",
        "l1", "l2", "marker-l1", "marker", "sibling", "child", "even", "odd", "first", "last", "dark", "light",
        "landscape", "portrait", "motion-reduce", "motion-safe"];

    for (let i = 0, l = dataScopes.length; i < l; i++) {
        const scope = dataScopes[i];
        if (scopes.indexOf(scope) < 0) {
            scopes.push(scope);
        }
    }

    // Consider all bp
    let breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

    if (desktopFirst) {
        // remove xl and reverse
        breakpoints.pop();
        breakpoints.reverse();
    } else {
        // remove xs
        breakpoints.shift();
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
    const sm = dataset.breakpointSm || (desktopFirst ? "768px" : "512px");
    const md = dataset.breakpointMd || (desktopFirst ? "1024px" : "768px");
    const lg = dataset.breakpointLg || (desktopFirst ? "1280px": "1024px");
    const xl = dataset.breakpointXl || ("1280px");

    const xStyleAttribute = dataset.xStyleAttribute || "x-style";

    return  {
        enabled,
        generate,
        constructable,
        cache,
        cacheKey,
        desktopFirst,
        scopes,
        states,
        breakpoints,
        media: {xs, sm, md, lg, xl},
        xStyleAttribute,
    };
}

export function style(item: StyleType|StyleType[]): string {
    if (typeof item === 'string') {
        return item.trim();
    }

    if (Array.isArray(item)) {
        return item.map(style).join(';');
    }

    const list = [];

    for (const key in item) {
        const value = item[key];
        if (value === undefined) {
            continue;
        }
        const property = key.replace(regex, '$1-$2').toLowerCase();
        list.push(value === null ? property : (property + ':' + value));
    }

    return list.join(';');
}

function getStringItemList(value: string, unique: boolean = true): string[] {
    const items = value
        .replace(/[,;]/g, ' ')
        .split(/\s\s*/g)
        .map(trim)
        .filter(nonEmptyString);

    return unique ? items.filter(uniqueItems) : items;
}

export function trim(value: string): string {
    return value.trim();
}

export function nonEmptyString(value: string): boolean {
    return value !== '';
}

export function uniqueItems(value: any, index: number, self: any[]): boolean {
    return self.indexOf(value) === index;
}
