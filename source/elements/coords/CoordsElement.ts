import Chunk from '../../models/Chunk.ts';
import Element from '../../models/Element.ts';

/**
 * @class PDCoords
 * @description Visual ranges of a frameset (window)
 * A coords statement must always be preceded with a canvas statement which also holds the graph name.
 * starting from zero. Inlets and outlets of the objects are numbered likewise.
 */

export interface CoordsProps {
  children: Chunk[]
  graphOnParent: boolean
  height: number
  params: string[]
  width: number
  xFrom: number
  xTo: number
  yFrom: number
  yTo: number
}

export default class Coords extends Element {
  public static type = Symbol("coords")

  public static from({ children, params }: Chunk) {
    const [xFrom, yTo, xTo, yFrom, width, height, graphOnParent, ...other] = params
    return new Coords({
      children,
      graphOnParent: Boolean(graphOnParent),
      height: Number(height),
      params: other,
      width: Number(width),
      xFrom: Number(xFrom),
      xTo: Number(xTo),
      yFrom: Number(yFrom),
      yTo: Number(yTo),
    })
  }

  public graphOnParent: boolean
  public height: number
  public width: number
  public xFrom: number
  public xTo: number
  public yFrom: number
  public yTo: number

  constructor(props: CoordsProps) {
    super(Coords.type, props)
    this.graphOnParent = props.graphOnParent
    this.height = props.height
    this.width = props.width
    this.xFrom = props.xFrom
    this.xTo = props.xTo
    this.yFrom = props.yFrom
    this.yTo = props.yTo
  }

  public toString() {
    return [
      super.toString(),
      "coords",
      this.xFrom,
      this.yFrom,
      this.xTo,
      this.yTo,
      this.width,
      this.height,
      this.graphOnParent ? 1 : 0,
    ].join(" ")
  }
}
