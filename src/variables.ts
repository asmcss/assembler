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

import {UserSettings} from "./helpers";

const ELEVATION_UMBRA = [
    "0px 0px 0px 0px", "0px 2px 1px -1px", "0px 3px 1px -2px", "0px 3px 3px -2px", "0px 2px 4px -1px",
    "0px 3px 5px -1px", "0px 3px 5px -1px", "0px 4px 5px -2px", "0px 5px 5px -3px", "0px 5px 6px -3px",
    "0px 6px 6px -3px", "0px 6px 7px -4px", "0px 7px 8px -4px", "0px 7px 8px -4px", "0px 7px 9px -4px",
    "0px 8px 9px -5px", "0px 8px 10px -5px", "0px 8px 11px -5px", "0px 9px 11px -5px", "0px 9px 12px -6px",
    "0px 10px 13px -6px", "0px 10px 13px -6px", "0px 10px 14px -6px", "0px 11px 14px -7px", "0px 11px 15px -7px"
];

const ELEVATION_PENUMBRA = [
    "0px 0px 0px 0px", "0px 1px 1px 0px", "0px 2px 2px 0px", "0px 3px 4px 0px", "0px 4px 5px 0px", "0px 5px 8px 0px",
    "0px 6px 10px 0px", "0px 7px 10px 1px", "0px 8px 10px 1px", "0px 9px 12px 1px", "0px 10px 14px 1px",
    "0px 11px 15px 1px", "0px 12px 17px 2px", "0px 13px 19px 2px", "0px 14px 21px 2px", "0px 15px 22px 2px",
    "0px 16px 24px 2px", "0px 17px 26px 2px", "0px 18px 28px 2px", "0px 19px 29px 2px", "0px 20px 31px 3px",
    "0px 21px 33px 3px", "0px 22px 35px 3px", "0px 23px 36px 3px", "0px 24px 38px 3px"
];

const ELEVATION_AMBIENT = [
    "0px 0px 0px 0px", "0px 1px 3px 0px", "0px 1px 5px 0px", "0px 1px 8px 0px", "0px 1px 10px 0px", "0px 1px 14px 0px",
    "0px 1px 18px 0px", "0px 2px 16px 1px", "0px 3px 14px 2px", "0px 3px 16px 2px", "0px 4px 18px 3px",
    "0px 4px 20px 3px", "0px 5px 22px 4px", "0px 5px 24px 4px", "0px 5px 26px 4px", "0px 6px 28px 5px",
    "0px 6px 30px 5px", "0px 6px 32px 5px", "0px 7px 34px 6px", "0px 7px 36px 6px", "0px 8px 38px 7px",
    "0px 8px 40px 7px", "0px 8px 42px 7px", "0px 9px 44px 8px", "0px 9px 46px 8px"
];

const BORDER_RADIUS = {
    none: "0",
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
};

const LETTER_SPACING = {
    tighter: "-0.05rem",
    tight: "-0.025rem",
    normal: "0",
    wide: "0.025rem",
    wider: "0.05rem",
    widest: "0.1rem"
};

const LINE_HEIGHT = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2"
};

const FONT_SIZES = {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
};

const FONT_SIZE_LEADING = {
    xs: "1rem",
    sm: "1.25rem",
    base: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "5xl": "1",
    "6xl": "1",
    "7xl": "1",
    "8xl": "1",
    "9xl": "1",
};

const FONT_FAMILIES = {
    "sans-serif": "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    serif: "Georgia, Cambria, Times New Roman, Times, serif",
    monospace: "Lucida Console, Monaco, monospace"
};

export function generateRootVariables(settings: UserSettings) {
    let vars: string = '--elevation-umbra: rgba(0, 0, 0, .2);--elevation-penumbra: rgba(0, 0, 0, .14);--elevation-ambient: rgba(0, 0, 0, .12);';
    for (let i = 0; i < 25; i++) {
        vars += `--elevation-${i}:${ELEVATION_UMBRA[i]} var(--elevation-umbra), ${ELEVATION_PENUMBRA[i]} var(--elevation-penumbra), ${ELEVATION_AMBIENT[i]} var(--elevation-ambient);`;
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
    for (const [key, value] of Object.entries(FONT_SIZE_LEADING)) {
        vars += `--font-size-leading-${key}:${value};`;
    }
    for (const [key, value] of Object.entries(settings.media)) {
        vars += `--breakpoint-${key}: ${value};`;
    }
    vars += '--unit-size:0.25rem;'

    return ':root{' + vars + '}';
}