import { C2SPacketType } from "@mathrandom7910/moomooapi";
import { api } from "../../../instances";
import { onSendPack } from "../../../utils/networkutils";
import { Category, Module } from "../../module";

export class AntiAim extends Module {
    hit360 = this.addBool("360hit", false, "sends Number.MAX_VALUE as your direction");
    constructor() {
        super("antiaim", Category.MISC, "makes you look wierd");

        onSendPack(C2SPacketType.SET_ANGLE, (e) => {
            e.isCanceled = true;
            api.sendHidden(C2SPacketType.SET_ANGLE, this.getDirection());
        }, this);
    }

    getDirection() {
        if(this.hit360.val) {
            return Number.MAX_VALUE;
        } else return null;
    }

    onEnable(): void {
        api.sendHidden(C2SPacketType.SET_ANGLE, this.getDirection());
    }
}