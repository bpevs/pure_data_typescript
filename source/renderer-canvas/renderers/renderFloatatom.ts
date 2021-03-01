import Renderer from "../../models/Renderer.ts";
import FloatatomElement from "../../elements/FloatAtom/FloatatomElement.ts";
import drawLabel from "../draw/drawLabel.ts";
import drawPortlets from "../draw/drawPortlets.ts";
import getDisplayLength from "../math/getDisplayLength.ts";

export default function renderFloatatom(
  renderer: Renderer,
  el: FloatatomElement,
) {
  const { context } = renderer;
  const labelText = el.label.replace(/\\/g, "");
  const length = getDisplayLength(labelText, el.inlets, el.outlets);

  context.strokeStyle = el.color;
  drawFloatatomOutline(renderer, el.xPos, el.yPos, length);
  drawLabel(renderer, el.xPos, el.yPos, labelText);
  drawPortlets(renderer, length, el.xPos, el.yPos, el.inlets, el.outlets);
}

// Number box has a custom shaped outline
function drawFloatatomOutline(
  renderer: Renderer,
  xPos: number,
  yPos: number,
  length: number,
) {
  const { context, objectHeight } = renderer;
  context.beginPath();
  context.moveTo(xPos, yPos);
  context.lineTo(xPos + length, yPos);
  context.lineTo(xPos + length + 5, yPos + 5);
  context.lineTo(xPos + length + 5, yPos + objectHeight);
  context.lineTo(xPos, yPos + objectHeight);
  context.lineTo(xPos, yPos);
  context.stroke();
}
