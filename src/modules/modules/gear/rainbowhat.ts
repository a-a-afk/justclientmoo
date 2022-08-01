import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { api } from "../../../instances";
import { hat } from "../../../utils/player";
import { Category, Module } from "../../module";

const hats: HatIds[] = [];
var hatIndex = 0;
var tick = 0;

for(let i in HatIds) {
    const asNum = parseInt(i);
    if(!isNaN(asNum)) {
        hats.push(asNum);
    }
}

export class RainbowHat extends Module {
    tickInterval = this.addNum("interval", 5, 1, 50, "interval to change hats");

    constructor() {
        super("rainbow", Category.GEAR, "cycles through hats");

        this.on("serverTick", () => {
            tick++;

            if(tick >= this.tickInterval.val) {
                while(!api.hatsOwned[hats[hatIndex]]) {
                    hatIndex++;
                    if(hatIndex >= hats.length) hatIndex = 0;
                }
                tick = 0;
                hat(hats[hatIndex]);
                hatIndex++;
                if(hatIndex >= hats.length) hatIndex = 0;
            }
        });
    }

    onDisable(): void {
        hat(0);
    }
}