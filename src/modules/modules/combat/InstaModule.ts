import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { S2CPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, moduleManager, player } from "../../../instances";
import { acc, attackingGear, hat, primary, secondary } from "../../../utils/player";
import { Category, Module } from "../../module";
import { AutoAim } from "./AutoAim";

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

export class InstaModule extends Module {
    
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
            } else if(counter == 2) {
                attackSecond();
            } else if(counter == 3) {
                beforeDisable();
                this.disable();
            }
        });

        autoAimModule
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
}