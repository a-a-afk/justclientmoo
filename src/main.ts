import { HelpCommand } from "./command";
import { addCommand, moduleManager } from "./instances";
import { ClientModule } from "./modules/modules/client/clientmodule";
import { GuiModule } from "./modules/modules/client/GuiModule";
import { NotificationModule } from "./modules/modules/client/notificationmodule";
import { AutoHeal } from "./modules/modules/combat/AutoHeal";
import { ClownNotify } from "./modules/modules/combat/clownnotify";
import { InstaModule } from "./modules/modules/combat/InstaModule";
import { RainbowHat } from "./modules/modules/gear/rainbowhat";
import { DebugModule } from "./modules/modules/misc/debugmodule";
import { FoodPlacer, MillPlacer, SpecialPlacer, SpikePlacer, TrapPlacer } from "./modules/modules/placement/placement";
import { initStorage } from "./storage";
import { initStyle } from "./style";

console.log("jusclient init...");

const startTime = Date.now();
moduleManager.addMod(AutoHeal)
.addMod(GuiModule)
.addMod(ClientModule)
.addMod(NotificationModule)
.addMod(SpikePlacer)
.addMod(TrapPlacer)
.addMod(FoodPlacer)
.addMod(MillPlacer)
.addMod(SpecialPlacer)
.addMod(InstaModule)
.addMod(ClownNotify)
.addMod(DebugModule)
.addMod(RainbowHat)
moduleManager.init();
initStorage();
initStyle();

addCommand(new HelpCommand());

console.log("justclient init finished in", Date.now() - startTime, "ms");

