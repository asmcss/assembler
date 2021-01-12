import {observe, domObserver, generateStyles, getUserSettings} from "./common";

export {observe}

let start = new Date();
const settings = getUserSettings();
generateStyles(settings);
console.warn('Loaded styles in', (new Date()).getTime() - start.getTime(), 'ms');
if (settings.enabled) {
    domObserver.observe(document, {childList: true, subtree: true});
}
