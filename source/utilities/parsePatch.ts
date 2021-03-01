import Canvas from "../models/Canvas.ts";
import Chunk from "../models/Chunk.ts";
import Element from "../models/Element.ts";
import Patch from "../models/Patch.ts";
import Record from "../models/Record.ts";

const newlines = /(\r\n|\r)/gm;

/**
 * Parse *.pd files
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * https://github.com/pure-data/pure-data/blob/master/src/g_canvas.c#L1708
 * @param fileText *.pd file text
 */
export default function parsePatch(fileText: string): Patch {
  // Format file line into a readable/parsed array of chunks
  const normalizedFileText = fileText.replace(newlines, "\n");
  const chunks = fileText
    .replace(newlines, "\n")
    .substring(0, normalizedFileText.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map((paramsString) => new Chunk(paramsString));

  return new Patch(parseChunks(chunks));
}

/**
 * Parse chunks into Records and the Patch Canvas properties
 * Think of chunks as a tree; lines can open/close for subpatches.
 * Cannot be done line-by-line, because records can span multiple chunks.
 * @param chunks
 */
function parseChunks(chunks: Chunk[]): { canvas?: Canvas; records: Record[] } {
  const records: Record[] = [];
  let canvas: Canvas | undefined;

  const openSubPatches: number[] = [];

  chunks.forEach((chunk, index) => {
    if (!index) return canvas = Canvas.from(chunk);

    const { elementType, recordType } = chunk;

    // Handle special cases of Subpatches
    const isSubPatch = openSubPatches.length;
    const subPatchIsClosed = isSubPatch && elementType === Element.TYPE.RESTORE;
    const subPatchShouldOpen = recordType === Record.TYPE.NEW_WINDOW;
    if (subPatchIsClosed) return openSubPatches.pop();
    else if (subPatchShouldOpen) openSubPatches.push(index);

    // Handle special case of Array Data
    // array's "element" type is included in prev line
    const prev = records[records.length - 1];
    if (
      chunk.recordType === Record.TYPE.ARRAY &&
      prev &&
      Element.isType(Element.TYPE.ARRAY, prev)
    ) {
      const childrenToAdd = parseChunks(chunk.children).records;
      return prev.children = prev.children.concat(childrenToAdd);
    } else if (chunk.recordType === Record.TYPE.ARRAY) {
      return;
    }

    records.push(createRecordFromChunk(chunk));
  });

  return { canvas, records };
}

/**
 * Translate a chunk to a Record. Should only need to run once for
 * any root chunk (excepting chunks in the `children` property).
 * @example #N canvas 0 0 450 300 graph4 0;
 */
function createRecordFromChunk(chunk: Chunk): Record {
  if (!chunk.recordType) throw new Error("Record type cannot be null");
  switch (chunk.recordType) {
    case Record.TYPE.NEW_WINDOW:
      return Canvas.from(chunk);
    case Record.TYPE.ELEMENT:
      return Element.from(chunk);
    default:
      return new Record(chunk.recordType, { params: chunk.params });
  }
}
