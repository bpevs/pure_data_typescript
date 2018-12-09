/**
 * @class PDCoords
 * @description Visual ranges of a frameset (window)
 * A coords statement must always be preceded with a canvas statement which also holds the graph name.
 * starting from zero. Inlets and outlets of the objects are numbered likewise.
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 *  #X connect 0 0 1 0;
 *  #X connect 0 1 1 1;
 */
var PDCoords = /** @class */ (function () {
    function PDCoords(_a) {
        var xFrom = _a[0], yTo = _a[1], xTo = _a[2], yFrom = _a[3], width = _a[4], height = _a[5], graphOnParent = _a[6];
        this.chunkType = "X";
        this.elementType = "coords";
        this.xFrom = Number(xFrom);
        this.xTo = Number(xTo);
        this.yFrom = Number(yFrom);
        this.yTo = Number(yTo);
        this.width = Number(width);
        this.height = Number(height);
        this.graphOnParent = Boolean(graphOnParent);
    }
    PDCoords.prototype.toString = function () {
        return "#X coords " + this.xFrom + " " + this.yTo + " " + this.xTo + " " + this.yFrom +
            (" " + this.width + " " + this.height + " " + (this.graphOnParent ? 1 : 0));
    };
    return PDCoords;
}());
export { PDCoords };
//# sourceMappingURL=PDCoords.js.map