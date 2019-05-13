import createTypeMaps from "./createTypeMaps"
import Record from "./Record"

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

  public record: Record
  public type: symbol

  constructor({ type }: { type: symbol }) {
    this.record = new Record({ chunkType: Record.CHUNK_TYPE.ELEMENT })
    this.type = type
  }

  public toString() {
    return [
      this.record.toString(),
      typeToString.get(this.type),
    ].join(" ")
  }
}
