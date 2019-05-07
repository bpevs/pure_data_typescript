import PDObject from "./Object"

// TODO: Introduce global object registry
const objectRegistry: { [name: string]: PDObject } = {}
const noop = () => { return }

// Elements are the parts that together make up the entire layout of a patch,
// including windowsizes and position.
export default class Element {
  public static TYPE: { [name: string]: any } = {}

  public static from([ name, xPos, yPos, ...rest ]: string[]) {
    let object: PDObject | undefined

    if (objectRegistry && objectRegistry[name]) {
      object = PDObject.from(name, rest)
    }

    return new Element({ child: object, name, xPos, yPos })
  }

  public readonly chunkType = "X"
  public behavior: (...args: any[]) => any | void = noop
  public color = "black"
  public inlets: symbol[] = []
  public outlets: symbol[] = []
  public length: number = 0

  public child: string[] | PDObject | undefined
  public xPos: number
  public yPos: number
  public name: string

  protected displayText: string

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    let output = `${this.xPos} ${this.yPos} ${this.name}`

    if (Array.isArray(this.child)) {
      output += ` ${this.child.join(" ")}`
    } else if (this.child) {
      output += ` ${this.child.toString()}`
    }

    return output
  }
}
