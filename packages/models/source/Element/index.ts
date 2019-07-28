import Chunk from "../Chunk"
import Record from "../Record"
import { ELEMENT } from "../types"

/**
 * Elements are the parts that together make up the entire layout of a patch,
 * including windowsizes and position.
 *
 * @ref http://puredata.info/docs/developer/PdFileFormat#r3
 * @syntax #X [element];\r\n
 * @example #X obj 50 36;
 */
export default class Element extends Record {
  public static TYPE = ELEMENT.TYPE
  public static toString = (a: symbol) => ELEMENT.toString.get(a)
  public static toType = (a: string) => ELEMENT.toType.get(a)

  public static from(chunk: Chunk) {
    const { elementType } = chunk
    if (!elementType) throw new Error("Element type is mandatory")
    return new Element(elementType, chunk.params)
  }

  public elementType: symbol
  public params: string[]

  constructor(elementType: symbol, params: string[] = []) {
    super(Record.TYPE.ELEMENT)
    this.elementType = elementType
    this.params = params
  }

  public toString() {
    return [
      super.toString(),
      ELEMENT.toString.get(this.elementType),
    ].join(" ")
  }
}
