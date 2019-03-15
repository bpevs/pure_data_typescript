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

export function stringToChunkType(text: string): symbol {
  return chunkTypeRecordMap[text] || chunkTypes.UNKNOWN
}

export default class Chunk {

}
