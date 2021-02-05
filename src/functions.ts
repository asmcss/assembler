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

import {style, UserSettings} from "./helpers";
import {Root} from "./Root";

type UserFunction = {name: string, args: string[]};
type UserFunctionCallback = (settings: UserSettings, ...args: string[]) => {[key: string]: string}|string;
const functionRepository: Map<string, UserFunctionCallback> = new Map<string, UserFunctionCallback>();

functionRepository.set('mixin', function (settings: UserSettings, ...names: string[]): string {
    return names
        .map(name => Root.getPropertyValue(name + '--mixin'))
        .filter(v => v !== '')
        .join(';');
});

functionRepository.set('space-x', function (settings: UserSettings, ...args: string[]): string {
    const space = args[0] || '0';
    if (args[1] === 'true') return `sibling!mr:${space}`;
    return `sibling!ml:${space}`;
});

functionRepository.set('space-y', function (settings: UserSettings, ...args: string[]): string {
    const space = args[0] || '0';
    if (args[1] === 'true') return `sibling!mb:${space}`;
    return `sibling!mt:${space}`;
});

functionRepository.set('grid', function (settings: UserSettings, ...args: string[]): string {
    return 'grid; l1!wb:break-all; l2!max-w:100%; child!justify-self:normal; child!align-self:normal';
});

functionRepository.set('stack', function (settings: UserSettings, ...args: string[]): string {
    return 'grid; grid-cols:minmax(0,1fr); grid-rows:minmax(0,1fr); grid-template-areas:"stackarea"; l1!grid-area:stackarea; w:100%; h:100%';
});

functionRepository.set('sr-only', function (settings: UserSettings, ...args: string[]): string {
    if ((args[0] || 'true') !== 'true') {
        return 'static; w:auto; h:auto; p:0; m:0; ws:normal; overflow:visible; clip:auto';
    }
    return 'absolute; w:1px; h:1px; p:0; m:-1px; ws:nowrap; border-width:0; overflow:hidden; clip:rect(0, 0, 0, 0)';
});

functionRepository.set('container', function (settings: UserSettings, ...args: string[]): string {
    const {mode, settings: bp} = settings.breakpoints;
    return `px: 1rem; mx:auto; max-w:${mode === 'desktop-first' ? bp['xl'] : '100%' }; sm|max-w:${bp['sm']}; md|max-w:${bp['md']}; lg|max-w:${bp['lg']}`;
});

export function parseApplyAttribute(settings: UserSettings, value: string|null): string|null {
    if (value == null || value === '') {
        return null;
    }
    const collection = [];
    for (const {name, args} of extractFunctions(value)) {
        if (functionRepository.has(name)) {
            const callback = functionRepository.get(name);
            collection.push(callback(settings, ...args));
        }
    }
    return style(collection);
}

export function registerFunction(name: string, callback: UserFunctionCallback) {
    functionRepository.set(name, callback);
}

// do not match comma inside parenthesis
// 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
const COMMA_DELIMITED = /\s*,\s*(?![^(]*\))/gm;
function* extractFunctions(value: string): Iterable<UserFunction> {
    for (let userFunction of value.split(';')) {
        userFunction = userFunction.trim();
        if (userFunction === '') {
            continue;
        }
        const pos = userFunction.indexOf(':');
        if (pos === -1) {
            yield {name: userFunction, args: []};
        } else {
            const name = userFunction.substr(0, pos);
            const args = userFunction.substr(pos + 1).split(COMMA_DELIMITED).map(v => v.trim());
            yield {name, args};
        }
    }
}
