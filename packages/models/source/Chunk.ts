import { ELEMENT_TYPES, OBJECT_TYPES, RECORD_TYPES } from "./typeMaps"

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
    return RECORD_TYPES.toType.get(this.params[0]) || null
  }

  get elementType(): symbol | null {
    return ELEMENT_TYPES.toType.get(this.params[3]) || null
  }

  get objectType(): symbol | null {
    return OBJECT_TYPES.toType.get(this.params[5]) || null
  }
}
