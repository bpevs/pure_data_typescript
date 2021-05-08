import { PdChunk } from "../chunk/main.ts";
import { PdObject } from "../object/main.ts";

export function createObject({ children, objectType, params }: PdChunk) {
  if (!objectType) throw new Error("Object type required");
  const [xPos, yPos, name = "", ...other] = params;

  return new PdObject(objectType, {
    children,
    name,
    params: other,
    xPos: Number(xPos),
    yPos: Number(yPos),
  });
}
