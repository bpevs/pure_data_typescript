/**
 * @class PDFloatatom
 * @description Defines a number box
 * When the value of [upper_limit] minus the value of [lower_limit] is less than one,
 * or the [width] attribute is set to one, PureData resets these values both to zero.
 * Floatatom and symbolatom are the only elements that uses "-" characters to indicate
 * that no value has been assigned to its attributes [label], [receive] and [send].
 *
 *
 * @example
 *  #X floatatom 32 26 5 0 0 0 - - -;
 */
import { context as ctx, OBJECT_HEIGHT } from "../constants";
import * as draw from "../utilities/drawHelpers";
var PDFloatatom = /** @class */ (function () {
    function PDFloatatom(_a) {
        var xPos = _a[0], yPos = _a[1], width = _a[2], lowerLimit = _a[3], upperLimit = _a[4], labelPos = _a[5], label = _a[6], receive = _a[7], send = _a[8];
        this.chunkType = "X";
        this.elementType = "floatatom";
        this.color = "black";
        this.inlets = ["control"];
        this.outlets = ["signal"];
        this.lowerLimit = Number(lowerLimit);
        this.label = String(label);
        this.labelPos = Number(labelPos);
        this.receive = String(receive);
        this.send = String(send);
        this.upperLimit = Number(upperLimit);
        this.width = Number(width);
        this.xPos = Number(xPos);
        this.yPos = Number(yPos);
    }
    PDFloatatom.prototype.render = function () {
        var displayText = this.label.replace(/\\/g, "");
        var length = draw.getDisplayLength(displayText, this.inlets, this.outlets);
        ctx.strokeStyle = this.color;
        drawOutline(this.xPos, this.yPos, length);
        draw.text(this.xPos, this.yPos, displayText);
        draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets);
    };
    PDFloatatom.prototype.toString = function () {
        var str = "#X floatatom " + this.xPos + " " + this.yPos + " " + this.width +
            (" " + this.lowerLimit + " " + this.upperLimit + " " + this.labelPos);
        str += (this.label || "-");
        str += (this.receive || "-");
        str += (this.send || "-");
        return str;
    };
    return PDFloatatom;
}());
export { PDFloatatom };
// Number box has a custom shaped outline
function drawOutline(xPos, yPos, length) {
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + length, yPos);
    ctx.lineTo(xPos + length + 5, yPos + 5);
    ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT);
    ctx.lineTo(xPos, yPos + OBJECT_HEIGHT);
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
}
//# sourceMappingURL=PDFloatatom.js.map