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
import {X_ATTR_NAME, HASH_VAR_PREFIX} from "./handlers";
import {
    BORDER_RADIUS,
    ELEVATION_AMBIENT as AMBIENT,
    ELEVATION_PENUMBRA as PENUMBRA,
    ELEVATION_UMBRA as UMBRA,
    FONT_FAMILIES, FONT_SIZES, LETTER_SPACING, LINE_HEIGHT
} from "./variables";

type UserSettings = {
    enabled: boolean,
    cache: string|null,
    breakpoints: {mode: string, settings: object, enabled: string[]},
    states: {enabled: string[]}
};

const CACHE_KEY = 'opis-assembler-cache';
const CSS_GENERATORS = {
    "-opis-grid": (hash: string, state: string): string => {
        if (state !== '') return '';
        return `[${X_ATTR_NAME}~=x${hash}]{display:var(${HASH_VAR_PREFIX + hash}) !important}
        [${X_ATTR_NAME}~=x${hash}] > * {word-break: break-all !important}
        [${X_ATTR_NAME}~=x${hash}] > * > * {max-width: 100% !important}
        [${X_ATTR_NAME}~=x${hash}] > [${X_ATTR_NAME}~=x${hash}]{justify-self: normal !important;align-self: normal !important}
        `;
    },
    "-opis-space-x": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important; margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-space-y": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important; margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-space-left": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * + * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-space-right": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * + * {margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-space-top": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * + * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-space-bottom": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state} > * + * {margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`,
    "-opis-background-clip-text": (hash: string, state: string): string => `[${X_ATTR_NAME}~=x${hash}]${state}{-webkit-background-clip: text !important;-moz-background-clip:text !important;background-clip:text !important}`,
    "-opis-sr-only": (hash: string, state: string): string => {
        if (state !== '') return '';
        return `[${X_ATTR_NAME}~=x${hash}], [${X_ATTR_NAME}~=x${hash}]:focus{
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border-width: 0 !important;
        }`;
    },
    "-opis-not-sr-only": (hash: string, state: string): string => {
        if (state !== '') return '';
        return `[${X_ATTR_NAME}~=x${hash}], [${X_ATTR_NAME}~=x${hash}]:focus{
            position: static !important;
            width: auto !important;
            height: auto !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            clip: auto !important;
            white-space: normal !important;
        }`;
    },
    "-opis-stack": (hash: string, state: string): string => {
        if (state !== '') return '';
        const z = [];
        for (let i = 1; i <= 10; i++) {
            z.push(`[${X_ATTR_NAME}~=x${hash}] > *:nth-child(${i}){z-index: ${i} !important}`);
        }
        return `[${X_ATTR_NAME}~=x${hash}]{display:grid;grid-template-columns:minmax(0,1fr);
        grid-template-rows:minmax(0,1fr);grid-template-areas:"stackarea";width:100%;height:100%}
        [${X_ATTR_NAME}~=x${hash}] > * {grid-area:stackarea}${z.join('')}`;
    }
}

function generateRootVariables() {
    let vars: string = '--elevation-umbra: rgba(0, 0, 0, .2);--elevation-penumbra: rgba(0, 0, 0, .14);--elevation-ambient: rgba(0, 0, 0, .12);';
    for (let i = 0; i < 25; i++) {
        vars += `--elevation-${i}:${UMBRA[i]} var(--elevation-umbra), ${PENUMBRA[i]} var(--elevation-penumbra), ${AMBIENT[i]} var(--elevation-ambient);`;
    }
    for (const [key, value] of Object.entries(BORDER_RADIUS)) {
        vars += `--border-radius-${key}:${value};`;
    }
    for (const [key, value] of Object.entries(LETTER_SPACING)) {
        vars += `--letter-spacing-${key}:${value};`;
    }
    for (const [key, value] of Object.entries(LINE_HEIGHT)) {
        vars += `--line-height-${key}:${value};`;
    }
    for (const [key, value] of Object.entries(FONT_FAMILIES)) {
        vars += `--${key}:${value};`;
    }
    for (const [key, value] of Object.entries(FONT_SIZES)) {
        vars += `--font-size-${key}:${value};`;
    }

    return ':root{' + vars + '}';
}

