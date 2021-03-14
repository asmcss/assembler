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

import {ALIASES, MEDIA_LIST, PROPERTY_LIST, STATE_LIST} from "./list";

export type UserSettings = {
    enabled: boolean,
    generate: boolean,
    constructable: boolean,
    cache: string|null,
    cacheKey: string,
    breakpoints: string[],
    media: {sm: string, md: string, lg:string, xl:string},
    states: string[],
    scopes: string[]
};
type StyleType = string|{[key: string]: string};
const regex = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;

export const HASH_VAR_PREFIX = '--x-';
export const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?:(?<scope>[-a-zA-Z0-9]+)!)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;

export function getUserSettings(dataset: {[key: string]: string}): UserSettings {
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const generate = dataset.generate === undefined ? false : dataset.generate === 'true';
    const constructable = dataset.constructable === undefined ? true : dataset.constructable === 'true';
    const cache = dataset.cache === undefined ? null : dataset.cache;
    const cacheKey = dataset.cacheKey === undefined ? "opis-assembler-cache" : dataset.cacheKey;
    const dataScopes = dataset.scopes === undefined ? [] : getStringItemList(dataset.scopes);
    const scopes = ["", "text-clip", "selection", "placeholder", "before", "after", "first-letter", "first-line",
        "l1", "l2", "sibling", "child", "even", "odd", "first", "last", "dark", "light", "landscape", "portrait", "motion-reduce", "motion-safe"];

    for (let i = 0, l = dataScopes.length; i < l; i++) {
        const scope = dataScopes[i];
        if (scopes.indexOf(scope) < 0) {
            scopes.push(scope);
        }
    }

    // Consider all bp
    let breakpoints = ['sm', 'md', 'lg', 'xl'];

    // Add all
    breakpoints.unshift('all');

    const states = dataset.states === undefined
        ? ["normal", "hover"]
        : getStringItemList(dataset.states.toLowerCase());
    if (states.indexOf("normal") === -1) {
        // always add normal state
        states.unshift("normal");
    }

    const sm = dataset.breakpointSm || "512px";
    const md = dataset.breakpointMd || "768px";
    const lg = dataset.breakpointLg || "1024px";
    const xl = dataset.breakpointXl || "1280px";


    return  {
        enabled,
        generate,
        constructable,
        cache,
        cacheKey,
        scopes,
        states,
        breakpoints,
        media: {sm, md, lg, xl},
    };
}

export function * getStyleProperties(content: string): Iterable<{property: string, name: string, entry: string}> {
    const base = STATE_LIST.length;

    for (let attr of content.split(';')) {
        let value = null;
        const pos = attr.indexOf(':');
        if (pos < 0) {
            attr = attr.trim();
        } else {
            value = attr.substr(pos + 1);
            attr = attr.substr(0, pos).trim();
        }

        const m = PROPERTY_REGEX.exec(attr)?.groups;

        if (!m || !m.property) {
            continue;
        }

        const media = MEDIA_LIST.indexOf(m.media || 'all');
        const state = STATE_LIST.indexOf(m.state || 'normal');

        if (media < 0 || state < 0) {
            continue;
        }

        let properties: string|string[] = m.property;

        if (ALIASES.hasOwnProperty(properties)) {
            properties = ALIASES[properties];
            if (typeof properties === 'function') {
                properties = (properties as (a: string|null) => string[])(value as string|null);
            }
        }

        if (!Array.isArray(properties)) {
            properties = [properties];
        }

        for (const property of properties) {
            const name = PROPERTY_LIST.indexOf(property);

            if (name < 0) {
                continue;
            }

            const scope = m.scope || '';
            const hash = (((name * base) + media) * base + state).toString(16) + (scope ? `-${scope}` : '');


            yield {
                name: (m.media ? m.media + '|' : '') + (scope ? scope + '!' : '') + property + (m.state ? '.' + m.state : ''),
                property: HASH_VAR_PREFIX + hash,
                entry: 'x#' + hash,
            };
        }
    }
}

export function getClasses(content: string): string {
    const result = [];
    for (const {entry} of getStyleProperties(content)) {
        result.push(entry);
    }
    return result.join(' ');
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