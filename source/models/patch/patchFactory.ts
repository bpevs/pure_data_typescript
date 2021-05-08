import { createCanvas, PdCanvas } from "../canvas/main.ts";
import { PdChunk } from "../chunk/main.ts";
import { createElement, PdElement } from "../element/main.ts";
import { PdRecord } from "../record/main.ts";
import { PdPatch } from "./patchModel.ts";

const newlines = /(\r\n|\r)/gm;

/**
 * Create a Patch from a *.pd file string
 * @example const patch = Patch.from('#N canvas 624 103 899 784 10;')
 * @param patchFileString The actual pd file content
 * Parse *.pd files
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * https://github.com/pure-data/pure-data/blob/master/src/g_canvas.c#L1708
 * @param fileText *.pd file text
 */
export function createPatch(fileText: string): PdPatch {
  // Format file line into a readable/parsed array of chunks
  const normalizedFileText = fileText.replace(newlines, "\n");
  const chunks = fileText
    .replace(newlines, "\n")
    .substring(0, normalizedFileText.length - 1)
    .split(/;\n/)
    .filter(Boolean)
    .map((paramsString) => new PdChunk(paramsString));

  return new PdPatch(parseChunks(chunks));
}

/**
 * Parse chunks into Records and the Patch Canvas properties
 * Think of chunks as a tree; lines can open/close for subpatches.
 * Cannot be done line-by-line, because records can span multiple chunks.
 * @param chunks
 */
function parseChunks(
  chunks: PdChunk[],
): { canvas?: PdCanvas; records: PdRecord[] } {
  const records: PdRecord[] = [];
  let canvas: PdCanvas | undefined;

  const openSubPatches: number[] = [];

  chunks.forEach((chunk, index) => {
    if (!index) return canvas = PdCanvas.from(chunk);

    const { elementType, recordType } = chunk;

    // Handle special cases of Subpatches
    const isSubPatch = openSubPatches.length;
    const subPatchIsClosed = isSubPatch &&
      elementType === PdElement.TYPE.RESTORE;
    const subPatchShouldOpen = recordType === PdRecord.TYPE.NEW_WINDOW;
    if (subPatchIsClosed) return openSubPatches.pop();
    else if (subPatchShouldOpen) openSubPatches.push(index);

    // Handle special case of Array Data
    // array's 'element' type is included in prev line
    const prev = records[records.length - 1];
    if (
      chunk.recordType === PdRecord.TYPE.ARRAY &&
      prev &&
      PdElement.isType(PdElement.TYPE.ARRAY, prev)
    ) {
      const childrenToAdd = parseChunks(chunk.children).records;
      return prev.children = prev.children.concat(childrenToAdd);
    } else if (chunk.recordType === PdRecord.TYPE.ARRAY) {
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
function createRecordFromChunk(chunk: PdChunk): PdRecord {
  if (!chunk.recordType) throw new Error("Record type cannot be null");
  switch (chunk.recordType) {
    case PdRecord.TYPE.NEW_WINDOW:
      return createCanvas(chunk);
    case PdRecord.TYPE.ELEMENT:
      return createElement(chunk);
    default:
      return new PdRecord(chunk.recordType, { params: chunk.params });
  }
}
