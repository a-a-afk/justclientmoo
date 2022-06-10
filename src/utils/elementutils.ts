
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

export var canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

export var mouseDir: number;

canvas.addEventListener("mousemove", (e) => {
    mouseDir = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
});

/*var mouseX = 0,
mouseY = 0;

class ElemDat {
    isDown = false;
    constructor(public elem: HTMLElement) {

    }
}*/

/*const elems: ElemDat[] = [];

function moveToMouse(elem: HTMLElement) {
    elem.style.left = mouseX + "px";
    elem.style.top = mouseY + "px";
}*/

/*export function makeDraggable(elem: HTMLElement) {
    var isDown = false;
    elems.push(new ElemDat(elem));

    elem.addEventListener("mousedown", (e) => {
        isDown = true;
        e.preventDefault();
        console.log(elem.offsetTop, elem.offsetLeft);
        if(e.button == 0) {
            moveToMouse(elem);
        }
    });

    elem.addEventListener("mousemove", (e) => {
        if(!isDown) return;
        mouseX = elem.offsetLeft + e.clientX;
        mouseY = elem.offsetTop + e.clientY;
        moveToMouse(elem);
    });

    elem.addEventListener("mouseup", () => {
        isDown = false;
    });
}*/

/*
document.getElementById("gameCanvas")?.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    elems.forEach(dat => {
        if(!dat.isDown) return;
        moveToMouse(dat.elem);
    });
});*/

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

