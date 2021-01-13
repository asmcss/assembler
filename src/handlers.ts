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

import {ALIASES, MEDIA_LIST, PROPERTY_LIST, STATE_LIST, VALUE_WRAPPER} from "./list";

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

export function handleStyleRemoved(element: HTMLElement, content: string): void {

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