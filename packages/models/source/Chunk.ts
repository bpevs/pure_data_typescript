import createTypeMaps from "./createTypeMaps"

const { types, stringToType, typeToString } = createTypeMaps([
  [ Symbol("ARRAY"), "ARRAY", "A"],
  [ Symbol("ELEMENT"), "ELEMENT", "X"],
  [ Symbol("NEW_WINDOW"), "NEW_WINDOW", "N"],
])

export default class Chunk {
  public static TYPE = types

  public static from = ([ name ]: string[]): Chunk => {
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
