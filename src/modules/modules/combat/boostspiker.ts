import { toRad } from "@mathrandom7910/mathplus";
import { ItemIds } from "@mathrandom7910/moomooapi";
import { nearestEnemy, player } from "../../../instances";
import { mouseDir } from "../../../utils/elementutils";
import { placePad, placeSpike } from "../../../utils/placeutils";
import { Category, Module } from "../../module";

enum AimMode {
    MOUSE,
    ENEMY
}

enum SpikeMode {
    NEAR,
    ALWAYS
}

export class BoostSpike extends Module {
    aimMode = this.addEnum("aimmode", AimMode.ENEMY, AimMode, "What direction to bostspike in");
    spikeMode = this.addEnum("spikemode", SpikeMode.NEAR, SpikeMode, "When to place spikes");
    spikeDist = this.addNum("spikedist", 300, 200, 1000, "Distance to start place spikes");
    constructor() {
        super("boostspike", Category.COMBAT, "rapidly places boost pads and spikes");

        this.defaultToggle();

        this.interval(0, () => {
            const targetDir = this.aimMode.val == AimMode.MOUSE || nearestEnemy == null ? mouseDir : player.dirTo(nearestEnemy);
            placePad(targetDir);
            
            if(this.spikeMode.val == SpikeMode.ALWAYS || (nearestEnemy != null && player.dist(nearestEnemy) < this.spikeDist.val)) {
                placeSpike(targetDir + toRad(90));
                placeSpike(targetDir - toRad(90));
            }
        });
    }

    onEnable(): void {
        if(player.getPadType() != ItemIds.BOOST_PAD) {
            this.disable("You do not have a boost pad!");
        }
    }
}