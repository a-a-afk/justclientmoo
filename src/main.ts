import { HelpCommand } from "./command";
import { addCommand, addMod, moduleManager } from "./instances";
import { ClientModule } from "./modules/modules/client/clientmodule";
import { GuiModule } from "./modules/modules/client/GuiModule";
import { NotificationModule } from "./modules/modules/client/notificationmodule";
import { AutoAim } from "./modules/modules/combat/AutoAim";
import { AutoHeal } from "./modules/modules/combat/AutoHeal";
import { ClownNotify } from "./modules/modules/combat/clownnotify";
import { InstaModule } from "./modules/modules/combat/InstaModule";
import { VisualRange } from "./modules/modules/combat/VisualRange";
import { RainbowHat } from "./modules/modules/gear/rainbowhat";
import { DebugModule } from "./modules/modules/misc/debugmodule";
import { PacketLogger } from "./modules/modules/misc/packetlogger";
import { FoodPlacer, MillPlacer, SpecialPlacer, SpikePlacer, TrapPlacer } from "./modules/modules/placement/placement";
import { initStorage } from "./storage";
import { initStyle } from "./style";

console.log("jusclient init...");

const startTime = Date.now();
addMod(AutoHeal);
addMod(GuiModule);
addMod(ClientModule);
addMod(NotificationModule);
addMod(SpikePlacer);
addMod(TrapPlacer);
addMod(FoodPlacer);
addMod(MillPlacer);
addMod(SpecialPlacer);
addMod(InstaModule);
addMod(ClownNotify);
addMod(DebugModule);
addMod(RainbowHat);
addMod(PacketLogger)
addMod(VisualRange);
addMod(AutoAim);
moduleManager.init();
initStorage();
initStyle();

addCommand(HelpCommand);

console.log("justclient init finished in", Date.now() - startTime, "ms");

