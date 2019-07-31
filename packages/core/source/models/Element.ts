import { ELEMENT } from "../types"
import Chunk from "./Chunk"
import Record from "./Record"

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
  public static readonly TYPE = ELEMENT.types
  public static type = Record.TYPE.ELEMENT
  public static getType = (a: string) => ELEMENT.getType(a)
  public static isType = (type: symbol, record: any): boolean => {
    return type === Element.getType(record.elementType)
  }
  public static serializeType = (a: symbol) => ELEMENT.serializeType(a)

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
      Element.serializeType(this.elementType),
    ].join(" ")
  }
}
