import { S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, player } from "../../../instances";
import { onRecPack } from "../../../utils/networkutils";
import { Category, Module } from "../../module";

enum Copy {
    ENEMIES,
    TEAM,
    ALL
}

export class ChatMirror extends Module {
    copyPlayers = this.addEnum<Copy>("playersel", Copy.ALL, Copy, "select which players to mirror");
    constructor() {
        super("chatmirror", Category.CHAT, "mirrors player's chat messages");



        onRecPack(S2CPacketType.CHAT, (e) => {
            const sid = e.payload[0];
            if(sid == player.sid) {
                return;
            }

            const plInd = api.getPlayerBySid(sid);
            if(plInd == null) return;
            if(this.copyPlayers.val == Copy.TEAM && plInd.tribe != player.tribe) return;
            if(this.copyPlayers.val == Copy.ENEMIES && plInd.tribe == player.tribe) return;

            api.chat(e.payload[1]);
        });
    }
}