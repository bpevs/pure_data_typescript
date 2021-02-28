import Renderer from "../../models/Renderer.ts";

export default function rectOutline(
  renderer: Renderer,
  xPos: number,
  yPos: number,
  length: number,
) {
  const { context, objectHeight } = renderer;
  context.strokeRect(xPos, yPos, Math.max(length, 20), objectHeight);
}
