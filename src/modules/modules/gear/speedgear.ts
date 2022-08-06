import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { acc, hat } from "../../../utils/player";
import { Category, Module } from "../../module";

export class SpeedGear extends Module {
    constructor() {
        super("speedgear", Category.GEAR, "Equips the fastest gear");
    }

    onEnable(): void {
        hat(HatIds.BOOSTER_HAT);
        acc(AccessoryIds.MONKEY_TAIL);
        this.disable();
    }
}