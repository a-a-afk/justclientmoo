import { S2CPacketType } from "@mathrandom7910/moomooapi/data/network/packets";
import { IPlayerDat } from "@mathrandom7910/moomooapi/player";
import { api, exportObj } from "../../../instances";
import { formatString, getTime } from "../../../utils/miscutils";
import { Category, Module } from "../../module";

var exitRangeTime: number;
var exitPl: IPlayerDat;

export class AutoEz extends Module {
    msg = this.addString("message", "ez %PLAYER%", "the message to send after killing a player", 0, 30);
    constructor() {
        super("autoez", Category.CHAT, "Automatically insult players after death");

        this.onJust("playerExitRange", (e) => {
            exitRangeTime = getTime();
            exitPl = e;
        });

        this.on("packetReceive", (e) => {
            if(e.type == S2CPacketType.UPDATE_MATS && e.payload[0] == "kills" && getTime() - exitRangeTime <= 1000) {
                exportObj.targetPlayer = exitPl;
                api.chat(formatString(this.msg.val));
            }
        });
    }
}