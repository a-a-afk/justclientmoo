// import { itemList } from "@mathrandom7910/moomooapi/src/data/objects/items";
import { ItemIds } from "@mathrandom7910/moomooapi";
import { api, player } from "../instances";
import { getFoodType } from "./itemutils";

export function place(item: ItemIds, dir: number | null = null) {
    api.placeItem(item, dir);
}

export function heal() {
    place(getFoodType());
}

export function placeSpike(dir: number) {
    place(player.getSpikeType(), dir);
}

export function placePad(dir: number) {
    if(player.getPadType() != null) place(player.getPadType()!, dir);
}

export function healUp() {
    const foodType = getFoodType();
    //const healAmt = 100 - player.health;// 100 - 40 = 60
    const healBuff = foodType == ItemIds.APPLE ? 20 : foodType == ItemIds.COOKIE ? 40 : 30;//cookie is 40 apple is 20, cheese 30, assume apple at 20
    //60 / 20 = 3, heal 3 times to max
    //assume cookie 40
    //60 / 40 = 3/2, heal
    //scrap, just do check if less
    for(let i = healBuff; i <= ((100 + healBuff) - player.health); i += healBuff) {
        heal();
        // heal();
    }
}

export function healWithDelay() {
    setTimeout(healUp, 125);
}

// export function canPlace(build: ItemIds, dir: number) {
//     itemList[build].scale
// }