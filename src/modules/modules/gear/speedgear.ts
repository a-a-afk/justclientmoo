import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { player } from "../../../instances";
import { acc, hat } from "../../../utils/player";
import { Category, Module } from "../../module";

export class SpeedGear extends Module {
    constructor() {
        super("speedgear", Category.GEAR, "Equips the fastest gear");
    }

    onEnable(): void {
        if (player.y < 2400) {
            hat(HatIds.WINTER_CAP);
        } else if (player.y > 6850 && player.y < 7550) {
            hat(HatIds.FLIPPER_HAT);
        } else {
            hat(0);
            hat(HatIds.BOOSTER_HAT);
        }
        acc(AccessoryIds.MONKEY_TAIL);
        this.disable();
    }
}