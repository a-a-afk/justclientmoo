import { getAngle } from "@mathrandom7910/mathplus";
import { C2SPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, nearestEnemy, player } from "../../../instances";
import { Category, Module } from "../../module";

var angleToEnemy = 0;

function setDir(dir: number) {
    api.sendBasic(C2SPacketType.SET_ANGLE, dir);
}

export class AutoAim extends Module {
    disableIfNone = this.addBool("disableifnone", true, "disables if there is a player nearby");
    blockPackets = this.addBool("blockpackets", true, "blocks other direction packets");

    constructor() {
        super("autoaim", Category.COMBAT, "automatically aims");

        this.on("serverTick", () => {
            if(nearestEnemy == null) {
                if(this.disableIfNone.val) this.disable();
                return;
            }

            angleToEnemy = getAngle(player.getAsPos(), nearestEnemy.getAsPos());

            setDir(angleToEnemy);
        });

        this.on("packetSend", (e) => {
            if(e.type != C2SPacketType.SET_ANGLE) return;

            if(e.payload[0] != angleToEnemy) e.isCanceled = true;
        });
    }

    onEnable(): void {
        setDir(angleToEnemy);
    }
}