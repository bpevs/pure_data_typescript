import { PdCanvas } from "./canvasModel.ts";
import { PdChunk } from "../chunk/main.ts";

export function createCanvas(chunk: PdChunk) {
  const [xPos, yPos, xSize, ySize, param1, param2, ...params] = chunk.params;
  const isFirstRecord = isNaN(Number(param1));

  return new PdCanvas({
    params,
    fontSize: isFirstRecord ? Number(param1) : undefined,
    name: isFirstRecord ? undefined : param1,
    openOnLoad: isFirstRecord ? undefined : Boolean(Number(param2)),
    xPos: Number(xPos),
    xSize: Number(xSize),
    yPos: Number(yPos),
    ySize: Number(ySize),
  });
}
