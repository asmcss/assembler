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

import {PROPERTY_LIST, MEDIA_LIST, STATE_LIST, PROPERTY_VARIANTS, ALIASES, VALUE_WRAPPER} from "./list";

type PropertyInfo = {entry: string, property: string, name: string, value: string|null};
type UserSettings = {
    enabled: boolean,
    cache: string|null,
    breakpoints: {mode: string, settings: object, enabled: string[]},
    states: {enabled: string[]}
};

const X_ATTR_NAME = '_opis';
const HASH_VAR_PREFIX = '--opis-';
const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
const STYLE_ATTR = "x-style";
const CACHE_KEY = 'opis-assembler-cache';

const observedElements = new WeakMap();

export const domObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
    for (let i = 0, l = mutations.length; i < l; i++) {
        const nodes = mutations[i].addedNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] instanceof HTMLElement) {
                observe(nodes[i] as HTMLElement);
            }
        }
    }
});

const observer = new MutationObserver(function (mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
        if (mutation.attributeName !== STYLE_ATTR) {
            continue;
        }
        const target = mutation.target as HTMLElement;
        const newValue = target.getAttribute(mutation.attributeName);
        handleStyleChange(target, mutation.oldValue, newValue);
    }
});

export function observe(element: HTMLElement, deep: boolean = true): void {
    if (deep) {
        for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
            observe(child as HTMLElement, true);
        }
    }

    if (observedElements.has(element)) {
        return;
    }

    observedElements.set(element, null);

    const style = element.attributes.getNamedItem(STYLE_ATTR);

    if (style) {
        handleStyleChange(element, null, style.value);
    }

    observer.observe(element, {attributes: true, attributeOldValue: true, attributeFilter: [STYLE_ATTR]});
}

function handleStyleChange(element: HTMLElement, oldContent: string|null, content: string|null): void {

    if (content === null) {
        return handleStyleRemoved(element, oldContent);
    }

    const newEntries = getStyleEntries(content);

    // remove old entries
    if (oldContent !== null) {
        for (const {name, property} of getStyleProperties(oldContent)) {
            if (!newEntries.has(name)) {
                element.style.removeProperty(property);
            }
        }
    }

    const opis_attrs = [];

    for (const {property, entry, value} of newEntries.values()) {
        opis_attrs.push(entry);
        element.style.setProperty(property, value);
    }

    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}

function handleStyleRemoved(element: HTMLElement, content: string): void {

    for (const {property} of getStyleProperties(content)) {
        element.style.removeProperty(property);
    }

    element.removeAttribute(X_ATTR_NAME);
}

export function extract(attr: string, value: string|null = null): PropertyInfo[] {
    const m = PROPERTY_REGEX.exec(attr)?.groups;

    if (!m || !m.property) {
        return [];
    }

    const media = MEDIA_LIST.indexOf(m.media || 'all');
    const state = STATE_LIST.indexOf(m.state || 'normal');

    if (media < 0 || state < 0) {
        return [];
    }

    let properties: string|string[] = m.property;
    const original = properties;

    if (ALIASES.hasOwnProperty(properties)) {
        properties = ALIASES[properties];
    }

    if (!Array.isArray(properties)) {
        properties = [properties];
    }

    if (value !== null) {
        if (VALUE_WRAPPER.hasOwnProperty(original)) {
            value = VALUE_WRAPPER[original](value, original, media, state);
        }
        value = value.replace(VAR_REGEX, "var(--$1)");
    }

    const result = [];
    const base = STATE_LIST.length;

    for (const property of properties) {
        const name = PROPERTY_LIST.indexOf(property);

        if (name < 0) {
            continue;
        }

        const hash = (((name * base) + media) * base + state).toString(16);

        result.push({
            name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
            property: HASH_VAR_PREFIX + hash,
            entry: 'x' + hash,
            value,
        });
    }

    return result;
}

export function getStyleEntries(content: string, resolve: boolean = true): Map<string, PropertyInfo> {
    const entries = new Map<string, PropertyInfo>();

    const attrs = content.split(';');

    for (let name of attrs) {
        if (name.indexOf(':') < 0) {
            continue;
        }

        const p = name.split(':');

        name = p.shift().trim();

        const value = resolve ? p.join(':') : null;

        for (const info of extract(name, value)) {
            entries.set(info.name, info);
        }
    }

    return entries;
}

