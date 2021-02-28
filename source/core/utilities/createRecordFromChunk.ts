import Arr from "../models/Array.ts";
import Canvas from "../models/Canvas.ts";
import Chunk from "../models/Chunk.ts";
import Element from "../models/Element.ts";
import Record from "../models/Record.ts";

/**
 * Translate a chunk to a Record. Should only need to run once for
 * any root chunk (excepting chunks in the `children` property).
 * @example #N canvas 0 0 450 300 graph4 0;
 */
export default function createRecordFromChunk(chunk: Chunk): Record {
  if (!chunk.recordType) throw new Error("Record type cannot be null");
  console.log(chunk.toString());

  switch (chunk.recordType) {
    case Record.TYPE.ARRAY:
      return Arr.from(chunk);
    case Record.TYPE.ELEMENT:
      return Element.from(chunk);
    // case Record.TYPE.NEW_WINDOW: return Canvas.from(chunk)
    default:
      return new Record(chunk.recordType, { params: chunk.params });
  }
}
