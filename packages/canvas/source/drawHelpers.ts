import { context as ctx, OBJECT_HEIGHT, PORTLET_HEIGHT, PORTLET_WIDTH, wireType } from "../globals"

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


