import Chunk from '../../models/Chunk.ts';
import Element from '../../models/Element.ts';

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

export const CONTROL = Symbol("CONTROL_CONNECT")
export const SIGNAL = Symbol("SIGNAL_CONNECT")

export interface ConnectProps {
  children: Chunk[]
  inlet: number
  params: string[]
  outlet: number
  source: number
  target: number
}

export default class Connect extends Element {
  public static readonly TYPE = Object.freeze({ CONTROL, SIGNAL })
  public static readonly type = CONTROL

  // TODO: Map source/target number to Element (in core parser?)
  public static from({ children, params }: Chunk) {
    const [source, outlet, target, inlet, ...other] = params
    return new Connect({
      children,
      inlet: Number(inlet),
      outlet: Number(outlet),
      params: other,
      source: Number(source),
      target: Number(target),
    })
  }

  public inlet: number
  public outlet: number
  public source: number
  public target: number

  constructor(props: ConnectProps) {
    super(Connect.TYPE.CONTROL, props)
    this.inlet = props.inlet
    this.outlet = props.outlet
    this.source = props.source
    this.target = props.target
  }

  public toString() {
    return [
      super.toString(),
      "connect",
      this.outlet,
      this.target,
      this.inlet,
    ].join(" ")
  }
}
