export interface ConstMap { [key: string]: symbol }

export const chunkTypes: ConstMap = {
  ARRAY: Symbol("ARRAY"),
  NEW_WINDOW: Symbol("NEW_WINDOW"),
  OBJECT: Symbol("OBJECT"),
  UNKNOWN: Symbol("UNKNOWN"),
}

export const chunkTypeRecordMap: ConstMap = {
  A: chunkTypes.ARRAY,
  N: chunkTypes.NEW_WINDOW,
  X: chunkTypes.OBJECT,
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
