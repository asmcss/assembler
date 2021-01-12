const ATTRIBUTE_LIST = [
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

const X_ATTR_NAME = '_opis';
const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
const REF_REGEX = /&[a-zA-Z0-9_\-]+/g;
const ATTRIBUTE_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
const ARGS_REGEX = /\${\s*(?<index>\d+)\s*(?:=(?<default>[^}]*))?}/g;
const APPLY_REGEX = /^(?<name>[a-z][a-z0-9_\-]*)(?:\s*\((?<args>.*)?\))?$/i;
const PREFIX = 'x-';
const STYLE_ATTR = PREFIX + "style";
const APPLY_ATTR = PREFIX + "apply";
const observedElements = new WeakMap();
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
        let value = this.getComputedStyle().getPropertyValue(property).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
        }
        return value;
    }
};
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
        if (!mutation.attributeName.includes(PREFIX)) {
            continue;
        }
        const target = mutation.target;
        const newValue = target.getAttribute(mutation.attributeName);
        if (mutation.attributeName === STYLE_ATTR) {
            handleStyleChange(target, mutation.oldValue, newValue);
            continue;
        }
        for (const info of extract(mutation.attributeName, newValue)) {
            handleAttributeChange(target, info);
        }
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
    const attributes = Array.from(element.attributes);
    const apply = element.attributes.getNamedItem(APPLY_ATTR);
    const style = element.attributes.getNamedItem(STYLE_ATTR);
    if (apply) {
        handleApplyAttribute(element, apply.value);
    }
    if (style) {
        handleStyleChange(element, null, style.value);
    }
    for (const { name, value } of attributes) {
        if (name === STYLE_ATTR || name === APPLY_ATTR) {
            continue;
        }
        for (const info of extract(name, value)) {
            handleAttributeChange(element, info);
        }
    }
    observer.observe(element, { attributes: true, attributeOldValue: true });
}
function handleStyleChange(element, oldContent, content) {
    if (content === null) {
        return handleStyleRemoved(element, oldContent);
    }
    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];
    const styleEntries = oldContent === null ? new Map() : getStyleEntries(oldContent);
    const newEntries = getStyleEntries(content);
    // remove old entries
    for (const [name, attr] of styleEntries) {
        if (element.hasAttribute(name) || newEntries.has(name)) {
            continue;
        }
        const { property, entry } = attr;
        opis_attrs.splice(opis_attrs.indexOf(entry), 1);
        element.style.removeProperty(property);
    }
    for (const [name, attr] of newEntries) {
        if (element.hasAttribute(name)) {
            continue;
        }
        const { property, entry, value } = attr;
        if (opis_attrs.indexOf(entry) < 0) {
            opis_attrs.push(entry);
        }
        element.style.setProperty(property, value);
    }
    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}
function handleStyleRemoved(element, content) {
    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];
    for (const attr of getStyleEntries(content).values()) {
        if (element.hasAttribute(attr.name)) {
            continue;
        }
        opis_attrs.splice(opis_attrs.indexOf(attr.entry), 1);
        element.style.removeProperty(attr.property);
    }
    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}
function handleAttributeChange(element, attr) {
    if (attr.value === null) {
        return handleAttributeRemoved(element, attr);
    }
    const { property, entry, value } = attr;
    let attrs;
    if (element.hasAttribute(X_ATTR_NAME)) {
        const list = element.getAttribute(X_ATTR_NAME).split(' ');
        if (list.indexOf(entry) < 0) {
            list.push(entry);
        }
        attrs = list.join(' ');
    }
    else {
        attrs = entry;
    }
    element.style.setProperty(property, value);
    element.setAttribute(X_ATTR_NAME, attrs);
}
function handleAttributeRemoved(element, attr) {
    const { property, entry, name } = attr;
    if (element.hasAttribute(STYLE_ATTR)) {
        const styleEntries = getStyleEntries(element.getAttribute(STYLE_ATTR));
        if (styleEntries.has(name)) {
            element.style.setProperty(property, styleEntries.get(name).value);
            return;
        }
    }
    const opis_attrs = element.getAttribute(X_ATTR_NAME).split(' ');
    opis_attrs.splice(opis_attrs.indexOf(entry), 1);
    element.style.removeProperty(property);
    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}
