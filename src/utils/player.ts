import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { C2SPacketType, S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
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
        acc(0);
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

export function lookAt(pos: Pos) {
    api.sendBasic(C2SPacketType.SET_ANGLE, player.getAsPos().dirTo(pos));
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