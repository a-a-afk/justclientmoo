import { C2SPacketType, S2CPacketType, HatIds, AccessoryIds } from "@mathrandom7910/moomooapi";
import { Pos } from "@mathrandom7910/pos";
import { api, player } from "../instances";
import { gearSettingModule } from "../modules/module";


export function hat(id: HatIds) {
    if(gearSettingModule.buyHats.val) api.buyHat(id);
    api.equipHat(id);
}

export function acc(id: AccessoryIds) {
    if(gearSettingModule.buyAccs.val) api.buyAccessory(id);
    api.equipAccessory(id);
}

export function attackingGear() {
    if(api.player.acc == AccessoryIds.MONKEY_TAIL) {
        acc(AccessoryIds.NONE);
    }

    hat(HatIds.BULL_HELMET);
}

export function primary() {
    api.setWeapon(player.getPrimaryType());
}

export function secondary() {
    const type = player.getSecondaryType();
    if(type == null) return;
    api.setWeapon(type);
}

var lockingLook = false;
var lockingDir: number;

api.on("packetSend", (e) => {
    if(e.type == C2SPacketType.SET_ANGLE && lockingLook) {
        e.isCanceled = true;
        api.sendHidden(C2SPacketType.SET_ANGLE, lockingDir);
    }
});

export function lookAt(pos: Pos, lock?: boolean) {
    look(player.dirTo(pos), lock);
}

export function look(dir: number, lock?: boolean) {
    if(lock) {
        lockingLook = true;
        lockingDir = dir;
    } else if(lock == false) {
        lockingLook = false;
    }
    api.sendBasic(C2SPacketType.SET_ANGLE, dir);
}

export var isAutoFire = false;

api.on("packetReceive", (e)=> {
    if(e.type == S2CPacketType.DEATH) {
        isAutoFire = false;
    }
});

api.on("packetSend", (e) => {
    if(e.type == C2SPacketType.SET_ATTACK_STATE && e.payload[0]) {
        isAutoFire = !isAutoFire;
    }
});

export function toggleAuto() {
    api.toggleAutoAttack();
}