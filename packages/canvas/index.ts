import { PDFloatatom, PDMsg, PDObj, PDText } from "../elements"
import { canvas, context as ctx } from "../globals"

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

