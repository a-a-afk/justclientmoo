import { Category, Module } from "../../module";

export class NotificationModule extends Module {
    chatNotifs = this.addBool("chatnotify", false, "notifies modules toggled in chat");
    
    constructor() {
        super("notifs", Category.CLIENT, "Notification settings");
    }
}