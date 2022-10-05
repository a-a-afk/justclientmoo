import { getDistance, toRad } from "@mathrandom7910/mathplus";
import { ItemIds } from "@mathrandom7910/moomooapi/src/data/objects/items";
import { api, player } from "../../../instances";
import { buildingToPos } from "../../../utils/miscutils";
import { place } from "../../../utils/placeutils";
import { Category, Module } from "../../module";
import { Buildings } from "../../settings";

var isInTrap = false;
var inTrapLastFrame = false;
var buildId = player.getSpikeType();

export class AntiTrap extends Module {
    blockingType = this.addBuild("blocktype", Buildings.SPIKE, "the type of building to place while trapping");
    placeIncr = this.addNum("placeincrease", 10, 1, 90, "amount to increase for the direction to place in");
    replace = this.addBool("replace", true, "tries to replace when a building is broken nearby");

    constructor() {
        super("antitrap", Category.COMBAT, "protects you while in a trap");

        this.on("serverTick", () => {

            isInTrap = false;
            // console.log(api.gameObjects)
            for(const building of api.gameObjects) {
                // console.log(building.id, api.gameObjects.length)
                // const building = api.gameObjects[i];
                // if(player.dist(building) < 100) {
                //     console.log(building, building?.buildType == ItemIds.PIT_TRAP, building?.ownerSid == player.sid);
                // }
                if(!building || building.buildType != ItemIds.PIT_TRAP || getDistance(player, buildingToPos(building)) > 100 || building.ownerSid == player.sid) continue;
                
                buildId = player.getSpikeType();
                if(this.blockingType.val == Buildings.MILL) {
                    buildId = player.getMillType();
                } else if(this.blockingType.val == Buildings.SPIKE) {
                    buildId = player.getSpikeType();
                } else if(this.blockingType.val == Buildings.TRAP && player.getPadType()) {
                    buildId = player.getPadType()!;
                } else if(this.blockingType.val == Buildings.TURRET && player.getSpecialType()) {
                    buildId = player.getSpecialType()!;
                } else if(this.blockingType.val == Buildings.WALL) {
                    buildId = player.getWallType();
                }
                // console.log("placing build", buildId);

                if(!inTrapLastFrame) defendTrap(buildId, this.placeIncr.val);
                isInTrap = true;
                // console.log("In a trap")
                break;
            }
            inTrapLastFrame = isInTrap;
        });
        
        this.on("removeObject", (e) => {
            if(e.building.buildType == ItemIds.PIT_TRAP || getDistance(player, e.building) >= 150 || !isInTrap) return;
            defendTrap(buildId, this.placeIncr.val)
        });
    }
}

function defendTrap(id: number, incr: number) {
    for(let i = 0; i < 360; i += incr) {
        place(id, toRad(i));
    }
}