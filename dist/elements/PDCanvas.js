/**
 * @class PDCanvas
 * @description Defines window properties
 *
 * @example
 */
// TODO: Doesn't support initial path canvas declaration (different 1-off format)
var PDCanvas = /** @class */ (function () {
    function PDCanvas(_a) {
        var xPos = _a[0], yPos = _a[1], xSize = _a[2], ySize = _a[3], name = _a[4], openOnLoad = _a[5];
        this.chunkType = "N";
        this.elementType = "canvas";
        this.name = name;
        this.xPos = Number(xPos);
        this.yPos = Number(yPos);
        this.xSize = Number(xSize);
        this.ySize = Number(ySize);
        this.openOnLoad = Boolean(openOnLoad);
    }
    PDCanvas.prototype.toString = function () {
        return "#N canvas " + this.xPos + " " + this.yPos + " " + this.xSize + " " + this.ySize + " " + this.name + " " + this.openOnLoad;
    };
    return PDCanvas;
}());
export { PDCanvas };
//# sourceMappingURL=PDCanvas.js.map