import { AccessoryIds } from "@mathrandom7910/moomooapi/src/data/gear/accessories";
import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { PlayerEvents } from "@mathrandom7910/moomooapi/src/events";
import { api, IJustEvents, justEvents } from "../instances";
import { ModuleData, saveModuleSettings } from "../storage";
import { Color, ErInf } from "../utils/miscutils";
import { GearSettings } from "./modules/gear/gearsettings";
import { AccSetting, BindSetting, BoolSetting, Buildings, BuildingSetting, ColorSetting, EnumSetting, HatSetting, NumSetting, Setting, StringSetting } from "./settings";

export enum Category {
    COMBAT,
    MISC,
    CLIENT,
    PLACEMENT,
    GEAR,
    WORLD,
    CHAT
}

export class Module extends ErInf {
    settings: Setting<any>[] = [];

    bind = this.addBind("keybind", "the keybind to toggle");
    enabled = this.addBool("enabled", false, "if it is enabled");
    showNotifs = this.addBool("togglenotifs", true, "whether or not to show notifications when module is enabled/disabled");
    toggleOnRelease = this.addBool("toggleonrelease", false, "toggles the module on key release");

    guiElement: HTMLDivElement | null = null;

    constructor(public name: string, public category: Category, public desc = "") {
        super();
    }

    onEnable() {

    }

    onDisable() {

    }

    setDefaultBind(bindKey: string) {
        if(this.bind.val == "") this.bind.set(bindKey);
        this.save();
    }

    defaultToggle() {
        if(!this.toggleOnRelease.val) this.toggleOnRelease.set(true);
        this.save();
    }

    info(notif: string) {
        super.info(`[${this.name}] ${notif}`);
    }

    error(notif: string) {
        super.error(`[${this.name}] ${notif}`);
    }

    enable() {
        this.enabled.set(true);
        //console.log("enabled", this.name);
        if(this.showNotifs.val) this.info("enabled");
        this.guiElement?.classList?.add("moduleEnabled");
        for(const iDat of this.intervalData) {
            iDat.interval = setInterval(iDat.cb, iDat.ms) as unknown as number;
        }
        this.onEnable();
    }

    disable(reason?: string) {
        this.enabled.set(false);
        //console.log("disabled", this.name);
        if(this.showNotifs.val) this.info("disabled" + (reason ? " " + reason : ""));
        this.guiElement?.classList?.remove("moduleEnabled");
        for(const iDat of this.intervalData) {
            clearInterval(iDat.interval);
        }
        this.onDisable();
    }

    addSetting<K extends Setting<any>>(setting: K): K {
        this.settings.push(setting);
        return setting;
    }

    addNum(name: string, defaultVal: number, minVal: number, maxVal: number, desc = "") {
        return this.addSetting(new NumSetting(name, defaultVal, minVal, maxVal, this, desc));
    }

    addBool(name: string, defaultVal: boolean, desc = "") {
        return this.addSetting(new BoolSetting(name, defaultVal, this, desc));
    }

    addBind(name: string, desc = "", defaultBind = "") {
        return this.addSetting(new BindSetting(name, this, desc, defaultBind));
    }

    addEnum<T>(name: string, defaultVal: T, rawEnum: any, desc = "") {
        return this.addSetting(new EnumSetting(name, defaultVal, rawEnum, this, desc));
    }

    addHat(name: string, defaultVal: HatIds, desc = "") {
        return this.addSetting(new HatSetting(name, defaultVal, this, desc));
    }

    addAcc(name: string, defaultVal: AccessoryIds, desc = "") {
        return this.addSetting(new AccSetting(name, defaultVal, this, desc));
    }

    addString(name: string, defaultVal = "", desc = "", minLen?: number, maxLen?: number) {
        return this.addSetting(new StringSetting(name, defaultVal, this, desc, minLen, maxLen));
    }

    addBuild(name: string, defaultVal: Buildings, desc = "") {
        return this.addSetting(new BuildingSetting(name, defaultVal, this, desc));
    }

    addCol(name: string, defaultVal: string | Color, desc = "") {
        return this.addSetting(new ColorSetting(name, defaultVal, desc, this));
    }


    save() {
        saveModuleSettings(this);
    }

    on<K extends keyof PlayerEvents>(type: K, cb: (event: PlayerEvents[K]) => any) {
        api.on(type, (e) => {
            if(!this.enabled.val) return;
            cb(e);
        });
    }

    onJust<K extends keyof IJustEvents>(type: K, cb: (event: IJustEvents[K]) => any) {
        justEvents.on(type, (e) => {
            if(!this.enabled.val) return;
            cb(e);
        });
    }

    getSetting(name: string) {
        for(const setting of this.settings) {
            if(setting.name == name) {
                return setting;
            }
        }

        return null;
    }

    getModuleData(): ModuleData {
        const dat: ModuleData = {
            settings: [],
            moduleName: this.name
        }

        for(const setting of this.settings) {
            dat.settings.push({
                name: setting.name,
                value: setting.val
            });
        }

        return dat;
    }

    /**
     * Called after every module is added
     */

    onPostInit() {

    }

    postInit() {
        this.onPostInit();
        this.save();
    }

    toggle() {
        if(this.enabled.val) {
            this.disable();
        } else this.enable();
    }

    intervalData: { ms: number, cb: () => void, interval: number }[] = [];

    interval(millis: number, callBack: () => void) {
        // return setInterval(() => {
        //     if(this.enabled.val) cb();
        // }, ms);
        this.intervalData.push({ ms: millis, cb: callBack, interval: -1 });
    }
}

export class NoArgMod extends Module {
    constructor() {
        super("", Category.MISC);
    }
}

export var gearSettingModule: GearSettings;

export class ModuleManager {
    modules: Module[] = [];
    moduleMap: Map<typeof Module, Module> = new Map();

    addMod(moduleType: typeof NoArgMod) {
        if(this.moduleMap.has(moduleType)) return;
        const modObj = new moduleType();
        if(modObj.name == "gearsettings") {
            gearSettingModule = modObj as any;
        }
        this.moduleMap.set(moduleType, modObj);
        this.modules.push(modObj);
        return this;
    }

    getModule(modNameOrType: string | typeof Module) {
        if(typeof modNameOrType == "string") {
            //mod name
            for(const mod of this.modules) {
                if(mod.name == modNameOrType) return mod;
            }
        } else {
            //mod class
            return this.moduleMap.get(modNameOrType)!;
        }

        return null;
    }

    init() {
        this.modulesPostInit();
    }

    modulesPostInit() {
        this.modules.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        
        for(const module of this.modules) {
            module.postInit();
        }
    }
}