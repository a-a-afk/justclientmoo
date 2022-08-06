import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { canvas } from "../../../utils/elementutils";
import { acc, hat } from "../../../utils/player";
import { Category, Module } from "../../module"

export class ClickGear extends Module {
    downHatL = this.addHat("downhatleft", HatIds.BULL_HELMET, "the hat to equip when you left click");
    downAccL = this.addAcc("downaccleft", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you left click");

    upHatL = this.addHat("uphatleft", HatIds.SPIKE_GEAR, "the hat to equip when you release left click");
    upAccL = this.addAcc("upaccleft", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you release left click");

    // downHatR

    constructor() {
        super("clickgear", Category.GEAR, "equips gear when you click");

        canvas.addEventListener("mousedown", (e) => {
            if(e.button == 0) {
                hat(this.downHatL.val);
                acc(this.downAccL.val);
            }
        });

        canvas.addEventListener("mouseup", (e) => {
            if(e.button == 0) {
                hat(this.upHatL.val);
                acc(this.upAccL.val);
            }
        });
    }
}