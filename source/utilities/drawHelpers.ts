import { canvas, context as ctx, OBJECT_HEIGHT } from "../constants"
import { PDFloatatom, PDMsg, PDObj, PDText } from "../elements"


export type wireType = "control" | "signal"


// Initialize draw settings
ctx.lineWidth = "1"
ctx.fillStyle = "black"
ctx.font = "10pt monaco"
ctx.fillText("Drop file to start", window.innerWidth / 2.2, window.innerHeight / 2.8)


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
      || item instanceof PDObj
    ) item.render()
  })
}


export function text(xPos: number, yPos: number, text: string) {
  ctx.fillStyle = "black"
  ctx.font = "7pt monaco"
  ctx.fillText(text, xPos + 2, yPos + OBJECT_HEIGHT - 6)
}
