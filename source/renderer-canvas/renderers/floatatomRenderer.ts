import Renderer from "../../models/Renderer.ts"
import FloatatomElement from "../../elements/FloatAtom/FloatatomElement.ts"
import drawText from "../draw/drawText.ts";
import drawPortlets from "../draw/drawPortlets.ts";
import getDisplayLength from '../math/getDisplayLength.ts';


export default function renderFloatatom(renderer: Renderer, el: FloatatomElement) {
  const { context } = renderer
  const displayText = el.text.replace(/\\/g, "")
  const length = getDisplayLength(displayText, el.inlets, el.outlets)

  context.strokeStyle = el.color
  drawFloatatomOutline(renderer, el.xPos, el.yPos, length)
  drawText(renderer, el.xPos, el.yPos, displayText)
  drawPortlets(renderer, el.length, el.xPos, el.yPos, el.inlets, el.outlets)
}

// Number box has a custom shaped outline
function drawFloatatomOutline(renderer: Renderer, xPos: number, yPos: number, length: number) {
  const { context, objectHeight } = renderer
  context.beginPath()
  context.moveTo(xPos, yPos)
  context.lineTo(xPos + length, yPos)
  context.lineTo(xPos + length + 5, yPos + 5)
  context.lineTo(xPos + length + 5, yPos + objectHeight)
  context.lineTo(xPos, yPos + objectHeight)
  context.lineTo(xPos, yPos)
  context.stroke()
}
