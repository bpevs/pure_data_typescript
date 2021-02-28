/**
 * Creates a map for referencing entity types
 *
 * @param typeInfo name-serializedName map. Type is generated from name
 */

export default class TypeMap {
  public serializedToType: Map<string, symbol> = new Map()
  public typeToSerialized: Map<symbol, string> = new Map()
  public types: { [name: string]: symbol } = {}

  constructor(typeInfo: { [name: string]: string }) {
    Object.keys(typeInfo)
      .forEach(name => this.setType(name, typeInfo[name]))
  }

  /**
   * Return the type associated with our name
   * @param name The local access name
   */
  public getType(name: string): symbol | void {
    return this.serializedToType.get(name)
  }

  public hasType(type: symbol): boolean {
    return Boolean(this.typeToSerialized.get(type))
  }

  /**
   * Sets a type. This lets us define our own names within pure-data js,
   * rather than use the string names in the *.pd file.
   * @param name The local access name (TYPE.BLAH)
   * @param serializedName The *.pd file name
   */
  public setType(name: string, serializedName: string) {
    const type = Symbol(name)

    this.types[name] = type
    this.serializedToType.set(serializedName, type)
    this.typeToSerialized.set(type, serializedName)
  }

  /**
   * Get the serialized string associated with our type
   * @param name Our local access symbol name
   */
  public serializeType(name: symbol): string | void {
    const serialized = this.typeToSerialized.get(name)
    if (!serialized) {
      console.warn(`Type ${String(name)} does not exist, and could not serialize`)
    }
    return serialized
  }
}
