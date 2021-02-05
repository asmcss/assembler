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
            if (name === null) {
                continue;
            }
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
                str += `.x\\#${hash}${state_index > 0 ? ':' + state : ''}{${prefix}${name}:var(${HASH_VAR_PREFIX}${hash}) !important}`;
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
