import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { Module } from "./module";

export abstract class Setting<T> {
    val: T;
    onSet: Function | null = null;
    settingCategory: string | null = null;
    constructor(public name: string, public defaultVal: T, public desc = "", public module: Module) {
        this.val = defaultVal;
    }

    abstract parse(stringVal: string): T;

    set(val: string | T) {
        if(typeof val == "string") {
            this.val = this.parse(val);
        } else this.val = val;
        this.save();
        
        if(this.onSet) this.onSet();
    }

    save() {
        this.module.save();
    }

    setCategory(categoryName: string) {
        this.settingCategory = categoryName;
        return this;
    }
}

export class NumSetting extends Setting<number> {
    constructor(name: string, defaultVal: number, public minVal: number, public maxVal: number, module: Module, desc = "") {
        super(name, defaultVal, desc, module);
    }

    parse(stringVal: string): number {
        return parseInt(stringVal);
    }
}

export class BoolSetting extends Setting<boolean> {
    constructor(name: string, defaultVal: boolean, module: Module, desc = "") {
        super(name, defaultVal, desc, module);
    }

    parse(stringVal: string): boolean {
        return JSON.parse(stringVal);
    }
}

export class BindSetting extends Setting<number> {
    constructor(name: string, module: Module, desc = "", defaultBind: number) {
        super(name, defaultBind, desc, module);
    }

    parse(stringVal: string): number {
        return parseInt(stringVal);
    }
}

export class EnumSetting<T> extends Setting<T> {
    constructor(name: string, defaultVal: T, public rawEnum: any, module: Module, desc = "") {
        super(name, defaultVal, desc, module);
    }
    
    parse(stringVal: string): T {
        return parseInt(stringVal) as unknown as T;
    }

    enumKeys() {
        const keys: string[] = [];
        for(const key in this.rawEnum) {
            if(typeof key == "string") {
                keys.push(key);
            }
        }
        return keys;
    }

    enumValues() {
        const vals: number[] = [];
        for(const value in this.rawEnum) {
            const parsedVal = parseInt(value);
            if(!isNaN(parsedVal)) {
                vals.push(parsedVal);
            }
        }
        return vals;
    }
}

export class HatSetting extends Setting<HatIds> {

    constructor(name: string, defaultVal: HatIds, module: Module, desc = "") {
        super(name, defaultVal, desc, module);
    }

    parse(stringVal: string): HatIds {
        return JSON.parse(stringVal);
    }
    
}