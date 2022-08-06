
import { commandPrefix } from "../commands/command";
import { Category } from "../modules/module";
import { setStorage, storageDat } from "../storage";

export function createElement<K extends keyof HTMLElementTagNameMap>(name: K, clazz?: string) {
    const elem = document.createElement(name);
    if(clazz) elem.className = clazz;
    return elem;
}

export function createInput(type: string, clazz?: string) {
    const elem = createElement("input", clazz);
    elem.type = type;
    return elem;
}

export function createDiv(clazz?: string) {
    return createElement("div", clazz);
}

export function createPElem(content: string, clazz?: string) {
    const elem = createElement("p", clazz);
    elem.textContent = content;
    return elem;
}

export function removeChildren(elem: HTMLElement) {
    while(elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

export var canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
export const chatBox = document.getElementById("chatBox") as HTMLInputElement;

export var mouseDir: number;

canvas.addEventListener("mousemove", (e) => {
    mouseDir = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
});

chatBox.addEventListener("input", () => {
    if(chatBox.value.startsWith(commandPrefix)) {
        chatBox.removeAttribute("max");
    } else {
        chatBox.setAttribute("max", "30");
    }
});

export var guiHolder = createDiv("guiHolder");

function cancelEvent(e: Event) {
    e.preventDefault();
}
/*
var mouseOver: Element | null;

document.addEventListener("mousemove", (e) => {
    mouseOver = document.elementFromPoint(e.clientX, e.clientY);
});*/


export function makeDraggable(elem: HTMLElement, cat: Category) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elem.onmousedown = dragMouseDown;
    
    elem.addEventListener("contextmenu", cancelEvent);

    function dragMouseDown(e: MouseEvent) {
        if(e.button == 0) {//left button
            cancelEvent(e);
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = dragStop;
            document.onmousemove = elementDrag;
        } else if(e.button == 2) {//right button
            
        }
    }

    function elementDrag(e: MouseEvent) {
        cancelEvent(e);
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const tmpTop = elem.offsetTop - pos2,
            tmpLeft = elem.offsetLeft - pos1;
        
        elem.style.top = tmpTop + "px";
        elem.style.left = tmpLeft + "px";
        storageDat.menuPos[cat] = {
            left: tmpLeft,
            top: tmpTop,
            category: cat
        }
        setStorage();
    }

    function dragStop() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

