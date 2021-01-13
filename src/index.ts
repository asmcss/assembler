import {domObserver, generateStyles, getUserSettings, extract, getStyleEntries} from "./common";

export {extract, getStyleEntries as parse};

const settings = getUserSettings();

if (settings.enabled) {
    const style = document.createElement("style");
    style.textContent = generateStyles(settings);
    document.currentScript.parentElement.insertBefore(style, document.currentScript);
    domObserver.observe(document, {childList: true, subtree: true});
}
