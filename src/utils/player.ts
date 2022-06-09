import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { api, player } from "../instances";

export function hat(id: HatIds) {
    api.equipHat(id);
}

export function acc(id: AccessoryIds) {
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