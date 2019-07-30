import Arr from "../models/Array"
import Canvas from "../models/Canvas"
import Chunk from "../models/Chunk"
import Element from "../models/Element"
import Obj from "../models/Object"
import Patch from "../models/Patch"
import Record from "../models/Record"

const newlines = /(\r\n|\r)/gm

/**
 * Parse *.pd files
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * https://github.com/pure-data/pure-data/blob/master/src/g_canvas.c#L1708
 * @param fileText *.pd file text
 */
export default function parsePatch(fileText: string): Patch {
  // Format file line into a readable/parsed array of chunks
  const normalizedFileText = fileText.replace(newlines, "\n")
  const chunks = fileText
    .replace(newlines, "\n")
    .substring(0, normalizedFileText.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map(paramsString => new Chunk(paramsString))

  return new Patch(parseChunks(chunks))
}


/**
 * Parse chunks into Records and the Patch Canvas properties
 * Think of chunks as a tree; lines can open/close for subpatches
 * @param chunks
 */
function parseChunks(chunks: Chunk[]): { canvas?: Canvas, records: Record[] } {
  const records: Record[] = []
  let canvas: Canvas | undefined

  const openSubPatches: number[] = []

  chunks.forEach((chunk, index) => {
    if (!index) return canvas = Canvas.from(chunk)
    const { elementType, recordType } = chunk

    // TODO: Fix Array references
    // if Array data:
    // const prev = records[records.length - 1]
    // if (
    //   chunk.recordType === Arr.type &&
    //   prev &&
    //   Element.is(Element.TYPE.ARRAY, prev)
    // ) return prev.addData(chunk.children)
    if (chunk.recordType === Arr.type) return

    // Handle special cases of Subpatches
    const isSubPatch = openSubPatches.length
    const subPatchIsClosed = isSubPatch && elementType === Element.TYPE.RESTORE
    const subPatchShouldOpen = recordType === Record.TYPE.NEW_WINDOW
    if (subPatchIsClosed) return openSubPatches.pop()
    else if (subPatchShouldOpen) openSubPatches.push(index)

    // Generic flow of single-chunk entities
    if (chunk.elementType === Obj.type)
      records.push(Obj.from(chunk))

    if (chunk.elementType === Element.type)
      records.push(Element.from(chunk))

    records.push(Record.from(chunk))
  })

  return { canvas, records }
}
