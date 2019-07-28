import PDArray from "./Array"
import Canvas from "./Canvas"
import Chunk from "./Chunk"
import Element from "./Element"
import { RECORD_TYPES } from "./typeMaps"

export default class Record {
  public static TYPE = RECORD_TYPES.types

  /**
   * Parse a line into a Record. Meant to consume a
   * line from a *.pd file (defined by an ending semi-colon)
   * @example #N canvas 0 0 450 300 graph4 0;
   */
  public static from = (chunk: Chunk): Record => {
    if (!chunk.recordType) throw new Error("Record type cannot be null")
    switch (chunk.recordType) {
      case Record.TYPE.NEW_WINDOW: return Canvas.from(chunk)
      case Record.TYPE.ARRAY: return PDArray.from(chunk)
      case Record.TYPE.ELEMENT: return Element.from(chunk)
      default: return new Record(chunk.recordType, chunk.params)
    }
  }

  public recordType: symbol
  public params: string[]

  constructor(recordType: symbol, params: string[] = []) {
    this.params = params
    this.recordType = recordType
  }

  /**
   * Base Record toString.
   * We should only stringify params that we are sure that we use
   */
  public toString() {
    const type = RECORD_TYPES.toString.get(this.recordType)
    const params = this.params.join(" ")
    return `#${type} ${params}`
  }
}
