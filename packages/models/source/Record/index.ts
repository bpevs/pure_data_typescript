import { Canvas, Chunk, Element } from ".."
import Arr from "../Array"
import { RECORD } from "../types"
const { TYPE, toString, toType } = RECORD

/**
 * Base class of all PD Entities
 * All records
 */
export default class Record {
  public static readonly TYPE = TYPE
  public static type: symbol
  public static toString = (a: symbol) => toString.get(a)
  public static toType = (a: string) => toType.get(a)

  /**
   * Translate a chunk to a Record. Should only need to run once for
   * any root chunk (excepting chunks in the `children` property).
   * @example #N canvas 0 0 450 300 graph4 0;
   */
  public static from = (chunk: Chunk): Record => {
    if (!chunk.recordType) throw new Error("Record type cannot be null")
    switch (chunk.recordType) {
      case TYPE.ARRAY: return Arr.from(chunk)
      case TYPE.ELEMENT: return Element.from(chunk)
      case TYPE.NEW_WINDOW: return Canvas.from(chunk)
      default: return new Record(chunk.recordType, { params: chunk.params })
    }
  }

  public params: string[]
  public recordType: symbol
  public render: { [key: string]: (...params: any[]) => any | void } // Renderers can be added to any record

  /**
   * Our common pattern for constructors is
   * TYPE,
   * props: Props are object properties that we know types of
   * params: are unparsed string[] line params, and are a prop
   */
  constructor(
    recordType: symbol,
    props: { params: string[] } = { params: [] },
  ) {
    this.params = props.params
    this.recordType = recordType
  }

  /**
   * Base Record toString.
   * We should only stringify params that we are sure that we use
   */
  public toString() {
    const type = Record.toString(this.recordType)
    const params = this.params.join(" ")
    return `#${type} ${params}`
  }
}
