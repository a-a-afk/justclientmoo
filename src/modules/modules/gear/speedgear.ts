import { AccessoryIds, HatIds } from "@mathrandom7910/moomooapi";
import { player } from "../../../instances";
import { acc, hat } from "../../../utils/player";
import { Category, Module } from "../../module";

export class SpeedGear extends Module {
    deEquipHat = this.addBool("deequiphat", true, "deequips your current hat");
    constructor() {
        super("speedgear", Category.GEAR, "Equips the fastest gear");
    }

    onEnable(): void {
        if (this.deEquipHat.val) hat(HatIds.NONE);
        if (player.y < 2400) {
            console.log("winter")
            hat(HatIds.WINTER_CAP);
        } else if (player.y > 6850 && player.y < 7550) {
            console.log("flip")
            hat(HatIds.FLIPPER_HAT);
        } else {
            console.log("boost")

            hat(HatIds.BOOSTER_HAT);
        }
        acc(AccessoryIds.MONKEY_TAIL);
        this.disable();
    }
}