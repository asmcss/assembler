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

import type StyleHandler from "./StyleHandler";

const positive_number_regex = /^[0-9]+(\.5)?$/;
const number_regex = /^-?[0-9]+(\.5)?$/;
const font_size_regex = /^(xs|sm|base|lg|([2-9])?xl)$/;
const line_height_regex = /^(none|tight|snug|normal|relaxed|loose)$/;
const elevation_regex = /^[0-9]|1[0-9]|2[0-4]$/;
const shadow_regex = /^[1-6]$/;
const letter_spacing_regex = /^(tighter|tight|normal|wide|wider|widest)$/;
const radius_regex = /^(xs|sm|md|lg|xl|pill)$/;
const order_regex = /^(first|last|none)$/;

// do not match comma inside parenthesis
// 2px, linear-gradient(blue, red), inline => [2px, linear-gradient(blue, red), inline]
const args_delimiter = /\s*,\s*(?![^(]*\))/gm;

export const PROPERTY_LIST = [
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
    "box-orient",
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
    "isolation",
    "justify-content",
    "justify-items",
    "justify-self",
    "left",
    "letter-spacing",
    "line-break",
    "line-clamp",
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
export const PROPERTY_VARIANTS = {
    "animation": ["-webkit-animation"],
    "appearance": ["-webkit-appearance", "-moz-appearance"],
    "background-clip": ["-webkit-background-clip", "-moz-background-clip"],
    "backdrop-filter": ["-webkit-backdrop-filter"],
    "box-orient": ["-webkit-box-orient"],
    "clip-path": ["-webkit-clip-path"],
    "column-gap": ["-moz-column-gap"],
    "line-clamp": ["-webkit-line-clamp"],
    "user-select": ["-webkit-user-select", "-moz-user-select"],
    "text-fill-color": ["-webkit-text-fill-color", "-moz-text-fill-color"]
};
export const STATE_LIST = [
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

export const ALIASES = {
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
    "bc": "border-color",
    "bs": "border-style",
    "bw": "border-width",
    "bt": "border-top",
    "bl": "border-left",
    "br": "border-right",
    "bb": "border-bottom",
    "bt-color": "border-top-color",
    "bt-style": "border-top-style",
    "bt-width": "border-top-width",
    "bl-color": "border-left-color",
    "bl-style": "border-left-style",
    "bl-width": "border-left-width",
    "br-color": "border-right-color",
    "br-style": "border-right-style",
    "br-width": "border-right-width",
    "bb-color": "border-bottom-color",
    "bb-style": "border-bottom-style",
    "bb-width": "border-bottom-width",
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
    "col-reverse": "flex-direction",
    "row-reverse": "flex-direction",
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
    "shadow": "box-shadow",
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
        if (v === "words") return ["overflow-wrap"];
        if (v === "all") return ["word-break"];
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
    "wave-clip": "clip-path",
};
export const DEFAULT_VALUES = {
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
    "col-reverse": "column-reverse",
    "row-reverse": "row-reverse",
    "uppercase": "uppercase",
    "lowercase": "lowercase",
    "capitalize": "capitalize",
    "normal-case": "none",
    "radius": "sm",
    "shadow": "1",
    "wave-clip": "50, 2, 50"
}

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
    return line_height_regex.test(v) ? "@line-height-" + v : v
};
const letterSpacing = v => letter_spacing_regex.test(v) ? "@letter-spacing-" + v : v;
const radius = v => radius_regex.test(v) ? "@border-radius-" + v : v;
const breakCallback = v => {
    if (v === "all") return "break-all";
    if (v === "words") return "break-word";
    return ["normal", "normal"];
};
const orderCallback = v => {
    if (!order_regex.test(v)) {
        return v;
    }
    if (v === "first") return "-9999";
    if (v === "last") return "9999";
    return "0";
}

const waveClipIds = new Set<string>();
const generateWave = (value: string, original: string, media: string, state: string, handler: StyleHandler) => {
    const args = value.split(args_delimiter).map(v => v.trim()).map(v => parseInt(v));
    let [amplitude, frequency, segments] = args;

    amplitude = amplitude ?? 50;
    frequency = frequency ?? 2;
    segments = segments ?? 50;

    const id = amplitude + '-' +  frequency + '-' + segments;
    if (waveClipIds.has(id)) {
        return '@wave-clip-' + id;
    }

    waveClipIds.add(id);

    const precision = segments * frequency;
    const units = Math.PI * 2 * frequency;
    const factor = precision / 100;
    amplitude /= 2;

    let polygon = 'polygon(100% 0%, 0% 0%';
    for (let i = 0; i <= precision; i++) {
        const val = Math.abs((amplitude * Math.cos((i / precision) * units) - amplitude)).toFixed(2);
        polygon += ', ' + (i / factor) + '% calc(100% - ' + val + 'px)';
    }
    polygon += ')';
    (handler.style.cssRules[0] as CSSStyleRule).style.setProperty('--wave-clip-' + id, polygon);
    return '@wave-clip-' + id;
}

export const VALUE_WRAPPER = {
    "img": v => `url(${v})`,
    "gradient": (value) => `linear-gradient(${value})`,
    "radial-gradient": (value) => `radial-gradient(${value})`,
    "conic-gradient": (value) => `conic-gradient(${value})`,
    "grid-rows": grid_repeat,
    "row-span": grid_rowspan,
    "grid-cols": grid_repeat,
    "col-span": grid_rowspan,
    "e": elevation,
    "shadow": v => shadow_regex.test(v) ? `@shadow-${v}` : v,
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
    "border-radius": radius,
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
    "max-height": positive_unit,
    "wave-clip": generateWave,
};
