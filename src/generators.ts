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

import {PROPERTY_LIST, MEDIA_LIST, STATE_LIST, PROPERTY_VARIANTS} from "./list";
import {generateRootVariables} from "./variables";
import {UserSettings, HASH_VAR_PREFIX} from "./helpers";

export const CSS_GENERATORS = {
    "-opis-grid": (hash: string, state: string): string[] => {
        if (state !== '') return [];
        return [`.x\\#${hash}{display:var(${HASH_VAR_PREFIX + hash}) !important}`,
        `.x\\#${hash} > * {word-break: break-all !important}`,
        `.x\\#${hash} > * > * {max-width: 100% !important}`,
        `.x\\#${hash} > .x\\#${hash}{justify-self: normal !important;align-self: normal !important}`];
    },
    "-opis-space-x": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important; margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-space-y": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important; margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-space-left": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * + * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-space-right": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * + * {margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-space-top": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * + * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-space-bottom": (hash: string, state: string): string[] => [`.x\\#${hash}${state} > * + * {margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`],
    "-opis-background-clip-text": (hash: string, state: string): string[] => [`.x\\#${hash}${state}{-webkit-background-clip: text !important;-moz-background-clip:text !important;background-clip:text !important}`],
    "-opis-sr-only": (hash: string, state: string): string[] => {
        if (state !== '') return [];
        const props = `position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border-width: 0 !important;`;
        return [`.x\\#${hash}{${props}`, `.x\\#${hash}:focus{${props}`];
    },
    "-opis-not-sr-only": (hash: string, state: string): string[] => {
        if (state !== '') return [];
        const props = `position: static !important;
            width: auto !important;
            height: auto !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            clip: auto !important;
            white-space: normal !important;`;
        return [`.x\\#${hash}{${props}`, `.x\\#${hash}:focus{${props}`];
    },
    "-opis-stack": (hash: string, state: string): string[] => {
        if (state !== '') return [];
        const z = [];
        for (let i = 1; i <= 10; i++) {
            z.push(`.x\\#${hash} > *:nth-child(${i}){z-index: ${i} !important}`);
        }
        return [`.x\\#${hash}{display:grid;grid-template-columns:minmax(0,1fr);
        grid-template-rows:minmax(0,1fr);grid-template-areas:"stackarea";width:100%;height:100%}`,
        `.x\\#${hash} > * {grid-area:stackarea}`, ...z];
    },
    '-opis-placeholder-color': (hash: string, state: string): string[] => [`.x\\#${hash}${state}::placeholder{color:var(${HASH_VAR_PREFIX + hash})}`],
    '-opis-placeholder-font': (hash: string, state: string): string[] => [`.x\\#${hash}${state}::placeholder{font-family:var(${HASH_VAR_PREFIX + hash})}`],
    '-opis-placeholder-size': (hash: string, state: string): string[] => [`.x\\#${hash}${state}::placeholder{font-size:var(${HASH_VAR_PREFIX + hash})}`],
    '-opis-placeholder-style': (hash: string, state: string): string[] => [`.x\\#${hash}${state}::placeholder{font-style:var(${HASH_VAR_PREFIX + hash})}`],
    '-opis-placeholder-weight': (hash: string, state: string): string[] => [`.x\\#${hash}${state}::placeholder{font-weight:var(${HASH_VAR_PREFIX + hash})}`],
}

export function generateStyles(settings: UserSettings, tracker: Map<string, boolean>): string {
    let content: string|null = null;


    if (settings.cache) {
        content = localStorage.getItem(settings.cacheKey + ':' + settings.cache);

        if (content !== null) {
            return content;
        }

        const oldCacheKey = localStorage.getItem(settings.cacheKey);

        if (oldCacheKey !== null) {
            localStorage.removeItem(settings.cacheKey + ':' + oldCacheKey);
        }

        localStorage.setItem(settings.cacheKey, settings.cache);
    } else {
        const oldCacheKey = localStorage.getItem(settings.cacheKey);
        if (oldCacheKey !== null) {
            localStorage.removeItem(settings.cacheKey + ':' + oldCacheKey);
            localStorage.removeItem(settings.cacheKey);
        }
    }

    const base = STATE_LIST.length, result = [];
    const breakpoints = settings.breakpoints.enabled;
    const media_settings = settings.breakpoints.settings;
    const desktop = settings.breakpoints.mode === "desktop-first";
    const states = settings.states.enabled;

    result.push(generateRootVariables());

    for (const bp of breakpoints) {
        const media_index = MEDIA_LIST.indexOf(bp);

        if (media_index < 0) {
            continue;
        }

        let str = '';

        if (media_index !== 0) {
            if (desktop) {
                str += `@media only screen and (max-width: ${media_settings[bp]}) {`;
            } else {
                str += `@media only screen and (min-width: ${media_settings[bp]}) {`;
            }
        }

        for (let name_index = 0, l = PROPERTY_LIST.length; name_index < l; name_index++) {
            const name = PROPERTY_LIST[name_index];
            // generate all states for default media
            const stateList = media_index === 0 ? STATE_LIST : states;
            for (const state of stateList) {
                const state_index = STATE_LIST.indexOf(state);
                if (state_index < 0) {
                    continue;
                }

                const hash = (((name_index * base) + media_index) * base + state_index).toString(16);
                tracker.set(hash, true);
                let variants = PROPERTY_VARIANTS[name], prefix = '';
                if (variants) {
                    for (let i = 0, l = variants.length; i < l; i++) {
                        prefix += `${variants[i]}:var(${HASH_VAR_PREFIX}${hash}) !important;`;
                    }
                }
                if (name.startsWith('-opis-')) {
                    str += CSS_GENERATORS[name](hash, state_index > 0 ? ':' + state : '').join('');
                } else {
                    str += `.x\\#${hash}${state_index > 0 ? ':' + state : ''}{${prefix}${name}:var(${HASH_VAR_PREFIX}${hash}) !important}`;
                }
            }
        }

        if (media_index !== 0) {
            str += '}';
        }
        result.push(str);
    }

    content = result.join('');

    if (settings.cache) {
        localStorage.setItem(settings.cacheKey, settings.cache);
        localStorage.setItem(settings.cacheKey + ':' + settings.cache, content);
    }

    return content;
}
