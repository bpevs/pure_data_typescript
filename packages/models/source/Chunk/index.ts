import {
  Element as El,
  Object as Obj,
  Record,
} from ".."

/**
 * A line of text representing a Record.
 * This is what is directly stored in *.pd files.
 * This is mostly just to handle parsing
 */
export default class Chunk {
  public children: Chunk[]
  public params: string[]

  constructor(recordString: string) {
    this.params = recordString
      .substring(1)
      .replace(/\n/gm, " ")
      .split(/\s+/)
  }

  get recordType(): symbol | null {
    return Record.toType(this.params[0]) || null
  }

  get elementType(): symbol | null {
    return El.toType(this.params[3]) || null
  }

  get objectType(): symbol | null {
    return Obj.toType(this.params[5]) || null
  }
}
