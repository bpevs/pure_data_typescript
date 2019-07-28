import Chunk from "./Chunk"
import Element from "./Element"
import { OBJECT_TYPES } from "./typeMaps"

export interface ObjectParams {
  name: string
  xPos: number
  yPos: number
}

/**
 * Objects are Elements that contain functionality,
 * gui-related or not.
 * @ref http://puredata.info/docs/developer/PdFileFormat#r36
 * @example #X obj 132 72 trigger bang float;
 */
export default class PDObject extends Element {
  public static TYPE = OBJECT_TYPES.types

  public static from = ({ objectType, params }: Chunk) => {
    if (!objectType) throw new Error("Object type required")
    const [ xPos, yPos, name= "" ] = params

    return new PDObject(objectType , {
      name,
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public color = "black"
  public inlets: symbol[] = []
  public length: number = 0
  public name: string
  public objectType: symbol
  public outlets: symbol[] = []
  public xPos: number
  public yPos: number

  constructor(objectType: symbol, params: ObjectParams) {
    super(Element.TYPE.OBJECT)
    this.name = params.name
    this.xPos = params.xPos
    this.yPos = params.yPos
  }

  public toString() {
    return [
      super.toString(),
      this.xPos,
      this.yPos,
      OBJECT_TYPES.toString.get(this.objectType),
    ].join(" ")
  }
}
