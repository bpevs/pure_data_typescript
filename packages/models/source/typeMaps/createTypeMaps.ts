export default function createTypeMaps(
  typeInfo: { [name: string]: string },
) {
  const types: { [name: string]: symbol } = {}
  const stringToType: Map<string, symbol> = new Map()
  const typeToString: Map<symbol, string> = new Map()

  Object.keys(typeInfo).forEach((name, key) => {
    const stringified = typeInfo[name]
    const type = Symbol(name)

    types[name] = type
    stringToType.set(stringified, type)
    typeToString.set(type, stringified)
  })

  return {
    types,
    toString: typeToString,
    toType: stringToType,
  }
}
