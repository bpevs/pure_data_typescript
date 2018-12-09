/**
 * @class PDConnect
 * @description Wires GUI-elements
 * Objects are virtually numbered in order of appearance in the file,
 * starting from zero. Inlets and outlets of the objects are numbered likewise.
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 *  #X connect 0 0 1 0;
 *  #X connect 0 1 1 1;
 */
var PDConnect = /** @class */ (function () {
    function PDConnect(_a) {
        var source = _a[0], outlet = _a[1], target = _a[2], inlet = _a[3];
        this.chunkType = "X";
        this.elementType = "connect";
        this.inlet = Number(inlet);
        this.outlet = Number(outlet);
        this.source = Number(source);
        this.target = Number(target);
    }
    PDConnect.prototype.toString = function () {
        return "#X connect " + this.source + " " + this.outlet + " " + this.target + " " + this.inlet;
    };
    return PDConnect;
}());
export { PDConnect };
//# sourceMappingURL=PDConnect.js.map