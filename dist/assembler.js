(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Opis = global.Opis || {}, global.Opis.Assembler = {})));
}(this, (function (exports) { 'use strict';

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
    const PROPERTY_LIST = [
        "align-content",
        "align-items",
        "align-self",
        "animation",
        "appearance",
        "backdrop-filter",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-position",
        "background-repeat",
        "background-size",
        "backface-visibility",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-style",
        "border-bottom-width",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-collapse",
        "border-color",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-style",
        "border-top-width",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-width",
        "bottom",
        "box-shadow",
        "box-sizing",
        "clear",
        "color",
        "column-gap",
        "cursor",
        "display",
        "filter",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "font-family",
        "font-size",
        "font-style",
        "font-weight",
        "font-variant-numeric",
        "gap",
        "grid",
        "grid-area",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-auto-rows",
        "grid-column",
        "grid-column-end",
        "grid-column-start",
        "grid-row",
        "grid-row-end",
        "grid-row-start",
        "grid-template",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "height",
        "justify-content",
        "justify-items",
        "justify-self",
        "left",
        "letter-spacing",
        "line-height",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "max-height",
        "max-width",
        "min-height",
        "min-width",
        "object-fit",
        "object-position",
        "opacity",
        "order",
        "outline",
        "outline-offset",
        "overflow",
        "overflow-wrap",
        "overflow-x",
        "overflow-y",
        "overscroll-behavior",
        "overscroll-behavior-x",
        "overscroll-behavior-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "perspective",
        "perspective-origin",
        "place-content",
        "place-items",
        "place-self",
        "pointer-events",
        "position",
        "resize",
        "right",
        "row-gap",
        "table-layout",
        "text-align",
        "text-decoration",
        "text-decoration-style",
        "text-fill-color",
        "text-overflow",
        "text-shadow",
        "text-transform",
        "top",
        "transform",
        "transform-box",
        "transform-origin",
        "transform-style",
        "transition",
        "user-select",
        "vertical-align",
        "visibility",
        "white-space",
        "width",
        "word-break",
        "z-index",
        "-opis-grid",
        "-opis-space-x",
        "-opis-space-y",
        "-opis-space-top",
        "-opis-space-bottom",
        "-opis-space-left",
        "-opis-space-right",
        "-opis-background-clip-text",
        "-opis-sr-only",
        "-opis-not-sr-only",
        "-opis-stack",
    ];
    const PROPERTY_VARIANTS = {
        "animation": ["-webkit-animation"],
        "appearance": ["-webkit-appearance", "-moz-appearance"],
        "background-clip": ["-webkit-background-clip", "-moz-background-clip"],
        "backdrop-filter": ["-webkit-backdrop-filter"],
        "column-gap": ["-moz-column-gap"],
        "user-select": ["-webkit-user-select", "-moz-user-select"],
        "text-fill-color": ["-webkit-text-fill-color", "-moz-text-fill-color"]
    };
    const STATE_LIST = [
        "normal",
        "link",
        "visited",
        "empty",
        "placeholder-shown",
        "default",
        "checked",
        "indeterminate",
        "valid",
        "invalid",
        "required",
        "optional",
        "out-of-range",
        "in-range",
        "hover",
        "focus",
        "focus-within",
        "focus-visible",
        "active",
        "read-only",
        "read-write",
        "disabled",
        "enabled",
    ];
    const MEDIA_LIST = ["all", "xs", "sm", "md", "lg", "xl"];
    const ALIASES = {
        "backdrop": "backdrop-filter",
        "bg": "background",
        "bg-attachment": "background-attachment",
        "bg-blend": "background-blend-mode",
        "bg-clip": "background-clip",
        "bg-color": "background-color",
        "bg-image": "background-image",
        "bg-position": "background-position",
        "bg-repeat": "background-repeat",
        "bg-size": "background-size",
        "radius": "border-radius",
        "radius-top": ["border-top-left-radius", "border-top-right-radius"],
        "radius-bottom": ["border-bottom-left-radius", "border-bottom-right-radius"],
        "radius-left": ["border-bottom-left-radius", "border-top-left-radius"],
        "radius-right": ["border-bottom-right-radius", "border-top-right-radius"],
        "radius-bl": "border-bottom-left-radius",
        "radius-br": "border-bottom-right-radius",
        "radius-tl": "border-top-left-radius",
        "radius-tr": "border-top-right-radius",
        "m": "margin",
        "mt": "margin-top",
        "mb": "margin-bottom",
        "ml": "margin-left",
        "mr": "margin-right",
        "mx": ["margin-left", "margin-right"],
        "my": ["margin-top", "margin-bottom"],
        "p": "padding",
        "pt": "padding-top",
        "pb": "padding-bottom",
        "pl": "padding-left",
        "pr": "padding-right",
        "px": ["padding-left", "padding-right"],
        "py": ["padding-top", "padding-bottom"],
        "min-w": "min-width",
        "max-w": "max-width",
        "min-h": "min-height",
        "max-h": "max-height",
        "w": "width",
        "h": "height",
        "gradient": "background-image",
        "radial-gradient": "background-image",
        "conic-gradient": "background-image",
        "flex-dir": "flex-direction",
        "grid-rows": "grid-template-rows",
        "grid-flow": "grid-auto-flow",
        "row-start": "grid-row-start",
        "row-span": "grid-row-end",
        "grid-cols": "grid-template-columns",
        "col-start": "grid-column-start",
        "col-span": "grid-column-end",
        "col-gap": "column-gap",
        "auto-cols": "grid-auto-columns",
        "auto-rows": "grid-auto-rows",
        "e": "box-shadow",
        "overscroll": "overscroll-behavior",
        "overscroll-x": "overscroll-behavior-x",
        "overscroll-y": "overscroll-behavior-y",
        "inset": ["top", "bottom", "left", "right"],
        "inset-x": ["left", "right"],
        "inset-y": ["top", "bottom"],
        "z": "z-index",
        "decoration": "text-decoration",
        "v-align": "vertical-align",
        "ws": "whitespace",
        "ring": "box-shadow",
        "leading": "line-height",
        "tracking": "letter-spacing",
        "break": v => {
            if (v === "normal")
                return ["overflow-wrap", "word-break"];
            if (v === "words")
                return ["overflow-wrap"];
            if (v === "all")
                return ["word-break"];
            return [];
        },
        "truncate": ["overflow", "text-overflow", "white-space"],
        "text-clip": ["-opis-background-clip-text", "text-fill-color"],
        "space-x": "-opis-space-left",
        "space-y": "-opis-space-top",
        "space-x-rev": "-opis-space-right",
        "space-y-rev": "-opis-space-bottom",
        "space-x-alt": "-opis-space-y",
        "space-y-alt": "-opis-space-y",
        "sr-only": v => {
            if (v === "false")
                return "-opis-not-sr-only";
            return "-opis-sr-only";
        },
        "stack": "-opis-stack",
        "flex": v => v ? "flex" : "display",
        "inline-flex": "display",
        "grid": "-opis-grid",
        "inline-grid": "display",
        "hidden": "display",
        "block": "display",
        "inline-block": "display",
    };
    const DEFAULT_VALUES = {
        "border": ["1px solid black"],
        "truncate": ["hidden", "ellipsis", "nowrap"],
        "text-clip": ["text", "transparent"],
        "flex": "flex",
        "inline-flex": "inline-flex",
        "inline-grid": "inline-grid",
        "hidden": "none",
        "block": "block",
        "inline-block": "inline-block"
    };
    const grid_repeat = v => `repeat(${v}, minmax(0, 1fr))`;
    const grid_rowspan = v => `span ${v}`;
    const elevation = v => /^[0-9]|1[0-9]|2[0-4]$/.test(v) ? `@elevation-${v}` : v;
    const ring = v => `0 0 0 ${v}`;
    const fontSize = v => /^(xs|sm|base|lg|([2-6])?xl)$/.test(v) ? "@font-size-" + v : v;
    const lineHeight = v => /^(none|tight|snug|normal|relaxed|loose)$/.test(v) ? "@line-height-" + v : v;
    const letterSpacing = v => /^(tighter|tight|normal|wide|wider|widest)$/.test(v) ? "@letter-spacing-" + v : v;
    const radius = v => /^(xs|sm|md|lg|xl)$/.test(v) ? "@border-radius-" + v : v;
    const breakCallback = v => {
        if (v === "normal")
            return ["normal", "normal"];
        if (v === "words")
            return "break-word";
        return "break-all";
    };
    const VALUE_WRAPPER = {
        "gradient": (value) => `linear-gradient(${value})`,
        "radial-gradient": (value) => `radial-gradient(${value})`,
        "conic-gradient": (value) => `conic-gradient(${value})`,
        "grid-rows": grid_repeat,
        "row-span": grid_rowspan,
        "grid-cols": grid_repeat,
        "col-span": grid_rowspan,
        "e": elevation,
        "ring": ring,
        "font-size": fontSize,
        "leading": lineHeight,
        "tracking": letterSpacing,
        "radius": radius,
        "radius-top": radius,
        "radius-left": radius,
        "radius-bottom": radius,
        "radius-right": radius,
        "radius-tl": radius,
        "radius-bl": radius,
        "radius-tr": radius,
        "radius-br": radius,
        "break": breakCallback,
        "grid": () => "grid",
    };

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
    const HASH_VAR_PREFIX = '--x-';
    const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
    const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
    const STYLE_ATTR = "x-style";
    function handleStyleChange(element, oldContent, content) {
        if (content === null) {
            return handleStyleRemoved(element, oldContent);
        }
        const newEntries = getStyleEntries(content);
        const removeList = [], addList = [], classList = element.classList;
        // remove old entries
        if (oldContent !== null) {
            for (const { name, property, entry } of getStyleProperties(oldContent)) {
                if (!newEntries.has(name)) {
                    removeList.push(entry);
                    element.style.removeProperty(property);
                }
            }
        }
        classList.remove(...removeList);
        for (const { property, entry, value } of newEntries.values()) {
            addList.push(entry);
            element.style.setProperty(property, value);
        }
        classList.add(...addList);
    }
    function handleStyleRemoved(element, content) {
        const removeList = [];
        for (const { property, entry } of getStyleProperties(content)) {
            removeList.push(entry);
            element.style.removeProperty(property);
        }
        element.classList.remove(...removeList);
    }
    function extract(attr, value = null) {
        var _a;
        const m = (_a = PROPERTY_REGEX.exec(attr)) === null || _a === void 0 ? void 0 : _a.groups;
        if (!m || !m.property) {
            return [];
        }
        const media = MEDIA_LIST.indexOf(m.media || 'all');
        const state = STATE_LIST.indexOf(m.state || 'normal');
        if (media < 0 || state < 0) {
            return [];
        }
        let properties = m.property;
        const original = properties;
        if (ALIASES.hasOwnProperty(properties)) {
            properties = ALIASES[properties];
            if (typeof properties === 'function') {
                properties = properties(value);
            }
        }
        if (!Array.isArray(properties)) {
            properties = [properties];
        }
        if (value === null) {
            value = DEFAULT_VALUES[original] || '';
        }
        if (VALUE_WRAPPER.hasOwnProperty(original)) {
            value = VALUE_WRAPPER[original](value, original, media, state);
        }
        if (!Array.isArray(value)) {
            value = Array(properties.length).fill(value.replace(VAR_REGEX, "var(--$1)"));
        }
        else {
            value = value.map(value => value.replace(VAR_REGEX, "var(--$1)"));
        }
        const result = [];
        const base = STATE_LIST.length;
        let index = -1;
        for (const property of properties) {
            index++;
            const name = PROPERTY_LIST.indexOf(property);
            if (name < 0) {
                continue;
            }
            const hash = (((name * base) + media) * base + state).toString(16);
            result.push({
                name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                property: HASH_VAR_PREFIX + hash,
                entry: 'x#' + hash,
                value: value[index],
            });
        }
        return result;
    }
    function getStyleEntries(content, resolve = true) {
        const entries = new Map();
        for (let name of content.split(';')) {
            name = name.trim();
            if (name === '') {
                continue;
            }
            let value = null;
            const pos = name.indexOf(':');
            if (pos < 0) {
                name = name.trim();
            }
            else {
                value = resolve ? name.substr(pos + 1) : null;
                name = name.substr(0, pos).trim();
            }
            for (const info of extract(name, value)) {
                entries.set(info.name, info);
            }
        }
        return entries;
    }
    function* getStyleProperties(content) {
        var _a;
        const base = STATE_LIST.length;
        for (let attr of content.split(';')) {
            let value = null;
            const pos = attr.indexOf(':');
            if (pos < 0) {
                attr = attr.trim();
            }
            else {
                value = attr.substr(pos + 1);
                attr = attr.substr(0, pos).trim();
            }
            const m = (_a = PROPERTY_REGEX.exec(attr)) === null || _a === void 0 ? void 0 : _a.groups;
            if (!m || !m.property) {
                continue;
            }
            const media = MEDIA_LIST.indexOf(m.media || 'all');
            const state = STATE_LIST.indexOf(m.state || 'normal');
            if (media < 0 || state < 0) {
                continue;
            }
            let properties = m.property;
            if (ALIASES.hasOwnProperty(properties)) {
                properties = ALIASES[properties];
                if (typeof properties === 'function') {
                    properties = properties(value);
                }
            }
            if (!Array.isArray(properties)) {
                properties = [properties];
            }
            for (const property of properties) {
                const name = PROPERTY_LIST.indexOf(property);
                if (name < 0) {
                    continue;
                }
                const hash = (((name * base) + media) * base + state).toString(16);
                yield {
                    name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                    property: HASH_VAR_PREFIX + hash,
                    entry: 'x#' + hash
                };
            }
        }
    }

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
        "6xl": "4rem",
    };
    const FONT_FAMILIES = {
        "sans-serif": "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
        serif: "Georgia, Cambria, Times New Roman, Times, serif",
        monospace: "Lucida Console, Monaco, monospace"
    };
    function generateRootVariables() {
        let vars = '--elevation-umbra: rgba(0, 0, 0, .2);--elevation-penumbra: rgba(0, 0, 0, .14);--elevation-ambient: rgba(0, 0, 0, .12);';
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
        return ':root{' + vars + '}';
    }

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
    const CACHE_KEY = 'opis-assembler-cache';
    const CSS_GENERATORS = {
        "-opis-grid": (hash, state) => {
            if (state !== '')
                return '';
            return `.x\\#${hash}{display:var(${HASH_VAR_PREFIX + hash}) !important}
        .x\\#${hash} > * {word-break: break-all !important}
        .x\\#${hash} > * > * {max-width: 100% !important}
        .x\\#${hash} > .x\\#${hash}{justify-self: normal !important;align-self: normal !important}
        `;
        },
        "-opis-space-x": (hash, state) => `.x\\#${hash}${state} > * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important; margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-space-y": (hash, state) => `.x\\#${hash}${state} > * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important; margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-space-left": (hash, state) => `.x\\#${hash}${state} > * + * {margin-left:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-space-right": (hash, state) => `.x\\#${hash}${state} > * + * {margin-right:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-space-top": (hash, state) => `.x\\#${hash}${state} > * + * {margin-top:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-space-bottom": (hash, state) => `.x\\#${hash}${state} > * + * {margin-bottom:var(${HASH_VAR_PREFIX + hash}) !important}`,
        "-opis-background-clip-text": (hash, state) => `.x\\#${hash}${state}{-webkit-background-clip: text !important;-moz-background-clip:text !important;background-clip:text !important}`,
        "-opis-sr-only": (hash, state) => {
            if (state !== '')
                return '';
            return `.x\\#${hash}, .x\\#${hash}:focus{
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
        "-opis-not-sr-only": (hash, state) => {
            if (state !== '')
                return '';
            return `.x\\#${hash}, .x\\#${hash}:focus{
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
        "-opis-stack": (hash, state) => {
            if (state !== '')
                return '';
            const z = [];
            for (let i = 1; i <= 10; i++) {
                z.push(`.x\\#${hash} > *:nth-child(${i}){z-index: ${i} !important}`);
            }
            return `.x\\#${hash}{display:grid;grid-template-columns:minmax(0,1fr);
        grid-template-rows:minmax(0,1fr);grid-template-areas:"stackarea";width:100%;height:100%}
        .x\\#${hash} > * {grid-area:stackarea}${z.join('')}`;
        }
    };
    function generateStyles(settings) {
        let content = null;
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
        }
        else {
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
                }
                else {
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
                    }
                    else {
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
            localStorage.setItem(CACHE_KEY, settings.cache);
            localStorage.setItem(CACHE_KEY + ':' + settings.cache, content);
        }
        return content;
    }
    function getUserSettings(dataset) {
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
        }
        else {
            // handle mobile-first - no xs
            breakpoints.shift();
        }
        if (dataset.breakpoints) {
            const allowed = getStringItemList(dataset.breakpoints.toLowerCase());
            if (allowed.length) {
                breakpoints = breakpoints.filter(v => allowed.indexOf(v) !== -1);
            }
            else {
                breakpoints = [];
            }
        }
        // Add all
        breakpoints.unshift('all');
        const states = dataset.states === undefined
            ? ["normal", "hover", "focus", "active", "disabled"]
            : getStringItemList(dataset.states.toLowerCase());
        if (states.indexOf("normal") === -1) {
            // always add normal state
            states.unshift("normal");
        }
        const xs = dataset.breakpointXs || (isDesktopFirst ? "512px" : "0px");
        const sm = dataset.breakpointSm || (isDesktopFirst ? "768px" : "512px");
        const md = dataset.breakpointMd || (isDesktopFirst ? "1024px" : "768px");
        const lg = dataset.breakpointLg || (isDesktopFirst ? "1280px" : "1024");
        const xl = dataset.breakpointXl || "1280px";
        return {
            enabled,
            //generate,
            cache,
            breakpoints: {
                mode,
                settings: { xs, sm, md, lg, xl },
                enabled: breakpoints,
            },
            states: {
                enabled: states
            }
        };
    }
    function getStringItemList(value, unique = true) {
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
    const mixinRepository = new Map();
    mixinRepository.set('mixin', function (...names) {
        return names
            .map(name => rootElement.getPropertyValue(name))
            .filter(v => v !== '')
            .join(';');
    });
    const APPLY_ATTR = 'x-apply';
    function parseApplyAttribute(value) {
        if (value == null || value === '') {
            return null;
        }
        const collection = [];
        for (const { name, args } of extractMixins(value)) {
            if (mixinRepository.has(name)) {
                const mixin = mixinRepository.get(name);
                collection.push(mixin(...args));
            }
        }
        return style(collection);
    }
    function registerMixin(name, callback) {
        mixinRepository.set(name, callback);
    }
    function style(...styles) {
        let str = [];
        for (const item of styles) {
            if (typeof item === 'string') {
                str.push(item.trim());
            }
            else if (Array.isArray(item)) {
                str.push(style(...item));
            }
            else {
                for (const key in item) {
                    if (!item.hasOwnProperty(key)) {
                        continue;
                    }
                    if (item[key] == null) {
                        str.push(key);
                    }
                    else {
                        str.push(key + ':' + item[key]);
                    }
                }
            }
        }
        return str.join('; ');
    }
    // do not match comma inside parenthesis
    // 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
    const COMMA_DELIMITED = /\s*,\s*(?![^(]*\))/gm;
    function* extractMixins(value) {
        for (let mixin of value.split(';')) {
            mixin = mixin.trim();
            if (mixin === '') {
                continue;
            }
            const pos = mixin.indexOf(':');
            if (pos === -1) {
                yield { name: mixin, args: [] };
            }
            else {
                const name = mixin.substr(0, pos);
                const args = mixin.substr(pos + 1).split(COMMA_DELIMITED).map(v => v.trim());
                yield { name, args };
            }
        }
    }
    const rootElement = new class {
        constructor() {
            this.styles = null;
        }
        getComputedStyle() {
            if (this.styles === null) {
                this.styles = window.getComputedStyle(document.documentElement);
            }
            return this.styles;
        }
        getPropertyValue(property) {
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
    let _documentObserver = null;
    let _elementObserver = null;
    const observedElements = new WeakMap();
    function observeDocument(document, options) {
        if (_documentObserver === null) {
            _documentObserver = new MutationObserver(function (mutations) {
                for (let i = 0, l = mutations.length; i < l; i++) {
                    const nodes = mutations[i].addedNodes;
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i] instanceof HTMLElement) {
                            observe(nodes[i]);
                        }
                    }
                }
            });
        }
        _documentObserver.observe(document, options);
    }
    function observeElement(element, options) {
        if (_elementObserver === null) {
            _elementObserver = new MutationObserver(function (mutations) {
                for (const mutation of mutations) {
                    const target = mutation.target;
                    const newValue = target.getAttribute(mutation.attributeName);
                    switch (mutation.attributeName) {
                        case STYLE_ATTR:
                            whenStyleChanged(target, mutation.oldValue, newValue);
                            break;
                        case APPLY_ATTR:
                            whenApplyChanged(target, newValue);
                            break;
                    }
                }
            });
        }
        _elementObserver.observe(element, options);
    }
    function observe(element) {
        if (observedElements.has(element)) {
            return;
        }
        observedElements.set(element, null);
        const style = element.attributes.getNamedItem(STYLE_ATTR);
        const apply = element.attributes.getNamedItem(APPLY_ATTR);
        let content = '';
        if (apply) {
            content = parseApplyAttribute(apply.value);
            if (content !== '') {
                observedElements.set(element, content);
                content += ';';
            }
        }
        if (style) {
            content += style.value;
        }
        if (content !== '') {
            handleStyleChange(element, null, content);
        }
        observeElement(element, { attributes: true, attributeOldValue: true, childList: true, attributeFilter: [STYLE_ATTR, APPLY_ATTR] });
        for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
            observe(child);
        }
    }
    function whenApplyChanged(element, newApply) {
        let prevApply = observedElements.get(element) || null;
        if (newApply != null) {
            newApply = parseApplyAttribute(newApply);
        }
        observedElements.set(element, newApply);
        if (element.hasAttribute(STYLE_ATTR)) {
            const style = element.getAttribute(STYLE_ATTR);
            if (prevApply == null) {
                prevApply = style;
            }
            else {
                prevApply += ';' + style;
            }
            if (newApply == null) {
                newApply = style;
            }
            else {
                newApply += ';' + style;
            }
        }
        handleStyleChange(element, prevApply, newApply);
    }
    function whenStyleChanged(element, prevValue, newValue) {
        const apply = observedElements.get(element) || null;
        if (apply != null) {
            if (prevValue == null) {
                prevValue = apply;
            }
            else {
                prevValue = apply + ';' + prevValue;
            }
            if (newValue == null) {
                newValue = apply;
            }
            else {
                newValue = apply + ';' + newValue;
            }
        }
        handleStyleChange(element, prevValue, newValue);
    }

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
    function init(options) {
        const settings = getUserSettings(options || document.currentScript.dataset);
        if (!settings.enabled) {
            return false;
        }
        const style = document.createElement("style");
        style.textContent = generateStyles(settings);
        document.currentScript.parentElement.insertBefore(style, document.currentScript);
        observeDocument(document, { childList: true, subtree: true });
        return true;
    }
    if (typeof window !== 'undefined') {
        init();
    }

    exports.extract = extract;
    exports.init = init;
    exports.parse = getStyleEntries;
    exports.registerMixin = registerMixin;
    exports.style = style;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
