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

import {handleStyleChange} from "./handlers";

type Mixin = {name: string, args: string[]};
type MixinCallback = (...args: string[]) => {[key: string]: string};
type StyleType = string|{[key: string]: string};

const mixinRepository: Map<string, MixinCallback> = new Map<string, MixinCallback>();

export const APPLY_ATTR = 'x-apply';

export function handleApplyAttribute(element: HTMLElement, value: string|null) {
    if (value === null) {
        return;
    }
    const collection = [];
    for (const {name, args} of extractMixins(value).values()) {
        if (mixinRepository.has(name)) {
            const mixin = mixinRepository.get(name);
            collection.push(mixin(...args));
        }
    }
    handleStyleChange(element, null, style(collection));
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
                if (item.hasOwnProperty(key)) {
                    str.push(key + ':' + item[key]);
                }
            }
        }
    }

    return str.join('; ');
}

function extractMixins(value: string): Map<string, Mixin> {
    const mixins = new Map<string, Mixin>();
    const values = value.split(';').map(v => v.trim());

    for (let i = 0, l = values.length; i < l; i++) {
        const mixin = values[i];
        if (mixin.indexOf(':') < 0) {
            mixins.set(mixin, {name: mixin, args: []});
        } else {
            const p = mixin.split(':');
            const name = p.shift();
            const args = p.join(':').split(',').map(v => v.trim());
            mixins.set(name, {name, args});
        }
    }

    return mixins;
}