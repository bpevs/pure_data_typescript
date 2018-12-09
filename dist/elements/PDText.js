import { context as ctx } from "../constants";
import * as draw from "../utilities/drawHelpers";
/**
 * @class PDtext
 * @description Defines a message
 *
 * @example
 *  #X text 61 48 read audio.wav;
 */
var PDText = /** @class */ (function () {
    function PDText(_a) {
        var xPos = _a[0], yPos = _a[1], params = _a.slice(2);
        this.chunkType = "X";
        this.elementType = "text";
        this.xPos = Number(xPos);
        this.yPos = Number(yPos);
        this.text = params.join(" ");
    }
    PDText.prototype.render = function () {
        var displayText = this.text.replace(/\\/g, "");
        ctx.strokeStyle = "black";
        draw.text(this.xPos, this.yPos, displayText);
    };
    PDText.prototype.toString = function () {
        return "#X text " + this.xPos + " " + this.yPos + " " + this.text;
    };
    return PDText;
}());
export { PDText };
//# sourceMappingURL=PDText.js.map