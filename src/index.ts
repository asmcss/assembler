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
import StyleHandler from "./StyleHandler";

export {observeShadow};
export {registerMixin} from "./mixin";
export {style};

export function init(options?: {[key: string]: string}): boolean {
    const settings = getUserSettings(options || document.currentScript.dataset);

    if (!settings.enabled) {
        return false;
    }

    const style = document.createElement("style");
    style.id = 'opis-assembler-css';
    style.textContent = generateStyles(settings);
    document.currentScript.parentElement.insertBefore(style, document.currentScript);
    observeDocument(document, new StyleHandler());

    return true;
}

if (typeof window !== 'undefined') {
    init();
}

