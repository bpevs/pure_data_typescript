const noop = () => { return }

// Elements are the parts that together make up the entire layout of a patch,
// including windowsizes and position.
export default class Element {
  public static TYPE: { [name: string]: any } = {}

  public static from(params: string[]) {
    const name = params[2]

    if (objectRegistry[name]) {
      return new objectRegistry[name](params)
    }
  }

  public readonly chunkType = "X"
  public behavior: (...args: any[]) => any | void = noop
  public color = "black"
  public inlets: symbol[] = []
  public outlets: symbol[] = []
  public length: number = 0

  public xPos: number
  public yPos: number
  public name: string
  public params: string[]

  protected displayText: string

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
