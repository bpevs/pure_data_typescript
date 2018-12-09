/**
 * @class PDArray
 * @description Array of Numbers
 *
 * @example
 */
var PDArray = /** @class */ (function () {
    function PDArray(_a) {
        var name = _a[0], size = _a[1], format = _a[2], saveFlag = _a[3];
        this.chunkType = "X";
        this.elementType = "array";
        this.data = [];
        this.name = String(name);
        this.size = Number(size);
        this.format = String(format);
        this.saveFlag = Boolean(saveFlag);
    }
    PDArray.prototype.addData = function (data) {
        this.data = this.data.concat(data.map(Number));
    };
    // TODO: This currently breaks for two reasons:
    // - Need to format small numbers: 9.41753e-06
    // - #A is often split into multiple lines. Not sure why yet. Probably Dimensions or size constraint.
    PDArray.prototype.toString = function () {
        var meta = "#X array " + this.name + " " + this.size + " " + this.format + " " + (this.saveFlag ? 1 : 0) + ";\r\n";
        var data = "#A " + this.data.join(" ");
        return meta + data;
    };
    return PDArray;
}());
export { PDArray };
//# sourceMappingURL=PDArray.js.map