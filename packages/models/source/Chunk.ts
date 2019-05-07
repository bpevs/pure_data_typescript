import PDElement from "./Element"

export interface ConstMap { [key: string]: symbol }

const ARRAY = Symbol("ARRAY")
const ELEMENT = Symbol("ELEMENT")
const NEW_WINDOW = Symbol("NEW_WINDOW")
const UNKNOWN = Symbol("UNKNOWN")

export const chunkTypes: ConstMap = { ARRAY, ELEMENT, NEW_WINDOW, UNKNOWN }

export const recordToChunkType: ConstMap = {
  A: ARRAY,
  N: NEW_WINDOW,
  X: ELEMENT,
}

export const chunkTypeToRecord: Map<symbol, string> = new Map([
  [ ARRAY, "#A" ],
  [ NEW_WINDOW, "#N" ],
  [ ELEMENT, "#X" ],
])

export default class Chunk {
  public static TYPE: { [name: string]: any } = chunkTypes

  public static from = ([ name, ...rest ]: string[]): Chunk => {
    let child: any
    const type = Chunk.stringToChunkType(name)

    if (type === ARRAY) child = rest.map(Number)
    if (type === NEW_WINDOW) child = undefined // TODO
    if (type === ELEMENT) child = PDElement.from(rest)

    return new Chunk({ child, type })
  }

  public static stringToChunkType = (text: string): symbol => {
    return recordToChunkType[text] || UNKNOWN
  }

  public child: string[] | PDElement | undefined
  public type: symbol

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    let output: string | undefined = chunkTypeToRecord.get(this.type)
    if (!output) return

    if (Array.isArray(this.child)) {
      output += ` ${this.child.join(" ")}`
    } else if (this.child) {
      output += ` ${this.child.toString()}`
    }

    return output
  }
}
