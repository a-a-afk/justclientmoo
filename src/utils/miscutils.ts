import { GameObject } from "@mathrandom7910/moomooapi/src/gameobject";
import { Pos } from "@mathrandom7910/pos";
import { addNotif } from "../notifications";

export function getTime() {
    return Date.now();
}

export class Color {
    constructor(public r: number, public g: number, public b: number, public a = 1) {

    }

    toString() {
        return JSON.stringify(this);
    }

    toHex() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }

    static RED = new Color(255, 0, 0);
    static GREEN = new Color(0, 255, 0);
    static BLUE = new Color(0, 0, 255);
    static WHITE = new Color(255, 255, 255);
    static BLACK = new Color(0, 0, 0);
}

export var isBlurred = false;

addEventListener("blur", () => {
    isBlurred = true;
});

addEventListener("focus", () => {
    isBlurred = false;
});

export function buildingToPos(building: GameObject) {
    return new Pos(building.x, building.y);
}

export class ErInf {
    info(notif: string) {
        addNotif(notif);
    }

    error(notif: string) {
        addNotif(notif, true);
    }
}