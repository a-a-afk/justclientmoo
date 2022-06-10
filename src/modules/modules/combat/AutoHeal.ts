
import { player } from "../../../instances";
import { getTime } from "../../../utils/miscutils";
import { healUp } from "../../../utils/placeutils";
import { Category, Module } from "../../module";



var lastHealTime = getTime();

export class AutoHeal extends Module {
    healDel = this.addNum("healdelay", 130, 0, 1000, "delay to heal, healing below than or equal to 120 ms WILL increase shame");

    checkDelay = this.addBool("checkdelay", true, "will not heal if healed within the last delay (lowers clown chance)");
    smartCheck = this.addBool("smartcheck", true, "attempts to determine if the enemy is trying to insta");

    constructor() {
        
        super("autoheal", Category.COMBAT, "automatically heals");
        this.on("health", (e) => {

            if(e.sid != player.sid) return;
            const health = e.health;
            if(health != 100) {
                setTimeout(() => {
                    if(this.checkDelay.val) {
                        const curTime = getTime();

                        if(this.smartCheck.val) {
                            
                        }

                        if((curTime - lastHealTime) < this.healDel.val) return;
                    }
                    healUp();
                }, this.healDel.val);
            }
        });
    }
}
