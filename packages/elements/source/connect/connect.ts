import { Element } from "@pure-data/models"

/**
 * @class PDConnect
 * @description Wires GUI-elements
 * Objects are virtually numbered in order of appearance in the file,
 * starting from zero. Inlets and outlets of the objects are numbered likewise.
 * @ref http://puredata.info/docs/developer/PdFileFormat#3
 * @ref http://puredata.info/docs/developer/PdFileFormat#r32
 * @syntax #X connect [source] [outlet] [target] [inlet];\r\n
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 *  #X connect 0 0 1 0;
 *  #X connect 0 1 1 1;
 */

const CONTROL = Symbol("CONTROL_CONNECT")
const SIGNAL = Symbol("SIGNAL_CONNECT")

export interface ConnectProps {
  inlet: number
  outlet: number
  source: number
  target: number
}

export default class Connect extends Element {
  public static TYPE = { CONTROL, SIGNAL }

  // TODO: Map source/target number to Element (in core parser?)
  public static from([ source, outlet, target, inlet ]: string[]) {
    return new Connect({
      inlet: Number(inlet),
      outlet: Number(outlet),
      source: Number(source),
      target: Number(target),
    })
  }

  public readonly type = CONTROL

  public inlet: number
  public outlet: number
  public source: number
  public target: number

  constructor({ inlet, outlet, source, target }: ConnectProps) {
    super({ type: CONTROL })
    Object.assign(this, { inlet, outlet, source, target })
  }

  public toString() {
    return [
      this.record.toString(),
      "connect",
      this.outlet,
      this.target,
      this.inlet,
    ].join(" ")
  }
}
