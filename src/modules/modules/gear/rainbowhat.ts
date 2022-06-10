import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { S2CPacketType } from "@mathrandom7910/moomooapi/src/packets";
import { hat } from "../../../utils/player";
import { Category, Module } from "../../module";

const hats: number[] = [];
var hatIndex = 0;
var tick = 0;

for(let i in HatIds) {
    const asInt = parseInt(i);
    if(!isNaN(asInt)) {
        hats.push(asInt);
    }
}

export class RainbowHat extends Module {
    tickInterval = this.addNum("interval", 5, 1, 50, "interval to change hats");

    constructor() {
        super("rainbow", Category.GEAR, "cycles through hats");

        this.on("packetReceive", (e) => {
            if(e.type == S2CPacketType.UPDAE_PLAYERS) {
                tick++;

                if(tick >= this.tickInterval.val) {
                    tick = 0;
                    hat(hats[hatIndex]);
                    hatIndex++;
                    if(hatIndex >= hats.length) hatIndex = 0;
                }
            }
        });
    }
}