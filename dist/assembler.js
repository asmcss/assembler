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
        "border",
        "border-bottom",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-collapse",
        "border-left",
        "border-radius",
        "border-right",
        "border-top",
        "border-top-left-radius",
        "border-top-right-radius",
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
        "z-index"
    ];
    const PROPERTY_VARIANTS = {
        "animation": ["-webkit-animation"],
        "appearance": ["-webkit-appearance", "-moz-appearance"],
        "backdrop-filter": ["-webkit-backdrop-filter"],
        "column-gap": ["-moz-column-gap"],
        "user-select": ["-webkit-user-select", "-moz-user-select"],
    };
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
        "tracking": "letter-spacing"
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
    const grid_repeat = v => `repeat(${v}, minmax(0, 1fr))`;
    const grid_rowspan = v => `span ${v}`;
    const elevation = v => /^[0-9]|1[0-9]|2[0-4]$/.test(v) ? `@elevation-${v}` : v;
    const ring = v => `0 0 0 ${v}`;
    const fontSize = v => /^(xs|sm|base|lg|([2-6])?xl)$/.test(v) ? "@font-size-" + v : v;
    const lineHeight = v => /^(none|tight|snug|normal|relaxed|loose)$/.test(v) ? "@line-height-" + v : v;
    const letterSpacing = v => /^(tighter|tight|normal|wide|wider|widest)$/.test(v) ? "@letter-spacing-" + v : v;
    const radius = v => /^(xs|sm|md|lg|xl)$/.test(v) ? "@border-radius-" + v : v;
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
    const X_ATTR_NAME = '_opis';
    const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
    const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
    const STYLE_ATTR = "x-style";
    const CACHE_KEY = 'opis-assembler-cache';
    const observedElements = new WeakMap();
    const domObserver = new MutationObserver(function (mutations) {
        for (let i = 0, l = mutations.length; i < l; i++) {
            const nodes = mutations[i].addedNodes;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i] instanceof HTMLElement) {
                    observe(nodes[i]);
                }
            }
        }
    });
    const observer = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
            if (mutation.attributeName !== STYLE_ATTR) {
                continue;
            }
            const target = mutation.target;
            const newValue = target.getAttribute(mutation.attributeName);
            handleStyleChange(target, mutation.oldValue, newValue);
        }
    });
    function observe(element, deep = true) {
        if (deep) {
            for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
                observe(child, true);
            }
        }
        if (observedElements.has(element)) {
            return;
        }
        observedElements.set(element, null);
        const style = element.attributes.getNamedItem(STYLE_ATTR);
        if (style) {
            handleStyleChange(element, null, style.value);
        }
        observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: [STYLE_ATTR] });
    }
    function handleStyleChange(element, oldContent, content) {
        if (content === null) {
            return handleStyleRemoved(element, oldContent);
        }
        const newEntries = getStyleEntries(content);
        // remove old entries
        if (oldContent !== null) {
            for (const { name, property } of getStyleProperties(oldContent)) {
                if (newEntries.has(name)) {
                    continue;
                }
                element.style.removeProperty(property);
            }
        }
        const opis_attrs = [];
        for (const { property, entry, value } of newEntries.values()) {
            opis_attrs.push(entry);
            element.style.setProperty(property, value);
        }
        element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
    }
    function handleStyleRemoved(element, content) {
        for (const { property } of getStyleProperties(content)) {
            element.style.removeProperty(property);
        }
        element.removeAttribute(X_ATTR_NAME);
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
        }
        if (!Array.isArray(properties)) {
            properties = [properties];
        }
        if (value !== null) {
            if (VALUE_WRAPPER.hasOwnProperty(original)) {
                value = VALUE_WRAPPER[original](value, original, media, state);
            }
            value = value.replace(VAR_REGEX, "var(--$1)");
        }
        const result = [];
        const base = STATE_LIST.length;
        for (const property of properties) {
            const name = PROPERTY_LIST.indexOf(property);
            if (name < 0) {
                continue;
            }
            const hash = (((name * base) + media) * base + state).toString(16);
            result.push({
                name: (m.media ? m.media + '|' : '') + property + (m.state ? '.' + m.state : ''),
                property: '--opis-' + hash,
                entry: 'x' + hash,
                value,
            });
        }
        return result;
    }
    function getStyleEntries(content, resolve = true) {
        const entries = new Map();
        const attrs = content.split(';');
        for (let name of attrs) {
            if (name.indexOf(':') < 0) {
                continue;
            }
            const p = name.split(':');
            name = p.shift().trim();
            const value = resolve ? p.join(':') : null;
            for (const info of extract(name, value)) {
                entries.set(info.name, info);
            }
        }
        return entries;
    }
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
                            prefix += `${variants[i]}:var(--opis-${hash}) !important;`;
                        }
                    }
                    str += `[_opis~=x${hash}]${state_index > 0 ? ':' + state : ''}{${prefix}${name}:var(--opis-${hash}) !important}`;
                }
            }
            if (media_index !== 0) {
                str += '}';
            }
            result.push(str);
        }
        content = result.join('');
        if (settings.cache) {
            localStorage.setItem('opis-assembler-cache', settings.cache);
            localStorage.setItem('opis-assembler-cache:' + settings.cache, content);
        }
        return content;
    }
    function* getStyleProperties(content) {
        var _a;
        const base = STATE_LIST.length;
        for (let attr of content.split(';')) {
            const pos = attr.indexOf(':');
            if (pos < 0) {
                continue;
            }
            attr = attr.substr(0, pos).trim();
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
                    property: '--opis-' + hash,
                };
            }
        }
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
    function style(...styles) {
        let str = '';
        for (const item of styles) {
            if (typeof item === 'string') {
                str += item.trim() + ';';
            }
            else if (Array.isArray(item)) {
                str += style(...item) + ';';
            }
            else {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        str += key + ': ' + item[key] + ';';
                    }
                }
            }
        }
        return str;
    }
    function init(options) {
        const settings = getUserSettings(options || document.currentScript.dataset);
        if (!settings.enabled) {
            return false;
        }
        const style = document.createElement("style");
        style.textContent = generateStyles(settings);
        document.currentScript.parentElement.insertBefore(style, document.currentScript);
        domObserver.observe(document, { childList: true, subtree: true });
        return true;
    }
    if (typeof window !== 'undefined') {
        init();
    }

    exports.extract = extract;
    exports.init = init;
    exports.parse = getStyleEntries;
    exports.style = style;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
