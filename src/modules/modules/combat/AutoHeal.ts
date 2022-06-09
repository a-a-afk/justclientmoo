
import { player } from "../../../instances";
import { getTime } from "../../../utils/miscutils";
import { healUp } from "../../../utils/placeutils";
import { Category, Module } from "../../module";



var lastHealTime = getTime();

export class AutoHeal extends Module {
    healDel = this.addNum("healdelay", 130, 0, 1000, "delay to heal, healing below than or equal to 120 ms WILL increase shame");

    checkDelay = this.addBool("checkdelay", true, "will not heal if healed within the last delay (lowers clown chance)");
    checkDelayMin = this.addNum("checkmin", 20, 10, 80, "minimum \"panic\" health in which it will ignore the checkdelay")

    constructor() {
        
        super("autoheal", Category.COMBAT, "automatically heals");
        this.on("health", (e) => {

            if(e.sid != player.sid) return;
            const health = e.health;
            if(health != 100) {
                setTimeout(() => {
                    if(this.checkDelay.val) {
                        const curTime = getTime();
                        if((curTime - lastHealTime) < this.healDel.val && health >= this.checkDelayMin.val) return;
                    }
                    healUp();
                }, this.healDel.val);
            }
        });
    }
}
