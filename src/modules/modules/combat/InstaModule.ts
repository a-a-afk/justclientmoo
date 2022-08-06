import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, moduleManager, player } from "../../../instances";
import { placeSpike } from "../../../utils/placeutils";
import { acc, attackingGear, hat, primary, secondary } from "../../../utils/player";
import { Category, Module } from "../../module";
import { angleToEnemy, AutoAim } from "./AutoAim";

function attackMain() {
    attackingGear();
    primary();
    api.singleSwing();
}

function attackSecond() {
    hat(HatIds.TURRET_GEAR);
    secondary();
    api.singleSwing();
}

function beforeDisable() {
    hat(HatIds.BOOSTER_HAT);
    acc(AccessoryIds.MONKEY_TAIL);
    primary();
}

var counter = 0;
var autoAimModule: AutoAim;
var wasAutoaimDis = false;

enum SpikePlaceCount {
    NONE,
    ONE,
    TWO
}

export class InstaModule extends Module {
    spikePlaceCount = this.addEnum<SpikePlaceCount>("spikePlaceCount", SpikePlaceCount.NONE, SpikePlaceCount, "amount of spikes to place for the insta");
    constructor() {
        super("insta", Category.COMBAT, "insta kill noobs");
        

        this.on("packetReceive", (e) => {
            if(e.type != S2CPacketType.UPDAE_PLAYERS) return;
            if(player.getSecondaryType() == null) {
                this.disable("no secondary!");
                return;
            }

            counter++;

            if(counter == 1) {
                attackMain();
                this.instaSpike();
            } else if(counter == 2) {
                attackSecond();
            } else if(counter == 3) {
                beforeDisable();
                this.disable();
            }
        });
    }

    onPostInit(): void {
        autoAimModule = moduleManager.getModule("autoaim") as AutoAim;
    }

    onEnable(): void {
        counter = 0;

        if(!autoAimModule.enabled.val) {
            autoAimModule.enable();
            wasAutoaimDis = true;
        }

        // if(player.getSecondaryType() == null) {
        //     this.disable();
        //     return;
        // }        
    }

    onDisable(): void {
        if(wasAutoaimDis) {
            autoAimModule.disable();
        }
    }

    instaSpike() {
        if(this.spikePlaceCount.val == SpikePlaceCount.ONE) {
            placeSpike(angleToEnemy);
        } else if(this.spikePlaceCount.val == SpikePlaceCount.TWO) {
            placeSpike(angleToEnemy - 45);
            placeSpike(angleToEnemy + 45);
        }
    }
}