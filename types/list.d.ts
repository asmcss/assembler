export declare const PROPERTY_LIST: string[];
export declare const PROPERTY_VARIANTS: {
    animation: string[];
    appearance: string[];
    "background-clip": string[];
    "backdrop-filter": string[];
    "column-gap": string[];
    "user-select": string[];
    "text-fill-color": string[];
};
export declare const STATE_LIST: string[];
export declare const ALIASES: {
    backdrop: string;
    bg: string;
    "bg-attachment": string;
    "bg-blend": string;
    "bg-clip": string;
    "bg-color": string;
    "bg-image": string;
    "bg-position": string;
    "bg-repeat": string;
    "bg-size": string;
    radius: string;
    "radius-top": string[];
    "radius-bottom": string[];
    "radius-left": string[];
    "radius-right": string[];
    "radius-bl": string;
    "radius-br": string;
    "radius-tl": string;
    "radius-tr": string;
    b: string;
    bt: string;
    bl: string;
    br: string;
    bb: string;
    "bt-color": string;
    "bt-style": string;
    "bt-width": string;
    "bl-color": string;
    "bl-style": string;
    "bl-width": string;
    "br-color": string;
    "br-style": string;
    "br-width": string;
    "bb-color": string;
    "bb-style": string;
    "bb-width": string;
    m: string;
    mt: string;
    mb: string;
    ml: string;
    mr: string;
    mx: string[];
    my: string[];
    p: string;
    pt: string;
    pb: string;
    pl: string;
    pr: string;
    px: string[];
    py: string[];
    "min-w": string;
    "max-w": string;
    "min-h": string;
    "max-h": string;
    w: string;
    h: string;
    img: string;
    gradient: string;
    "radial-gradient": string;
    "conic-gradient": string;
    "flex-dir": string;
    "grid-rows": string;
    "grid-flow": string;
    "row-start": string;
    "row-span": string;
    "grid-cols": string;
    "col-start": string;
    "col-span": string;
    "col-gap": string;
    "auto-cols": string;
    "auto-rows": string;
    e: string;
    overscroll: string;
    "overscroll-x": string;
    "overscroll-y": string;
    inset: string[];
    "inset-x": string[];
    "inset-y": string[];
    z: string;
    decoration: string;
    "v-align": string;
    ws: string;
    ring: string;
    leading: string;
    tracking: string;
    break: (v: any) => string[];
    truncate: string[];
    flex: (v: any) => "display" | "flex";
    "inline-flex": string;
    grid: string;
    "inline-grid": string;
    hidden: string;
    block: string;
    "inline-block": string;
    static: string;
    fixed: string;
    absolute: string;
    relative: string;
    sticky: string;
    visible: string;
    invisible: string;
    "flex-row": string;
    "flex-col": string;
    list: (v: any) => "list-style-position" | "list-style-type";
    text: (v: any) => string[] | "font-size";
    uppercase: string;
    lowercase: string;
    capitalize: string;
    "normal-case": string;
    variant: string;
};
export declare const DEFAULT_VALUES: {
    border: string[];
    truncate: string[];
    flex: string;
    "inline-flex": string;
    grid: string;
    "inline-grid": string;
    hidden: string;
    block: string;
    "inline-block": string;
    static: string;
    fixed: string;
    absolute: string;
    relative: string;
    sticky: string;
    visible: string;
    invisible: string;
    "flex-row": string;
    "flex-col": string;
    "flex-wrap": string;
    "flex-grow": string;
    "flex-shrink": string;
    uppercase: string;
    lowercase: string;
    capitalize: string;
    "normal-case": string;
    radius: string;
};
export declare const VALUE_WRAPPER: {
    img: (v: any) => string;
    gradient: (value: any) => string;
    "radial-gradient": (value: any) => string;
    "conic-gradient": (value: any) => string;
    "grid-rows": (v: any) => string;
    "row-span": (v: any) => string;
    "grid-cols": (v: any) => string;
    "col-span": (v: any) => string;
    e: (v: any) => any;
    ring: (v: any) => string;
    "font-size": (v: any) => any;
    leading: (v: any) => any;
    tracking: (v: any) => any;
    text: (v: any) => any;
    radius: (v: any) => any;
    "radius-top": (v: any) => any;
    "radius-left": (v: any) => any;
    "radius-bottom": (v: any) => any;
    "radius-right": (v: any) => any;
    "radius-tl": (v: any) => any;
    "radius-bl": (v: any) => any;
    "radius-tr": (v: any) => any;
    "radius-br": (v: any) => any;
    break: (v: any) => string[] | "break-all" | "break-word";
    "flex-wrap": (v: any) => any;
    "flex-row": (v: any) => any;
    "flex-col": (v: any) => any;
    order: (v: any) => any;
    padding: (v: any) => any;
    "padding-top": (v: any) => any;
    "padding-bottom": (v: any) => any;
    "padding-left": (v: any) => any;
    "padding-right": (v: any) => any;
    p: (v: any) => any;
    pt: (v: any) => any;
    pb: (v: any) => any;
    pl: (v: any) => any;
    pr: (v: any) => any;
    px: (v: any) => any;
    py: (v: any) => any;
    margin: (v: any) => any;
    "margin-top": (v: any) => any;
    "margin-bottom": (v: any) => any;
    "margin-left": (v: any) => any;
    "margin-right": (v: any) => any;
    m: (v: any) => any;
    mt: (v: any) => any;
    mb: (v: any) => any;
    ml: (v: any) => any;
    mr: (v: any) => any;
    mx: (v: any) => any;
    my: (v: any) => any;
    w: (v: any) => any;
    h: (v: any) => any;
    width: (v: any) => any;
    height: (v: any) => any;
    "min-w": (v: any) => any;
    "max-w": (v: any) => any;
    "min-h": (v: any) => any;
    "max-h": (v: any) => any;
    "min-width": (v: any) => any;
    "max-width": (v: any) => any;
    "min-height": (v: any) => any;
    "max-height": (v: any) => any;
};
