import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { api, player } from "../../../instances";
import { addNotif } from "../../../notifications";
import { Category, Module } from "../../module";


export class ClownNotify extends Module {
    onlySelf = this.addBool("onlyself", false, "only notifies if you have clown")
    constructor() {
        super("clownnotify", Category.COMBAT, "notifies you if a player gets clown");

        var clownMap: Record<number, boolean> = {};

        this.on("updatePlayer", (e) => {
            if(this.onlySelf.val && e.sid != player.sid) return;
            
            const isClown = e.hat == HatIds.SHAME;
            if(!isClown && clownMap[e.sid] == undefined) {
                clownMap[e.sid] = false;
                return;
            }

            if(clownMap[e.sid] != isClown) {
                clownMap[e.sid] = isClown;

                const player = api.getPlayerBySid(e.sid);
                if(player == null) return;
                addNotif(player.name + (isClown ? "" : " no longer") + " has clown");
            }

        });
    }
}