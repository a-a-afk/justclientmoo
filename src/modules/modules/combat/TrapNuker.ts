import { ItemIds } from "@mathrandom7910/moomooapi/src/data/objects/items";
import { api, player } from "../../../instances";
import { isAutoFire, lookAt, toggleAuto } from "../../../utils/player";
import { Category, Module } from "../../module";

export class TrapNuker extends Module {
    constructor() {
        super("trapnuker", Category.COMBAT, "Breaks traps that you're in");
        this.on("serverTick", () => {
            for(const obj of api.gameObjects) {
                const objPos = obj.getAsPos();
                if(obj.buildType == ItemIds.PIT_TRAP && objPos.dist(player.getAsPos()) <= 95) {
                    lookAt(objPos);
                    if(!isAutoFire) {
                        toggleAuto();
                    }
                }
            }
        });
    }

    onDisable(): void {
        if(isAutoFire) {
            toggleAuto();
        }
    }
}