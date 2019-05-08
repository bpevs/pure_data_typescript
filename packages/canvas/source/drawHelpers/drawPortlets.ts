import { Renderer } from "@pure-data/models"
export type connectType = "control" | "signal"

export function portlets(
  renderer: Renderer,
  length: number,
  xPos: number,
  yPos: number,
  inlets: string[],
  outlets: string[]
) {
  const { context, objectHeight, portletHeight, portletWidth } = renderer
  const inletY = yPos
  const outletY = yPos + objectHeight - portletHeight
  const actualLength = Math.max(length, 20) - portletWidth
  const inletDistance = actualLength / Math.max(1, inlets.length - 2)
  const outletDistance = actualLength / Math.max(1, outlets.length - 2)


  inlets.forEach((type: connectType, index: number) => {
    const nextInletLocation = xPos + index * inletDistance
    if (type === "signal") {
      context.fillRect(nextInletLocation, inletY, portletWidth, portletHeight)
    } else {
      context.strokeRect(nextInletLocation, inletY, portletWidth, portletHeight)
    }
  })

  outlets.forEach((type: connectType, index: number) => {
    const nextOutletLocation = xPos + index * outletDistance
    if (type === "signal") {
      context.fillRect(nextOutletLocation, outletY, portletWidth, portletHeight)
    } else {
      context.strokeRect(nextOutletLocation, outletY, portletWidth, portletHeight)
    }
  })
}

