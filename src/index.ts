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

import {generateStyles} from "./generators";
import {observeDocument, observeShadow} from "./observers";
import {getUserSettings, style} from "./helpers";
import {generateRootVariables} from "./variables";
import StyleHandler from "./StyleHandler";

export {registerMixin} from "./mixins";
export {style};

declare global {
    interface Document {
        adoptedStyleSheets: CSSStyleSheet[];
    }
    interface CSSStyleSheet {
        replace(css: string);
        replaceSync(css: string);
    }
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}

let styleHandler: StyleHandler = null;
let supportsConstructable = true;
let settings = null;
const observedShadowRoots = new WeakMap<ShadowRoot, boolean>();

export function init(options?: {[key: string]: string}): boolean {
    settings = getUserSettings(options || document.currentScript.dataset);

    if (!settings.enabled) {
        return false;
    }

    let tracker: Set<string>;
    let stylesheet: CSSStyleSheet;

    if (settings.constructable && document.adoptedStyleSheets && Object.isFrozen(document.adoptedStyleSheets)) {
        stylesheet = new CSSStyleSheet();
        if (settings.generate) {
            const generated = generateStyles(settings);
            tracker = generated.tracker;
            stylesheet.replaceSync(generated.content);
        } else {
            tracker = new Set<string>();
            stylesheet.replaceSync(generateRootVariables(settings));
        }
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
    } else {
        supportsConstructable = false;
        const style = document.createElement("style");
        const generated = generateStyles(settings);
        tracker = generated.tracker;
        style.id = 'opis-assembler-css';
        style.textContent = generated.content;
        document.currentScript.parentElement.insertBefore(style, document.currentScript);
        stylesheet = style.sheet;
    }

    styleHandler = new StyleHandler(settings, stylesheet, tracker);

    observeDocument(document, styleHandler);

    return true;
}

export function handleShadow(shadowRoot: ShadowRoot): boolean {
    if (styleHandler === null) {
        init();
    }

    if (!supportsConstructable || !shadowRoot.adoptedStyleSheets || !Object.isFrozen(shadowRoot.adoptedStyleSheets)) {
        return false;
    }

    if (observedShadowRoots.has(shadowRoot)) {
        return true;
    }

    observedShadowRoots.set(shadowRoot, true);

    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styleHandler.style];

    observeShadow(shadowRoot, styleHandler);

    return true;
}

if (typeof window !== 'undefined') {
    init();
}

