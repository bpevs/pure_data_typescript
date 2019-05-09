import Chunk from "./Chunk"
import createTypeMaps from "./createTypeMaps"

const { types, stringToType, typeToString } = createTypeMaps([
  [ Symbol("CONNECT"), "CONNECT", "connect"],
  [ Symbol("OBJECT"), "OBJECT", "object"],
  [ Symbol("UNKNOWN"), "UNKNOWN", "unknown"],
])

/**
 * Elements are the parts that together make up the entire layout of a patch,
 * including windowsizes and position.
 *
 * @ref http://puredata.info/docs/developer/PdFileFormat#r3
 * @syntax #X [element];\r\n
 * @example #X obj 50 36;
 */
export default class Element {
  public static TYPE = types

  public static from([ name ]: string[]) {
    const type = stringToType.get(name) || Element.TYPE.UNKNOWN
    return new Element({ type })
  }

  public readonly chunk = new Chunk({ type: Chunk.TYPE.ELEMENT })
  public type: symbol

  constructor({ type }: { type: symbol }) {
    this.type = type
  }

  public toString() {
    return [
      this.chunk.toString(),
      typeToString.get(this.type),
    ].join(" ")
  }
}
