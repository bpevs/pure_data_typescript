import { Element } from "@pure-data/models"

/**
 * @class CanvasElement
 * @description Defines window properties
 * TODO: Doesn't support initial path canvas declaration (different 1-off format)
 *
 * @example
 */
export interface CanvasElementProps {
  name: string | null
  openOnLoad: boolean
  xPos: number
  xSize: number
  yPos: number
  ySize: number
}

export default class CanvasElement extends Element {
  public static type = Symbol("canvas")

  public static from([ xPos, yPos, xSize, ySize, name, openOnLoad ]: string[]) {
    const isSubPatch = isNaN(parseInt(name, 10))
    return new CanvasElement({
      name: isSubPatch ? name : null,
      openOnLoad: Boolean(openOnLoad),
      xPos: Number(xPos),
      xSize: Number(xSize),
      yPos: Number(yPos),
      ySize: Number(ySize),
    })
  }

  public readonly isSubPatch: boolean

  public name: null | string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor({ name, openOnLoad, xPos, xSize, yPos, ySize }: CanvasElementProps) {
    super({ type: CanvasElement.type })
    Object.assign(this, { name, openOnLoad, xPos, xSize, yPos, ySize })
  }

  public toString() {
    return [
      this.record.toString(),
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
