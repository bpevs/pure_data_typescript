import { PdChunk } from "../chunk/main.ts";
import { PdElement } from "../element/main.ts";

export function createElement({ children, elementType, params }: PdChunk) {
  if (!elementType) throw new Error("Element type is mandatory");
  return new PdElement(elementType, { children, params });
}
