import PDObject from "@pure-data/models/dist/Object"
import Canvas from "../Canvas"
import Chunk from "../Chunk"
import PDElement from "../Element"
import Patch, { Elements } from "../Patch"
import Record from "../Record"

const RECORD = Record.TYPE
const ELEMENT = Element.TYPE

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

  const { canvas, elements } = parseChunks(chunks)
  return new Patch(canvas, elements)
}


/**
 * Parse chunks into Elements and the Patch Canvas properties
 * Think of chunks as a tree; lines can open/close for subpatches
 * @param chunks
 */
function parseChunks(chunks: Chunk[]): { canvas: Canvas, elements: Elements } {
  const elements: Elements = {}
  let canvas: Canvas

  const openArrays: number[] = []
  const openSubPatches: number[] = []

  chunks.forEach((chunk, index) => {
    if (!index) return canvas = Canvas.from(chunk)
    const { elementType, recordType } = chunk

    // Handle special cases of multi-chunk arrays
    const isArray = recordType !== Record.TYPE.ARRAY
    const arrayHasEnded = !isArray && openArrays.length

    if (arrayHasEnded) openArrays.pop()
    else if (isArray) openArrays.push(index)
    else elements[openArrays.length - 1].append(chunk)

    // Handle special cases of
    const isSubPatch = openSubPatches.length
    const subPatchIsClosed = isSubPatch && elementType === PDElement.TYPE.RESTORE
    const subPatchShouldOpen = recordType === Record.TYPE.NEW_WINDOW
    if (subPatchIsClosed) return openSubPatches.pop()
    else if (subPatchShouldOpen) openSubPatches.push(index)

    // Handle special cases of nested chunks
    if (openArrays.length) return

    // Generic flow of single-chunk entities
    const object = PDObject.from(chunk)
    if (object) return elements[index] = object

    const element = PDElement.from(chunk)
    if (element) return elements[index] = element

    const record = Record.from(chunk)
    if (record) return elements[index] = record

    console.error("UNKNOWN RECORD:", record)
  })

  return { canvas, elements }
}
