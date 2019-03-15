import * as ELEMENTS from "@pure-data/elements"
import { chunkTypes, stringToChunkType } from "../../../models/chunk"
const { ARRAY, NEW_WINDOW, OBJECT, UNKNOWN } = chunkTypes

type Record = any
const newlines = /(\r\n|\r)/gm

/**
 * Parse *.pd files
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * https://github.com/pure-data/pure-data/blob/master/src/g_canvas.c#L1708
 * @param text *.pd file text
 */
export function parsePatch(text: string) {
  const records = pdToRecords(text)
  const patch: Record[] = []
  let currSubPatch: string | null = null

  records.forEach((record) => {
    if (!record) return

    if (Array.isArray(record)) {
      const lastRecord = records.pop()
      lastRecord.values = record
      patch.push(record)
      return
    }

    // Ignore subPatches for now
    if (currSubPatch) {
      const endGraph = currSubPatch === "(subpatch)" && params[2] === "graph"
      const endSubPatch = record instanceof PDRestore && currSubPatch === record.name
      if (!endGraph && !endSubPatch) return
      currSubPatch = null
    }

    if (record instanceof PDCanvas && record.isSubPatch) {
      currSubPatch = record.name
    }

    patch.push(record)
  })

  return patch
}

function pdToRecords(text: string): Record[] {
  const normalized = text.replace(newlines, "\n")

  return normalized
    .substring(0, normalized.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map(lineToRecord)
}

function lineToRecord(text: string) {
  const [ chunkName, ...args ] = text
    .substring(1)
    .replace(/\n/gm, " ")
    .split(/\s+/)
  const chunkType = stringToChunkType(chunkName)

  switch (chunkType) {
    case ARRAY: return args.map(Number)
    case NEW_WINDOW: return new Canvas(args)
    case OBJECT: return createElementChunk(args)
    case UNKNOWN:
    default:
      return null
  }
}

function createElementChunk(elementName: string, ...args: any[]) {
  const elementType = stringToElementType(elementName)
  if (ELEMENTS.has(elementType)) {
    return new ELEMENTS.get(elementType)(args)
  }
  return null
}
