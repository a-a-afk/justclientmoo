import { C2SPacketType } from "@mathrandom7910/moomooapi";
import { api } from "../../../instances";
import { onSendPack } from "../../../utils/networkutils";
import { Category, Module } from "../../module";

export class ChatTime extends Module {
    time = this.addNum("time", 1e3, 600, 1e4, "amount of extra time for your messages to stay");

    constructor() {
        super("chattime", Category.CHAT, "allows your chat messages to stay longer");

        var curInt: NodeJS.Timer | null = null;
        const msgQueue: string[] = [];

        onSendPack(C2SPacketType.CHAT, (e) => {

            msgQueue.push(e.payload[0]);
            if(curInt == null) {
                var timeCur = this.time.val;
                curInt = setInterval(() => {
                    api.sendHidden(C2SPacketType.CHAT, msgQueue[0]);
                    timeCur -= this.time.minVal;
                    if(timeCur <= 0) {
                        msgQueue.shift();
                    }

                    if(!msgQueue.length) {
                        clearInterval(curInt!);
                        curInt = null;
                    }
                }, this.time.minVal);
            }
        }, this);
    }


}