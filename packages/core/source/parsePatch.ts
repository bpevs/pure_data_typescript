import { Array as PDArray, Canvas, Chunk, Element } from "@pure-data/models"

export interface Patch {
  canvas: Canvas,
  elements: { [id: string]: Element },
}
const newlines = /(\r\n|\r)/gm

/**
 * Parse *.pd files
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * https://github.com/pure-data/pure-data/blob/master/src/g_canvas.c#L1708
 * @param text *.pd file text
 */
export function parsePatch(text: string) {
  const patch: Patch = Object.freeze({
    canvas: {},
    elements: {},
  })

  const chunks = pdToChunks(text)
  const openWindows: Chunk[] = []
  chunks.forEach((chunk, index) => {
    if (!chunk) return

    const indexToId = (i: number) => i
    const id = indexToId(index)

    if (index === 0) {
      patch.canvas = Canvas.from(chunk)
    } else if (chunk.type === Chunk.TYPE.NEW_WINDOW) {
      openWindows.push(chunk)
    } else if (chunk.type === Chunk.TYPE.ARRAY) {
      const prevId = indexToId(index - 1)
      const prevEl = patch.elements[prevId]
      prevEl.data = PDArray.from(chunk)
    } else if (chunk.type === Chunk.TYPE.ELEMENT) {
      if (chunk.subType === Chunk.SUB_TYPE.RESTORE) {
        openWindows.pop()
      }
      patch.elements[id] = Element.from(chunk)
    } else {
      console.error("UNKNOWN CHUNK:", chunk)
    }
  })

  return patch
}

/**
 * Chunks are line-by-line entities.
 * They do not take into account multi-line entities,
 * ala inline subpatches, arrays.
 */
function pdToChunks(text: string): Chunk[] {
  const normalized = text.replace(newlines, "\n")
  return normalized
    .substring(0, normalized.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map(Chunk.from)
}
