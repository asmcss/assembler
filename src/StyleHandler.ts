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

import {ALIASES, DEFAULT_VALUES, PROPERTY_LIST, PROPERTY_VARIANTS, STATE_LIST, VALUE_WRAPPER} from "./list";
import {HASH_VAR_PREFIX, PROPERTY_REGEX, HASH_CLASS_PREFIX, trim} from "./helpers";
import {Root} from "./Root";
import type {UserSettings} from "./helpers";
import {resolveMixin} from "./mixins";

type PropertyInfo = {
    entry: string,
    property: string,
    cssProperty: string,
    media: string,
    state: string,
    name: string,
    value: string|null,
    hash: string,
    scope: string,
    rank: number
};

type AssemblerEntry = {
    n: string, //name
    p: string, //property
    e: string, //class|entry
}

const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
const REPLACE_REGEX = /\$(selector|body|class|value|property|state|variants|var)/g;
const SPLIT_REGEX = /(?<!\\);/;
const MIXIN_PREFIX = '^';

// do not match comma inside parenthesis
// 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
const COMMA_DELIMITED = /\s*,\s*(?![^(]*\))/gm;

export default class StyleHandler {
    readonly style: CSSStyleSheet;
    private readonly settings: UserSettings;
    private tracker: Set<string>;
    private mediaSettings: object;
    private desktopFirst: boolean;
    private readonly breakpoints: string[];
    private rules: number[];
    private readonly padding: number;

    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Set<string>) {
        this.style = style;
        this.settings = settings;
        this.tracker = tracker;
        this.mediaSettings = settings.media;
        this.desktopFirst = settings.desktopFirst;
        this.breakpoints = settings.breakpoints;
        this.rules = [];
        this.padding = style.cssRules.length;
    }

    get userSettings(): UserSettings {
        return this.settings;
    }

    handleStyleChange(element: HTMLElement, content: string|null, old: AssemblerEntry[]): AssemblerEntry[] {

        if (content === null) {
            return this.handleStyleRemoved(element, old);
        }

        const newEntries = this.getStyleEntries(content);
        const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];
        const assemblerEntries: AssemblerEntry[] = [];

        // remove old entries
        for (const {n:name, p:property, e:entry} of old) {
            if (!newEntries.has(name)) {
                const index = classList.indexOf(entry);
                if (index >= 0) {
                    classList.splice(index, 1);
                }
                element.style.removeProperty(property);
            }
        }

        for (const info of newEntries.values()) {
            const {entry, property, hash, value, name} = info;
            const index = classList.indexOf(entry);
            if (index < 0) {
                classList.push(entry);
            }
            if (!this.tracker.has(hash)) {
                this.generateCSS(info);
            }
            element.style.setProperty(property, value);
            assemblerEntries.push({e:entry, n: name, p: property});
        }

        element.setAttribute('class', classList.join(' '));

        return assemblerEntries;
    }

    handleStyleRemoved(element: HTMLElement, old: AssemblerEntry[]): AssemblerEntry[] {

        const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];

        for (const {p:property, e:entry} of old) {
            const index = classList.indexOf(entry);
            if (index >= 0) {
                classList.splice(index, 1);
            }
            element.style.removeProperty(property);
        }

        element.setAttribute('class', classList.join(' '));

        return [];
    }

    private extract(attr: string, value: string|string[]|null = null): PropertyInfo[] {
        const m = PROPERTY_REGEX.exec(attr)?.groups;

        if (!m || !m.property) {
            return [];
        }

        const MEDIA_LIST = this.breakpoints;

        const media = MEDIA_LIST.indexOf(m.media || 'all');
        const state = STATE_LIST.indexOf(m.state || 'normal');

        if (media < 0 || state < 0) {
            return [];
        }

        let properties: string|string[] = m.property;
        const original = properties;
        const scopes = this.settings.scopes;

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

            const scope = m.scope || '';
            const rank = ((name * base) + media) * base + state;
            const hash = rank.toString(16) + (scope ? `-${scope}` : '');
            const scopeRank = scopes.indexOf(scope) * 100000;
            const internalProperty = (m.media ? m.media + '--' : '') + (scope ? scope + '__' : '') + property + (m.state ? '__' + m.state : '');

            result.push({
                name: (m.media ? m.media + '|' : '') + (scope ? scope + '!' : '') + property + (m.state ? '.' + m.state : ''),
                //property: HASH_VAR_PREFIX + hash,
                property: HASH_VAR_PREFIX + internalProperty,
                entry: HASH_CLASS_PREFIX + '#' + hash,
                value: value[index],
                media: m.media || '',
                state: m.state || '',
                cssProperty: property,
                hash,
                scope,
                rank: scopeRank < 0 ? -1 : rank + scopeRank,
            });
        }

        return result;
    }

    private getStyleEntries(content: string): Map<string, PropertyInfo> {
        const entries = new Map<string, PropertyInfo>();

        for (let name of this.getResolvedProperties(content)) {
            let value = null;
            const pos = name.indexOf(':');

            if (pos >= 0) {
                value = name.substr(pos + 1);
                name = name.substr(0, pos).trim();
            }

            for (const info of this.extract(name, value)) {
                entries.set(info.name, info);
            }
        }

        return entries;
    }

    private getResolvedProperties(content: string, stack: string[] = []): string[] {
        const entries = [];
        for (let name of content.split(SPLIT_REGEX)) {
            name = name.trim();
            if (name === '') {
                continue;
            }
            // extract mixin
            if (name.startsWith(MIXIN_PREFIX)) {
                const pos = name.indexOf(':');
                let mixin, args;

                if (pos < 0) {
                    mixin = name.substr(1);
                    args = [];
                } else {
                    mixin = name.substr(1, pos - 1);
                    args = name.substr(pos + 1).split(COMMA_DELIMITED).map(trim);
                }

                if (stack.indexOf(mixin) >= 0) {
                    stack.push(mixin);
                    throw new Error('Recursive mixin detected: ' + stack.join('->'));
                }

                stack.push(mixin);
                entries.push(...this.getResolvedProperties(resolveMixin(this.settings, mixin, args), stack))
                stack.pop();

                continue;
            }

            entries.push(name);
        }

        return entries;
    }

    private generateCSS(info: PropertyInfo): void {
        const {tracker, mediaSettings, desktopFirst, style} = this;
        const {hash, media, state, cssProperty, property, scope, rank} = info;
        const hasMedia = media !== '';

        tracker.add(hash);

        if (rank < 0) {
            return;
        }

        let rule = '';

        if (hasMedia) {
            if (desktopFirst) {
                rule += `@media only screen and (max-width: ${mediaSettings[media]}) {`;
            } else {
                rule += `@media only screen and (min-width: ${mediaSettings[media]}) {`;
            }
        }

        let variants = PROPERTY_VARIANTS[cssProperty], prefix = '';

        if (variants) {
            for (let i = 0, l = variants.length; i < l; i++) {
                prefix += `${variants[i]}:var(${property}) !important;`;
            }
        }

        if (scope) {
            const scopeValue = Root.getPropertyValue(scope + '--scope')
            if (scopeValue === '') {
                return;
            }
            rule += scopeValue.replace(REPLACE_REGEX, (match, p1) => {
                switch (p1) {
                    case "selector":
                        return `.${HASH_CLASS_PREFIX}\\#${hash}${state ? ':' + state : ''}`;
                    case "body":
                        return prefix + cssProperty + ': var(' + property + ') !important';
                    case "variants":
                        return prefix;
                    case "property":
                        return cssProperty;
                    case "value":
                        return `var(${property})`;
                    case "class":
                        return `.${HASH_CLASS_PREFIX}\\#${hash}`;
                    case "state":
                        return state ? ':' + state : '';
                    case "var":
                        return property;
                }
                return p1;
            });
        } else {
            rule += `.${HASH_CLASS_PREFIX}\\#${hash}${state ? ':' + state : ''}{${prefix}${cssProperty}: var(${property}) !important}`;
        }

        if (hasMedia) {
            rule += '}'
        }

        const ruleIndex = this.getRuleIndex(rank);
        this.rules.splice(ruleIndex, 0, rank);

        try {
            style.insertRule(rule, this.padding + ruleIndex);
        } catch {
            this.rules.splice(ruleIndex, 1);
            console.warn("Unsupported rule:", rule);
        }
    }

    private getRuleIndex(rank: number): number {
        const {rules} = this;
        for (let i = 0, l = rules.length; i < l; i++) {
            if (rank < rules[i]) {
                return i;
            }
        }
        return rules.length;
    }
}