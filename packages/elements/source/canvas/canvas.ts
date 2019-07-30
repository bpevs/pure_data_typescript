import { Chunk, Element } from "@pure-data/core"

/**
 * @class CanvasElement
 * @description Defines window properties
 * TODO: Doesn't support initial path canvas declaration (different 1-off format)
 *
 * @example
 */
export interface CanvasElementProps {
  children: Chunk[]
  name: string | null
  openOnLoad: boolean
  params: string[]
  xPos: number
  xSize: number
  yPos: number
  ySize: number
}

export default class CanvasElement extends Element {
  public static readonly type = Symbol("canvas")

  public static from({ children, params }: Chunk) {
    const [xPos, yPos, xSize, ySize, name, openOnLoad, ...other] = params
    const isSubPatch = isNaN(parseInt(name, 10))
    return new CanvasElement({
      children,
      name: isSubPatch ? name : null,
      openOnLoad: Boolean(openOnLoad),
      params: other,
      xPos: Number(xPos),
      xSize: Number(xSize),
      yPos: Number(yPos),
      ySize: Number(ySize),
    })
  }

  public name: null | string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor(props: CanvasElementProps) {
    super(CanvasElement.type, props)
    this.name = props.name
    this.openOnLoad = props.openOnLoad
    this.xPos = props.xPos
    this.xSize = props.xSize
    this.yPos = props.yPos
    this.ySize = props.ySize
  }

  public toString() {
    return [
      super.toString(),
      "canvas",
      this.xPos,
      this.yPos,
      this.xSize,
      this.ySize,
      this.name,
      this.openOnLoad,
    ].join(" ")
  }
}
