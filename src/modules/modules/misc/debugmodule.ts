import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { Color } from "../../../utils/miscutils";
import { Category, Module } from "../../module";
import { Buildings } from "../../settings";

export class DebugModule extends Module {
    
    constructor() {
        super("debug", Category.MISC, "a module for debugging");

        this.addBool("bool setting", false, "bool setting defaulting to false");
        this.addNum("num setting", 5, 1, 10, "num setting defaulting to 5 with a minimum of 1 and max of 10");
        this.addBind("bind setting", "a bind setting with no defaults");
        this.addHat("hat setting", HatIds.SHAME, "hat setting defaulting to the shame hat");
        this.addBuild("build setting", Buildings.TRAP, "building setting, defaulting to trap");

        enum AnEnum{
            ENUMVAL1,
            ENUMVAL2,
            ENUMVAL3
        }

        this.addEnum("enum setting", AnEnum.ENUMVAL1, AnEnum, "an enum setting");
        this.addCol("color setting", Color.RED, "a color setting");

        
        //add enums

        /*if(this.logPackets.val) {

        }*/

        
    }
}