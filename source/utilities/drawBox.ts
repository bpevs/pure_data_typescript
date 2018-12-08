import { context as ctx, OBJECT_HEIGHT } from "../constants.js"

/**
 * Draw box with dimensions, inlets, and outlets
 */

export type wireType = "bang" | "number" | "signal"

export interface IBoxProperties {
  inlets?: wireType[]
  outlets?: wireType[]
  xPos: number
  yPos: number
  text: string
  type: "text" | "msg" | "floatatom" | "object"
}

export function drawBox({
  xPos,
  yPos,
  text = "",
  type,
  inlets = [],
  outlets = [],
}: IBoxProperties) {

  // Determine the longest visual length item to render
  const drawText = text.replace(/\\/g, "")
  ctx.fillStyle = "black"
  ctx.font = "7pt monaco"
  ctx.fillText(drawText, xPos + 2, yPos + OBJECT_HEIGHT - 6)

  if (type === "text") return

  const textLength = drawText.length * 6 + 5
  const inletLength = inlets.length * 20
  const outletLength = outlets.length * 20
  const length = Math.max(textLength, inletLength, outletLength)

  ctx.lineWidth = "1"
  ctx.strokeStyle = "black"
  if (type === "msg") {
    drawMsgOutline(xPos, yPos, length)
  } else if (type === "object") {
    drawRectOutline(xPos, yPos, length)
  } else if (type === "floatatom") {
    drawFloatatomOutline(xPos, yPos, length)
  }

  // Draw inlets/outlets
  const inletHeight = 3
  const inletWidth = 8
  const inletY = yPos
  const outletY = yPos + OBJECT_HEIGHT - inletHeight
  const inletDistance = length / inlets.length
  const outletDistance = length / outlets.length

  inlets.forEach((type: wireType, index: number) => {
    if (type === "signal") {
      ctx.fillRect(xPos + index * inletDistance, inletY, inletWidth, inletHeight)
    } else {
      ctx.strokeRect(xPos + index * inletDistance, inletY, inletWidth, inletHeight)
    }
  })

  outlets.forEach((type: wireType, index: number) => {
    if (type === "signal") {
      ctx.fillRect(xPos + index * outletDistance, outletY, inletWidth, inletHeight)
    } else {
      ctx.strokeRect(xPos + index * outletDistance, outletY, inletWidth, inletHeight)
    }
  })
}

function drawFloatatomOutline(xPos: number, yPos: number, length: number) {
  ctx.beginPath()
  ctx.moveTo(xPos, yPos)
  ctx.lineTo(xPos + length, yPos)
  ctx.lineTo(xPos + length + 5, yPos + 5)
  ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos)
  ctx.stroke()
}

function drawRectOutline(xPos: number, yPos: number, length: number) {
  ctx.strokeRect(xPos, yPos, length + 10, OBJECT_HEIGHT)
}

function drawMsgOutline(xPos: number, yPos: number, length: number) {
  ctx.beginPath()
  ctx.moveTo(xPos, yPos)
  ctx.lineTo(xPos + length + 5, yPos)
  ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT / 4))
  ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT * 3 / 4))
  ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos)
  ctx.stroke()
}
