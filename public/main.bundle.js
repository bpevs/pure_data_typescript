const state = {
  currentPatch: [],
  mode: "interactive",
};
const canvas = document.getElementById("pd");
const context = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
const bsr = context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
const PIXEL_RATIO = dpr / bsr;
canvas.width = window.innerWidth * PIXEL_RATIO;
canvas.height = window.innerHeight * PIXEL_RATIO;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
const body = document.getElementsByTagName("body")[0];
class ContextMenu {
  ref = null;
  listeners = [];
  constructor() {
    body.addEventListener("click", this.removeMenu);
  }
  render(xPos, yPos, items) {
    const menu = this.ref || document.createElement("div");
    menu.className = "context-menu";
    menu.style.top = yPos + "px";
    menu.style.left = xPos + "px";
    const menuItems = items.map(({ name }, i) =>
      `<li class="context-${i}">${name}</li>`
    ).join("");
    menu.innerHTML = `<ul>${menuItems}</ul>`;
    if (!this.ref) {
      body.appendChild(menu);
      items.forEach(({ method }, i) => {
        const ref = document.getElementsByClassName(`context-${i}`)[0];
        if (ref) this.listeners.push(ref.addEventListener("click", method));
      });
    }
    this.ref = menu;
  }
  removeMenu = () => {
    if (this.ref) {
      body.removeChild(this.ref);
      this.ref = null;
    }
    if (this.listeners) {
      this.listeners.forEach((listener) =>
        removeEventListener("click", listener)
      );
    }
  };
}
class PDArray {
  chunkType = "X";
  elementType = "array";
  constructor([name, size, format, saveFlag]) {
    this.data = [];
    this.name = String(name);
    this.size = Number(size);
    this.format = String(format);
    this.saveFlag = Boolean(saveFlag);
  }
  addData(data) {
    this.data = this.data.concat(data.map(Number));
  }
  toString() {
    const meta = `#X array ${this.name} ${this.size} ${this.format} ${
      this.saveFlag ? 1 : 0
    };\r\n`;
    const data = `#A ${this.data.join(" ")}`;
    return meta + data;
  }
}
class PDCanvas {
  chunkType = "N";
  elementType = "canvas";
  constructor([xPos, yPos, xSize, ySize, name1, openOnLoad]) {
    this.isSubPatch = isNaN(parseInt(name1, 10));
    this.name = this.isSubPatch ? name1 : null;
    this.xPos = Number(xPos);
    this.yPos = Number(yPos);
    this.xSize = Number(xSize);
    this.ySize = Number(ySize);
    this.openOnLoad = Boolean(openOnLoad);
  }
  toString() {
    return `#N canvas ${this.xPos} ${this.yPos} ${this.xSize} ${this.ySize} ${this.name} ${this.openOnLoad}`;
  }
}
class PDConnect {
  chunkType = "X";
  elementType = "connect";
  constructor([source, outlet, target, inlet]) {
    this.inlet = Number(inlet);
    this.outlet = Number(outlet);
    this.source = Number(source);
    this.target = Number(target);
  }
  toString() {
    return `#X connect ${this.source} ${this.outlet} ${this.target} ${this.inlet}`;
  }
}
class PDCoords {
  chunkType = "X";
  elementType = "coords";
  constructor([xFrom, yTo, xTo, yFrom, width, height, graphOnParent]) {
    this.xFrom = Number(xFrom);
    this.xTo = Number(xTo);
    this.yFrom = Number(yFrom);
    this.yTo = Number(yTo);
    this.width = Number(width);
    this.height = Number(height);
    this.graphOnParent = Boolean(graphOnParent);
  }
  toString() {
    return `#X coords ${this.xFrom} ${this.yTo} ${this.xTo} ${this.yFrom}` +
      ` ${this.width} ${this.height} ${this.graphOnParent ? 1 : 0}`;
  }
}
context.lineWidth = "1";
context.fillStyle = "black";
context.font = "10pt monaco";
context.fillText(
  "Drop file to start",
  window.innerWidth / 2.2,
  window.innerHeight / 2.8,
);
function getDisplayLength(drawText, inlets, outlets) {
  const textLength = drawText.length * 6 + 5;
  const inletLength = inlets.length * 20;
  const outletLength = outlets.length * 20;
  return Math.max(textLength, inletLength, outletLength);
}
function inlets1(length, xPos1, yPos1, inlets1, outlets) {
  const inletY = yPos1;
  const outletY = yPos1 + 18 - 3;
  const actualLength = Math.max(length, 20) - 8;
  const inletDistance = actualLength / Math.max(1, inlets1.length - 2);
  const outletDistance = actualLength / Math.max(1, outlets.length - 2);
  inlets1.forEach((type, index) => {
    const nextInletLocation = xPos1 + index * inletDistance;
    if (type === "signal") {
      context.fillRect(nextInletLocation, inletY, 8, 3);
    } else {
      context.strokeRect(nextInletLocation, inletY, 8, 3);
    }
  });
  outlets.forEach((type, index) => {
    const nextOutletLocation = xPos1 + index * outletDistance;
    if (type === "signal") {
      context.fillRect(nextOutletLocation, outletY, 8, 3);
    } else {
      context.strokeRect(nextOutletLocation, outletY, 8, 3);
    }
  });
}
function parseColor(str) {
  const num = Number(str).toString(2).slice(1).padStart(18, "0");
  const r = parseInt(num.slice(0, 6), 2) * 4;
  const g = parseInt(num.slice(6, 12), 2) * 4;
  const b = Math.max(0, parseInt(num.slice(12), 2) * 4) || 256;
  return `rgb(${r}, ${g}, ${b})`;
}
function rectOutline(xPos1, yPos1, length) {
  context.strokeRect(xPos1, yPos1, Math.max(length, 20), 18);
}
function text(xPos1, yPos1, text1, size1) {
  context.fillStyle = "black";
  context.font = size1 ? `${size1}pt monaco` : "7pt monaco";
  context.fillText(text1, xPos1 + 2, yPos1 + 18 - 6);
}
class PDFloatatom {
  chunkType = "X";
  elementType = "floatatom";
  color = "black";
  inlets = [
    "control",
  ];
  outlets = [
    "signal",
  ];
  constructor(
    [
      xPos1,
      yPos1,
      width1,
      lowerLimit,
      upperLimit,
      labelPos,
      label,
      receive,
      send,
    ],
  ) {
    this.lowerLimit = Number(lowerLimit);
    this.label = String(label);
    this.labelPos = Number(labelPos);
    this.receive = String(receive);
    this.send = String(send);
    this.upperLimit = Number(upperLimit);
    this.width = Number(width1);
    this.xPos = Number(xPos1);
    this.yPos = Number(yPos1);
  }
  render() {
    const displayText = this.label.replace(/\\/g, "");
    const length = getDisplayLength(displayText, this.inlets, this.outlets);
    context.strokeStyle = this.color;
    drawOutline(this.xPos, this.yPos, length);
    text(this.xPos, this.yPos, displayText);
    inlets1(length, this.xPos, this.yPos, this.inlets, this.outlets);
  }
  toString() {
    let str = `#X floatatom ${this.xPos} ${this.yPos} ${this.width}` +
      ` ${this.lowerLimit} ${this.upperLimit} ${this.labelPos}`;
    str += this.label || "-";
    str += this.receive || "-";
    str += this.send || "-";
    return str;
  }
}
function drawOutline(xPos2, yPos2, length) {
  context.beginPath();
  context.moveTo(xPos2, yPos2);
  context.lineTo(xPos2 + length, yPos2);
  context.lineTo(xPos2 + length + 5, yPos2 + 5);
  context.lineTo(xPos2 + length + 5, yPos2 + 18);
  context.lineTo(xPos2, yPos2 + 18);
  context.lineTo(xPos2, yPos2);
  context.stroke();
}
class PDMsg {
  chunkType = "X";
  elementType = "msg";
  color = "black";
  inlets = [
    "control",
  ];
  outlets = [
    "signal",
  ];
  constructor([xPos2, yPos2, ...params]) {
    this.xPos = Number(xPos2);
    this.yPos = Number(yPos2);
    this.text = params.join(" ");
  }
  render() {
    const displayText = this.text.replace(/\\/g, "");
    const length = getDisplayLength(displayText, this.inlets, this.outlets);
    context.strokeStyle = this.color;
    drawMsgOutline(this.xPos, this.yPos, length);
    text(this.xPos, this.yPos, displayText);
    inlets1(length, this.xPos, this.yPos, this.inlets, this.outlets);
  }
  toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`;
  }
}
function drawMsgOutline(xPos3, yPos3, length) {
  context.beginPath();
  context.moveTo(xPos3, yPos3);
  context.lineTo(xPos3 + length + 5, yPos3);
  context.lineTo(xPos3 + length, yPos3 + 18 / 4);
  context.lineTo(xPos3 + length, yPos3 + 18 * 3 / 4);
  context.lineTo(xPos3 + length + 5, yPos3 + 18);
  context.lineTo(xPos3, yPos3 + 18);
  context.lineTo(xPos3, yPos3);
  context.stroke();
}
const ctrl = "control";
const generics = {
  "%": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a % b,
  ],
  "*": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a * b,
  ],
  "+": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a + b,
  ],
  "-": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a - b,
  ],
  "/": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a / b,
  ],
  "abs": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.abs,
  ],
  "atan": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.atan,
  ],
  "atan2": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.atan2,
  ],
  "cos": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.cos,
  ],
  "dbtopow": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    (a) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 10),
  ],
  "dbtorms": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    (a) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 20),
  ],
  "del": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "delay": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "exp": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.exp,
  ],
  "ftom": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "inlet": [
    [],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "key": [
    [],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "keyup": [
    [],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "loadbang": [
    [],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "log": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.log,
  ],
  "max": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.max,
  ],
  "metro": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "min": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.min,
  ],
  "mod": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    ([a, b]) => a % b,
  ],
  "mtof": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    () => {
      return;
    },
  ],
  "outlet": [
    [
      ctrl,
    ],
    [],
    () => {
      return;
    },
  ],
  "pow": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.pow,
  ],
  "powtodb": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    (a) => a <= 0 ? 0 : 10 * Math.log(a) / Math.LN10 + 100,
  ],
  "print": [
    [
      ctrl,
    ],
    [],
    (...args) => {
      console.log(args);
    },
  ],
  "r": [
    [
      ctrl,
    ],
    [],
    () => {
      return;
    },
  ],
  "receive": [
    [
      ctrl,
    ],
    [],
    () => {
      return;
    },
  ],
  "rmstodb": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    (a) => a <= 0 ? 0 : 20 * Math.log(a) / Math.LN10 + 100,
  ],
  "s": [
    [
      ctrl,
    ],
    [],
    () => {
      return;
    },
  ],
  "send": [
    [
      ctrl,
    ],
    [],
    () => {
      return;
    },
  ],
  "sin": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.sin,
  ],
  "spigot": [
    [
      ctrl,
      ctrl,
    ],
    [
      ctrl,
    ],
  ],
  "sqrt": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.sqrt,
  ],
  "tan": [
    [
      ctrl,
    ],
    [
      ctrl,
    ],
    Math.tan,
  ],
  "wrap": [
    [
      ctrl,
    ],
    [],
    (a) => a - Math.floor(a),
  ],
};
class PDObj {
  chunkType = "X";
  elementType = "obj";
  color = "black";
  inlets = [];
  outlets = [];
  length = 0;
  constructor([xPos3, yPos3, name2, ...params1]) {
    this.xPos = Number(xPos3);
    this.yPos = Number(yPos3);
    this.name = String(name2 || "");
    this.params = params1;
  }
  render() {
    if (generics[this.name]) {
      this.inlets = generics[this.name][0];
      this.outlets = generics[this.name][1];
      this.behavior = generics[this.name][2];
    }
    this.displayText = this.name.replace(/\\/g, "");
    this.length = getDisplayLength(this.displayText, this.inlets, this.outlets);
    context.strokeStyle = this.color;
    rectOutline(this.xPos, this.yPos, this.length);
    text(this.xPos, this.yPos, this.displayText);
    inlets1(this.length, this.xPos, this.yPos, this.inlets, this.outlets);
  }
  toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${
      this.params.join(" ")
    }`;
  }
}
class PDText {
  chunkType = "X";
  elementType = "text";
  constructor([xPos4, yPos4, ...params2]) {
    this.xPos = Number(xPos4);
    this.yPos = Number(yPos4);
    this.text = params2.join(" ");
  }
  render() {
    const displayText = this.text.replace(/\\/g, "");
    context.strokeStyle = "black";
    text(this.xPos, this.yPos, displayText);
  }
  toString() {
    return `#X text ${this.xPos} ${this.yPos} ${this.text}`;
  }
}
class PDObjCnv extends PDObj {
  chunkType = "X";
  elementType = "obj";
  objectType = "cnv";
  color = "black";
  inlets = [];
  outlets = [];
  constructor(params3) {
    super(params3);
    this.width = Number(params3[4]);
    this.height = Number(params3[5]);
    this.label = params3[8] !== "empty" ? this.params[8] : "";
    this.xLabelOffset = Number(params3[9]);
    this.yLabelOffset = Number(params3[10]) + 30;
    this.fontSize = Number(params3[12]) - 8;
    this.bgColor = params3[13];
    this.labelColor = params3[14];
  }
  render() {
    context.fillStyle = parseColor(this.bgColor);
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
    text(
      this.xPos + this.xLabelOffset,
      this.yPos + this.yLabelOffset,
      this.label,
      this.fontSize,
    );
  }
  toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${
      this.params.join(" ")
    }`;
  }
}
const objects = {
  cnv: PDObjCnv,
};
let prev = null;
let subPatchName = null;
function deserializeFromFile(text1) {
  return text1.split(/;\r?\n/).filter(Boolean).map((line) => {
    const [chunk, element, ...params4] = line.substring(1).split(/\s+/);
    if (subPatchName) {
      const endsGraph = subPatchName === "(subpatch)" && params4[2] === "graph";
      const endsSubPatch = element === "restore" && subPatchName === params4[3];
      if (!endsGraph && !endsSubPatch) return;
      subPatchName = null;
    }
    if (prev && chunk === "A") {
      prev.addData([
        element,
        ...params4,
      ]);
      return;
    }
    prev = null;
    if (chunk === "N" && element === "canvas") {
      const canvas1 = new PDCanvas(params4);
      if (canvas1.isSubPatch) subPatchName = canvas1.name;
      return canvas1;
    }
    if (chunk === "X") {
      switch (element) {
        case "array":
          prev = new PDArray(params4);
          return prev;
        case "connect":
          return new PDConnect(params4);
        case "coords":
          return new PDCoords(params4);
        case "floatatom":
          return new PDFloatatom(params4);
        case "msg":
          return new PDMsg(params4);
        case "text":
          return new PDText(params4);
        case "obj": {
          const objectType = params4[2];
          if (objects[objectType]) return new objects[objectType](params4);
          else return new PDObj(params4);
        }
        default:
          return {
            chunk,
            element,
            params: params4,
          };
      }
    }
    throw new Error(`invalid syntax, ${line}`);
  }).filter(Boolean);
}
function serializeToFile(elements) {
  return elements.map((el) =>
    el.chunkType ? el.toString() : [
      "#",
      el.chunk,
      el.element,
    ].concat(el.params).join(" ")
  ).join(";\r\n") + ";\r\n";
}
function downloadPatch(patch) {
  if (patch != null) {
    const patchText = serializeToFile(patch);
    const blob = new Blob([
      patchText,
    ], {
      type: "application/octet-stream",
    });
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", "patch.pd");
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}
const loadPatch = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const files = e.dataTransfer.files;
  const file = files[0];
  return new Promise((resolve) => {
    if (file && file.name.match(/\.pd$/)) {
      const reader = new FileReader();
      reader.onload = (e2) => {
        resolve(e2.target.result);
      };
      reader.readAsBinaryString(file);
    }
  });
};
function renderPatch(patch) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  patch.forEach((item) => {
    if (
      item instanceof PDMsg || item instanceof PDFloatatom ||
      item instanceof PDText || item instanceof PDObj
    ) {
      item.render();
    }
  });
}
document.addEventListener("DOMContentLoaded", function initialize() {
  listenForHeaderChanges();
  listenForCanvasChanges();
});
function listenForHeaderChanges() {
  const modeCheckbox = document.getElementById("mode");
  modeCheckbox.checked = state.mode === "edit";
  modeCheckbox.addEventListener("click", function toggleMode() {
    state.mode = state.mode === "edit" ? "interactive" : "edit";
  });
  const exportButton = document.getElementById("export");
  exportButton.addEventListener(
    "click",
    () => downloadPatch(state.currentPatch),
  );
}
function listenForCanvasChanges() {
  const patchCanvas = document.getElementById("pd");
  patchCanvas.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });
  patchCanvas.addEventListener("drop", async (e) => {
    const patchText = String(await loadPatch(e));
    state.currentPatch = deserializeFromFile(patchText);
    renderPatch(state.currentPatch);
  });
  const menu = new ContextMenu();
  patchCanvas.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault();
    menu.render(e.pageX, e.pageY, [
      {
        name: "Properties",
        method: () => {
          console.log("Properties");
        },
      },
      {
        name: "Object ⌘1",
        method: () => {
          console.log("Object ⌘1");
        },
      },
      {
        name: "Message ⌘2",
        method: () => {
          console.log("Message ⌘2");
        },
      },
      {
        name: "Number ⌘3",
        method: () => {
          console.log("Number ⌘3");
        },
      },
      {
        name: "Symbol ⌘4",
        method: () => {
          console.log("Symbol ⌘4");
        },
      },
      {
        name: "Comment ⌘5",
        method: () => {
          console.log("Comment ⌘5");
        },
      },
    ]);
  });
}
