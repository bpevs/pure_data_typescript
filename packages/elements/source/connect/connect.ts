import { Element } from "@pure-data/models"

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

export default class Connect extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "connect"

  public inlet: number
  public outlet: number
  public source: number
  public target: number

  constructor([ source, outlet, target, inlet ]: string[]) {
    super()
    this.inlet = Number(inlet)
    this.outlet = Number(outlet)
    this.source = Number(source)
    this.target = Number(target)
  }

  public toString() {
    return `#X connect ${this.source} ${this.outlet} ${this.target} ${this.inlet}`
  }
}
