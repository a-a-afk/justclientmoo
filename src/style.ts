import * as STYLE from "./style.css";

export function initStyle() {
    const styleElm = document.createElement("style");
    styleElm.setAttribute("type", "text/css");
    styleElm.appendChild(document.createTextNode(STYLE.default));
    document.head.appendChild(styleElm);
}