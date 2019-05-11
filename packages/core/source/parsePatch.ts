import { Array as PDArray, Canvas, Element, Record } from "@pure-data/models"

export interface Patch {
  canvas: Canvas,
  elements: { [id: string]: Element },
}

const newlines = /(\r\n|\r)/gm
const { CHUNK_TYPE, ELEMENT_TYPE } = Record

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

  const normalized = text.replace(newlines, "\n")
  const record = text
    .replace(newlines, "\n")
    .substring(0, normalized.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map(Record.from)

  const openWindows: Record[] = []
  record.forEach((record, index) => {
    if (!record) return
    const { chunkType, elementType } = record

    const indexToId = (i: number) => i
    const id = indexToId(index)

    if (index === 0) {
      patch.canvas = Canvas.from(record)
    }

    switch (chunkType) {
      case CHUNK_TYPE.NEW_WINDOW:
        openWindows.push(record)
        break
      case CHUNK_TYPE.ARRAY:
        const prevId = indexToId(index - 1)
        const prevEl = patch.elements[prevId]
        prevEl.data = PDArray.from(record)
        break
      case CHUNK_TYPE.ELEMENT:
        if (elementType === ELEMENT_TYPE.RESTORE) {
          openWindows.pop()
        }
        patch.elements[id] = Element.from(record)
        break
      default:
        console.error("UNKNOWN RECORD:", record)
    }
  })

  return patch
}
