import { UpgradeCommand } from "./commands/command";
import { addCommand, addMod, moduleManager } from "./instances";
import { ClientModule } from "./modules/modules/client/clientmodule";
import { GuiModule } from "./modules/modules/client/guimodule/GuiModule";
import { NotificationModule } from "./modules/modules/client/notificationmodule";
import { AntiTrap } from "./modules/modules/combat/antitrap";
import { AutoAim } from "./modules/modules/combat/AutoAim";
import { AutoHeal } from "./modules/modules/combat/AutoHeal";
import { ClownNotify } from "./modules/modules/combat/clownnotify";
import { InstaModule } from "./modules/modules/combat/InstaModule";
import { TrapNuker } from "./modules/modules/combat/TrapNuker";
import { VisualRange } from "./modules/modules/combat/VisualRange";
import { RainbowHat } from "./modules/modules/gear/rainbowhat";
import { AutoEz } from "./modules/modules/chat/autoezmodule";
import { DebugModule } from "./modules/modules/misc/debugmodule";
import { PacketLogger } from "./modules/modules/misc/packetlogger";
import { FoodPlacer, MillPlacer, SpecialPlacer, SpikePlacer, TrapPlacer } from "./modules/modules/placement/placement";
import { Nuker } from "./modules/modules/world/nukermodule";
import { initStorage } from "./storage";
import { initStyle } from "./style";
import { CurseBypass } from "./modules/modules/chat/cursebypass";
import { ChatMirror } from "./modules/modules/chat/chatmirror";
import { SpeedGear } from "./modules/modules/gear/speedgear";
import { GearSettings } from "./modules/modules/gear/gearsettings";
import { HelpCommand } from "./commands/helpcommand";
import { BoostSpike } from "./modules/modules/combat/boostspiker";

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
addMod(AntiTrap);
addMod(Nuker);
addMod(TrapNuker);
addMod(AutoEz);
addMod(CurseBypass);
addMod(ChatMirror);
addMod(SpeedGear);
addMod(GearSettings);
addMod(BoostSpike);
// addMod(AntiTrap);
moduleManager.init();
initStorage();
initStyle();

addCommand(HelpCommand);
addCommand(UpgradeCommand);

console.log("justclient init finished in", Date.now() - startTime, "ms");

