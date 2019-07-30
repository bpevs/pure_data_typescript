import { Renderer } from "@pure-data/core"
import { Obj } from "@pure-data/elements"
import * as draw from "../drawHelpers"
import * as math from "../mathHelpers"


export default function renderObj(renderer: Renderer, el: Obj) {
  const { context } = renderer
  const displayText = el.name.replace(/\\/g, "")
  const length = math.getDisplayLength(displayText, el.inlets, el.outlets)

  context.strokeStyle = el.color
  draw.rectOutline(renderer, el.xPos, el.yPos, length)
  draw.text(renderer, el.xPos, el.yPos, displayText)
  draw.portlets(renderer, el.length, el.xPos, el.yPos, el.inlets, el.outlets)
}
