import { Renderer } from "@pure-data/models"

export function rectOutline(
  renderer: Renderer,
  xPos: number,
  yPos: number,
  length: number,
) {
  const { context, objectHeight } = renderer
  context.strokeRect(xPos, yPos, Math.max(length, 20), objectHeight)
}
