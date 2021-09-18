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

import {style} from "./helpers";
import {Root} from "./Root";
import type {UserSettings} from "./helpers";

type UserFunctionCallbackResult = {[key: string]: string}|string;
type UserFunctionCallback =
    (() => UserFunctionCallbackResult) |
    ((settings: UserSettings) => UserFunctionCallbackResult) |
    ((settings: UserSettings, ...args: string[]) => UserFunctionCallbackResult);
const mixinRepository: Map<string, UserFunctionCallback> = new Map<string, UserFunctionCallback>();
const MIXIN_ARGS_REGEX = /\${([0-9]+)(?:=([^}]+))?}/g;

const defaultMixinHandler = (name: string, args: string[]): string => {
    return Root.getPropertyValue('--' + name + '--mixin')
        .replace(MIXIN_ARGS_REGEX, (match, arg, fallback) => args[parseInt(arg)] || fallback || '');
};

mixinRepository.set('space-x', function (_: UserSettings, space?: string, right?: string): string {
    return right === 'true' ? `sibling!mr:${space || '0'}` : `sibling!ml:${space || '0'}`;
});

mixinRepository.set('space-y', function (_: UserSettings, space?: string, bottom?: string): string {
    return bottom === 'true' ? `sibling!mb:${space || '0'}` : `sibling!mt:${space || '0'}`;
});

mixinRepository.set('grid', function (): string {
    return 'grid; l1!wb:break-all; l2!max-w:100%; child!justify-self:normal; child!align-self:normal';
});

mixinRepository.set('stack', function (): string {
    return `grid; grid-template-columns:minmax(0,1fr); grid-template-rows:minmax(0,1fr); 
            grid-template-areas:"stackarea"; l1!grid-area:stackarea; l1!z:0; w:100%; h:100%`;
});

mixinRepository.set('sr-only', function (): string {
    return 'absolute; w:1px; h:1px; p:0; m:-1px; bw:0; overflow:hidden; clip:rect(0, 0, 0, 0); left:-9999px';
});

mixinRepository.set('container', function (settings: UserSettings): string {
    if (settings.desktopFirst) {
        return `px: 1rem; mx:auto; max-w:@breakpoint-lg; lg|max-w:@breakpoint-md; md|max-w:@breakpoint-sm; sm|max-w:@breakpoint-xs; xs|max-w:100%`;
    }
    return `px: 1rem; mx:auto; max-w:100%; sm|max-w:@breakpoint-sm; md|max-w:@breakpoint-md; lg|max-w:@breakpoint-lg; xl|max-w:@breakpoint-xl`;
});

export function resolveMixin(settings: UserSettings, name: string, args: string[]): string {
    if (mixinRepository.has(name)) {
        return style(mixinRepository.get(name)(settings, ...args));
    }

    return style(defaultMixinHandler(name, args));
}

export function registerMixin(name: string, callback: UserFunctionCallback): void {
    mixinRepository.set(name, callback);
}