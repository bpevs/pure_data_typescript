import Renderer from "../../models/Renderer.ts";
import TextElement from "../../elements/Text/TextElement.ts"
import drawText from "../draw/drawText.ts"


export default function renderText(renderer: Renderer, el: TextElement) {
  const { context } = renderer
  const displayText = el.text.replace(/\\/g, "")

  context.strokeStyle = el.color
  drawText(renderer, el.xPos, el.yPos, displayText)
}
