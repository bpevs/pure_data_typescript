import Chunk from '../../models/Chunk.ts';
import Element from '../../models/Element.ts';

/**
 * @class PDFloatatom
 * @description Defines a number box
 * When the value of [upper_limit] minus the value of [lower_limit] is less than one,
 * or the [width] attribute is set to one, PureData resets these values both to zero.
 * Floatatom and symbolatom are the only elements that uses "-" characters to indicate
 * that no value has been assigned to its attributes [label], [receive] and [send].
 *
 *
 * @example
 *  #X floatatom 32 26 5 0 0 0 - - -;
 */
export interface FloatatomProps {
  children: Chunk[]
  lowerLimit: number
  label: string
  labelPos: number
  params: string[]
  receive: string
  send: string
  upperLimit: number
  width: number
  xPos: number
  yPos: number
}

export default class Floatatom extends Element {
  public static readonly type = Symbol("floatatom")

  public static from({ children, params }: Chunk) {
    const [xPos, yPos, width, lowerLimit, upperLimit, labelPos, label, receive, send, ...other] = params
    return new Floatatom({
      children,
      label: String(label),
      labelPos: Number(labelPos),
      lowerLimit: Number(lowerLimit),
      params: other,
      receive: String(receive),
      send: String(send),
      upperLimit: Number(upperLimit),
      width: Number(width),
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public readonly color = "black"
  public readonly inlets = ["control"]
  public readonly outlets = ["signal"]

  public lowerLimit: number
  public label: string
  public labelPos: number
  public receive: string
  public send: string
  public upperLimit: number
  public width: number
  public xPos: number
  public yPos: number

  constructor(props: FloatatomProps) {
    super(Floatatom.type, props)
    this.label = props.label
    this.labelPos = props.labelPos
    this.lowerLimit = props.lowerLimit
    this.receive = props.receive
    this.send = props.send
    this.upperLimit = props.upperLimit
    this.width = props.width
    this.xPos = props.xPos
    this.yPos = props.yPos
  }

  public toString() {
    return [
      super.toString(),
      "floatatom",
      this.xPos,
      this.yPos,
      this.width,
      this.lowerLimit,
      this.upperLimit,
      this.labelPos,
      this.label || "-",
      this.receive || "-",
      this.send || "-",
    ].join(" ")
  }
}
