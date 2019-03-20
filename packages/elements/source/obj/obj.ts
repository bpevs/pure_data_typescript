import { Element } from "@pure-data/models"
const noop = () => { return }

/**
 * @class PDObject
 * @description An object
 *
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 */

export default class Obj extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "obj"
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

  constructor([ xPos, yPos, name, ...params ]: string[]) {
    super()
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.name = String(name || "")
    this.params = params
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
