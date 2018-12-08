import { context as ctx } from "./constants"
import { downloadPatch } from "./interfaces/downloadPatch"
import { loadPatch } from "./interfaces/loadPatch"
import { drawContextMenu } from "./utilities/drawContextMenu"
import { renderPatch } from "./utilities/drawHelpers"
import { deserializeFromFile } from "./utilities/serialization"


let patch: any[]
const exportButton = document.getElementById("export")
const patchCanvas = document.getElementById("pd")

ctx.fillStyle = "black"
ctx.font = "10pt monaco"
ctx.fillText("Drop file to start", window.innerWidth / 2.2, window.innerHeight / 2.8)

if (exportButton) exportButton.addEventListener("click", () => downloadPatch(patch))

if (patchCanvas) {
  patchCanvas.addEventListener("dragover", (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
  })

  patchCanvas.addEventListener("drop", async (e: any) => {
    const patchText = await loadPatch(e)
    patch = deserializeFromFile(String(patchText))
    renderPatch(patch)
  })

  patchCanvas.addEventListener("contextmenu", (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("CONTEXT", e)
    drawContextMenu(e.pageX, e.pageY)
  })
}
