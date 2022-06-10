import { HatIds } from "@mathrandom7910/moomooapi/src/data/gear/hats";
import { moduleManager } from "../../../instances";
import { storageDat } from "../../../storage";
import { createDiv, createElement, createInput, makeDraggable } from "../../../utils/elementutils";
import { keyMap } from "../../../utils/miscutils";
import { Category, Module } from "../../module";
import { BindSetting, BoolSetting, EnumSetting, HatSetting, NumSetting } from "../../settings";

const guiHolder = createDiv("guiHolder");
const moduleDiv = createDiv("modGuiHolder");
var modGui: HTMLDivElement | null;
var currentModGui: string | null = null;

guiHolder.appendChild(moduleDiv);
const categoryDivs = new Map<Category, HTMLDivElement>();

export function getBindSettingStr(setting: BindSetting) {
    return `BIND: ${(setting.val != 0) ? (keyMap[setting.val] || "UNKOWN") : "NONE"}`;
}

export class GuiModule extends Module {
    static bindingSetting: BindSetting | null = null;
    static bindingSettingElm: HTMLElement;

    closeOnEscape = this.addBool("escapeclose", true, "closes the gui when you hit escape")

    constructor() {
        super("gui", Category.CLIENT, "the gui");
        
        this.setDefaultBind(27);

        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 27 && this.enabled.val && this.closeOnEscape.val && this.bind.val != 27) {
                this.disable();
            }
        });
    }

    onEnable(): void {
        guiHolder.style.display = "block";
    }

    onDisable(): void {
        guiHolder.style.display = "none";
        if(modGui != null) {
            modGui.remove();
            modGui = null;
            currentModGui = null;
        }
    }

    generateModuleGui(module: Module) {
        const guiDiv = createDiv("moduleGui");
        const nameDiv = createDiv("settingDiv");
        const borderStr = "rgba(1, 26, 54, 0.89)";

        nameDiv.style["border-color" as any] = borderStr;
        nameDiv.textContent = module.name;
        guiDiv.append(nameDiv);

        for(const setting of module.settings) {
            const settingDiv = createDiv("settingDiv");
            settingDiv.style["border-color" as any] = borderStr;
            settingDiv.title = setting.desc;
            const settingName = createDiv("settingContent");
            settingName.textContent = setting.name;

            settingDiv.appendChild(settingName);

            if(setting instanceof BoolSetting) {
                const settingElm = createInput("checkbox", "settingContent");
                
                settingElm.checked = setting.val;

                settingElm.oninput = () => {
                    setting.set(settingElm.checked);
                    if(setting == module.enabled) {
                        if(setting.val) {
                            module.enable();
                        } else module.disable();
                    }
                }
                const settingElmHolder = createDiv("settingContent");
                settingElmHolder.appendChild(settingElm);
                settingDiv.appendChild(settingElmHolder);
            } else if(setting instanceof BindSetting) {
                const settingElm = createElement("button", "settingContent");
                settingElm.textContent = getBindSettingStr(setting);

                settingElm.onclick = () => {
                    if(GuiModule.bindingSetting != setting) {
                        GuiModule.bindingSetting = setting;
                        GuiModule.bindingSettingElm = settingElm;
                        settingElm.textContent = "BIND: BINDING"
                    } else {
                        GuiModule.bindingSetting = null;
                        settingElm.textContent = getBindSettingStr(setting);
                    }
                }
                const settingElmHolder = createDiv("settingContent");
                settingElmHolder.appendChild(settingElm);
                settingDiv.appendChild(settingElmHolder);
            } else if (setting instanceof NumSetting) {
                const settingElm = createInput("range", "settingContent");
                settingElm.min = setting.minVal.toString();
                settingElm.max = setting.maxVal.toString();
                settingElm.value = setting.val.toString();
                settingName.textContent = `${setting.name}: ${settingElm.value}`;

                settingElm.oninput = () => {
                    settingName.textContent = `${setting.name}: ${settingElm.value}`;
                    setting.set(settingElm.value);
                }
                //settingElm.setAttribute("type", "range");
               // settingElm.setAttribute("min", setting.minVal + "");
               // settingElm.setAttribute("max", setting.maxVal + "");
               const settingElmHolder = createDiv("settingContent");
               settingElmHolder.appendChild(settingElm);
               settingDiv.appendChild(settingElmHolder);
            } else if(setting instanceof HatSetting) {
                const settingElm = createElement("select");
                for(const i in HatIds) {
                    if(isNaN(parseInt(i))) continue;
                    const optionElm = createElement("option");
                    optionElm.value = i;
                    optionElm.text = HatIds[i];
                    settingElm.appendChild(optionElm);
                }
                settingElm.value = setting.val.toString();
                settingElm.oninput = () => {
                    setting.set(settingElm.value);
                }
                const settingElmHolder = createDiv("settingContent");
                settingElmHolder.appendChild(settingElm);
                settingDiv.appendChild(settingElmHolder);
            } else if(setting instanceof EnumSetting) {
                const settingElm = createElement("select");
                for(const i in setting.rawEnum) {
                    if(isNaN(parseInt(i))) continue;
                    const optionElm = createElement("option");
                    optionElm.value = i;
                    optionElm.text = setting.rawEnum[i];
                    settingElm.appendChild(optionElm);
                }

                settingElm.value = setting.val.toString();
                settingElm.oninput = () => {
                    setting.set(settingElm.value);
                }
                const settingElmHolder = createDiv("settingContent");
                settingElmHolder.appendChild(settingElm);
                settingDiv.appendChild(settingElmHolder);
            }

            

            guiDiv.appendChild(settingDiv);
        }

        return guiDiv;
    }

    onPostInit(): void {
        for(const module of moduleManager.modules) {
            if(categoryDivs.has(module.category)) continue;

            const categoryDiv = createDiv("catDiv");
            categoryDiv.append(Category[module.category]);

            const ind = storageDat.menuPos[module.category];
            if(ind) {
                categoryDiv.style.top = ind.top + "px";
                categoryDiv.style.left = ind.left + "px";
            }
            

            categoryDivs.set(module.category, categoryDiv);
        }

        for(const module of moduleManager.modules) {
            const modDiv = createDiv("moduleDiv");
            modDiv.append(module.name);

            module.guiElement = modDiv;

           const catDiv = categoryDivs.get(module.category);
           if(!catDiv) continue;

           catDiv.appendChild(modDiv);

           modDiv.title = module.desc;

           modDiv.addEventListener("mousedown", (e) => {
               if(e.button == 0) {//left
                module.toggle();
               } else if(e.button == 2) {//right, and open gui
                if(modGui) {
                    modGui.remove();
                    modGui = null;
                    if(currentModGui == module.name) {
                        currentModGui = null;
                        return;
                    }
                }
                currentModGui = module.name;
                modGui = this.generateModuleGui(module);
                moduleDiv.appendChild(modGui);
               }
           });

           makeDraggable(catDiv, module.category);
        }

        for(const [, catDiv] of categoryDivs) {
            guiHolder.appendChild(catDiv);
        }

        document.body.appendChild(guiHolder);
    }
}