export const ELEMENT = createTypeMaps({
  CONNECT: "connect",
  OBJECT: "object",
  UNKNOWN: "unknown",
})

export const RECORD = createTypeMaps({
  ARRAY: "A",
  ELEMENT: "X",
  NEW_WINDOW: "N",
})

export const OBJECT = createTypeMaps({
  BUTTON: "button",
  OBJ: "obj",
  UNKNOWN: "unknown",
})

export default function createTypeMaps(
  typeInfo: { [name: string]: string },
) {
  const TYPE: { [name: string]: symbol } = {}
  const stringToType: Map<string, symbol> = new Map()
  const typeToString: Map<symbol, string> = new Map()

  Object.keys(typeInfo).forEach((name, key) => {
    const stringified = typeInfo[name]
    const type = Symbol(name)

    TYPE[name] = type
    stringToType.set(stringified, type)
    typeToString.set(type, stringified)
  })

  return {
    TYPE,
    toString: typeToString,
    toType: stringToType,
  }
}
