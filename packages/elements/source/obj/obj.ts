import { Chunk, Element } from "@pure-data/models"

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
  public static readonly type = Symbol("obj")

  public static from({ children, params }: Chunk) {
    return new Obj({ children, params })
  }

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

  constructor(props: { children: Chunk[], params: string[] }) {
    super(Obj.type, props)
    const [ xPos, yPos, name, ...params ] = props.params
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.name = String(name || "")
    this.params = params
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
