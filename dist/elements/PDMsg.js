/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */
import { context as ctx, OBJECT_HEIGHT } from "../constants";
import * as draw from "../utilities/drawHelpers";
var PDMsg = /** @class */ (function () {
    function PDMsg(_a) {
        var xPos = _a[0], yPos = _a[1], params = _a.slice(2);
        this.chunkType = "X";
        this.elementType = "msg";
        this.color = "black";
        this.inlets = ["control"];
        this.outlets = ["signal"];
        this.xPos = Number(xPos);
        this.yPos = Number(yPos);
        this.text = params.join(" ");
    }
    PDMsg.prototype.render = function () {
        var displayText = this.text.replace(/\\/g, "");
        var length = draw.getDisplayLength(displayText, this.inlets, this.outlets);
        ctx.strokeStyle = this.color;
        drawMsgOutline(this.xPos, this.yPos, length);
        draw.text(this.xPos, this.yPos, displayText);
        draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets);
    };
    PDMsg.prototype.toString = function () {
        return "#X msg " + this.xPos + " " + this.yPos + " " + this.text;
    };
    return PDMsg;
}());
export { PDMsg };
// Message box has a custom shaped outline
function drawMsgOutline(xPos, yPos, length) {
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + length + 5, yPos);
    ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT / 4));
    ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT * 3 / 4));
    ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT);
    ctx.lineTo(xPos, yPos + OBJECT_HEIGHT);
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
}
//# sourceMappingURL=PDMsg.js.map