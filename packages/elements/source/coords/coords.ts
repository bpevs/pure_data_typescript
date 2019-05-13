import { Element } from "@pure-data/models"

/**
 * @class PDCoords
 * @description Visual ranges of a frameset (window)
 * A coords statement must always be preceded with a canvas statement which also holds the graph name.
 * starting from zero. Inlets and outlets of the objects are numbered likewise.
 */

export interface CoordsProps {
  graphOnParent: boolean
  height: number
  width: number
  xFrom: number
  xTo: number
  yFrom: number
  yTo: number
}

export default class Coords extends Element {
  public static type = Symbol("coords")

  public static from([ xFrom, yTo, xTo, yFrom, width, height, graphOnParent ]: string[]) {
    return new Coords({
      graphOnParent: Boolean(graphOnParent),
      height: Number(height),
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
    super({ type: Coords.type })
    Object.assign(this, props)
  }

  public toString() {
    return [
      this.record.toString(),
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
