import { Element, Renderer } from "@pure-data/models"
import * as draw from "../drawHelpers"
import * as math from "../mathHelpers"


export default function renderObj(renderer: Renderer, el: Element) {
  const { context } = renderer
  el.displayText = el.name.replace(/\\/g, "")
  el.length = math.getDisplayLength(el.displayText, el.inlets, el.outlets)

  context.strokeStyle = el.color
  draw.rectOutline(renderer, el.xPos, el.yPos, el.length)
  draw.text(renderer, el.xPos, el.yPos, el.displayText)
  draw.portlets(renderer, el.length, el.xPos, el.yPos, el.inlets, el.outlets)
}
