import { api, player } from "../../../instances";
import { desktopNotif } from "../../../notifications";
import { isBlurred } from "../../../utils/miscutils";
import { Category, Module } from "../../module";


export class VisualRange extends Module {
    tabbedOutNotif = this.addBool("tabbedout", true, "pops up a desktop notification if you're tabbed out");

    enter = this.addBool("enter", true, "notifies when a player enters visual range");
    exit = this.addBool("exit", true, "notifies when a player exits visual range");

    constructor() {
        super("visualrange", Category.COMBAT, "notifies you if players come into/leave your view");

        this.onJust("playerEnterRange", (e) => {
            if(!this.enter.val || e.sid == player.sid) return;

            const notifStr = api.getPlayerBySid(e.sid)?.name + " has entered visual range";
            this.info(notifStr);
            if(this.tabbedOutNotif && isBlurred) desktopNotif(notifStr);
        });

        this.onJust("playerExitRange", (e) => {
            if(!this.exit.val || e.sid == player.sid) return;

            const notifStr = api.getPlayerBySid(e.sid)?.name + " has exited visual range";
            this.info(notifStr);
            if(this.tabbedOutNotif && isBlurred) desktopNotif(notifStr);
        });
    }
}