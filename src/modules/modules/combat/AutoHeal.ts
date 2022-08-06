
import { WeaponIds } from "@mathrandom7910/moomooapi/src/data/objects/weapons";
import { nearestEnemy, player } from "../../../instances";
import { getTime } from "../../../utils/miscutils";
import { heal, healUp, healWithDelay } from "../../../utils/placeutils";
import { Category, Module } from "../../module";

var lastDmgTime = getTime();
var lastHealTime = getTime();
var shameChance = 0;
var lastHealth = 100;
var isHeal = false;

function healSmartDel() {
    setTimeout(() => {
        // current time     last heal     
        if(getTime() - lastHealTime <= 125) {
            return healSmartDel();
        }
        lastHealTime = getTime();
        healUp();
    }, 130);
}

export class AutoHeal extends Module {
    smartCheck = this.addBool("smartcheck", true, "attempts to determine if the enemy is trying to insta");
    smartCheckShame = this.addBool("smartcheckshame", true, "attempts to calculate current shame, and heal accordingly, requires smartcheck to be enabled");
    smartCheckShameVal = this.addNum("smartcheckshameval", 4, 0, 6, "the maximum shame count to stop fast healing, requires smartchecksame to be enabled");
    antiAgeOne = this.addBool("antiageone", true, "tries to outheal age one instas");

    constructor() {
        
        super("autoheal", Category.COMBAT, "automatically heals");
        this.on("health", (e) => {

            if(e.sid != player.sid) return;

            const health = e.health;

            isHeal = health > lastHealth;

            if(isHeal) {
                // lastHealTime = getTime();
                // const timeDif = lastHealTime - lastDmgTime;
                if(lastHealTime - lastDmgTime <= 120) {
                    shameChance++;
                } else {
                    shameChance -= 2;
                }
            } else {
                lastDmgTime = getTime();
            }

            if(health >= 100) return;
            var shouldInstaHeal = false;
            
            if(this.smartCheck.val && nearestEnemy && nearestEnemy.dist(player) <= 600 && health <= 75) {
                if(this.smartCheckShame.val && shameChance > this.smartCheckShameVal.val) {
                    healWithDelay();
                    return;
                }
                if(health <= 55) shouldInstaHeal = true;

                if(this.antiAgeOne.val && health <= 65 && nearestEnemy.wep == WeaponIds.TOOL_HAMMER) {
                    shouldInstaHeal = true;
                    setTimeout(heal, 110);
                }
            }

            if(shouldInstaHeal) {
                healUp();
                //setTimeout(healUp, 250);
            } else healSmartDel();
        });
    }
}
