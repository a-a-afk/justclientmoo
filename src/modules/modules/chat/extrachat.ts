import { C2SPacketType } from "@mathrandom7910/moomooapi";
import { api, getMod } from "../../../instances";
import { chatBox } from "../../../utils/elementutils";
import { onSendPack } from "../../../utils/networkutils";
import { Category, Module } from "../../module";
import { ChatTime } from "./chattime";

function onKey(e: KeyboardEvent) {
    if (e.keyCode == 13) {

    }
}

export class ExtraChat extends Module {
    constructor() {
        super("extrachat", Category.CHAT, "allows you to send longer chat messages");

        const msgQueue: string[] = [];

        var curInt: NodeJS.Timeout | null = null;

        const ctModTime = getMod(ChatTime).time;

        const defaultIntFn = () => {
            const msg = msgQueue.shift();
            if (!msg) {
                clearInterval(curInt!);
                return;
            }

            api.chat(msg);
        }

        ctModTime.on("change", (val) => {
            if (curInt) {
                curInt = setInterval(defaultIntFn, val);
            }
        });

        onSendPack(C2SPacketType.CHAT, (e) => {
            const msg = e.payload[0] as string;
            console.log(msg)
            if (msg.length < 31) return;
            const msgs = msg.match(/(.{1,30})/g);
            console.log(msgs)
            e.isCanceled = true;

            api.chat(msgs?.shift()!);
            msgQueue.push(...msgs!);
            if (curInt == null) {
                curInt = setInterval(defaultIntFn, ctModTime.module.enabled.val ? ctModTime.val : 3e3);
            }
        }, this);
    }

    onEnable(): void {
        chatBox.removeAttribute("maxLength");
        chatBox.addEventListener("keydown", onKey);
    }

    onDisable(): void {
        chatBox.maxLength = 30;
        chatBox.removeEventListener("keydown", onKey);
    }
}