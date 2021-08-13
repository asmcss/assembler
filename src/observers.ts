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

import StyleHandler from "./StyleHandler";

let _documentObserver:MutationObserver = null;
let _elementObserver:MutationObserver = null;
let _shadowRootObserver:MutationObserver = null;
const observedElements = new WeakMap<HTMLElement, any[]>();

export function observeDocument(document: Document, handler: StyleHandler): void {
    if (_documentObserver === null) {
        _documentObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (let i = 0, l = mutations.length; i < l; i++) {
                const nodes = mutations[i].addedNodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] instanceof HTMLElement) {
                        observe(nodes[i] as HTMLElement, handler);
                    }
                }
            }
        });
    }
    _documentObserver.observe(document, {childList: true, subtree: true});
}

function observeElement(element: Element, handler: StyleHandler): void {
    if (_elementObserver === null) {
        _elementObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (const mutation of mutations) {
                const target = mutation.target as HTMLElement;
                observedElements.set(target, handler.handleStyleChange(
                    target,
                    target.getAttribute(mutation.attributeName),
                    observedElements.get(target)
                ));
            }
        });
    }
    _elementObserver.observe(element, {
        attributes: true,
        attributeOldValue: true,
        childList: true,
        attributeFilter: [handler.userSettings.xStyleAttribute],
    });
}

export function observeShadow(shadow: ShadowRoot, handler: StyleHandler) {
    if (_shadowRootObserver === null) {
        _shadowRootObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (let i = 0, l = mutations.length; i < l; i++) {
                const nodes = mutations[i].addedNodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] instanceof HTMLElement) {
                        observe(nodes[i] as HTMLElement, handler);
                    }
                }
            }
        });
    }
    _shadowRootObserver.observe(shadow, {childList: true, subtree: true});
}

function observe(element: HTMLElement, handler: StyleHandler): void {
    if (observedElements.has(element)) {
        return;
    }
    const style = element.attributes.getNamedItem(handler.userSettings.xStyleAttribute);
    observedElements.set(element, style ? handler.handleStyleChange(element, style.value, []) : []);

    observeElement(element, handler);

    for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
        observe(child as HTMLElement, handler);
    }
}
