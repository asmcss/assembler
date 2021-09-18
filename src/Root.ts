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

const ESCAPE_REGEX = /\\\n/g;
const PROPERTY_REGEX = /^--([a-zA-Z0-9-_]+)--(scope|mixin|register)$/;
const CONFIG_REGEX = /^--assembler-([a-zA-Z0-9-_]+)$/;

class RootClass {
    private cache: Map<string, string> = new Map<string, string>();
    private scopes: string[] = ["", "text-clip", "selection", "placeholder", "before", "after", "first-letter", "first-line",
        "l1", "l2", "marker-l1", "marker", "sibling", "child", "even", "odd", "first", "last", "dark", "light",
        "landscape", "portrait", "motion-reduce", "motion-safe"
    ];
    private registeredProperties: {name: string, aliases:string[]}[] = [];

    constructor() {
        const {cache} = this;
        const tc = '-webkit-background-clip: text !important;-moz-background-clip:text !important;background-clip:text !important;';

        cache.set("--text-clip--scope", `$selector {${tc}}`);
        cache.set("--l1--scope", "$selector > * {$body}");
        cache.set("--l2--scope", "$selector > * > * {$body}");
        cache.set("--sibling--scope", "$selector > * + * {$body}");
        cache.set("--child--scope", "$selector > $class {$body}");


        cache.set("--selection--scope", "$selector::selection {$body}");
        cache.set("--placeholder--scope", "$selector::placeholder {$body}");

        cache.set("--marker--scope", "$selector::marker {$body}");
        cache.set("--marker-l1--scope", "$selector > *::marker {$body}");

        cache.set("--before--scope", "$selector::before {$body}");
        cache.set("--after--scope", "$selector::after {$body}");

        cache.set("--even--scope", "$selector:nth-child(even) {$body}");
        cache.set("--odd--scope", "$selector:nth-child(odd) {$body}");
        cache.set("--first--scope", "$selector:first-child {$body}");
        cache.set("--last--scope", "$selector:last-child {$body}");

        cache.set("--first-letter--scope", "$selector::first-letter {$body}");
        cache.set("--first-line--scope", "$selector::first-line {$body}");

        cache.set("--dark--scope", "@media(prefers-color-scheme: dark) {$selector {$body}}");
        cache.set("--light--scope", "@media(prefers-color-scheme: light) {$selector {$body}}");

        cache.set("--landscape--scope", "@media(orientation: landscape) {$selector {$body}}");
        cache.set("--portrait--scope", "@media(orientation: portrait) {$selector {$body}}");

        cache.set("--motion-reduce--scope", "@media(prefers-reduced-motion: reduce) {$selector {$body}}");
        cache.set("--motion-safe--scope", "@media(prefers-reduced-motion: no-preference) {$selector {$body}}");

        this.initialize();
    }

    private initialize() {
        const {cache, scopes, registeredProperties} = this;
        for (const style of this.getComputedStyles()) {
            for (const property of style) {
                const match = PROPERTY_REGEX.exec(property);
                if (match == null) {
                    continue;
                }
                const name = match[1];
                const value = this.getValue(style, property);
                cache.set(property, value);
                switch (match[2]) {
                    case "scope":
                        if (scopes.indexOf(name) === -1) {
                            scopes.push(name);
                        }
                        break;
                    case "register":
                        if (value === 'true' || value === '') {
                            registeredProperties.push({name, aliases: []});
                        } else {
                            const aliases = value.split(',').map(v => v.trim()).filter(v => v !== '');
                            registeredProperties.push({name, aliases})
                        }
                        break;
                }
            }
        }
    }

    private getComputedStyles(): CSSStyleDeclaration[] {
        const styles = [];
        for (let si = 0, sl = document.styleSheets.length; si < sl; si++) {
            const styleSheet = document.styleSheets[si];
            if (styleSheet.href !== null && styleSheet.href.indexOf(window.location.origin) !== 0) {
                continue;
            }
            if (styleSheet.href === null && styleSheet.ownerNode !== null
                && styleSheet.ownerNode instanceof Element && (styleSheet.ownerNode as Element).id === 'opis-assembler-css') {
                continue;
            }
            const rule = styleSheet.cssRules[0];
            if (rule.type === CSSRule.STYLE_RULE && (rule as CSSStyleRule).selectorText === ':root') {
                styles.push((rule as CSSStyleRule).style);
            }
        }

        return styles;
    }

    private getValue(style: CSSStyleDeclaration, property: string): string {
        let value = style.getPropertyValue(property).replace(ESCAPE_REGEX, "").trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1).trim();
        }
        return value;
    }

    getRegisteredScopes(): string[] {
        return this.scopes;
    }

    getRegisteredProperties(): {name: string, aliases:string[]}[] {
        return this.registeredProperties;
    }

    getPropertyValue(property: string): string {
        if (this.cache.has(property)) {
            return this.cache.get(property);
        }

        return '';
    }
}

export const Root = new RootClass();