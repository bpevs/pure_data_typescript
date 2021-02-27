import { canvas, context as ctx } from "../globals.ts"
import { PDFloatatom } from "../elements/PDFloatatom.ts"
import { PDMsg } from "../elements/PDMsg.ts"
import { PDObj } from "../elements/PDObj.ts"
import { PDText } from "../elements/PDText.ts"


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

