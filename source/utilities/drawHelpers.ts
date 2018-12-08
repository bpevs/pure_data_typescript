import { canvas, context as ctx, OBJECT_HEIGHT } from "../constants"
import { PDFloatatom, PDMsg, PDText } from "../elements"

export type wireType = "control" | "signal"

export function floatatomOutline(xPos: number, yPos: number, length: number) {
  ctx.beginPath()
  ctx.moveTo(xPos, yPos)
  ctx.lineTo(xPos + length, yPos)
  ctx.lineTo(xPos + length + 5, yPos + 5)
  ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos)
  ctx.stroke()
}

// Determine the longest visual length item to render
export function getDisplayLength(drawText: string, inlets: string[], outlets: string[]) {
  const textLength = drawText.length * 6 + 5
  const inletLength = inlets.length * 20
  const outletLength = outlets.length * 20
  return Math.max(textLength, inletLength, outletLength)
}

export function inlets(xPos: number, yPos: number, inlets: string[], outlets: string[]) {
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

export function msgOutline(xPos: number, yPos: number, length: number) {
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

export function rectOutline(xPos: number, yPos: number, length: number) {
  ctx.strokeRect(xPos, yPos, length + 10, OBJECT_HEIGHT)
}

export function renderPatch(patch: any[]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  patch.forEach(item => {
    if (
      item instanceof PDMsg
      || item instanceof PDFloatatom
      || item instanceof PDText
    ) item.render()
  })
}

export function text(xPos: number, yPos: number, text: string) {
  ctx.fillStyle = "black"
  ctx.font = "7pt monaco"
  ctx.fillText(text, xPos + 2, yPos + OBJECT_HEIGHT - 6)
}
