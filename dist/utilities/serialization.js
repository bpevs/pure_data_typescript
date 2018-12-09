/**
 * Utilities for parsing to and from*.pd files
 * It goes to and from text files to javascript classes
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * @param text *.pd file text
 */
import { PDArray, PDCanvas, PDConnect, PDCoords, PDFloatatom, PDMsg, PDObj, PDText } from "../elements";
var prev = null;
export function deserializeFromFile(text) {
    return text
        .replace(/\r/, "")
        .split(/;\n/)
        .filter(Boolean)
        .map(function (line) {
        var _a = line.substring(1).split(/\s+/), chunk = _a[0], element = _a[1], params = _a.slice(2);
        if (prev && chunk === "A") {
            // Special case; array's "element" type is included in prev line
            prev.addData([element].concat(params));
            return;
        }
        prev = null;
        if (chunk === "N" && element === "canvas") {
            return new PDCanvas(params);
        }
        if (chunk === "X") {
            switch (element) {
                case "array":
                    prev = new PDArray(params);
                    return prev;
                case "connect": return new PDConnect(params);
                case "coords": return new PDCoords(params);
                case "floatatom": return new PDFloatatom(params);
                case "msg": return new PDMsg(params);
                case "obj": return new PDObj(params);
                case "text": return new PDText(params);
                default: return { chunk: chunk, element: element, params: params };
            }
        }
        throw new Error("invalid syntax, " + line);
    }).filter(Boolean);
}
export function serializeToFile(elements) {
    return elements.map(function (el) { return el.chunkType
        ? el.toString()
        : ["#", el.chunk, el.element].concat(el.params).join(" "); }).join(";\r\n") + ";\r\n";
}
//# sourceMappingURL=serialization.js.map