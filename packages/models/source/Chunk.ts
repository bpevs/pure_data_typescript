import createTypeMaps from "./createTypeMaps"

const ARRAY = Symbol("ARRAY")
const ELEMENT = Symbol("ELEMENT")
const NEW_WINDOW = Symbol("NEW_WINDOW")

const { types, stringToType, typeToString } = createTypeMaps([
  [ ARRAY, "ARRAY", "A"],
  [ NEW_WINDOW, "NEW_WINDOW", "N"],
  [ ELEMENT, "ELEMENT", "X"],
])

export default class Chunk {
  public static TYPE: { [name: string]: any } = types

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
