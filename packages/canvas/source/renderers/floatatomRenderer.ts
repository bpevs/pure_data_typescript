import { Floatatom } from "@pure-data/elements"
import { Renderer } from "@pure-data/models"
import * as draw from "../drawHelpers"
import * as math from "../mathHelpers"


export default function renderFloatatom(renderer: Renderer, el: Floatatom) {
  const { context } = renderer
  const displayText = el.text.replace(/\\/g, "")
  const length = math.getDisplayLength(displayText, el.inlets, el.outlets)

  context.strokeStyle = el.color
  drawFloatatomOutline(renderer, el.xPos, el.yPos, length)
  draw.text(renderer, el.xPos, el.yPos, displayText)
  draw.portlets(renderer, el.length, el.xPos, el.yPos, el.inlets, el.outlets)
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
