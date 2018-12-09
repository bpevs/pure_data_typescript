import { ContextMenu } from "./elements/ContextMenu"
import { downloadPatch } from "./utilities/downloadPatch"
import { renderPatch } from "./utilities/drawHelpers"
import { loadPatch } from "./utilities/loadPatch"
import { deserializeFromFile } from "./utilities/serialization"


const exportButton = document.getElementById("export")
const patchCanvas = document.getElementById("pd")


let patch: any[]


if (exportButton) exportButton.addEventListener("click", () => downloadPatch(patch))


if (patchCanvas) {
  // When dragging a file over canvas, update UI
  patchCanvas.addEventListener("dragover", (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
  })

  // When dropping a file over canvas, render it as a patch
  patchCanvas.addEventListener("drop", async (e: any) => {
    const patchText = String(await loadPatch(e))
    patch = deserializeFromFile(patchText)
    renderPatch(patch)
  })

  // On right-click on canvas, render custom contextmenu
  const menu = new ContextMenu()

  patchCanvas.addEventListener("contextmenu", (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    menu.render(e.pageX, e.pageY, [
      { name: "Properties", method: () => { console.log("Properties") } },
      { name: "Object ⌘1", method: () => { console.log("Object ⌘1") } },
      { name: "Message ⌘2", method: () => { console.log("Message ⌘2")} },
      { name: "Number ⌘3", method: () => { console.log("Number ⌘3")} },
      { name: "Symbol ⌘4", method: () => { console.log("Symbol ⌘4")} },
      { name: "Comment ⌘5", method: () => { console.log("Comment ⌘5")} },
    ])
  })
}
