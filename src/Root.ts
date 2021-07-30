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

class RootClass {
    private styles: CSSStyleDeclaration[] = null;
    private cache: Map<string, string> = new Map<string, string>();

    constructor() {
        const {cache} = this;
        const tc = '-webkit-background-clip: text !important;-moz-background-clip:text !important;background-clip:text !important;';
        cache.set("text-clip--scope", `$selector {${tc}$body}`);
        cache.set("l1--scope", "$selector > * {$body}");
        cache.set("l2--scope", "$selector > * > * {$body}");
        cache.set("sibling--scope", "$selector > * + * {$body}");
        cache.set("child--scope", "$selector > $class {$body}");

        cache.set("selection--scope", "$selector::selection {$body}");
        cache.set("placeholder--scope", "$selector::placeholder {$body}");

        cache.set("before--scope", "$selector::before {$body}");
        cache.set("after--scope", "$selector::after {$body}");

        cache.set("even--scope", "$selector:nth-child(even) {$body}");
        cache.set("odd--scope", "$selector:nth-child(odd) {$body}");
        cache.set("first--scope", "$selector:first-child {$body}");
        cache.set("last--scope", "$selector:last-child {$body}");

        cache.set("first-letter--scope", "$selector::first-letter {$body}");
        cache.set("first-line--scope", "$selector::first-line {$body}");

        cache.set("dark--scope", "@media(prefers-color-scheme: dark) {$selector {$body}}");
        cache.set("light--scope", "@media(prefers-color-scheme: light) {$selector {$body}}");

        cache.set("landscape--scope", "@media(orientation: landscape) {$selector {$body}}");
        cache.set("portrait--scope", "@media(orientation: portrait) {$selector {$body}}");

        cache.set("motion-reduce--scope", "@media(prefers-reduced-motion: reduce) {$selector {$body}}");
        cache.set("motion-safe--scope", "@media(prefers-reduced-motion: no-preference) {$selector {$body}}");
    }

    private getComputedStyles(): CSSStyleDeclaration[] {
        if (this.styles === null) {
            this.styles = [];
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
                    this.styles.unshift((rule as CSSStyleRule).style);
                }
            }
        }
        return this.styles;
    }

    private getPropertyValueFormComputedStyles(property: string): string {
        for (const style of this.getComputedStyles()) {
            const value = style.getPropertyValue(property);
            if (value !== '') {
                return value;
            }
        }
        return '';
    }

    getPropertyValue(property: string): string {
        if (this.cache.has(property)) {
            return this.cache.get(property);
        }

        const key = property;
        property = '--' + property;
        let value = this.getPropertyValueFormComputedStyles(property).trim();

        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1).trim();
        }

        this.cache.set(key, value);
        return value;
    }
}

export const Root = new RootClass();