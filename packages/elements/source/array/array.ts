import { Element } from "@pure-data/models"

/**
 * @class PDArray
 * @description Array of Numbers
 *
 * @example
 */

export default class Array extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "array"

  public data: number[]
  public name: string
  public size: number
  public format: string
  public saveFlag: boolean

  constructor([ name, size, format, saveFlag ]: string[]) {
    super()
    this.data = []
    this.name = String(name)
    this.size = Number(size)
    this.format = String(format)
    this.saveFlag = Boolean(saveFlag)
  }

  public addData(data: string[]) {
    this.data = this.data.concat(data.map(Number))
  }

  // TODO: This currently breaks for two reasons:
  // - Need to format small numbers: 9.41753e-06
  // - #A is often split into multiple lines. Not sure why yet. Probably Dimensions or size constraint.
  public toString() {
    const meta = `#X array ${this.name} ${this.size} ${this.format} ${this.saveFlag ? 1 : 0};\r\n`
    const data = `#A ${this.data.join(" ")}`
    return meta + data
  }
}
