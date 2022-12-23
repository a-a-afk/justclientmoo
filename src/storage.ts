import { Category, Module } from "./modules/module";
import { moduleManager } from "./instances";

const clientKey = "justclient";

export interface MenuPosDat {
    left: number,
    top: number,
    category: Category,
    expanded: boolean
}

export interface Config {
    info: {
        name: string,
        author: string,
        desc: string
    },
    modules: ModuleData[],
    menuPos: Record<number, MenuPosDat>
}

export const defaultDat: StorageData = {
    curConfig: {
        modules: [],
        menuPos: {},
        info: {
            name: "Default Config",
            author: "Default Author",
            desc: "Default Description"
        }
    },
    otherConfigs: [],
    version: "0.0.0",
    isDev: true
}

export interface SaveSetting {
    name: string,
    value: string
}

export interface ModuleData {
    settings: SaveSetting[],
    moduleName: string
}

export interface ConfigData {
    modules: ModuleData[],
    menuPos: Record<number, MenuPosDat>,
    name: string
}

export interface StorageData {
    curConfig: Config,
    otherConfigs: Config[]
    version: string,
    isDev: boolean
}

export var storageDat = defaultDat;

export function setDat(dat: StorageData) {
    storageDat = dat;
}

const storDat = getStorage();

for(const key in storDat) {
    (storageDat as any)[key] = (storDat as any)[key];
}

export function setStorage(val = storageDat) {
    localStorage.setItem(clientKey, JSON.stringify(val));
}

export function getStorageAsString() {
    return localStorage.getItem(clientKey);
}

export function getStorage() {
    const dat = getStorageAsString();
    if(dat == null) {
        setStorage(defaultDat);
        return defaultDat;
    }
    return JSON.parse(dat) as StorageData;
}

export var allowSaving = false;

export function saveModuleSettings(module: Module) {
    if(!allowSaving) return;
    const cC = storageDat.curConfig;
    for(let i = 0; i < cC.modules.length; i++) {
        const saveSet = cC.modules[i];

        if(saveSet.moduleName == module.name) {
            cC.modules[i] = module.getModuleData();
            
            setStorage(storageDat);
            return;
        }
    }

    cC.modules.push(module.getModuleData());
    setStorage(storageDat);
}



export function initStorage() {
    for(const storMod of storageDat.curConfig.modules) {
        const module = moduleManager.getModule(storMod.moduleName);

        if(module == null) continue;
        
        for(const storSet of storMod.settings) {
           const setting = module.getSetting(storSet.name);
           if(setting == null) continue;
            setting.set(storSet.value);
            if(setting == module.enabled) {
                if(setting.val) {
                    module.enable();
                }
            }
        }
    }
    allowSaving = true;
}

