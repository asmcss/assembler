import {domObserver, generateStyles, getUserSettings, getPropertyHash, extract, getStyleEntries} from "./common";

export {getPropertyHash as hash, extract, getStyleEntries as parse};

const settings = getUserSettings();
generateStyles(settings);
if (settings.enabled) {
    domObserver.observe(document, {childList: true, subtree: true});
}
