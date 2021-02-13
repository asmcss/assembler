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
    const positive_number_regex = /^[0-9]+(\.5)?$/;
    const number_regex = /^-?[0-9]+(\.5)?$/;
    const font_size_regex = /^(xs|sm|base|lg|([2-9])?xl)$/;
    const line_height_regex = /^(none|tight|snug|normal|relaxed|loose)$/;
    const elevation_regex = /^[0-9]|1[0-9]|2[0-4]$/;
    const letter_spacing_regex = /^(tighter|tight|normal|wide|wider|widest)$/;
    const radius_regex = /^(xs|sm|md|lg|xl)$/;
    const order_regex = /^(first|last|none)$/;
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
        "clip",
        "clip-path",
        "color",
        "column-gap",
        "content",
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
    const MEDIA_LIST = [
        "all",
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
    ];
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
        "b": "border",
        "bt": "border-top",
        "bl": "border-left",
        "br": "border-right",
        "bb": "border-bottom",
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
        "img": "background-image",
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
        "ws": "white-space",
        "ring": "box-shadow",
        "leading": "line-height",
        "tracking": "letter-spacing",
        "break": v => {
            if (v === "words")
                return ["overflow-wrap"];
            if (v === "all")
                return ["word-break"];
            return ["overflow-wrap", "word-break"];
        },
        "truncate": ["overflow", "text-overflow", "white-space"],
        "flex": v => v ? "flex" : "display",
        "inline-flex": "display",
        "grid": "display",
        "inline-grid": "display",
        "hidden": "display",
        "block": "display",
        "inline-block": "display",
        "static": "position",
        "fixed": "position",
        "absolute": "position",
        "relative": "position",
        "sticky": "position",
        "visible": "visibility",
        "invisible": "visibility",
        "flex-row": "flex-direction",
        "flex-col": "flex-direction",
        "list": v => {
            if (v === "inside" || v === "outside") {
                return "list-style-position";
            }
            return "list-style-type";
        },
        "text": v => font_size_regex.test(v) ? ["font-size", "line-height"] : "font-size",
        "uppercase": "text-transform",
        "lowercase": "text-transform",
        "capitalize": "text-transform",
        "normal-case": "text-transform",
        "variant": "font-variant-numeric",
    };
    const DEFAULT_VALUES = {
        "border": ["1px solid transparent"],
        "truncate": ["hidden", "ellipsis", "nowrap"],
        "flex": "flex",
        "inline-flex": "inline-flex",
        "grid": "grid",
        "inline-grid": "inline-grid",
        "hidden": "none",
        "block": "block",
        "inline-block": "inline-block",
        "static": "static",
        "fixed": "fixed",
        "absolute": "absolute",
        "relative": "relative",
        "sticky": "sticky",
        "visible": "visible",
        "invisible": "hidden",
        "flex-row": "row",
        "flex-col": "column",
        "flex-wrap": "wrap",
        "flex-grow": "1",
        "flex-shrink": "1",
        "uppercase": "uppercase",
        "lowercase": "lowercase",
        "capitalize": "capitalize",
        "normal-case": "none",
        "radius": "sm"
    };
    const unit = v => number_regex.test(v) ? `calc(${v} * @unit-size)` : v;
    const positive_unit = v => positive_number_regex.test(v) ? `calc(${v} * @unit-size)` : v;
    const grid_repeat = v => `repeat(${v}, minmax(0, 1fr))`;
    const grid_rowspan = v => `span ${v}`;
    const elevation = v => elevation_regex.test(v) ? `@elevation-${v}` : v;
    const ring = v => `0 0 0 ${v}`;
    const fontSize = v => font_size_regex.test(v) ? "@font-size-" + v : v;
    const lineHeight = v => {
        if (positive_number_regex.test(v)) {
            return `calc(${v} * @unit-size)`;
        }
        return line_height_regex.test(v) ? "@line-height-" + v : v;
    };
    const letterSpacing = v => letter_spacing_regex.test(v) ? "@letter-spacing-" + v : v;
    const radius = v => radius_regex.test(v) ? "@border-radius-" + v : v;
    const breakCallback = v => {
        if (v === "all")
            return "break-all";
        if (v === "words")
            return "break-word";
        return ["normal", "normal"];
    };
    const orderCallback = v => {
        if (!order_regex.test(v)) {
            return v;
        }
        if (v === "first")
            return "-9999";
        if (v === "last")
            return "9999";
        return "0";
    };
    const VALUE_WRAPPER = {
        "img": v => `url(${v})`,
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
        "text": v => font_size_regex.test(v) ? ["@font-size-" + v, "@font-size-leading-" + v] : v,
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
        "flex-wrap": (v) => v === "reverse" ? "wrap-reverse" : v,
        "flex-row": v => v === "reverse" ? "row-reverse" : v,
        "flex-col": v => v === "reverse" ? "column-reverse" : v,
        "order": orderCallback,
        "padding": positive_unit,
        "padding-top": positive_unit,
        "padding-bottom": positive_unit,
        "padding-left": positive_unit,
        "padding-right": positive_unit,
        "p": positive_unit,
        "pt": positive_unit,
        "pb": positive_unit,
        "pl": positive_unit,
        "pr": positive_unit,
        "px": positive_unit,
        "py": positive_unit,
        "margin": unit,
        "margin-top": unit,
        "margin-bottom": unit,
        "margin-left": unit,
        "margin-right": unit,
        "m": unit,
        "mt": unit,
        "mb": unit,
        "ml": unit,
        "mr": unit,
        "mx": unit,
        "my": unit,
        "w": positive_unit,
        "h": positive_unit,
        "width": positive_unit,
        "height": positive_unit,
        "min-w": positive_unit,
        "max-w": positive_unit,
        "min-h": positive_unit,
        "max-h": positive_unit,
        "min-width": positive_unit,
        "max-width": positive_unit,
        "min-height": positive_unit,
        "max-height": positive_unit
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
        for (const [key, value] of Object.entries(FONT_SIZE_LEADING)) {
            vars += `--font-size-leading-${key}:${value};`;
        }
        vars += '--unit-size:0.25rem;';
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
    const regex = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;
    const HASH_VAR_PREFIX = '--x-';
    const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?:(?<scope>[-a-zA-Z0-9]+)!)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
    function getUserSettings(dataset) {
        const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
        const generate = dataset.generate === undefined ? true : dataset.generate === 'true';
        const constructable = dataset.constructable === undefined ? true : dataset.constructable === 'true';
        const mode = dataset.mode || 'desktop-first';
        const isDesktopFirst = mode === "desktop-first";
        const cache = dataset.cache === undefined ? null : dataset.cache;
        const cacheKey = dataset.cacheKey === undefined ? "opis-assembler-cache" : dataset.cacheKey;
        const dataScopes = dataset.scopes === undefined ? [] : getStringItemList(dataset.scopes);
        const scopes = ["", "text-clip", "selection", "placeholder", "before", "after", "first-letter", "first-line",
            "l1", "l2", "sibling", "child", "even", "odd", "first", "last", "dark", "light", "landscape", "portrait", "motion-reduce", "motion-safe"];
        for (let i = 0, l = dataScopes.length; i < l; i++) {
            const scope = dataScopes[i];
            if (scopes.indexOf(scope) < 0) {
                scopes.push(scope);
            }
        }
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
            ? ["normal", "hover"]
            : getStringItemList(dataset.states.toLowerCase());
        if (states.indexOf("normal") === -1) {
            // always add normal state
            states.unshift("normal");
        }
        const xs = dataset.breakpointXs || "512px";
        const sm = dataset.breakpointSm || (isDesktopFirst ? "768px" : "512px");
        const md = dataset.breakpointMd || (isDesktopFirst ? "1024px" : "768px");
        const lg = dataset.breakpointLg || (isDesktopFirst ? "1280px" : "1024px");
        const xl = dataset.breakpointXl || "1280px";
        return {
            enabled,
            generate,
            constructable,
            cache,
            cacheKey,
            scopes,
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
                const scope = m.scope || '';
                const hash = (((name * base) + media) * base + state).toString(16) + (scope ? `-${scope}` : '');
                yield {
                    name: (m.media ? m.media + '|' : '') + (scope ? scope + '!' : '') + property + (m.state ? '.' + m.state : ''),
                    property: HASH_VAR_PREFIX + hash,
                    entry: 'x#' + hash,
                };
            }
        }
    }
    function getClasses(content) {
        const result = [];
        for (const { entry } of getStyleProperties(content)) {
            result.push(entry);
        }
        return result.join(' ');
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
                    const itemValue = item[key];
                    if (itemValue === undefined) {
                        continue;
                    }
                    const property = key.replace(regex, '$1-$2').toLowerCase();
                    if (itemValue === null) {
                        str.push(property);
                    }
                    else {
                        str.push(property + ':' + itemValue);
                    }
                }
            }
        }
        return str.join('; ');
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
    function generateStyles(settings) {
        if (settings.cache) {
            const json = localStorage.getItem(settings.cacheKey + ':' + settings.cache);
            if (json !== null) {
                const content = JSON.parse(json);
                content.tracker = new Set(content.tracker);
                return content;
            }
            const oldCacheKey = localStorage.getItem(settings.cacheKey);
            if (oldCacheKey !== null) {
                localStorage.removeItem(settings.cacheKey + ':' + oldCacheKey);
            }
            localStorage.setItem(settings.cacheKey, settings.cache);
        }
        else {
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
        const tracker = new Set();
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
                // generate all states for default media
                const stateList = media_index === 0 ? STATE_LIST : states;
                for (const state of stateList) {
                    const state_index = STATE_LIST.indexOf(state);
                    if (state_index < 0) {
                        continue;
                    }
                    const hash = (((name_index * base) + media_index) * base + state_index).toString(16);
                    tracker.add(hash);
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
        const content = {
            content: result.join(''),
            tracker
        };
        if (settings.cache) {
            localStorage.setItem(settings.cacheKey, settings.cache);
            localStorage.setItem(settings.cacheKey + ':' + settings.cache, JSON.stringify({
                content: content.content,
                tracker: [...tracker]
            }));
        }
        return content;
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
    class RootClass {
        constructor() {
            this.styles = null;
            this.cache = new Map();
            const { cache } = this;
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
        getComputedStyle() {
            if (this.styles === null) {
                this.styles = window.getComputedStyle(document.documentElement);
            }
            return this.styles;
        }
        getPropertyValue(property) {
            if (this.cache.has(property)) {
                return this.cache.get(property);
            }
            const key = property;
            property = '--' + property;
            let value = this.getComputedStyle().getPropertyValue(property).trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1).trim();
            }
            this.cache.set(key, value);
            return value;
        }
    }
    const Root = new RootClass();

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
    const functionRepository = new Map();
    functionRepository.set('mixin', function (settings, ...names) {
        return names
            .map(name => Root.getPropertyValue(name + '--mixin'))
            .filter(v => v !== '')
            .join(';');
    });
    functionRepository.set('space-x', function (settings, ...args) {
        const space = args[0] || '0';
        if (args[1] === 'true')
            return `sibling!mr:${space}`;
        return `sibling!ml:${space}`;
    });
    functionRepository.set('space-y', function (settings, ...args) {
        const space = args[0] || '0';
        if (args[1] === 'true')
            return `sibling!mb:${space}`;
        return `sibling!mt:${space}`;
    });
    functionRepository.set('grid', function (settings, ...args) {
        return 'grid; l1!wb:break-all; l2!max-w:100%; child!justify-self:normal; child!align-self:normal';
    });
    functionRepository.set('stack', function (settings, ...args) {
        return 'grid; grid-cols:minmax(0,1fr); grid-rows:minmax(0,1fr); grid-template-areas:"stackarea"; l1!grid-area:stackarea; w:100%; h:100%';
    });
    functionRepository.set('sr-only', function (settings, ...args) {
        if ((args[0] || 'true') !== 'true') {
            return 'static; w:auto; h:auto; p:0; m:0; ws:normal; overflow:visible; clip:auto';
        }
        return 'absolute; w:1px; h:1px; p:0; m:-1px; ws:nowrap; border-width:0; overflow:hidden; clip:rect(0, 0, 0, 0)';
    });
    functionRepository.set('container', function (settings, ...args) {
        const { mode, settings: bp } = settings.breakpoints;
        return `px: 1rem; mx:auto; max-w:${mode === 'desktop-first' ? bp['xl'] : '100%'}; sm|max-w:${bp['sm']}; md|max-w:${bp['md']}; lg|max-w:${bp['lg']}`;
    });
    function parseApplyAttribute(settings, value) {
        if (value == null || value === '') {
            return null;
        }
        const collection = [];
        for (const { name, args } of extractFunctions(value)) {
            if (functionRepository.has(name)) {
                const callback = functionRepository.get(name);
                collection.push(callback(settings, ...args));
            }
        }
        return style(collection);
    }
    function registerFunction(name, callback) {
        functionRepository.set(name, callback);
    }
    // do not match comma inside parenthesis
    // 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
    const COMMA_DELIMITED = /\s*,\s*(?![^(]*\))/gm;
    function* extractFunctions(value) {
        for (let userFunction of value.split(';')) {
            userFunction = userFunction.trim();
            if (userFunction === '') {
                continue;
            }
            const pos = userFunction.indexOf(':');
            if (pos === -1) {
                yield { name: userFunction, args: [] };
            }
            else {
                const name = userFunction.substr(0, pos);
                const args = userFunction.substr(pos + 1).split(COMMA_DELIMITED).map(v => v.trim());
                yield { name, args };
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
    const APPLY_ATTR = 'x-apply';
    const STYLE_ATTR = "x-style";
    let _documentObserver = null;
    let _elementObserver = null;
    const observedElements = new WeakMap();
    function observeDocument(document, handler) {
        if (_documentObserver === null) {
            _documentObserver = new MutationObserver(function (mutations) {
                for (let i = 0, l = mutations.length; i < l; i++) {
                    const nodes = mutations[i].addedNodes;
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i] instanceof HTMLElement) {
                            observe(nodes[i], handler);
                        }
                    }
                }
            });
        }
        _documentObserver.observe(document, { childList: true, subtree: true });
    }
    function observeElement(element, handler) {
        if (_elementObserver === null) {
            _elementObserver = new MutationObserver(function (mutations) {
                for (const mutation of mutations) {
                    const target = mutation.target;
                    const newValue = target.getAttribute(mutation.attributeName);
                    switch (mutation.attributeName) {
                        case STYLE_ATTR:
                            whenStyleChanged(handler, target, mutation.oldValue, newValue);
                            break;
                        case APPLY_ATTR:
                            whenApplyChanged(handler, target, newValue);
                            break;
                    }
                }
            });
        }
        _elementObserver.observe(element, { attributes: true, attributeOldValue: true, childList: true, attributeFilter: [STYLE_ATTR, APPLY_ATTR] });
    }
    function observe(element, handler) {
        if (observedElements.has(element)) {
            return;
        }
        observedElements.set(element, null);
        const style = element.attributes.getNamedItem(STYLE_ATTR);
        const apply = element.attributes.getNamedItem(APPLY_ATTR);
        let content = '';
        if (apply) {
            content = parseApplyAttribute(handler.userSettings, apply.value);
            if (content !== '') {
                observedElements.set(element, content);
                content += ';';
            }
        }
        if (style) {
            content += style.value;
        }
        if (content !== '') {
            handler.handleStyleChange(element, null, content);
        }
        observeElement(element, handler);
        for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
            observe(child, handler);
        }
    }
    function whenApplyChanged(handler, element, newApply) {
        let prevApply = observedElements.get(element) || null;
        if (newApply != null) {
            newApply = parseApplyAttribute(handler.userSettings, newApply);
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
        handler.handleStyleChange(element, prevApply, newApply);
    }
    function whenStyleChanged(handler, element, prevValue, newValue) {
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
        handler.handleStyleChange(element, prevValue, newValue);
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
    const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
    const REPLACE_REGEX = /\$(selector|body|class|value|property|state|variants|var)/g;
    class StyleHandler {
        constructor(settings, style, tracker) {
            this.style = style;
            this.settings = settings;
            this.tracker = tracker;
            this.mediaSettings = settings.breakpoints.settings;
            this.desktopMode = settings.breakpoints.mode === "desktop-first";
            this.rules = [];
            this.padding = style.cssRules.length;
        }
        get userSettings() {
            return this.settings;
        }
        handleStyleChange(element, oldContent, content) {
            if (content === null) {
                return this.handleStyleRemoved(element, oldContent);
            }
            const newEntries = this.getStyleEntries(content);
            const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];
            // remove old entries
            if (oldContent !== null) {
                for (const { name, property, entry } of getStyleProperties(oldContent)) {
                    if (!newEntries.has(name)) {
                        const index = classList.indexOf(entry);
                        if (index >= 0) {
                            classList.splice(index, 1);
                        }
                        element.style.removeProperty(property);
                    }
                }
            }
            for (const info of newEntries.values()) {
                const { entry, property, hash, value } = info;
                const index = classList.indexOf(entry);
                if (index < 0) {
                    classList.push(entry);
                }
                if (!this.tracker.has(hash)) {
                    this.generateCSS(info);
                }
                element.style.setProperty(property, value);
            }
            element.setAttribute('class', classList.join(' '));
        }
        handleStyleRemoved(element, content) {
            const classList = element.hasAttribute('class') ? element.getAttribute('class').split(' ') : [];
            for (const { property, entry } of getStyleProperties(content)) {
                const index = classList.indexOf(entry);
                if (index >= 0) {
                    classList.splice(index, 1);
                }
                element.style.removeProperty(property);
            }
            element.setAttribute('class', classList.join(' '));
        }
        extract(attr, value = null) {
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
            const scopes = this.settings.scopes;
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
                const scope = m.scope || '';
                const rank = ((name * base) + media) * base + state;
                const hash = rank.toString(16) + (scope ? `-${scope}` : '');
                const scopeRank = scopes.indexOf(scope) * 100000;
                result.push({
                    name: (m.media ? m.media + '|' : '') + (scope ? scope + '!' : '') + property + (m.state ? '.' + m.state : ''),
                    property: HASH_VAR_PREFIX + hash,
                    entry: 'x#' + hash,
                    value: value[index],
                    media: m.media || '',
                    state: m.state || '',
                    cssProperty: property,
                    hash,
                    scope,
                    rank: scopeRank < 0 ? -1 : rank + scopeRank,
                });
            }
            return result;
        }
        getStyleEntries(content, resolve = true) {
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
                for (const info of this.extract(name, value)) {
                    entries.set(info.name, info);
                }
            }
            return entries;
        }
        generateCSS(info) {
            const { tracker, mediaSettings, desktopMode, style } = this;
            const { hash, media, state, cssProperty, property, scope, rank } = info;
            const hasMedia = media !== '';
            tracker.add(hash);
            if (rank < 0) {
                return;
            }
            let rule = '';
            if (hasMedia) {
                if (desktopMode) {
                    rule += `@media only screen and (max-width: ${mediaSettings[media]}) {`;
                }
                else {
                    rule += `@media only screen and (min-width: ${mediaSettings[media]}) {`;
                }
            }
            let variants = PROPERTY_VARIANTS[cssProperty], prefix = '';
            if (variants) {
                for (let i = 0, l = variants.length; i < l; i++) {
                    prefix += `${variants[i]}:var(${property}) !important;`;
                }
            }
            if (scope) {
                const scopeValue = Root.getPropertyValue(scope + '--scope');
                if (scopeValue === '') {
                    return;
                }
                rule += scopeValue.replace(REPLACE_REGEX, (match, p1) => {
                    switch (p1) {
                        case "selector":
                            return `.x\\#${hash}${state ? ':' + state : ''}`;
                        case "body":
                            return prefix + cssProperty + ': var(' + property + ') !important';
                        case "variants":
                            return prefix;
                        case "property":
                            return cssProperty;
                        case "value":
                            return `var(${property})`;
                        case "class":
                            return `.x\\${hash}`;
                        case "state":
                            return state ? ':' + state : '';
                        case "var":
                            return property;
                    }
                    return p1;
                });
            }
            else {
                rule += `.x\\#${hash}${state ? ':' + state : ''}{${prefix}${cssProperty}: var(${property}) !important}`;
            }
            if (hasMedia) {
                rule += '}';
            }
            const ruleIndex = this.getRuleIndex(rank);
            this.rules.splice(ruleIndex, 0, rank);
            try {
                style.insertRule(rule, this.padding + ruleIndex);
            }
            catch (_a) {
                console.log("Unsupported rule:", rule);
                this.rules.splice(ruleIndex, 1);
            }
        }
        getRuleIndex(rank) {
            const { rules } = this;
            for (let i = 0, l = rules.length; i < l; i++) {
                if (rank < rules[i]) {
                    return i;
                }
            }
            return rules.length;
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
    function init(options) {
        const settings = getUserSettings(options || document.currentScript.dataset);
        if (!settings.enabled) {
            return false;
        }
        let tracker;
        let stylesheet;
        if (settings.constructable && document.adoptedStyleSheets) {
            stylesheet = new CSSStyleSheet();
            if (settings.generate) {
                const generated = generateStyles(settings);
                tracker = generated.tracker;
                stylesheet.replaceSync(generated.content);
            }
            else {
                tracker = new Set();
                stylesheet.replaceSync(generateRootVariables());
            }
            document.adoptedStyleSheets = [stylesheet];
        }
        else {
            const style = document.createElement("style");
            const generated = generateStyles(settings);
            tracker = generated.tracker;
            style.id = 'opis-assembler-css';
            style.textContent = generated.content;
            document.currentScript.parentElement.insertBefore(style, document.currentScript);
            stylesheet = style.sheet;
        }
        observeDocument(document, new StyleHandler(settings, stylesheet, tracker));
        return true;
    }
    if (typeof window !== 'undefined') {
        init();
    }

    exports.getClasses = getClasses;
    exports.init = init;
    exports.registerFunction = registerFunction;
    exports.style = style;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
