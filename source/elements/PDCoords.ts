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

export class PDCoords {
  public readonly chunkType = "X";
  public readonly elementType = "coords";

  public graphOnParent: boolean;
  public height: number;
  public width: number;
  public xFrom: number;
  public xTo: number;
  public yFrom: number;
  public yTo: number;

  constructor(
    [xFrom, yTo, xTo, yFrom, width, height, graphOnParent]: string[],
  ) {
    this.xFrom = Number(xFrom);
    this.xTo = Number(xTo);
    this.yFrom = Number(yFrom);
    this.yTo = Number(yTo);
    this.width = Number(width);
    this.height = Number(height);
    this.graphOnParent = Boolean(graphOnParent);
  }

  public toString() {
    return `#X coords ${this.xFrom} ${this.yTo} ${this.xTo} ${this.yFrom}` +
      ` ${this.width} ${this.height} ${this.graphOnParent ? 1 : 0}`;
  }
}