export function generateStyles(settings: UserSettings): string {
    let content: string|null = null;


    if (settings.cache) {
        content = localStorage.getItem(CACHE_KEY + ':' + settings.cache);

        if (content !== null) {
            return content;
        }

        const oldCacheKey = localStorage.getItem(CACHE_KEY);

        if (oldCacheKey !== null) {
            localStorage.removeItem(CACHE_KEY + ':' + oldCacheKey);
        }

        localStorage.setItem(CACHE_KEY, settings.cache);
    } else {
        const oldCacheKey = localStorage.getItem(CACHE_KEY);
        if (oldCacheKey !== null) {
            localStorage.removeItem(CACHE_KEY + ':' + oldCacheKey);
            localStorage.removeItem(CACHE_KEY);
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
            for (const state of states) {
                const state_index = STATE_LIST.indexOf(state);
                if (state_index < 0) {
                    continue;
                }

                const hash = (((name_index * base) + media_index) * base + state_index).toString(16);
                let variants = PROPERTY_VARIANTS[name], prefix = '';
                if (variants) {
                    for (let i = 0, l = variants.length; i < l; i++) {
                        prefix += `${variants[i]}:var(${HASH_VAR_PREFIX}${hash}) !important;`;
                    }
                }
                if (name.startsWith('-opis-')) {
                    str += CSS_GENERATORS[name](hash, state_index > 0 ? ':' + state : '');
                } else {
                    str += `[${X_ATTR_NAME}~=x${hash}]${state_index > 0 ? ':' + state : ''}{${prefix}${name}:var(${HASH_VAR_PREFIX}${hash}) !important}`;
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
        localStorage.setItem(CACHE_KEY, settings.cache);
        localStorage.setItem(CACHE_KEY + ':' + settings.cache, content);
    }

    return content;
}

export function getUserSettings(dataset: {[key: string]: string}): UserSettings {
    //const generate = dataset.generate === undefined ? true : dataset.generate === 'true';
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const mode = dataset.mode || 'desktop-first';
    const isDesktopFirst = mode === "desktop-first";
    const cache = dataset.cache === undefined ? null : dataset.cache;

    // Consider all bp
    let breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

    if (isDesktopFirst) {
        // handle desktop-first - no xl, reverse
        breakpoints.pop();
        breakpoints.reverse();
    } else {
        // handle mobile-first - no xs
        breakpoints.shift();
    }

    if (dataset.breakpoints) {
        const allowed = getStringItemList(dataset.breakpoints.toLowerCase());
        if (allowed.length) {
            breakpoints = breakpoints.filter(v => allowed.indexOf(v) !== -1);
        } else {
            breakpoints = [];
        }
    }

    // Add all
    breakpoints.unshift('all');

    const states = dataset.states === undefined
        ? ["normal", "hover", "focus", "active", "disabled"]
        : getStringItemList(dataset.states.toLowerCase());

    const xs = dataset.breakpointXs || (isDesktopFirst ? "512px" : "0px");
    const sm = dataset.breakpointSm || (isDesktopFirst ? "768px" : "512px");
    const md = dataset.breakpointMd || (isDesktopFirst ? "1024px" : "768px");
    const lg = dataset.breakpointLg || (isDesktopFirst ? "1280px" : "1024");
    const xl = dataset.breakpointXl || "1280px";


    return  {
        enabled,
        //generate,
        cache,
        breakpoints: {
            mode,
            settings: {xs, sm, md, lg, xl},
            enabled: breakpoints,
        },
        states: {
            enabled: states
        }
    };
}

function getStringItemList(value: string, unique: boolean = true): string[] {
    const items = value
        .replace(/[,;]/g, ' ')
        .split(/\s\s*/g)
        .map(v => v.trim())
        .filter(v => v !== '');

    if (unique) {
        return items.filter((value, index, self) => self.indexOf(value) === index);
    }

    return items;
}
