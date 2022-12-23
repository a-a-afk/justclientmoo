import { Category, Module } from "../../module";

export class NoPrompt extends Module {
    constructor() {
        super("noprompt", Category.MISC, "removes moomoo.io's dumb prompt before close");
    }

    onEnable(): void {
        onbeforeunload = null;
    }

    onDisable(): void {
        onbeforeunload = () => "I hate this game";
    }
}