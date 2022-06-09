import { Category, Module } from "./modules/module";
import { moduleManager } from "./instances";

const clientKey = "justclient";

export interface MenuPosDat {
    left: number,
    top: number,
    category: Category
}

export const defaultDat: StorageData = {
    modules: [],
    menuPos: {},
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

export interface StorageData {
    modules: ModuleData[],
    menuPos: Record<number, MenuPosDat>
    version: string,
    isDev: boolean
}

export var storageDat = defaultDat;
storageDat = getStorage();

export function setStorage(val = storageDat) {
   // storageDat = val;
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
    for(let i = 0; i < storageDat.modules.length; i++) {
        const saveSet = storageDat.modules[i];

        if(saveSet.moduleName == module.name) {
            storageDat.modules[i] = module.getModuleData();
            
            setStorage(storageDat);
            return;
        }
    }

    storageDat.modules.push(module.getModuleData());
    setStorage(storageDat);
}



export function initStorage() {
    for(const storMod of storageDat.modules) {
        const module = moduleManager.getModule(storMod.moduleName);

        if(module == null) continue;
        
        for(const storSet of storMod.settings) {
           // console.log("IN SET", module?.getSetting(storSet.name)?.val, storSet.value);
           const setting = module.getSetting(storSet.name);
           
           if(setting == null) continue;
            setting.set(storSet.value);
            if(setting == module.enabled) {
                if(setting.val) {
                    module.enable();
                }
            }

           // console.log("POST SET", module?.getSetting(storSet.name)?.val, storSet.value);
        }
    }
    allowSaving = true;
}

