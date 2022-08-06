import { commandPrefix } from "../commands/command";
import { api, exportObj } from "../instances";

export function formatString(str: string) {
    const player = api.getPlayerBySid(exportObj.targetPlayer?.sid!)
    return str.replaceAll("%PREFIX%", commandPrefix).replaceAll("%PLAYER%", player?.name || "No Player");
}
