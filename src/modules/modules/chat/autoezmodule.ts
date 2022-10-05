import { S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, exportObj } from "../../../instances";
import { getTime } from "../../../utils/miscutils";
import { formatString } from "../../../utils/stringutils";
import { Category, Module } from "../../module";

var killTime: number;

export class AutoEz extends Module {
    msg = this.addString("message", "ez %PLAYER%", "the message to send after killing a player", 0, 30);
    constructor() {
        super("autoez", Category.CHAT, "Automatically insult players after death");

        this.onJust("playerExitRange", (e) => {
            if(getTime() - killTime >= 500) return;
            exportObj.targetPlayer = e;
            api.chat(formatString(this.msg.val));
        });

        this.on("packetReceive", (e) => {
            if(e.type == S2CPacketType.UPDATE_MATS && e.payload[0] == "kills") killTime = getTime();
        });
    }
}