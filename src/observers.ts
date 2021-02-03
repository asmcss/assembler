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

import {parseApplyAttribute} from "./mixin";
import StyleHandler from "./StyleHandler";

const APPLY_ATTR = 'x-apply';
const STYLE_ATTR = "x-style";

let _documentObserver:MutationObserver = null;
let _elementObserver:MutationObserver = null;
const observedElements = new WeakMap<HTMLElement, string|null>();

export function observeDocument(document: Document, handler: StyleHandler) {
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

function observeElement(element: Element, handler: StyleHandler) {
    if (_elementObserver === null) {
        _elementObserver = new MutationObserver(function (mutations: MutationRecord[]): void {
            for (const mutation of mutations) {
                const target = mutation.target as HTMLElement;
                const newValue = target.getAttribute(mutation.attributeName);
                switch (mutation.attributeName) {
                    case STYLE_ATTR:
                        whenStyleChanged(handler, target, mutation.oldValue, newValue);
                        break;
                    case APPLY_ATTR:
                        whenApplyChanged(handler, target, newValue);
                        break;
                }
            }
        });
    }
    _elementObserver.observe(element, {attributes: true, attributeOldValue: true, childList: true, attributeFilter: [STYLE_ATTR, APPLY_ATTR]});
}

export function observeShadow(shadow: ShadowRoot, handler: StyleHandler) {
    for (let n = shadow.firstElementChild; n !== null; n = n.nextElementSibling) {
        observe(n as HTMLElement, handler);
    }
}

function observe(element: HTMLElement, handler: StyleHandler): void {
    if (observedElements.has(element)) {
        return;
    }

    observedElements.set(element, null);

    const style = element.attributes.getNamedItem(STYLE_ATTR);
    const apply = element.attributes.getNamedItem(APPLY_ATTR);

    let content = '';

    if (apply) {
        content = parseApplyAttribute(apply.value);
        if (content !== '') {
            observedElements.set(element, content);
            content += ';';
        }
    }

    if (style) {
        content += style.value;
    }

    if (content !== '') {
        handler.handleStyleChange(element, null, content);
    }

    observeElement(element, handler);

    for (let child = element.firstElementChild; child != null; child = child.nextElementSibling) {
        observe(child as HTMLElement, handler);
    }
}

function whenApplyChanged(handler: StyleHandler, element: HTMLElement, newApply: string | null): void {
    let prevApply = observedElements.get(element) || null;

    if (newApply != null) {
        newApply = parseApplyAttribute(newApply);
    }

    observedElements.set(element, newApply);

    if (element.hasAttribute(STYLE_ATTR)) {
        const style = element.getAttribute(STYLE_ATTR);
        if (prevApply == null) {
            prevApply = style;
        } else {
            prevApply += ';' + style;
        }
        if (newApply == null) {
            newApply = style;
        } else {
            newApply += ';' + style;
        }
    }

    handler.handleStyleChange(element, prevApply, newApply);
}

function whenStyleChanged(handler: StyleHandler, element: HTMLElement, prevValue: string|null, newValue: string | null) {
    const apply = observedElements.get(element) || null;

    if (apply != null) {
        if (prevValue == null) {
            prevValue = apply;
        } else {
            prevValue = apply + ';' + prevValue;
        }
        if (newValue == null) {
            newValue = apply;
        } else {
            newValue = apply + ';' + newValue;
        }
    }

    handler.handleStyleChange(element, prevValue, newValue);
}
