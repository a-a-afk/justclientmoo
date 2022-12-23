import { AccessoryIds, HatIds } from "@mathrandom7910/moomooapi";
import { canvas } from "../../../utils/elementutils";
import { acc, hat } from "../../../utils/player";
import { Category, Module } from "../../module"

export class ClickGear extends Module {
    downHatL = this.addHat("downhatleft", HatIds.BULL_HELMET, "the hat to equip when you left click");
    downAccL = this.addAcc("downaccleft", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you left click");

    upHatL = this.addHat("uphatleft", HatIds.SPIKE_GEAR, "the hat to equip when you release left click");
    upAccL = this.addAcc("upaccleft", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you release left click");

    downHatR = this.addHat("downhatright", HatIds.TANK_GEAR, "the hat to equip when you right click");
    downAccR = this.addAcc("downaccright", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you right click");

    upHatR = this.addHat("uphatright", HatIds.SOLDIER_HELMET, "the hat to equip when you release right click");
    upAccR = this.addAcc("upaccright", AccessoryIds.CORRUPT_X_WINGS, "the accessory to equip when you release right click");

    constructor() {
        super("clickgear", Category.GEAR, "equips gear when you click");

        canvas.addEventListener("mousedown", (e) => {
            if(e.button == 0) {
                hat(this.downHatL.val);
                acc(this.downAccL.val);
            } else if(e.button == 1) {
                hat(this.downHatR.val);
                acc(this.downAccR.val);
            }
        });

        canvas.addEventListener("mouseup", (e) => {
            if(e.button == 0) {
                hat(this.upHatL.val);
                acc(this.upAccL.val);
            } else if (e.button == 1) {
                hat(this.upHatR.val);
                acc(this.upAccR.val);
            }
        });
    }
}