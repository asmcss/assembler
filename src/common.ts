import {PROPERTY_LIST, MEDIA_LIST, STATE_LIST, PROPERTY_VARIANTS, ALIASES, VALUE_WRAPPER} from "./list";

type PropertyInfo = {entry: string, property: string, name: string, value: string|null};
type UserSettings = {
    enabled: boolean,
    cache: string|null,
    breakpoints: {mode: string, settings: object, enabled: string[]},
    states: {enabled: string[]}
};

const X_ATTR_NAME = '_opis';
const VAR_REGEX = /@([a-zA-Z0-9\-_]+)/g;
const REF_REGEX = /&[a-zA-Z0-9_\-]+/g;
const PROPERTY_REGEX = /^(?:(?<media>[a-z]{2})\|)?(?<property>[-a-z]+)(?:\.(?<state>[-a-z]+))?$/m;
const ARGS_REGEX = /\${\s*(?<index>\d+)\s*(?:=(?<default>[^}]*))?}/g;
const APPLY_REGEX = /^(?<name>[a-z][a-z0-9_\-]*)(?:\s*\((?<args>.*)?\))?$/i;
const STYLE_ATTR = "x-style";
const APPLY_ATTR = "x-apply";
const OBSERVED_ATTRS = [STYLE_ATTR, APPLY_ATTR];
const CACHE_KEY = 'opis-assembler-cache';

const observedElements = new WeakMap();

const rootElement = new class {
    private styles: CSSStyleDeclaration = null;

    getComputedStyle(): CSSStyleDeclaration {
        if (this.styles === null) {
            this.styles = window.getComputedStyle(document.documentElement);
        }
        return this.styles;
    }

    getPropertyValue(property: string): string {
        let value = this.getComputedStyle().getPropertyValue(property).trim();

        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
        }

        return value;
    }
};

export const domObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
    for (let i = 0, l = mutations.length; i < l; i++) {
        const nodes = mutations[i].addedNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] instanceof HTMLElement) {
                observe(nodes[i] as HTMLElement);
            }
        }
    }
});

const observer = new MutationObserver(function (mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
        if (mutation.attributeName !== STYLE_ATTR) {
            continue;
        }
        const target = mutation.target as HTMLElement;
        const newValue = target.getAttribute(mutation.attributeName);
        handleStyleChange(target, mutation.oldValue, newValue);
    }
});

export function observe(element: HTMLElement, deep: boolean = true): void {
    if (deep) {
        for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
            observe(child as HTMLElement, true);
        }
    }

    if (observedElements.has(element)) {
        return;
    }

    observedElements.set(element, null);

    const apply = element.attributes.getNamedItem(APPLY_ATTR);
    const style = element.attributes.getNamedItem(STYLE_ATTR);

    if (apply) {
        handleApplyAttribute(element, apply.value);
    }

    if (style) {
        handleStyleChange(element, null, style.value);
    }

    observer.observe(element, {attributes: true, attributeOldValue: true, attributeFilter: OBSERVED_ATTRS});
}

function handleStyleChange(element: HTMLElement, oldContent: string|null, content: string|null): void {

    if (content === null) {
        return handleStyleRemoved(element, oldContent);
    }

    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];

    const styleEntries = oldContent === null ? new Map<string, PropertyInfo>() : getStyleEntries(oldContent);
    const newEntries = getStyleEntries(content);

    // remove old entries
    for (const [name, attr] of styleEntries) {
        if (newEntries.has(name)) {
            continue;
        }
        const {property, entry} = attr;
        opis_attrs.splice(opis_attrs.indexOf(entry), 1);
        element.style.removeProperty(property);
    }

    for (const attr of newEntries.values()) {
        const {property, entry, value} = attr;

        if (opis_attrs.indexOf(entry) < 0) {
            opis_attrs.push(entry);
        }

        element.style.setProperty(property, value);
    }

    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}

function handleStyleRemoved(element: HTMLElement, content: string): void {

    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];

    for (const attr of getStyleEntries(content).values()) {
        opis_attrs.splice(opis_attrs.indexOf(attr.entry), 1);
        element.style.removeProperty(attr.property);
    }

    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}

function handleApplyAttribute(element: HTMLElement, content: string): void {
    const references = content.split(';');
    const opis_attrs = element.hasAttribute(X_ATTR_NAME)
        ? element.getAttribute(X_ATTR_NAME).split(' ')
        : [];

    for (let i = 0, l = references.length; i < l; i++) {
        const reference = references[i].trim();
        if (reference === '') {
            continue;
        }

        const m = APPLY_REGEX.exec(reference)?.groups;

        if (!m || !m.name) {
            continue;
        }

        let value = rootElement.getPropertyValue('--' + m.name);
        if (m.args) {
            value = replaceArgs(value, extractArgs(replaceReferences(m.args)));
        }

        for (const attr of getStyleEntries(value).values()) {
            const {property, entry, value} = attr;

            if (opis_attrs.indexOf(entry) < 0) {
                opis_attrs.push(entry);
            }

            element.style.setProperty(property, value);
        }
    }

    element.setAttribute(X_ATTR_NAME, opis_attrs.join(' '));
}

export function extract(attr: string, value: string|null = null): PropertyInfo[] {
    const m = PROPERTY_REGEX.exec(attr)?.groups;

    if (!m || !m.property) {
        return [];
    }

    const media = MEDIA_LIST.indexOf(m.media || 'all');
    const state = STATE_LIST.indexOf(m.state || 'normal');

    if (media < 0 || state < 0) {
        return [];
    }

    let properties: string|string[] = m.property;
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

export function getStyleEntries(content: string, resolve: boolean = true): Map<string, PropertyInfo> {
    const entries = new Map<string, PropertyInfo>();

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

function extractArgs(value: string): string[] {
    const args = [];
    const len = value.length;
    let dataState = true, start_index = 0, open = 0;

    for (let i = 0; i < len; i++) {
        const c = value[i];
        if (dataState) {
            if (c === ',') {
                args.push(value.substring(start_index, i).trim());
                start_index = i + 1;
            } else if (c === '(') {
                open = 1;
                dataState = false;
            }
        } else {
            if (c === '(') {
                open++;
            } else if (c === ')' && --open === 0){
                dataState = true
            }
        }
    }

    if (start_index < len) {
        args.push(value.substring(start_index, len).trim());
    }

    return args;
}

function replaceArgs(content: string, args: string[]): string {
    const length = args.length;

    if (length === 0) {
        return content.replace(ARGS_REGEX, () => '');
    }

    return content.replace(ARGS_REGEX, (_: string, ...m: any[]): string => {
        const index = parseInt(m[0]);
        const fallback = m[1] || '';

        if (index < 0 || index >= length || args[index] === '') {
            return fallback;
        }

        return args[index];
    })
}

function replaceReferences(content: string): string {
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

export function getUserSettings(): UserSettings {
    const dataset = document.currentScript.dataset;

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
