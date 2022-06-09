import { Repeater } from "@mathrandom7910/moomooapi/src/misc";
import { addRepeater, api, player } from "../../../instances";
import { mouseDir } from "../../../utils/elementutils";
import { getFoodType } from "../../../utils/itemutils";
import { Category, Module } from "../../module";

class PlacementModule extends Module {
    cbId: () => number | null;
    repeater: Repeater | null = null;
    constructor(name: string, cbId: () => number | null) {
        super(name, Category.PLACEMENT, "placement settings");
        this.cbId = cbId.bind(player);

        this.toggleOnRelease.set(true);
    }

    onPostInit(): void {
        this.repeater = new Repeater(() => {
            const id = this.cbId();
            if(id == null) return;
            api.placeItem(id, mouseDir);
        }, 0, this.bind.val);

        this.bind.onSet = () => {
            (this.repeater as Repeater).keyCode = this.bind.val;
        }

        addRepeater(this.repeater);
    }
}

export class SpikePlacer extends PlacementModule {
    constructor() {
        super("spike", player.getSpikeType);
        this.setDefaultBind(86);
    }
}

export class TrapPlacer extends PlacementModule {
    constructor() {
        super("trap", player.getPadType);
        this.setDefaultBind(70);
    }
}

export class FoodPlacer extends PlacementModule {
    constructor(){
        super("food", getFoodType);
        this.setDefaultBind(81);
    }
}

export class MillPlacer extends PlacementModule {
    constructor() {
        super("mill", player.getMillType);
        this.setDefaultBind(78);
    }
}

export class SpecialPlacer extends PlacementModule {
    constructor() {
        super("turret", player.getSpecialType);
        this.setDefaultBind(72);
    }
}