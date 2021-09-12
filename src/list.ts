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
const shadow_regex = /^[1-6]$/;
const letter_spacing_regex = /^(tighter|tight|normal|wide|wider|widest)$/;
const radius_regex = /^(xs|sm|md|lg|xl|pill)$/;
const order_regex = /^(first|last|none)$/;

export const PROPERTY_LIST = ["align-content","align-items","align-self","alignment-adjust","alignment-baseline","all","alt","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","azimuth","","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","background-blend-mode","baseline-shift","bleed","bookmark-label","bookmark-level","bookmark-state","border","border-color","border-style","border-width","border-bottom","border-bottom-color","border-bottom-style","border-bottom-width","border-left","border-left-color","border-left-style","border-left-width","border-right","border-right-color","border-right-style","border-right-width","border-top","border-top-color","border-top-style","border-top-width","border-collapse","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-radius","border-bottom-left-radius","border-bottom-right-radius","border-top-left-radius","border-top-right-radius","border-spacing","bottom","box-decoration-break","box-shadow","box-sizing","box-snap","break-after","break-before","break-inside","buffered-rendering","","caption-side","clear","clear-side","clip","clip-path","clip-rule","color","color-adjust","color-correction","color-interpolation","color-interpolation-filters","color-profile","color-rendering","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","columns","column-count","column-width","contain","content","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","","direction","display","display-inside","display-outside","display-extras","display-box","dominant-baseline","","elevation","empty-cells","enable-background","","fill","fill-opacity","fill-rule","filter","float","float-defer-column","float-defer-page","float-offset","float-wrap","flow-into","flow-from","flex","flex-basis","flex-grow","flex-shrink","flex-flow","flex-direction","flex-wrap","flood-color","flood-opacity","font","font-family","font-size","font-stretch","font-style","font-weight","font-feature-settings","font-kerning","font-language-override","font-size-adjust","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","footnote-policy","","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-auto-flow","grid-auto-columns","grid-auto-rows","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","grid-area","grid-column","grid-column-start","grid-column-end","grid-row","grid-row-start","grid-row-end","","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphenate-limit-last","hyphenate-limit-lines","hyphenate-limit-zone","hyphens","","icon","image-orientation","image-resolution","image-rendering","ime","ime-align","ime-mode","ime-offset","ime-width","initial-letters","inline-box-align","isolation","","justify-content","justify-items","justify-self","","kerning","","left","letter-spacing","lighting-color","line-box-contain","line-break","line-grid","line-height","line-slack","line-snap","list-style","list-style-image","list-style-position","list-style-type","","margin","margin-bottom","margin-left","margin-right","margin-top","marker","marker-end","marker-mid","marker-pattern","marker-segment","marker-start","marker-knockout-left","marker-knockout-right","marker-side","marks","marquee-direction","marquee-play-count","marquee-speed","marquee-style","mask","mask-image","mask-repeat","mask-position","mask-clip","mask-origin","mask-size","mask-box","mask-box-outset","mask-box-repeat","mask-box-slice","mask-box-source","mask-box-width","mask-type","max-height","max-lines","max-width","min-height","min-width","mix-blend-mode","","nav-down","nav-index","nav-left","nav-right","nav-up","","object-fit","object-position","offset-after","offset-before","offset-end","offset-start","opacity","order","orphans","outline","outline-color","outline-style","outline-width","outline-offset","overflow","overflow-x","overflow-y","overflow-style","overflow-wrap","","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","pointer-events","position","","quotes","","region-fragment","resize","rest","rest-after","rest-before","richness","right","ruby-align","ruby-merge","ruby-position","","scroll-behavior","scroll-snap-coordinate","scroll-snap-destination","scroll-snap-points-x","scroll-snap-points-y","scroll-snap-type","shape-image-threshold","shape-inside","shape-margin","shape-outside","shape-padding","shape-rendering","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stop-color","stop-opacity","stress","string-set","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-decoration-skip","text-emphasis","text-emphasis-color","text-emphasis-style","text-emphasis-position","text-emphasis-skip","text-height","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-space-collapse","text-spacing","text-transform","text-underline-position","text-wrap","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","","unicode-bidi","","vector-effect","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volumn","volume","","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","wrap-flow","wrap-through","writing-mode","","z-index"]
export const PROPERTY_VARIANTS = {
    "animation": ["-webkit-animation"],
    "appearance": ["-webkit-appearance", "-moz-appearance"],
    "background-clip": ["-webkit-background-clip", "-moz-background-clip"],
    "backdrop-filter": ["-webkit-backdrop-filter"],
    "box-orient": ["-webkit-box-orient"],
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
    "shadow": "1"
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
    "max-height": positive_unit
};
