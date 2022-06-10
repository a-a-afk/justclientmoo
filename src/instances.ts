import { MooMooAPI } from "@mathrandom7910/moomooapi";
import { Repeater } from "@mathrandom7910/moomooapi/src/misc";
import { C2SPacketType } from "@mathrandom7910/moomooapi/src/packets";
import { Player } from "@mathrandom7910/moomooapi/src/player";
import { Command, commandPrefix, NoArgCommand } from "./command";
import { ModuleManager, NoArgMod } from "./modules/module";
import { getBindSettingStr, GuiModule } from "./modules/modules/client/GuiModule";
import { addNotif } from "./notifications";
import { getDistance } from "@mathrandom7910/mathplus"

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

export function addCommand(command: typeof NoArgCommand) {
    commands.push(new command());
}

api.on("packetSend", (e) => {
    if(e.type == C2SPacketType.CHAT) {
        const message = e.payload[0] as string;
        if(message.startsWith(commandPrefix)) {
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

export var nearestPlayer: Player | null = null;
export var nearestPlayerDist = -1;

api.on("serverTick", (e) => {
    nearestPlayer = null;


    for(const playerDat of e.playerData) {
        if(playerDat.sid == player.sid) continue;

        const foundPlayer = api.getPlayerBySid(playerDat.sid) as Player;
        if(nearestPlayer == null || getDistance(player.getAsPos(), foundPlayer.getAsPos()) < nearestPlayerDist) {
            nearestPlayer = foundPlayer;
            nearestPlayerDist = getDistance(player.getAsPos(), foundPlayer.getAsPos());
        }
    
    }
});

export function addMod(mod: typeof NoArgMod) {
    moduleManager.addMod(mod);
}