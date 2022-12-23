// import { Pos } from "@mathrandom7910/pos";
import { Category, Module } from "../../module";

// interface Sound {
//     pos: Pos,

// }

export class SoundModule extends Module {
    constructor() {
        super("sounds", Category.WORLD, "adds sounds to this bad game");


        this.on("packetReceive", (e) => {
            // switch()
        });
    }
}