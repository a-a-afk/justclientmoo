import { Category, Module } from "../../module";

export class NoCookie extends Module {
    constructor() {
        super("nocookie", Category.MISC, "hides moomoo.io's cookie display");
    }

    onEnable(): void {
        document.getElementById("onetrust-consent-sdk")?.remove();
    }
}