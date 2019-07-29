import Chunk from "../Chunk"
import Record from "../Record"
import { ELEMENT } from "../types"

export interface ElementProps {
  children: Chunk[]
  params: string[]
  [key: string]: any
}

/**
 * Elements are the parts that together make up the entire layout of a patch,
 * including windowsizes and position.
 *
 * @ref http://puredata.info/docs/developer/PdFileFormat#r3
 * @syntax #X [element];\r\n
 * @example #X obj 50 36;
 */
export default class Element extends Record {
  public static readonly TYPE = Object.freeze(ELEMENT.TYPE)
  public static type = Record.TYPE.ELEMENT
  public static toString = (a: symbol) => ELEMENT.toString.get(a)
  public static toType = (a: string) => ELEMENT.toType.get(a)

  public static from({ children, elementType, params }: Chunk) {
    if (!elementType) throw new Error("Element type is mandatory")
    return new Element(elementType, { children, params })
  }

  public elementType: symbol

  constructor(elementType: symbol, props: ElementProps) {
    super(Record.TYPE.ELEMENT)
    this.elementType = elementType
    this.params = props.params
  }

  public toString() {
    return [
      super.toString(),
      ELEMENT.toString.get(this.elementType),
    ].join(" ")
  }
}
