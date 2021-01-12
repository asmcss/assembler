import {domObserver, generateStyles, getUserSettings, extract, getStyleEntries} from "./common";

export {extract, getStyleEntries as parse};

const settings = getUserSettings();
generateStyles(settings);
if (settings.enabled) {
    domObserver.observe(document, {childList: true, subtree: true});
}
