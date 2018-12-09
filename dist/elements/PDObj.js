/**
 * @class PDObject
 * @description An object
 *
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 */
import { context as ctx } from "../constants";
import * as draw from "../utilities/drawHelpers";
var PDObj = /** @class */ (function () {
    function PDObj(_a) {
        var xPos = _a[0], yPos = _a[1], name = _a[2], params = _a.slice(3);
        this.chunkType = "X";
        this.elementType = "obj";
        this.inlets = [];
        this.outlets = [];
        this.color = "black";
        this.xPos = Number(xPos);
        this.yPos = Number(yPos);
        this.name = String(name || "");
        this.params = params;
    }
    PDObj.prototype.render = function () {
        if (this.name !== "cnv") {
            var displayText = this.name.replace(/\\/g, "");
            var length_1 = draw.getDisplayLength(displayText, this.inlets, this.outlets);
            ctx.strokeStyle = this.color;
            draw.rectOutline(this.xPos, this.yPos, length_1);
            draw.text(this.xPos, this.yPos, displayText);
            draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets);
        }
        else {
            var width = this.params[1];
            var height = this.params[2];
            console.log(this.params[10]);
            ctx.fillStyle = parseColor(this.params[10]);
            console.log(parseColor(this.params[10]));
            ctx.fillRect(this.xPos, this.yPos, width, height);
        }
    };
    PDObj.prototype.toString = function () {
        return "#X msg " + this.xPos + " " + this.yPos + " " + this.name + " " + this.params.join(" ");
    };
    return PDObj;
}());
export { PDObj };
// color = (red * -65536) + (green * -256) + (blue * -1)
function parseColor(str) {
    var num = Math.abs(parseInt(str, 10));
    var r = Math.floor(num / 1000);
    var b = Math.floor();
    return "rgb(" + r + ", " + (num.slice(2, 4) + 0) + ", " + (num.slice(4) + 0) + ")";
}
// function stringifyColor(r: number, g: number, b: number) {
//   return (r * -65536) + (g * -256) + (b * -1)
// }
// 0, 0, 0 => -1
// 5, 0, 0 => -4097
// 6, 0, 107 => -4123
// 7, 0, 115 => -4125 #070073
// 11, 0, 0 => -8193
// 12, 0, 129 => -12321 #0C0081
// 14, 0, 0 => -12289
// 16, 0, 0 => -16385
// 18, 0, 255 => -16448  #1200FF
// 24, 0, 255 => -24640 #1800FF
// 24, 0, 0 => -24577
// 255, 0, 0 => -258049 #FF0000
// 0, 4, 0 => -65
// 0, 9, 0 => -129
// 0, 13, 0 => -193
// 0, 19, 0 => -257
// 0, 41, 0 => -641
// 0, 93, 0 => -1473
// 0, 0, 0 => -1
// 0, 0, 6 => -2
// 0, 0, 12 => -3
// 0, 0, 16 => -5
// 0, 0, 20 => -6
// 0, 0, 22 => -6
// 1, 0, 43 => -11
// 0, 0, 26 => -7
// 0, 0, 36 => -10
//# sourceMappingURL=PDObj.js.map