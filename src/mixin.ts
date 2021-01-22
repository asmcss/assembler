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

type Mixin = {name: string, args: string[]};
type MixinCallback = (...args: string[]) => {[key: string]: string}|string;
type StyleType = string|{[key: string]: string};

const mixinRepository: Map<string, MixinCallback> = new Map<string, MixinCallback>();
const regex = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;

mixinRepository.set('mixin', function (...names: string[]): string {
    return names
        .map(name => rootElement.getPropertyValue(name))
        .filter(v => v !== '')
        .join(';');
});

export const APPLY_ATTR = 'x-apply';

export function parseApplyAttribute(value: string|null): string|null {
    if (value == null || value === '') {
        return null;
    }
    const collection = [];
    for (const {name, args} of extractMixins(value)) {
        if (mixinRepository.has(name)) {
            const mixin = mixinRepository.get(name);
            collection.push(mixin(...args));
        }
    }
    return style(collection);
}

export function registerMixin(name: string, callback: MixinCallback) {
    mixinRepository.set(name, callback);
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
                if (!item.hasOwnProperty(key)) {
                    continue;
                }
                const property = key.replace(regex, '$1-$2').toLowerCase();
                if (item[key] == null) {
                    str.push(property);
                } else {
                    str.push(property + ':' + item[key]);
                }
            }
        }
    }

    return str.join('; ');
}

// do not match comma inside parenthesis
// 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
const COMMA_DELIMITED = /\s*,\s*(?![^(]*\))/gm;
function* extractMixins(value: string): Iterable<Mixin> {
    for (let mixin of value.split(';')) {
        mixin = mixin.trim();
        if (mixin === '') {
            continue;
        }
        const pos = mixin.indexOf(':');
        if (pos === -1) {
            yield {name: mixin, args: []};
        } else {
            const name = mixin.substr(0, pos);
            const args = mixin.substr(pos + 1).split(COMMA_DELIMITED).map(v => v.trim());
            yield {name, args};
        }
    }
}

const rootElement = new class {
    private styles: CSSStyleDeclaration = null;

    getComputedStyle(): CSSStyleDeclaration {
        if (this.styles === null) {
            this.styles = window.getComputedStyle(document.documentElement);
        }
        return this.styles;
    }

    getPropertyValue(property: string): string {
        const mixins = window['OPIS_ASSEMBLER_MIXINS'] || {};
        if (mixins.hasOwnProperty(property)) {
            return mixins[property];
        }
        property = '--' + property;
        let value = this.getComputedStyle().getPropertyValue(property).trim();

        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1).trim();
        }

        return value;
    }
};
