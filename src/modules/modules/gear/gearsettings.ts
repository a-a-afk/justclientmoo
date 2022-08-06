import { Category, Module } from "../../module";

export class GearSettings extends Module {
    buyHats = this.addBool("buyhat", true, "automatically buys hats");
    buyAccs = this.addBool("buyaccs", true, "automatically buys accessories");
    constructor() {
        super("gearsettings", Category.GEAR, "various settings regarding the handling of gear, does not matter if enabled/disabled");
    }
}