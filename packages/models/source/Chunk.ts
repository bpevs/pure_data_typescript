export interface ConstMap { [key: string]: symbol }

export const chunkTypes: ConstMap = {
  ARRAY: Symbol("ARRAY"),
  ELEMENT: Symbol("ELEMENT"),
  NEW_WINDOW: Symbol("NEW_WINDOW"),
  UNKNOWN: Symbol("UNKNOWN"),
}

export const chunkTypeRecordMap: ConstMap = {
  A: chunkTypes.ARRAY,
  N: chunkTypes.NEW_WINDOW,
  X: chunkTypes.ELEMENT,
}

export default class Chunk {
  public static TYPE: { [name: string]: any } = chunkTypes
  public static stringToChunkType = (text: string): symbol => {
    return chunkTypeRecordMap[text] || chunkTypes.UNKNOWN
  }

  public chunkType: string = ""
  public elementType: string = ""
  public render: { [name: string]: any } = {}
}
