import { context as ctx } from "../constants"
import * as draw from "./drawHelpers"


export interface IBoxProperties {
  inlets?: draw.wireType[]
  outlets?: draw.wireType[]
  xPos: number
  yPos: number
  text: string
  type: "text" | "msg" | "floatatom" | "object" | "bang"
}


// Draw box with dimensions, inlets, and outlets
export function drawBox({
  xPos,
  yPos,
  text = "",
  type,
  inlets = [],
  outlets = [],
}: IBoxProperties) {
  const displayText = text.replace(/\\/g, "")
  const length = draw.getDisplayLength(displayText, inlets, outlets)

  ctx.lineWidth = "1"
  ctx.strokeStyle = "black"

  switch (type) {
    case "msg":
      draw.msgOutline(xPos, yPos, length)
      draw.text(xPos, yPos, displayText)
      draw.inlets(xPos, yPos, inlets, outlets)
      return
    case "object":
      draw.rectOutline(xPos, yPos, length)
      draw.text(xPos, yPos, displayText)
      draw.inlets(xPos, yPos, inlets, outlets)
      return
    case "floatatom":
      draw.floatatomOutline(xPos, yPos, length)
      draw.text(xPos, yPos, displayText)
      draw.inlets(xPos, yPos, inlets, outlets)
      return
    case "text":
      draw.text(xPos, yPos, displayText)
      return
  }
}
