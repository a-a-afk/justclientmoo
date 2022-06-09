import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { S2CPacketType } from "@mathrandom7910/moomooapi/src/packets";
import { api, player } from "../../../instances";
import { acc, attackingGear, hat, primary, secondary } from "../../../utils/player";
import { Category, Module } from "../../module";

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

export class InstaModule extends Module {
    tickMode = this.addBool("tick", true, "attempts to sync attacks with the server to make the \"perfect\" insta");

    delaySec = this.addNum("firedealy", 120, 100, 250, "the time (in milliseconds) to wait after attacking with primary if tick is disabled");

    constructor() {
        super("insta", Category.COMBAT, "insta kill noobs");


        this.on("packetReceive", (e) => {
            if(e.type != S2CPacketType.UPDAE_PLAYERS) return;

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
    }

    onEnable(): void {
        counter = 0;

        if(player.getSecondaryType() == null) {
            this.disable();
            return;
        }

        if(this.tickMode.val) {
            
        } else {
            attackMain();
            setTimeout(() => {
                attackSecond();
                setTimeout(() => {
                    beforeDisable();
                    this.disable();
                }, this.delaySec.val);
            }, this.delaySec.val);
            
        }
    }
}