import { createCanvas } from "../canvas/main.ts";
import { PdChunk } from "../chunk/main.ts";
import { createElement } from "../element/main.ts";
import { PdRecord } from "./recordModel.ts";

/**
 * Translate a chunk to a Record. Should only need to run once for
 * any root chunk (excepting chunks in the `children` property).
 * @example #N canvas 0 0 450 300 graph4 0;
 */
export function createRecord(chunk: PdChunk): PdRecord {
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
