import { C2SPacketType } from "@mathrandom7910/moomooapi/src/data/network/packets";
import { api, moduleManager } from "../instances"
import { setDat, setStorage, storageDat } from "../storage";
import { ErInf } from "../utils/miscutils";

export var commandPrefix = "!";

export abstract class Command extends ErInf {
    constructor(public name: string, public description: string) {
        super();
    }

    info(notif: string): void {
        super.info(`[${this.name}] ${notif}`);
    }

    error(notif: string): void {
        super.error(`[${this.name}] ${notif}`);
    }

    abstract input(...args: string[]): boolean;
}

export class NoArgCommand extends Command {
    constructor() {
        super("", "");
    }
    input(..._args: string[]) {
        return true;
    }
}



export class UpgradeCommand extends Command {
    constructor() {
        super("u", "Allows you to obtain specific upgrades for your player, !u [km/pm]");
    }

    input(...args: string[]) {
        if(args.length == 0) {
            this.info("No upgrade specified, defaulting to KM");
            this.km();
            return true;
        } else if(args[0] == "km") {
            this.km();
            return true;
        } else if(args[0] == "pm") {
            this.pm();
            return true;
        }
        this.info("Invalid upgrade specified");
        return false;
    }
    
    km() {
        for(const id of [7, 17, 31, 23, 10, 38, 4, 15]) {
            api.sendBasic(C2SPacketType.UPGRADE, id);
        }
        this.info("KM upgrades obtained");
    }

    pm() {
        for(const id of [5, 17, 31, 23, 9, 38, 28, 15]) {
            api.sendBasic(C2SPacketType.UPGRADE, id);
        }
        this.info("PM upgrades obtained");
    }
}


export class SetModuleCommand extends Command {
    constructor() {
        super("set", "Sets settings within the module, !set [module] [setting] [value]");
    }

    input(...args: string[]): boolean {
        if(args.length < 3) {
            this.error("Not enough arguments");
            return false;
        }

        const module = moduleManager.getModule(args[0]);
        if(!module) {
            this.error("Invalid module specified");
            return false;
        }
        const setting = module.getSetting(args[1]);
        if(!setting) {
            this.error("Invalid setting specified");
            return false;
        }
        if(!setting.set(args[2])) {
            this.error("Invalid value specified");
            return false;
        }

        this.info(`Set setting ${setting.name} to ${args[2]}`);
        return true;
    }
}

export class ConfigCommand extends Command {
    constructor() {
        super("config", "Manage your config, !config [export/import]");
    }

    input(...args: string[]): boolean {
        if(args.length == 0) {
            this.info("No action given, try help");
            return false;
        }
        if(args[0] == "export") {
            prompt("Config: ", JSON.stringify(storageDat));
            return true;
        } else if(args[0] == "import") {
            const cfgStr = prompt("Config: ");
            if(!confirm("Are you sure you want to import this config? This will overwrite your current config.")) {
                return true;
            }

            if(cfgStr == null) {
                this.info("No config given");
                return false;
            }

            try {
                const dat = JSON.parse(cfgStr);
                if(!dat) {
                    this.info("Invalid config given");
                    return false;
                }
                setDat(dat);
                setStorage();
                this.info("Config imported");
                return true;
            } catch(e) {
                this.info("Invalid config given");
                return false;
            }
        }

        return false;
    }
}

