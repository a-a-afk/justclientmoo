import { GameObject } from "@mathrandom7910/moomooapi/src/gameobject";
import { api, player } from "../../../instances";
import { isAutoFire, lookAt, toggleAuto } from "../../../utils/player";
import { Category, Module } from "../../module";

interface CurObj {
    dist: number | null,
    obj: GameObject | null
}



export class Nuker extends Module {
    constructor() {
        super("nuker", Category.WORLD, "breaks near buildings");

        this.on("serverTick", () => {
            const currentObj: CurObj = {
                dist: null,
                obj: null
            }
            for(const obj of api.gameObjects) {
                if(currentObj.dist == null || obj.getAsPos().dist(player.getAsPos()) < currentObj.dist) {
                    currentObj.obj = obj;
                    currentObj.dist = obj.getAsPos().dist(player.getAsPos());
                }
            }

            if(currentObj.obj && currentObj.dist! < 100) {
                lookAt(currentObj.obj);
                if(!isAutoFire) {
                    toggleAuto();
                }
            }
        });
    }
}