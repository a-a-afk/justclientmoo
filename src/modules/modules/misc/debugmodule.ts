import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { Category, Module } from "../../module";

export class DebugModule extends Module {
    
    constructor() {
        super("debug", Category.MISC, "a module for debugging");
        this.addBool("bool setting", false, "bool setting defaulting to false");
        this.addNum("num setting", 5, 1, 10, "num setting defaulting to 5 with a minimum of 1 and max of 10");
        this.addBind("bind setting", "a bind setting with no defaults");
        this.addHat("hat setting", HatIds.SHAME, "hat setting defaulting to the shame hat");
        //add enums

        /*if(this.logPackets.val) {

        }*/

        
    }
}