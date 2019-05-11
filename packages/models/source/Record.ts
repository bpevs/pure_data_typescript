import createTypeMaps from "./createTypeMaps"

const { types, stringToType, typeToString } = createTypeMaps([
  [ Symbol("ARRAY"), "ARRAY", "A"],
  [ Symbol("ELEMENT"), "ELEMENT", "X"],
  [ Symbol("NEW_WINDOW"), "NEW_WINDOW", "N"],
])

export default class Record {
  public static CHUNK_TYPE = types

  /**
   * Parse a line into a Record. Meant to consume a
   * line from a *.pd file (defined by an ending semi-colon)
   * @example #N canvas 0 0 450 300 graph4 0;
   */
  public static from = (line: string): Record => {
    const [ name ] = line
      .substring(1)
      .replace(/\n/gm, " ")
      .split(/\s+/)
    const chunkType = stringToType.get(name)
    return new Record({ chunkType })
  }

  public chunkType: symbol
  public elementType: symbol

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return `#${typeToString.get(this.chunkType)}`
  }
}
