import { createDiv } from "../../../utils/elementutils";
import { Category, Module } from "../../module";
import { commands } from "../../../instances";

const helpGuiHolder = createDiv("invisHolder");
const helpGui = createDiv("dispGui");

helpGuiHolder.style.display = "none";
helpGuiHolder.appendChild(helpGui);
document.body.appendChild(helpGuiHolder);

export class HelpModule extends Module {
    constructor() {
        super("help", Category.MISC, "help");
    }

    onEnable(): void {
        helpGuiHolder.style.display = "grid";
        const commandHoldDiv = createDiv("settingDiv");
        commandHoldDiv.append("Commands:")
        for(const command of commands) {
            const commandDiv = createDiv("settingContent");
            commandDiv.innerText = command.name;
            commandHoldDiv.appendChild(commandDiv);
        }
        helpGui.appendChild(commandHoldDiv);
    }

    onDisable(): void {
        Array.from(helpGui.children).forEach(child => {
            child.remove();
        });
        helpGuiHolder.style.display = "none";
    }
}
