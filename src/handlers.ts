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

import {ALIASES, DEFAULT_VALUES, MEDIA_LIST, PROPERTY_LIST, STATE_LIST, VALUE_WRAPPER} from "./list";

type PropertyInfo = {entry: string, property: string, name: string, value: string|null};

export const X_ATTR_NAME = '_opis';
export const HASH_VAR_PREFIX = '--opis-';
export const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
export const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
export const STYLE_ATTR = "x-style";

export function handleStyleChange(element: HTMLElement, oldContent: string|null, content: string|null): void {

    if (content === null) {
        return handleStyleRemoved(element, oldContent);
    }

    const newEntries = getStyleEntries(content);
    const opis_attrs = element.hasAttribute(X_ATTR_NAME) ? element.getAttribute(X_ATTR_NAME).split(' ') : [];

    // remove old entries
    if (oldContent !== null) {
        for (const {name, property, entry} of getStyleProperties(oldContent)) {
            if (!newEntries.has(name)) {
                const index = opis_attrs.indexOf(entry);
                if (index >= 0) {
                    opis_attrs.splice(index, 1);
                }
                element.style.removeProperty(property);
            }
        }
    }

    for (const {property, entry, value} of newEntries.values()) {
        const index = opis_attrs.indexOf(entry);
        if (index < 0) {
            opis_attrs.push(entry);
        }
        element.style.setProperty(property, value);
    }

    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}

export function handleStyleRemoved(element: HTMLElement, content: string): void {

    for (const {property} of getStyleProperties(content)) {
        element.style.removeProperty(property);
    }

    element.removeAttribute(X_ATTR_NAME);
}

export function extract(attr: string, value: string|string[]|null = null): PropertyInfo[] {
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
        if (typeof properties === 'function') {
            properties = (properties as (a: string|null) => string[])(value as string|null);
        }
    }

    if (!Array.isArray(properties)) {
        properties = [properties];
    }

    if (value === null) {
        value = DEFAULT_VALUES[original] || '';
    }
    if (VALUE_WRAPPER.hasOwnProperty(original)) {
        value = VALUE_WRAPPER[original](value, original, media, state);
    }
    if (!Array.isArray(value)) {
        value = Array(properties.length).fill(value.replace(VAR_REGEX, "var(--$1)"));
    } else {
        value = value.map(value => value.replace(VAR_REGEX, "var(--$1)"));
    }

    const result = [];
    const base = STATE_LIST.length;

    let index = -1;
    for (const property of properties) {
        index++;
        const name = PROPERTY_LIST.indexOf(property);

        if (name < 0) {
            continue;
        }

        const hash = (((name * base) + media) * base + state).toString(16);

        result.push({
            name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
            property: HASH_VAR_PREFIX + hash,
            entry: 'x' + hash,
            value: value[index],
        });
    }

    return result;
}

export function getStyleEntries(content: string, resolve: boolean = true): Map<string, PropertyInfo> {
    const entries = new Map<string, PropertyInfo>();

    const attrs = content.split(';');

    for (let name of attrs) {
        let value = null;

        if (name.indexOf(':') > 0) {
            const p = name.split(':');
            name = p.shift().trim();
            value = resolve ? p.join(':') : null;
        } else {
            name = name.trim();
        }

        for (const info of extract(name, value)) {
            entries.set(info.name, info);
        }
    }

    return entries;
}

export function* getStyleProperties(content: string): Iterable<{property: string, name: string, entry: string}> {
    const base = STATE_LIST.length;

    for (let attr of content.split(';')) {
        let value = null;
        const pos = attr.indexOf(':');
        if (pos < 0) {
            attr = attr.trim();
        } else {
            const p = attr.split(':');
            attr = p.shift().trim();
            value = p.join(':');
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

            const hash = (((name * base) + media) * base + state).toString(16);


            yield {
                name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                property: HASH_VAR_PREFIX + hash,
                entry: 'x' + hash
            };
        }
    }
}