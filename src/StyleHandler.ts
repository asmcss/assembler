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

import {ALIASES, DEFAULT_VALUES, MEDIA_LIST, PROPERTY_LIST, PROPERTY_VARIANTS, STATE_LIST, VALUE_WRAPPER} from "./list";
import {UserSettings, HASH_VAR_PREFIX} from "./helpers";
import {Root} from "./Root";

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


const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
const REPLACE_REGEX = /\$(selector|body|class|value|property|state|variants|var)/g;
const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?:(?<scope>[-a-zA-Z0-9]+)!)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;

export default class StyleHandler {
    private style: CSSStyleSheet;
    private settings: UserSettings;
    private tracker: Map<string, boolean>;
    private mediaSettings: object;
    private desktopMode: boolean;
    private rules: number[];
    private readonly padding: number;

    constructor(settings: UserSettings, style: CSSStyleSheet, tracker: Map<string, boolean>) {
        this.style = style;
        this.settings = settings;
        this.tracker = tracker;
        this.mediaSettings = settings.breakpoints.settings;
        this.desktopMode = settings.breakpoints.mode === "desktop-first";
        this.rules = [];
        this.padding = style.cssRules.length;
    }

    get userSettings(): UserSettings {
        return this.settings;
    }

    handleStyleChange(element: HTMLElement, oldContent: string|null, content: string|null): void {

        if (content === null) {
            return this.handleStyleRemoved(element, oldContent);
        }

        const newEntries = this.getStyleEntries(content);
        const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];

        // remove old entries
        if (oldContent !== null) {
            for (const {name, property, entry} of this.getStyleProperties(oldContent)) {
                if (!newEntries.has(name)) {
                    const index = classList.indexOf(entry);
                    if (index >= 0) {
                        classList.splice(index, 1);
                    }
                    element.style.removeProperty(property);
                }
            }
        }

        for (const info of newEntries.values()) {
            const {entry, property, hash, value} = info;
            const index = classList.indexOf(entry);
            if (index < 0) {
                classList.push(entry);
            }
            if (!this.tracker.has(hash)) {
                this.generateCSS(info);
            }
            element.style.setProperty(property, value);
        }

        element.setAttribute('class', classList.join(' '));
    }

    handleStyleRemoved(element: HTMLElement, content: string): void {

        const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];

        for (const {property, entry} of this.getStyleProperties(content)) {
            const index = classList.indexOf(entry);
            if (index >= 0) {
                classList.splice(index, 1);
            }
            element.style.removeProperty(property);
        }

        element.setAttribute('class', classList.join(' '));
    }

    private extract(attr: string, value: string|string[]|null = null): PropertyInfo[] {
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

            result.push({
                name: (m.media ? m.media + '|' : '') + (scope ? scope + '!' : '') + property + (m.state ? '.' + m.state : ''),
                property: HASH_VAR_PREFIX + hash,
                entry: 'x#' + hash,
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

    private getStyleEntries(content: string, resolve: boolean = true): Map<string, PropertyInfo> {
        const entries = new Map<string, PropertyInfo>();

        for (let name of content.split(';')) {
            name = name.trim();
            if (name === '') {
                continue;
            }

            let value = null;

            const pos = name.indexOf(':');
            if (pos < 0) {
                name = name.trim();
            } else {
                value = resolve ? name.substr(pos + 1) : null;
                name = name.substr(0, pos).trim();
            }

            for (const info of this.extract(name, value)) {
                entries.set(info.name, info);
            }
        }

        return entries;
    }

    private * getStyleProperties(content: string): Iterable<{property: string, name: string, entry: string}> {
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

                const hash = (((name * base) + media) * base + state).toString(16);


                yield {
                    name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                    property: HASH_VAR_PREFIX + hash,
                    entry: 'x#' + hash,
                };
            }
        }
    }

    private generateCSS(info: PropertyInfo) {
        const {tracker, mediaSettings, desktopMode, style} = this;
        const {hash, media, state, cssProperty, property, scope, rank} = info;
        const hasMedia = media !== '';

        tracker.set(hash, true);

        if (rank < 0) {
            return;
        }

        let rule = '';

        if (hasMedia) {
            if (desktopMode) {
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
                        return `.x\\#${hash}${state ? ':' + state : ''}`;
                    case "body":
                        return prefix + cssProperty + ': var(' + property + ') !important';
                    case "variants":
                        return prefix;
                    case "property":
                        return cssProperty;
                    case "value":
                        return `var(${property})`;
                    case "class":
                        return `.x\\${hash}`;
                    case "state":
                        return state ? ':' + state : '';
                    case "var":
                        return property;
                }
                return p1;
            });
        } else {
            rule += `.x\\#${hash}${state ? ':' + state : ''}{${prefix}${cssProperty}: var(${property}) !important}`;
        }

        if (hasMedia) {
            rule += '}'
        }
        const ruleIndex = this.getRuleIndex(rank);
        this.rules.splice(ruleIndex, 0, rank);
        try {
            style.insertRule(rule, this.padding + ruleIndex);
        } catch {
            console.log("Unsupported rule:", rule);
            this.rules.splice(ruleIndex, 1);
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