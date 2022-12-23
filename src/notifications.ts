import { MooMooAPI } from "@mathrandom7910/moomooapi";
import { api, moduleManager } from "./instances";
import { NotificationModule } from "./modules/modules/client/notificationmodule";
import { createDiv, createPElem } from "./utils/elementutils";
import { isBlurred } from "./utils/miscutils";
import { formatString } from "./utils/stringutils";

var notifs: HTMLDivElement[] = [];

export function addNotif(notifName: string, isError?: boolean, noChat?: boolean) {
    const div = createDiv("notifDiv");
    const textElem = createPElem(formatString(notifName));

    div.append(textElem);

    if(isError) div.classList.add("errorDiv");
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.style.right = "0px";
    });

    notifs.unshift(div);

    if((moduleManager.getModule("notifs") as NotificationModule).chatNotifs.val && !noChat) api.sendBasic(MooMooAPI.C2SPacketType.CHAT, notifName);
    refreshNotifs();
    
    setTimeout(() => {
        div.style.right = "-100px";
        div.style.opacity = "0";
        setTimeout(() => {
            div.remove();
        }, 650);
        notifs.pop();
        refreshNotifs();
    }, 3000);
}

function refreshNotifs() {
    var i = 200;
    for(let div of notifs) {
        div.style.bottom = i + "px";
        i += div.clientHeight + 10;
    }
}

export function desktopNotif(msg: string) {
    if(Notification.permission != "denied" || !isBlurred) return;

    return new Notification(msg);
}