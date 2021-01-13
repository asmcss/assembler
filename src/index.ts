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

import {generateStyles, getUserSettings} from "./common";
import {observeDocument} from "./observers";
import {extract, getStyleEntries as parse} from "./handlers";

export {extract, parse};

type StyleType = string|{[key: string]: string};

export function style(...styles: (StyleType|StyleType[])[]): string {
    let str = '';

    for (const item of styles) {
        if (typeof item === 'string') {
            str += item.trim() + '; ';
        } else if (Array.isArray(item)) {
            str += style(...item) + '; ';
        } else {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    str += key + ':' + item[key] + '; '
                }
            }
        }
    }

    return str;
}

export function init(options?: {[key: string]: string}): boolean {
    const settings = getUserSettings(options || document.currentScript.dataset);

    if (!settings.enabled) {
        return false;
    }

    const style = document.createElement("style");
    style.textContent = generateStyles(settings);
    document.currentScript.parentElement.insertBefore(style, document.currentScript);
    observeDocument(document, {childList: true, subtree: true});
    return true;
}

if (typeof window !== 'undefined') {
    init();
}

