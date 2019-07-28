import Element from "./Element"
import createTypeMaps from "./typeMaps/createTypeMaps"

const { types, stringToType, typeToString } = createTypeMaps([
  [ "BUTTON", "button"],
  [ "UNKNOWN", "unknown"],
])

/**
 * Objects are Elements that contain functionality,
 * gui-related or not.
 * @ref http://puredata.info/docs/developer/PdFileFormat#r36
 * @example #X obj 132 72 trigger bang float;
 */
export default class PDObject extends Element {
  public static TYPE = types
  public static from = ([ xPos, yPos, name ]: any[]) => {
    return new PDObject({ type: stringToType.get(name) , xPos, yPos })
  }

  public element = new Element({ type: Element.TYPE.OBJECT })
  public color = "black"
  public inlets: symbol[] = []
  public outlets: symbol[] = []
  public length: number = 0
  public type: symbol
  public xPos: number
  public yPos: number

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return [
      this.element.toString(),
      this.xPos,
      this.yPos,
      typeToString.get(this.type),
    ].join(" ")
  }
}
