import PDChunk from "./Chunk"
import createTypeMaps from "./createTypeMaps"

const CONNECT = Symbol("CONNECT")
const UNKNOWN = Symbol("UNKNOWN")

const { types, stringToType, typeToString } = createTypeMaps([
  [ CONNECT, "CONNECT", "connect"],
  [ UNKNOWN, "UNKNOWN", "unknown"],
])

/**
 * Elements are the parts that together make up the entire layout of a patch,
 * including windowsizes and position.
 *
 * @ref http://puredata.info/docs/developer/PdFileFormat#r3
 */
export default class Element {
  public static TYPE = types

  public static from([ name, xPos, yPos ]: string[]) {
    const type = stringToType.get(name) || UNKNOWN
    return new Element({ type, xPos, yPos })
  }

  public readonly chunk = new PDChunk({ type: PDChunk.TYPE.ELEMENT })
  public color = "black"
  public inlets: symbol[] = []
  public outlets: symbol[] = []
  public length: number = 0

  public xPos: number
  public yPos: number
  public type: symbol

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return [
      this.chunk.toString(),
      this.xPos,
      this.yPos,
      typeToString.get(this.type),
    ].join(" ")
  }
}
