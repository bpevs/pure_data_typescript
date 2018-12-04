/**
 * @class PDCanvas
 * @description Defines window properties
 *
 * @example
 */


export class PDCanvas {
  public readonly chunkType = "N"
  public readonly elementType = "canvas"

  public name: string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor([ xPos, yPos, xSize, ySize, name, openOnLoad ]: string[]) {
    this.name = name
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
