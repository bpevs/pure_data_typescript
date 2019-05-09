import Element from "./Element"

const CONTROL = Symbol("CONTROL")
const SIGNAL = Symbol("SIGNAL")

/**
 * @ref http://puredata.info/docs/developer/PdFileFormat#r32
 * @syntax #X connect [source] [outlet] [target] [inlet];\r\n
 * @example
 *   #X obj 30 27 midiin;
 *   #X obj 26 59 midiout;
 *   #X connect 0 0 1 0;
 *   #X connect 0 1 1 1;
 */
export default class Connect {
  public static TYPE = { CONTROL, SIGNAL }

  // TODO: Map source/target number to Element (in core parser?)
  public static from([ source, outlet, target, inlet ]: number[]) {
    return new Connect({ inlet, outlet, source, target })
  }

  public element = new Element({ type: Element.TYPE.CONNECT })
  public outlet: number
  public inlet: number
  public source: Element
  public target: Element

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return [
      this.element.toString(),
      this.outlet,
      this.target,
      this.inlet,
    ].join(" ")
  }
}
