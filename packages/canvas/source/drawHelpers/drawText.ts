import { Renderer } from "@pure-data/models"

export function text(
  renderer: Renderer,
  xPos: number,
  yPos: number,
  text: string,
  size?: number
) {
  const { context, objectHeight } = renderer
  context.fillStyle = "black"
  context.font = size ? `${size}pt monaco` : "7pt monaco"
  context.fillText(text, xPos + 2, yPos + objectHeight - 6)
}
