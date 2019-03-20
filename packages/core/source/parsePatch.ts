import { Chunk } from "@pure-data/models"
import { parseArrayChunk, parseCanvasChunk, parseElementChunk, parseUnknownChunk } from "./parseChunk"
const { ARRAY, NEW_WINDOW, ELEMENT } = Chunk.TYPE

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

  records.forEach((record) => {
    if (!record) return

    // TODO: subpatch record mutations
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

  switch (Chunk.stringToChunkType(chunkName)) {
    case ARRAY: return parseArrayChunk(args)
    case NEW_WINDOW: return parseCanvasChunk(args)
    case ELEMENT: return parseElementChunk(args)
    default: return parseUnknownChunk(args)
  }
}
