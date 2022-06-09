import { MooMooAPI } from "@mathrandom7910/moomooapi";
import { Repeater } from "@mathrandom7910/moomooapi/src/misc";
import { C2SPacketType } from "@mathrandom7910/moomooapi/src/packets";
import { Command } from "./command";
import { ModuleManager } from "./modules/module";
import { getBindSettingStr, GuiModule } from "./modules/modules/client/GuiModule";
import { addNotif } from "./notifications";

export var api = new MooMooAPI();
export var moduleManager = new ModuleManager();
export var player = api.player;

const keysDown: Record<number, boolean> = {};

const repeaters: Repeater[] = [];

export var shouldPacket = false;

document.addEventListener("keydown", e => {
    repeaters.forEach(rep => {
        rep.start(e.keyCode);
    });
    
    if(GuiModule.bindingSetting != null) {
        GuiModule.bindingSetting.set(e.keyCode);
        GuiModule.bindingSettingElm.textContent = getBindSettingStr(GuiModule.bindingSetting);
        GuiModule.bindingSetting = null;
        return;
    }

    if(keysDown[e.keyCode]) return;
    keysDown[e.keyCode] = true;
    
    for(const module of moduleManager.modules) {
        if(module.bind.val == e.keyCode) {
            module.toggle();
        }
    }
});

export function addRepeater(repeater: Repeater) {
    repeaters.push(repeater);
}

document.addEventListener("keyup", e => {
    keysDown[e.keyCode] = false;
    repeaters.forEach(rep => {
        rep.stop(e.keyCode);
    });

    for(const module of moduleManager.modules) {
        if(module.bind.val == e.keyCode && module.enabled.val && module.toggleOnRelease.val) {
            module.disable();
        }
    }
});

export var commands: Command[] = [];

export function addCommand(command: Command) {
    commands.push(command);
}

api.on("packetSend", (e) => {
    if(e.type == C2SPacketType.CHAT) {
        const message = e.payload[0] as string;
        if(message.startsWith("!")) {
            e.isCanceled = true;

            const args = message.split(" ");

            const comStr = args[0].substring(1);

            for(const command of commands) {
                if(command.name == comStr) {
                    command.input(...args);
                    return;
                }
            }

            addNotif("command not found!");
        }
    }
});