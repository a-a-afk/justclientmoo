import { commands } from "../instances";
import { createDiv, createElement, removeChildren } from "../utils/elementutils";
import { codes } from "../utils/keymap";
import { Command } from "./command";

const helpInvisHolder = createDiv("guiHolder");
const helpDivHolder = createDiv("invisHolder");
const helpDiv = createDiv("helpDiv");
const commandDivName = createElement("p", "commandDivName");
const commandsDiv = createDiv("commandsDiv");

commandDivName.innerText = "Commands";

helpDiv.appendChild(commandDivName);
helpDiv.appendChild(commandsDiv);
helpDivHolder.appendChild(helpDiv);

helpInvisHolder.appendChild(helpDivHolder);

helpInvisHolder.style.display = "none";
document.body.appendChild(helpInvisHolder);

helpInvisHolder.addEventListener("click", () => {
    helpInvisHolder.style.display = "none";
});

helpInvisHolder.addEventListener("keydown", (e) => {
    if(e.code == codes.esc) {
        helpInvisHolder.style.display = "none";
    }
})

export class HelpCommand extends Command {
    constructor() {
        super("help", "get some help");
    }

    input(..._args: string[]) {
        
        removeChildren(commandsDiv);

        // helpDiv.style.display = "block";

        helpInvisHolder.style.display = "block";

        commands.forEach(command => {
            const cmdDiv = createDiv("commandDiv");
            cmdDiv.innerText = command.name;
            cmdDiv.title = command.description;
            commandsDiv.appendChild(cmdDiv);
        });

        return true;
    }
}
