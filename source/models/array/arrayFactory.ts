import { PdArray } from "./arrayModel.ts";
import { PdChunk } from "../chunk/main.ts";

export function createArray(chunk: PdChunk) {
  return new PdArray({ params: chunk.params });
}
