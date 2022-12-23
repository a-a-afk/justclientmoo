import { ItemIds } from "@mathrandom7910/moomooapi";
import { api, player } from "../../../instances";
import { mouseDir } from "../../../utils/elementutils";
import { isAutoFire, look, lookAt, toggleAuto } from "../../../utils/player";
import { Category, Module } from "../../module";

var inTrap = false;
var inTrapLastTick = false;

export class TrapNuker extends Module {
    constructor() {
        super("trapnuker", Category.COMBAT, "Breaks traps that you're in");
        this.on("serverTick", () => {
            for(const obj of api.gameObjects) {
                if(obj.buildType == ItemIds.PIT_TRAP && obj.dist(player) <= 95) {
                    lookAt(obj, true);
                    inTrap = true;
                    if(!isAutoFire) {
                        toggleAuto();
                    }
                    break;
                }
            }

            if(!inTrap && inTrapLastTick) {
                if(isAutoFire) {
                    toggleAuto();
                    look(mouseDir, false);
                }
            }
            
            inTrapLastTick = inTrap;
        });
    }

    onDisable(): void {
        if(isAutoFire) {
            toggleAuto();
            look(mouseDir, false);
        }
    }
}