export function generateStyles(settings: UserSettings): string {
    let content: string|null = null;


    if (settings.cache) {
        content = localStorage.getItem(CACHE_KEY + ':' + settings.cache);

        if (content !== null) {
            return content;
        }

        const oldCacheKey = localStorage.getItem(CACHE_KEY);

        if (oldCacheKey !== null) {
            localStorage.removeItem(CACHE_KEY + ':' + oldCacheKey);
        }

        localStorage.setItem(CACHE_KEY, settings.cache);
    } else {
        const oldCacheKey = localStorage.getItem(CACHE_KEY);
        if (oldCacheKey !== null) {
            localStorage.removeItem(CACHE_KEY + ':' + oldCacheKey);
            localStorage.removeItem(CACHE_KEY);
        }
    }

    const base = STATE_LIST.length, result = [];
    const breakpoints = settings.breakpoints.enabled;
    const media_settings = settings.breakpoints.settings;
    const desktop = settings.breakpoints.mode === "desktop-first";
    const states = settings.states.enabled;

    for (const bp of breakpoints) {
        const media_index = MEDIA_LIST.indexOf(bp);

        if (media_index < 0) {
            continue;
        }

        let str = '';

        if (media_index !== 0) {
            if (desktop) {
                str += `@media only screen and (max-width: ${media_settings[bp]}) {`;
            } else {
                str += `@media only screen and (min-width: ${media_settings[bp]}) {`;
            }
        }

        for (let name_index = 0, l = PROPERTY_LIST.length; name_index < l; name_index++) {
            const name = PROPERTY_LIST[name_index];
            for (const state of states) {
                const state_index = STATE_LIST.indexOf(state);
                if (state_index < 0) {
                    continue;
                }

                const hash = (((name_index * base) + media_index) * base + state_index).toString(16);
                let variants = PROPERTY_VARIANTS[name], prefix = '';
                if (variants) {
                    for (let i = 0, l = variants.length; i < l; i++) {
                        prefix += `${variants[i]}:var(${HASH_VAR_PREFIX}${hash}) !important;`;
                    }
                }

                str += `[${X_ATTR_NAME}~=x${hash}]${state_index > 0 ? ':' + state : ''}{${prefix}${name}:var(${HASH_VAR_PREFIX}${hash}) !important}`;
            }
        }

        if (media_index !== 0) {
            str += '}';
        }
        result.push(str);
    }

    content = result.join('');

    if (settings.cache) {
        localStorage.setItem('opis-assembler-cache', settings.cache);
        localStorage.setItem('opis-assembler-cache:' + settings.cache, content);
    }

    return content;
}

export function* getStyleProperties(content: string): Iterable<{property: string, name: string}> {
    const base = STATE_LIST.length;

    for (let attr of content.split(';')) {
        const pos = attr.indexOf(':');
        if (pos < 0) {
            continue;
        }

        attr = attr.substr(0, pos).trim();

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
        }

        if (!Array.isArray(properties)) {
            properties = [properties];
        }

        for (const property of properties) {
            const name = PROPERTY_LIST.indexOf(property);

            if (name < 0) {
                continue;
            }

            const hash = (((name * base) + media) * base + state).toString(16);


            yield {
                name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                property: HASH_VAR_PREFIX + hash,
            };
        }
    }
}

export function getUserSettings(dataset: {[key: string]: string}): UserSettings {
    //const generate = dataset.generate === undefined ? true : dataset.generate === 'true';
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const mode = dataset.mode || 'desktop-first';
    const isDesktopFirst = mode === "desktop-first";
    const cache = dataset.cache === undefined ? null : dataset.cache;

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
        ? ["normal", "hover", "focus", "active", "disabled"]
        : getStringItemList(dataset.states.toLowerCase());

    const xs = dataset.breakpointXs || (isDesktopFirst ? "512px" : "0px");
    const sm = dataset.breakpointSm || (isDesktopFirst ? "768px" : "512px");
    const md = dataset.breakpointMd || (isDesktopFirst ? "1024px" : "768px");
    const lg = dataset.breakpointLg || (isDesktopFirst ? "1280px" : "1024");
    const xl = dataset.breakpointXl || "1280px";


    return  {
        enabled,
        //generate,
        cache,
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
