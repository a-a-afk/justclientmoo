

export function initStyle() {
  const style = `
  .notifDiv {
    position: absolute;
    right: -100px;
    width: fit-content;
    height: fit-content;
    background-color: rgba(75, 75, 75, 0.473);
    border-radius: 5px;
    transition-duration: 650ms;
    z-index: 10;
  }
  
  .guiHolder {
    top: 0px;
    left: 0px;
    width: 100%;
    position: absolute;
    height: 100%;
    background-color: rgba(124, 124, 124, 0.281);
    display: none;
  }
  
  .catDiv {
    position: absolute;
    width: fit-content;
    height: fit-content;
    background-color: rgb(31, 31, 31);
    padding: 6px;
    display: grid;
    place-items: center;
    color: rgba(138, 192, 240, 0.842);
  }
  
  .moduleDiv {
    display: block;
    width: fit-content;
    height: fit-content;
    padding: 3px;
    background-color: rgb(31, 31, 31);
    transition-duration: 500ms;
  }
  
  .moduleDiv:hover {
    background-color: rgb(51, 84, 196);
  }
  
  .modGuiHolder {
    display: grid;
    place-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .moduleGui {
    display: block;
  
    width: 45%;
    height: 45%;
    background-color: rgba(16, 58, 148, 0.637);
    overflow: scroll;
  }
  
  .settingDiv {
    width: 100%;
    height: fit-content;
    position: relative;
    display: grid;
    place-content: center;
    margin-bottom: 4px;
    box-sizing: border-box;
    border-style: solid;
    border-color: rgba(1, 26, 54, 0.89);
  }
  
  .settingContent {
    display: inline-block;
    width: fit-content;
  }
  
  .moduleEnabled {
    background-color: rgba(100, 142, 219, 0.918);
  }
  
  .errorDiv {
    background-color: rgba(116, 13, 13, 0.658);
  }
`;

const styleElm = document.createElement("style");
styleElm.setAttribute("type", "text/css");
styleElm.appendChild(document.createTextNode(style));
document.head.appendChild(styleElm);

}