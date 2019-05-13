import { Element } from "@pure-data/models"

/**
 * @class ArrayElement
 * @description Array of Numbers
 *
 * @example
 */
export interface ArrayElementProps {
  name: string
  size: number
  format: string
  saveFlag: boolean
}

export default class ArrayElement extends Element {
  public static type = Symbol("array")

  public static from([ name, size, format, saveFlag ]: string[]) {
    return new ArrayElement({
      format: String(format),
      name: String(name),
      saveFlag: Boolean(saveFlag) || false,
      size: Number(size) || 0,
    })
  }

  public data: number[] = []
  public name: string
  public size: number = 0
  public format: string
  public saveFlag: boolean = false

  constructor({ format, name, saveFlag, size }: ArrayElementProps) {
    super({ type: ArrayElement.type })
    Object.assign(this, { format, name, saveFlag, size })
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
