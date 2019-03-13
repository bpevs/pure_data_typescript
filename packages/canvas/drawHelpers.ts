import { context as ctx, OBJECT_HEIGHT, PORTLET_HEIGHT, PORTLET_WIDTH, wireType } from "../globals"


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


export function inlets(length: number, xPos: number, yPos: number, inlets: string[], outlets: string[]) {
  const inletY = yPos
  const outletY = yPos + OBJECT_HEIGHT - PORTLET_HEIGHT
  const actualLength = Math.max(length, 20) - PORTLET_WIDTH
  const inletDistance = actualLength / Math.max(1, inlets.length - 2)
  const outletDistance = actualLength / Math.max(1, outlets.length - 2)


  inlets.forEach((type: wireType, index: number) => {
    const nextInletLocation = xPos + index * inletDistance
    if (type === "signal") {
      ctx.fillRect(nextInletLocation, inletY, PORTLET_WIDTH, PORTLET_HEIGHT)
    } else {
      ctx.strokeRect(nextInletLocation, inletY, PORTLET_WIDTH, PORTLET_HEIGHT)
    }
  })

  outlets.forEach((type: wireType, index: number) => {
    const nextOutletLocation = xPos + index * outletDistance
    if (type === "signal") {
      ctx.fillRect(nextOutletLocation, outletY, PORTLET_WIDTH, PORTLET_HEIGHT)
    } else {
      ctx.strokeRect(nextOutletLocation, outletY, PORTLET_WIDTH, PORTLET_HEIGHT)
    }
  })
}

// Colors are 0-63, multiplied to separate, then added into big int
// This func turns them into rgba(0-256, 0-256, 0-256)
export function parseColor(str: string) {
  const num = Number(str).toString(2).slice(1).padStart(18, "0")
  const r = parseInt(num.slice(0, 6), 2) * 4
  const g = parseInt(num.slice(6, 12), 2) * 4
  const b = Math.max(0, parseInt(num.slice(12), 2) * 4) || 256
  return `rgb(${r}, ${g}, ${b})`
}


export function rectOutline(xPos: number, yPos: number, length: number) {
  ctx.strokeRect(xPos, yPos, Math.max(length, 20), OBJECT_HEIGHT)
}


export function text(xPos: number, yPos: number, text: string, size?: number) {
  ctx.fillStyle = "black"
  ctx.font = size ? `${size}pt monaco` : "7pt monaco"
  ctx.fillText(text, xPos + 2, yPos + OBJECT_HEIGHT - 6)
}
