import { C2SPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api } from "../../../instances";
import { onSendPack } from "../../../utils/networkutils";
import { Category, Module } from "../../module";

const curseWords: string[] = JSON.parse(atob("WyJjdW50Iiwid2hvcmUiLCJmdWNrIiwic2hpdCIsImZhZ2dvdCIsIm5pZ2dlciIsIm5pZ2dhIiwiZGljayIsInZhZ2luYSIsIm1pbmdlIiwiY29jayIsInJhcGUiLCJjdW0iLCJzZXgiLCJ0aXRzIiwicGVuaXMiLCJjbGl0IiwicHVzc3kiLCJtZWF0Y3VydGFpbiIsImppenoiLCJwcnVuZSIsImRvdWNoZSIsIndhbmtlciIsImRhbW4iLCJiaXRjaCIsImRpY2siLCJmYWciLCJiYXN0YXJkIl0="))

export class CurseBypass extends Module {
    constructor() {
        super("cursebypass", Category.CHAT, "bypasses the curse filter");

        onSendPack(C2SPacketType.CHAT, (e) => {
            var msg: string = e.payload[0];
            var foundCurse = false;
            curseWords.forEach(curse => {
                if(msg.indexOf(curse) != -1) {
                    foundCurse = true;
                    msg = msg.replaceAll(curse, `${curse[0].toUpperCase()}${curse.substring(1, curse.length)}`);
                }
            });
            if(foundCurse) {
                e.isCanceled = true;
                api.sendHidden(C2SPacketType.CHAT, msg);
            }
        }, this);
    }
}