export default function createTypeMaps(
  typeInfo: Array<[symbol, string, string]>,
) {
  const maps: {
    stringToType: Map<string, symbol>,
    types: { [name: string]: symbol },
    typeToString: Map<symbol, string>,
  } = {
    stringToType: new Map(),
    types: {},
    typeToString: new Map(),
  }

  typeInfo.forEach(([ type, name, stringified ]) => {
    maps.types[name] = type
    maps.stringToType.set(stringified, type)
    maps.typeToString.set(type, stringified)
  })

  return maps
}
