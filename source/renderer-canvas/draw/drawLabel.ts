import Renderer from "../../models/Renderer.ts";

export default function drawLabel(
  renderer: Renderer,
  xPos: number,
  yPos: number,
  label: string,
  size?: number,
) {
  const { context, objectHeight } = renderer;
  context.fillStyle = "black";
  context.font = size ? `${size}pt monaco` : "7pt monaco";
  context.fillText(label, xPos + 2, yPos + objectHeight - 6);
}
