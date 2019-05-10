import createTypeMaps from "./createTypeMaps"

const { types, stringToType, typeToString } = createTypeMaps([
  [ Symbol("ARRAY"), "ARRAY", "A"],
  [ Symbol("ELEMENT"), "ELEMENT", "X"],
  [ Symbol("NEW_WINDOW"), "NEW_WINDOW", "N"],
])

export default class Chunk {
  public static TYPE = types

  /**
   * Parse a record into a chunk. Meant to consume a
   * line from a *.pd file (defined by an ending semi-colon)
   * @example #N canvas 0 0 450 300 graph4 0;
   */
  public static from = (line: string): Chunk => {
    const [ name ] = line
      .substring(1)
      .replace(/\n/gm, " ")
      .split(/\s+/)
    const type = stringToType.get(name)
    return new Chunk({ type })
  }

  public type: symbol

  constructor(params: any) {
    Object.assign(this, params)
  }

  public toString() {
    return `#${typeToString.get(this.type)}`
  }
}
