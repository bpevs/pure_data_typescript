import { canvas, context as ctx, OBJECT_HEIGHT } from "../constants";
import { PDFloatatom, PDMsg, PDObj, PDText } from "../elements";
// Initialize draw settings
ctx.lineWidth = "1";
ctx.fillStyle = "black";
ctx.font = "10pt monaco";
ctx.fillText("Drop file to start", window.innerWidth / 2.2, window.innerHeight / 2.8);
// Determine the longest visual length item to render
export function getDisplayLength(drawText, inlets, outlets) {
    var textLength = drawText.length * 6 + 5;
    var inletLength = inlets.length * 20;
    var outletLength = outlets.length * 20;
    return Math.max(textLength, inletLength, outletLength);
}
export function inlets(xPos, yPos, inlets, outlets) {
    var inletHeight = 3;
    var inletWidth = 8;
    var inletY = yPos;
    var outletY = yPos + OBJECT_HEIGHT - inletHeight;
    var inletDistance = length / inlets.length;
    var outletDistance = length / outlets.length;
    inlets.forEach(function (type, index) {
        if (type === "signal") {
            ctx.fillRect(xPos + index * inletDistance, inletY, inletWidth, inletHeight);
        }
        else {
            ctx.strokeRect(xPos + index * inletDistance, inletY, inletWidth, inletHeight);
        }
    });
    outlets.forEach(function (type, index) {
        if (type === "signal") {
            ctx.fillRect(xPos + index * outletDistance, outletY, inletWidth, inletHeight);
        }
        else {
            ctx.strokeRect(xPos + index * outletDistance, outletY, inletWidth, inletHeight);
        }
    });
}
export function rectOutline(xPos, yPos, length) {
    ctx.strokeRect(xPos, yPos, length + 10, OBJECT_HEIGHT);
}
export function renderPatch(patch) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    patch.forEach(function (item) {
        if (item instanceof PDMsg
            || item instanceof PDFloatatom
            || item instanceof PDText
            || item instanceof PDObj)
            item.render();
    });
}
export function text(xPos, yPos, text) {
    ctx.fillStyle = "black";
    ctx.font = "7pt monaco";
    ctx.fillText(text, xPos + 2, yPos + OBJECT_HEIGHT - 6);
}
//# sourceMappingURL=drawHelpers.js.map