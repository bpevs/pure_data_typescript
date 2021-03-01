class Portlet {
    value = null;
    constructor(value1){
        this.value = value1;
    }
}
const Portlet1 = Portlet;
const DefaultPatchProps = Object.freeze({
    canvas: null,
    inlets: [],
    outlets: [],
    records: [],
    renderer: null
});
class Renderer {
    objectHeight = 18;
    portletHeight = 3;
    portletWidth = 8;
    elementRenderers = new Map();
    objectRenderers = new Map();
    setup(...args) {
        console.log("No render method declared", this);
    }
    render(...args) {
        console.log("No render method declared", this);
    }
}
class Patch {
    static from(patchFileString) {
        return parsePatch1(patchFileString);
    }
    inlets = [];
    outlets = [];
    records = [];
    renderer = new Renderer();
    state = {
        dspEnabled: false,
        editMode: false
    };
    constructor({ records , renderer: renderer1 , ...options1 } = DefaultPatchProps){
        if (records) this.records = records;
        if (renderer1) this.renderer = renderer1;
        this.state = {
            ...this.state,
            ...options1
        };
    }
    render(options) {
        return this.renderer.render(this.records, options);
    }
    setInlet(index, value) {
        if (this.inlets[index]) {
            this.inlets[index].value = value;
        } else {
            this.inlets[index] = new Portlet1(value);
        }
    }
    setOutlet(index, value) {
        if (this.outlets[index]) {
            this.outlets[index].value = value;
        } else {
            this.outlets[index] = new Portlet1(value);
        }
    }
    setRenderer(renderer) {
        this.renderer = renderer;
    }
    setState(options = {
    }) {
        this.state = {
            ...this.state,
            ...options
        };
    }
    start() {
        console.log(this);
    }
    streamInlet(index, source) {
        this.inlets[index] = source;
    }
    streamOutlet(index, target) {
        this.outlets[index] = target;
    }
    toString() {
        return this.records.map((record)=>record.toString()
        ).join(";\r\n") + ";\r\n";
    }
}
const Patch1 = Patch;
class TypeMap {
    serializedToType = new Map();
    typeToSerialized = new Map();
    types = {
    };
    constructor(typeInfo){
        Object.keys(typeInfo).forEach((name)=>this.setType(name, typeInfo[name])
        );
    }
    getType(name) {
        return this.serializedToType.get(name);
    }
    hasType(type) {
        return Boolean(this.typeToSerialized.get(type));
    }
    setType(name, serializedName) {
        const type = Symbol(name);
        this.types[name] = type;
        this.serializedToType.set(serializedName, type);
        this.typeToSerialized.set(type, serializedName);
    }
    serializeType(name) {
        const serialized = this.typeToSerialized.get(name);
        if (!serialized) {
            console.warn(`Type ${String(name)} does not exist, and could not serialize`);
        }
        return serialized;
    }
}
const ELEMENT = new TypeMap({
    ARRAY: "array",
    CANVAS: "canvas",
    COORDS: "coords",
    CONNECT: "connect",
    FLOAT_ATOM: "floatatom",
    MSG: "msg",
    OBJ: "obj",
    RESTORE: "restore",
    SYMBOL_ATOM: "symbolatom",
    TEXT: "text",
    UNKNOWN: "unknown"
});
const RECORD = new TypeMap({
    ARRAY: "A",
    ELEMENT: "X",
    NEW_WINDOW: "N"
});
const OBJECT = new TypeMap({
    BUTTON: "button",
    OBJ: "obj",
    UNKNOWN: "unknown"
});
class Record {
    static TYPE = RECORD.types;
    static serializeType = (a)=>RECORD.serializeType(a)
    ;
    static getType = (a)=>RECORD.getType(a)
    ;
    static isType = (type, record)=>{
        return type === Record.getType(record.recordType);
    };
    render = ()=>{
    };
    constructor(recordType, props = {
        params: []
    }){
        this.children = [];
        this.params = props.params;
        this.recordType = recordType;
    }
    toString() {
        const type = Record.serializeType(this.recordType);
        const params = this.params.join(" ");
        return `#${type} ${params}`;
    }
}
class PDCanvas extends Record {
    static from = (chunk)=>{
        const [xPos, yPos, xSize, ySize, param1, param2, ...params] = chunk.params;
        const isFirstRecord = isNaN(Number(param1));
        return new PDCanvas({
            params,
            fontSize: isFirstRecord ? Number(param1) : undefined,
            name: isFirstRecord ? undefined : param1,
            openOnLoad: isFirstRecord ? undefined : Boolean(Number(param2)),
            xPos: Number(xPos),
            xSize: Number(xSize),
            yPos: Number(yPos),
            ySize: Number(ySize)
        });
    };
    children = [];
    constructor(props1){
        super(Record.TYPE.NEW_WINDOW);
        this.fontSize = props1.fontSize;
        this.name = props1.name;
        this.openOnLoad = props1.openOnLoad;
        this.xPos = props1.xPos;
        this.xSize = props1.xSize;
        this.yPos = props1.yPos;
        this.ySize = props1.ySize;
    }
    addChild(key, record) {
        this.children.push(record);
    }
    toString() {
        const record = super.toString();
        const props2 = [
            record,
            this.xPos,
            this.yPos,
            this.xSize,
            this.ySize
        ];
        const additionalProps = this.fontSize == null ? [
            this.name,
            this.openOnLoad
        ] : [
            this.fontSize
        ];
        return props2.concat(additionalProps).join(" ");
    }
}
const Canvas = PDCanvas;
class Element1 extends Record {
    static TYPE = ELEMENT.types;
    static type = Record.TYPE.ELEMENT;
    static getType = (a)=>ELEMENT.getType(a)
    ;
    static isType = (type, record)=>{
        return type === Element1.getType(record.elementType);
    };
    static serializeType = (a)=>ELEMENT.serializeType(a)
    ;
    static from({ children , elementType , params  }) {
        if (!elementType) throw new Error("Element type is mandatory");
        return new Element1(elementType, {
            children,
            params
        });
    }
    constructor(elementType, props2){
        super(Record.TYPE.ELEMENT);
        this.elementType = elementType;
        this.params = props2.params;
    }
    toString() {
        return [
            super.toString(),
            Element1.serializeType(this.elementType), 
        ].join(" ");
    }
}
class PDObject extends Element1 {
    static TYPE = OBJECT.types;
    static type = Element1.TYPE.OBJECT;
    static serializeType = (a)=>OBJECT.serializeType(a)
    ;
    static getType = (a)=>OBJECT.getType(a)
    ;
    static from = ({ children , objectType , params  })=>{
        if (!objectType) throw new Error("Object type required");
        const [xPos, yPos, name = "", ...other] = params;
        return new PDObject(objectType, {
            children,
            name,
            params: other,
            xPos: Number(xPos),
            yPos: Number(yPos)
        });
    };
    color = "black";
    inlets = [];
    length = 0;
    outlets = [];
    constructor(objectType, props3){
        super(Element1.TYPE.OBJECT, props3);
        this.objectType = objectType;
        this.params = props3.params;
        this.name = props3.name;
        this.xPos = props3.xPos;
        this.yPos = props3.yPos;
    }
    toString() {
        return [
            super.toString(),
            this.xPos,
            this.yPos,
            PDObject.serializeType(this.objectType), 
        ].join(" ");
    }
}
class Chunk {
    children = [];
    constructor(recordString){
        this.params = recordString.substring(1).replace(/\n/gm, " ").split(/\s+/) || [];
    }
    get recordType() {
        return Record.getType(this.params[0]) || null;
    }
    get elementType() {
        return Element1.getType(this.params[1]) || null;
    }
    get objectType() {
        return PDObject.getType(this.params[5]) || null;
    }
    toString() {
        return `recordType: ${String(this.recordType)}\n` + `elementType: ${String(this.elementType)}\n` + `objectType: ${String(this.objectType)}\n` + `params: ${String(this.params)}\n` + `children: ${String(this.children)}\n`;
    }
}
const newlines = /(\r\n|\r)/gm;
function parsePatch(fileText) {
    const normalizedFileText = fileText.replace(newlines, "\n");
    const chunks = fileText.replace(newlines, "\n").substring(0, normalizedFileText.length - 1).split(/;\n/).filter(Boolean).map((paramsString)=>new Chunk(paramsString)
    );
    return new Patch(parseChunks(chunks));
}
const parsePatch1 = parsePatch;
function parseChunks(chunks) {
    const records1 = [];
    let canvas;
    const openSubPatches = [];
    chunks.forEach((chunk, index)=>{
        if (!index) return canvas = Canvas.from(chunk);
        const { elementType: elementType1 , recordType: recordType1  } = chunk;
        const isSubPatch = openSubPatches.length;
        const subPatchIsClosed = isSubPatch && elementType1 === Element1.TYPE.RESTORE;
        const subPatchShouldOpen = recordType1 === Record.TYPE.NEW_WINDOW;
        if (subPatchIsClosed) return openSubPatches.pop();
        else if (subPatchShouldOpen) openSubPatches.push(index);
        const prev = records1[records1.length - 1];
        if (chunk.recordType === Record.TYPE.ARRAY && prev && Element1.isType(Element1.TYPE.ARRAY, prev)) {
            const childrenToAdd = parseChunks(chunk.children).records;
            return prev.children = prev.children.concat(childrenToAdd);
        } else if (chunk.recordType === Record.TYPE.ARRAY) {
            return;
        }
        records1.push(createRecordFromChunk(chunk));
    });
    return {
        canvas,
        records: records1
    };
}
function createRecordFromChunk(chunk) {
    if (!chunk.recordType) throw new Error("Record type cannot be null");
    switch(chunk.recordType){
        case Record.TYPE.NEW_WINDOW:
            return PDCanvas.from(chunk);
        case Record.TYPE.ELEMENT:
            return Element1.from(chunk);
        default:
            return new Record(chunk.recordType, {
                params: chunk.params
            });
    }
}
function getDisplayLength(drawLabel, inlets, outlets) {
    const textLength = drawLabel.length * 6 + 5;
    const inletLength = inlets.length * 20;
    const outletLength = outlets.length * 20;
    return Math.max(textLength, inletLength, outletLength);
}
function drawLabel(renderer2, xPos, yPos, label, size) {
    const { context , objectHeight  } = renderer2;
    context.fillStyle = "black";
    context.font = size ? `${size}pt monaco` : "7pt monaco";
    context.fillText(label, xPos + 2, yPos + objectHeight - 6);
}
const CONTROL = Symbol("CONTROL_CONNECT");
const SIGNAL = Symbol("SIGNAL_CONNECT");
class Connect extends Element1 {
    static TYPE = Object.freeze({
        CONTROL,
        SIGNAL
    });
    static type = Element1.TYPE.CONTROL;
    static from({ children , params  }) {
        const [source, outlet, target, inlet, ...other] = params;
        return new Connect({
            children,
            inlet: Number(inlet),
            outlet: Number(outlet),
            params: other,
            source: Number(source),
            target: Number(target)
        });
    }
    constructor(props4){
        super(Connect.TYPE.CONTROL, props4);
        this.inlet = props4.inlet;
        this.outlet = props4.outlet;
        this.source = props4.source;
        this.target = props4.target;
    }
    toString() {
        return [
            super.toString(),
            "connect",
            this.outlet,
            this.target,
            this.inlet, 
        ].join(" ");
    }
}
function drawPortlets(renderer2, length, xPos, yPos, inlets, outlets) {
    const { context , objectHeight , portletHeight , portletWidth  } = renderer2;
    const inletY = yPos;
    const outletY = yPos + objectHeight - portletHeight;
    const actualLength = Math.max(length, 20) - portletWidth;
    const inletDistance = actualLength / Math.max(1, inlets.length - 2);
    const outletDistance = actualLength / Math.max(1, outlets.length - 2);
    inlets.forEach((type, index)=>{
        const nextInletLocation = xPos + index * inletDistance;
        if (type === Connect.TYPE.SIGNAL) {
            context.fillRect(nextInletLocation, inletY, portletWidth, portletHeight);
        } else {
            context.strokeRect(nextInletLocation, inletY, portletWidth, portletHeight);
        }
    });
    outlets.forEach((type, index)=>{
        const nextOutletLocation = xPos + index * outletDistance;
        if (type === Connect.TYPE.SIGNAL) {
            context.fillRect(nextOutletLocation, outletY, portletWidth, portletHeight);
        } else {
            context.strokeRect(nextOutletLocation, outletY, portletWidth, portletHeight);
        }
    });
}
function renderFloatatom(renderer2, el) {
    const { context  } = renderer2;
    const labelText = el.label.replace(/\\/g, "");
    const length = getDisplayLength(labelText, el.inlets, el.outlets);
    context.strokeStyle = el.color;
    drawFloatatomOutline(renderer2, el.xPos, el.yPos, length);
    drawLabel(renderer2, el.xPos, el.yPos, labelText);
    drawPortlets(renderer2, length, el.xPos, el.yPos, el.inlets, el.outlets);
}
function drawFloatatomOutline(renderer2, xPos, yPos, length) {
    const { context , objectHeight  } = renderer2;
    context.beginPath();
    context.moveTo(xPos, yPos);
    context.lineTo(xPos + length, yPos);
    context.lineTo(xPos + length + 5, yPos + 5);
    context.lineTo(xPos + length + 5, yPos + objectHeight);
    context.lineTo(xPos, yPos + objectHeight);
    context.lineTo(xPos, yPos);
    context.stroke();
}
function renderMsg(renderer2, el) {
    const { context  } = renderer2;
    const displayText = el.text.replace(/\\/g, "");
    const length = getDisplayLength(displayText, el.inlets, el.outlets);
    context.strokeStyle = el.color;
    drawMsgOutline(renderer2, el.xPos, el.yPos, length);
    drawLabel(renderer2, el.xPos, el.yPos, displayText);
    drawPortlets(renderer2, length, el.xPos, el.yPos, el.inlets, el.outlets);
}
function drawMsgOutline(renderer2, xPos, yPos, length) {
    const { context , objectHeight  } = renderer2;
    context.beginPath();
    context.moveTo(xPos, yPos);
    context.lineTo(xPos + length + 5, yPos);
    context.lineTo(xPos + length, yPos + objectHeight / 4);
    context.lineTo(xPos + length, yPos + objectHeight * 3 / 4);
    context.lineTo(xPos + length + 5, yPos + objectHeight);
    context.lineTo(xPos, yPos + objectHeight);
    context.lineTo(xPos, yPos);
    context.stroke();
}
function rectOutline(renderer2, xPos, yPos, length) {
    const { context , objectHeight  } = renderer2;
    context.strokeRect(xPos, yPos, Math.max(length, 20), objectHeight);
}
function renderObj(renderer2, el) {
    const { context  } = renderer2;
    const displayText = el.name.replace(/\\/g, "");
    const length = getDisplayLength(displayText, el.inlets, el.outlets);
    context.strokeStyle = el.color;
    rectOutline(renderer2, el.xPos, el.yPos, length);
    drawLabel(renderer2, el.xPos, el.yPos, displayText);
    drawPortlets(renderer2, el.length, el.xPos, el.yPos, el.inlets, el.outlets);
}
function renderText(renderer2, el) {
    const { context  } = renderer2;
    const displayText = el.text.replace(/\\/g, "");
    context.strokeStyle = el.color;
    drawLabel(renderer2, el.xPos, el.yPos, displayText);
}
const renderer2 = new Renderer();
renderer2.elementRenderers.set(ELEMENT.types.FLOAT_ATOM, renderFloatatom);
renderer2.elementRenderers.set(ELEMENT.types.MSG, renderMsg);
renderer2.elementRenderers.set(ELEMENT.types.OBJ, renderObj);
renderer2.elementRenderers.set(ELEMENT.types.TEXT, renderText);
const canvas = document.getElementById('pd');
const context = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
const bsr = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
const PIXEL_RATIO = dpr / bsr;
canvas.width = window.innerWidth * PIXEL_RATIO;
canvas.height = window.innerHeight * PIXEL_RATIO;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
renderer2.canvas = canvas;
renderer2.context = context;
renderer2.render = function(records1, options2 = {
}) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    records1.forEach((record)=>{
        const renderFunc = this.elementRenderers.get(record.elementType);
        if (renderFunc) {
            console.log(record);
            renderFunc(this, record);
        }
    });
};
const initialAppState = Object.freeze({
    currentPatch: null,
    mode: "interactive"
});
const appState = {
    ...initialAppState
};
const appState1 = appState;
const body = document.getElementsByTagName("body")[0];
class ContextMenu {
    ref = null;
    listeners = [];
    constructor(){
        body.addEventListener("click", this.removeMenu);
    }
    render(xPos, yPos, items) {
        const menu = this.ref || document.createElement("div");
        menu.className = "context-menu";
        menu.style.top = yPos + "px";
        menu.style.left = xPos + "px";
        const menuItems = items.map(({ name  }, i)=>`<li class="context-${i}">${name}</li>`
        ).join("");
        menu.innerHTML = `<ul>${menuItems}</ul>`;
        if (!this.ref) {
            body.appendChild(menu);
            items.forEach(({ method  }, i)=>{
                const ref = document.getElementsByClassName(`context-${i}`)[0];
                if (ref) this.listeners.push(ref.addEventListener("click", method));
            });
        }
        this.ref = menu;
    }
    removeMenu = ()=>{
        if (this.ref) {
            body.removeChild(this.ref);
            this.ref = null;
        }
        if (this.listeners) {
            this.listeners.forEach((listener)=>removeEventListener("click", listener)
            );
        }
    };
}
function downloadPatch(patchText) {
    const blob = new Blob([
        patchText
    ], {
        type: "application/octet-stream"
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
const loadPatch = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    return new Promise((resolve)=>{
        if (file && file.name.match(/\.pd$/)) {
            const reader = new FileReader();
            reader.onload = (e2)=>{
                resolve(e2.target.result);
            };
            reader.readAsBinaryString(file);
        }
    });
};
document.addEventListener("DOMContentLoaded", function initialize() {
    listenForHeaderChanges();
    listenForCanvasChanges();
});
function listenForHeaderChanges() {
    const modeCheckbox = document.getElementById("mode");
    modeCheckbox.checked = appState1.mode === "edit";
    modeCheckbox.addEventListener("click", function toggleMode() {
        appState1.mode = appState1.mode === "edit" ? "interactive" : "edit";
    });
    const exportButton = document.getElementById("export");
    exportButton.addEventListener("click", ()=>{
        if (appState.currentPatch != null) {
            downloadPatch(appState.currentPatch.toString());
        }
    });
}
function listenForCanvasChanges() {
    const patchCanvas = document.getElementById("pd");
    patchCanvas.addEventListener("dragover", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });
    patchCanvas.addEventListener("drop", async (e)=>{
        const patchText = String(await loadPatch(e));
        appState1.currentPatch = Patch1.from(patchText);
        appState.currentPatch.setRenderer(renderer2);
        appState.currentPatch.render({
            id: "#pd"
        });
    });
    const menu = new ContextMenu();
    patchCanvas.addEventListener("contextmenu", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        menu.render(e.pageX, e.pageY, [
            {
                name: "Properties",
                method: (evt)=>console.log(`Properties, ${evt}`)
            },
            {
                name: "Open",
                method: (evt)=>console.log(`Open, ${evt}`)
            },
            {
                name: "Help",
                method: async ()=>{
                    const patchResponse = await fetch("/doc/5.reference/help-intro.pd");
                    const patchText = await patchResponse.text();
                    appState1.currentPatch = Patch1.from(patchText);
                    if (appState.currentPatch) appState.currentPatch.render("#pd");
                }
            },
            {
                name: "Object ⌘1",
                method: ()=>console.log("Object ⌘1")
            },
            {
                name: "Message ⌘2",
                method: ()=>console.log("Message ⌘2")
            },
            {
                name: "Number ⌘3",
                method: ()=>console.log("Number ⌘3")
            },
            {
                name: "Symbol ⌘4",
                method: ()=>console.log("Symbol ⌘4")
            },
            {
                name: "Comment ⌘5",
                method: ()=>console.log("Comment ⌘5")
            }, 
        ]);
    });
}
