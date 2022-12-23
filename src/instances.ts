import { C2SPacketType, IPlayerDat, MooMooAPI, Player, Repeater } from "@mathrandom7910/moomooapi";
import { Command, commandPrefix, NoArgCommand } from "./commands/command";
import { ModuleManager, NoArgMod } from "./modules/module";
import { getBindSettingStr, GuiModule } from "./modules/modules/client/guimodule/GuiModule";
import { addNotif } from "./notifications";
import { getDistance } from "@mathrandom7910/mathplus";
import { chatHolder as chatHolder } from "./utils/elementutils";
import EventEmitter from "@mathrandom7910/tseventemitter";

export interface IJustEvents {
    playerEnterRange: IPlayerDat,
    playerExitRange: IPlayerDat,
    sendSetDir: number
}

class JustClientEvents extends EventEmitter<IJustEvents> {
}

export var api = new MooMooAPI();
export var moduleManager = new ModuleManager();
export var player = api.player;
export var justEvents = new JustClientEvents();

const keysDown: Record<string, boolean> = {};

const repeaters: Repeater<string>[] = [];

export var shouldPacket = false;

document.addEventListener("keydown", e => {
    if (chatHolder.style.display == "block") return;
    repeaters.forEach(rep => {
        rep.start(e.code);
    });
    
    if(GuiModule.bindingSetting != null) {
        GuiModule.bindingSetting.set(e.code);
        GuiModule.bindingSettingElm.textContent = getBindSettingStr(GuiModule.bindingSetting);
        GuiModule.bindingSetting = null;
        return;
    }

    if(keysDown[e.code]) return;
    keysDown[e.code] = true;
    
    for(const module of moduleManager.modules) {
        if(module.bind.val == e.code) {
            module.toggle();
        }
    }
});

export function addRepeater(repeater: Repeater<string>) {
    repeaters.push(repeater);
}

document.addEventListener("keyup", e => {
    if (chatHolder.style.display == "block") return;
    keysDown[e.code] = false;
    repeaters.forEach(rep => {
        rep.stop(e.code);
    });

    for(const module of moduleManager.modules) {
        if(module.bind.val == e.code && module.enabled.val && module.toggleOnRelease.val) {
            module.disable();
        }
    }
});

export var commands: Command[] = [];

interface ExportObj {
    targetPlayer: IPlayerDat | null
}

export const exportObj: ExportObj = {
    targetPlayer: null
}

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
                    if(!command.input(...args.slice(1))) {
                        
                    }
                    return;
                }
            }

            addNotif("command not found!");
        }
    } else if(e.type == C2SPacketType.SET_ANGLE) {
        justEvents.emit("sendSetDir", e.payload[0]);
    }
});

export var nearestEnemy: Player | null = null;
export var nearestPlayerDist = -1;

var prevPlayers: IPlayerDat[] = [];

api.on("serverTick", (e) => {
    nearestEnemy = null;


    for(const playerDat of e.playerData) {
        if(playerDat.sid == player.sid || (playerDat.tribe == player.tribe && playerDat.tribe != null)) continue;

        const foundPlayer = api.getPlayerBySid(playerDat.sid) as Player;
        if(nearestEnemy == null || getDistance(player.getAsPos(), foundPlayer.getAsPos()) < nearestPlayerDist) {
            nearestEnemy = foundPlayer;
            nearestPlayerDist = getDistance(player.getAsPos(), foundPlayer.getAsPos());
        }
    
    }

    if(e.playerData.length != prevPlayers.length) {

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
            justEvents.emit("playerEnterRange", playerFound);
            //const msg = api.getPlayerBySid(playerFound.sid)?.name + " has entered visual range";
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
            justEvents.emit("playerExitRange", playerFound);
        }
    }
    

    prevPlayers = e.playerData;
    }
});

export function addMod(mod: typeof NoArgMod) {
    moduleManager.addMod(mod);
}

export function getMod<K extends typeof NoArgMod>(mod: K) {
    return moduleManager.getModule(mod);
}