import { Element } from "@pure-data/models"

/**
 * @class PDCanvas
 * @description Defines window properties
 * TODO: Doesn't support initial path canvas declaration (different 1-off format)
 *
 * @example
 */
export default class PDCanvas extends Element {
  public readonly chunkType = "N"
  public readonly elementType = "canvas"
  public readonly isSubPatch: boolean

  public name: null | string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor([ xPos, yPos, xSize, ySize, name, openOnLoad ]: string[]) {
    super()
    this.isSubPatch = isNaN(parseInt(name, 10))
    this.name = this.isSubPatch ? name : null
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.xSize = Number(xSize)
    this.ySize = Number(ySize)
    this.openOnLoad = Boolean(openOnLoad)
  }

  public toString() {
    return `#N canvas ${this.xPos} ${this.yPos} ${this.xSize} ${this.ySize} ${this.name} ${this.openOnLoad}`
  }
}
