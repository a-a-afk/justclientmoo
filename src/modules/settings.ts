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

    set(val: string | T): boolean {
        if(typeof val == "string") {
            this.val = this.parse(val);
        } else this.val = val;
        this.save();
        
        if(this.onSet) this.onSet();
        return true;
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

export class BindSetting extends Setting<string> {
    constructor(name: string, module: Module, desc = "", defaultBind: string) {
        super(name, defaultBind, desc, module);
    }

    parse(stringVal: string): string {
        return stringVal;
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

export class HatSetting extends EnumSetting<HatIds> {
    constructor(name: string, defaultVal: HatIds, module: Module, desc = "") {
        super(name, defaultVal, desc, module);
    }
}

export class StringSetting extends Setting<string> {
    constructor(name: string, defaultVal: string, module: Module, desc: string, public minLen?: number, public maxLen?: number) {
        super(name, defaultVal, desc, module);
    }

    parse(stringVal: string): string {
        return stringVal;
    }

    set(val: string): boolean {
        if(this.maxLen && val.length > this.maxLen) return false;
        if(this.minLen && val.length < this.minLen) return false;
        return super.set(val); 
    }
}

export enum Buildings {
    SPIKE,
    MILL,
    TRAP,
    TURRET,
    WALL
}

export class BuildingSetting extends EnumSetting<Buildings> {
    constructor(name: string, defaultVal: Buildings, module: Module, desc: string) {
        super(name, defaultVal, Buildings, module, desc);
    }
}