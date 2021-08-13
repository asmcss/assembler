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
import {observeDocument} from "./observers";
import {getUserSettings} from "./helpers";
import {generateRootVariables} from "./variables";
import StyleHandler from "./StyleHandler";

export {registerMixin} from "./mixins";
export {style} from "./helpers";

declare global {
    interface Document {
        adoptedStyleSheets: CSSStyleSheet[];
    }
    interface CSSStyleSheet {
        replace(css: string);
        replaceSync(css: string);
    }
}

export function init(options?: {[key: string]: string}): boolean {
    const settings = getUserSettings(options || document.currentScript.dataset);

    if (!settings.enabled) {
        return false;
    }

    let tracker: Set<string>;
    let stylesheet: CSSStyleSheet;

    if (settings.constructable && document.adoptedStyleSheets) {
        stylesheet = new CSSStyleSheet();
        if (settings.generate) {
            const generated = generateStyles(settings);
            tracker = generated.tracker;
            stylesheet.replaceSync(generated.content);
        } else {
            tracker = new Set<string>();
            stylesheet.replaceSync(generateRootVariables(settings));
        }
        document.adoptedStyleSheets = [stylesheet];
    } else {
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

