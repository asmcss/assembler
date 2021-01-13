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

import {STYLE_ATTR, handleStyleChange} from "./handlers";

let _documentObserver:MutationObserver = null;
let _elementObserver:MutationObserver = null;
const observedElements = new WeakMap();

export function observeDocument(document: Document, options?: MutationObserverInit) {
    if (_documentObserver === null) {
        _documentObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (let i = 0, l = mutations.length; i < l; i++) {
                const nodes = mutations[i].addedNodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] instanceof HTMLElement) {
                        observe(nodes[i] as HTMLElement);
                    }
                }
            }
        });
    }
    _documentObserver.observe(document, options);
}

function observeElement(element: Element, options?: MutationObserverInit) {
    if (_elementObserver === null) {
        _elementObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (const mutation of mutations) {
                if (mutation.attributeName !== STYLE_ATTR) {
                    continue;
                }
                const target = mutation.target as HTMLElement;
                const newValue = target.getAttribute(mutation.attributeName);
                handleStyleChange(target, mutation.oldValue, newValue);
            }
        });
    }
    _elementObserver.observe(element, options);
}

function observe(element: HTMLElement, deep: boolean = true): void {
    if (deep) {
        for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
            observe(child as HTMLElement, true);
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

    observeElement(element, {attributes: true, attributeOldValue: true, attributeFilter: [STYLE_ATTR]});
}