function handleApplyAttribute(element, content) {
    var _a;
    const references = content.split(';');
    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];
    for (let i = 0, l = references.length; i < l; i++) {
        const reference = references[i].trim();
        if (reference === '') {
            continue;
        }
        const m = (_a = APPLY_REGEX.exec(reference)) === null || _a === void 0 ? void 0 : _a.groups;
        if (!m || !m.name) {
            continue;
        }
        let value = rootElement.getPropertyValue('--' + m.name);
        if (m.args) {
            value = replaceArgs(value, extractArgs(replaceReferences(m.args)));
        }
        for (const attr of getStyleEntries(value).values()) {
            const { property, entry, value } = attr;
            if (opis_attrs.indexOf(entry) < 0) {
                opis_attrs.push(entry);
            }
            element.style.setProperty(property, value);
        }
    }
    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}
function extract(attr, value = null) {
    var _a;
    const m = (_a = ATTRIBUTE_REGEX.exec(attr)) === null || _a === void 0 ? void 0 : _a.groups;
    if (!m || !m.property || !m.property.startsWith(PREFIX)) {
        return [];
    }
    const media = MEDIA_LIST.indexOf(m.media || 'all');
    const state = STATE_LIST.indexOf(m.state || 'normal');
    if (media < 0 || state < 0) {
        return [];
    }
    let properties = m.property.substring(PREFIX.length);
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
        value = replaceReferences(value).replace(VAR_REGEX, "var(--$1)");
    }
    const result = [];
    const base = STATE_LIST.length;
    for (const property of properties) {
        const name = ATTRIBUTE_LIST.indexOf(property);
        if (name < 0) {
            continue;
        }
        const hash = (((name * base) + media) * base + state).toString(16);
        result.push({
            name: (m.media ? m.media + '|' : '') + PREFIX + property + (m.state ? '.' + m.state : ''),
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
        name = name.indexOf('|') >= 0
            ? name.replace('|', '|' + PREFIX)
            : PREFIX + name;
        const value = resolve ? p.join(':') : null;
        for (const info of extract(name, value)) {
            entries.set(info.name, info);
        }
    }
    return entries;
}
function extractArgs(value) {
    const args = [];
    const len = value.length;
    let dataState = true, start_index = 0, open = 0;
    for (let i = 0; i < len; i++) {
        const c = value[i];
        if (dataState) {
            if (c === ',') {
                args.push(value.substring(start_index, i).trim());
                start_index = i + 1;
            }
            else if (c === '(') {
                open = 1;
                dataState = false;
            }
        }
        else {
            if (c === '(') {
                open++;
            }
            else if (c === ')' && --open === 0) {
                dataState = true;
            }
        }
    }
    if (start_index < len) {
        args.push(value.substring(start_index, len).trim());
    }
    return args;
}
function replaceArgs(content, args) {
    const length = args.length;
    if (length === 0) {
        return content.replace(ARGS_REGEX, () => '');
    }
    return content.replace(ARGS_REGEX, (_, ...m) => {
        const index = parseInt(m[0]);
        const fallback = m[1] || '';
        if (index < 0 || index >= length || args[index] === '') {
            return fallback;
        }
        return args[index];
    });
}
function replaceReferences(content) {
    let m;
    while (null !== (m = REF_REGEX.exec(content))) {
        const variable = m[0];
        const start = content.substring(0, m.index);
        const end = content.substring(m.index + variable.length);
        const value = rootElement.getPropertyValue(variable.replace('&', '--'));
        content = start + value + end;
    }
    return content;
}
function generateStyles(settings) {
    let start = new Date();
    if (!settings.generate) {
        return;
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
        for (let name_index = 0, l = ATTRIBUTE_LIST.length; name_index < l; name_index++) {
            const name = ATTRIBUTE_LIST[name_index];
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
    console.warn('Generated CSS in', (new Date()).getTime() - start.getTime(), 'ms');
    const style = document.createElement("style");
    style.textContent = result.join('');
    document.currentScript.parentElement.insertBefore(style, document.currentScript);
}
function getUserSettings() {
    const dataset = document.currentScript.dataset;
    const generate = dataset.generate === undefined ? true : dataset.generate === 'true';
    const enabled = dataset.enabled === undefined ? true : dataset.enabled === 'true';
    const mode = dataset.mode || 'desktop-first';
    const isDesktopFirst = mode === "desktop-first";
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
        generate,
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

let start = new Date();
const settings = getUserSettings();
generateStyles(settings);
console.warn('Loaded styles in', (new Date()).getTime() - start.getTime(), 'ms');
if (settings.enabled) {
    domObserver.observe(document, { childList: true, subtree: true });
}

export { observe };
