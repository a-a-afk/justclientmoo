import { commands } from "./instances"
import { addNotif } from "./notifications";

export abstract class Command {
    constructor(public name: string) {

    }

    abstract input(...args: string[]): void;
}

export class HelpCommand extends Command {
    constructor() {
        super("help")
    }

    input(...args: string[]): void {
        args;
        commands.forEach(command => {
            addNotif(command.name);
        });
    }
    
}