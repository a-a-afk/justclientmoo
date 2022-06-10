import { IPlayerDat } from "@mathrandom7910/moomooapi/src/player";
import { api, moduleManager } from "../../../instances";
import { desktopNotif } from "../../../notifications";
import { Category, Module } from "../../module";


export class VisualRange extends Module {
    tabbedOutNotif = this.addBool("tabbedout", true, "pops up a desktop notification if you're tabbed out");

    constructor() {
        super("visualrange", Category.COMBAT, "notifies you if players come into/leave your view");

        var prevPlayers: IPlayerDat[] = [];

        this.on("serverTick", (e) => {
            if(e.playerData.length == prevPlayers.length) return;

            if(e.playerData.length > prevPlayers.length) {//player comes into range, not in prev, in e.playerdata
                var playerFound: IPlayerDat | null = null;

                for(const player of e.playerData) {
                    var didFindPlayer = false;
                    for(const playerSearch of prevPlayers) {
                        if(player.sid == playerSearch.sid) didFindPlayer = true;
                    }

                    if(!didFindPlayer) {
                        playerFound = player;
                        break;
                    }
                }
                
                if(playerFound) {
                    const msg = api.getPlayerBySid(playerFound.sid)?.name + " has entered visual range";
                    this.info(msg);
                    if(this.tabbedOutNotif.val) desktopNotif(msg);
                }
            } else {

                var playerFound: IPlayerDat | null = null;

                for(const player of prevPlayers) {
                    var didFindPlayer = false;
                    for(const playerSearch of e.playerData) {
                        if(player.sid == playerSearch.sid) didFindPlayer = true;
                    }

                    if(!didFindPlayer) {
                        playerFound = player;
                        break;
                    }
                }
                
                if(playerFound) {
                    const msg = api.getPlayerBySid(playerFound.sid)?.name + " has exited visual range";
                    this.info(msg);
                    if(this.tabbedOutNotif.val) desktopNotif(msg)
                }
            }
            

            prevPlayers = e.playerData;
        });

        this.tabbedOutNotif.onSet = () => {
            if(!this.tabbedOutNotif.val) return;
            if(Notification.permission == "denied") {
                
                Notification.requestPermission().then((val) => {
                    if(val == "denied") {
                        this.info("this setting needs notifications to be enabled");
                        this.tabbedOutNotif.set(false);
                        const guiModule = moduleManager.getModule("gui");
                        if(guiModule?.enabled.val) {
                            guiModule.disable();
                        }
                    }
                });
            }
        }
    }
}