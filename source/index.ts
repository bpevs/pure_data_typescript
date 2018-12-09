import { state } from "./globals"
import { ContextMenu } from "./utilities/ContextMenu"
import { downloadPatch, loadPatch } from "./utilities/fileTransport"
import { renderPatch } from "./utilities/renderPatch"
import { deserializeFromFile } from "./utilities/serialization"


document.addEventListener("DOMContentLoaded", function initialize() {
  listenForHeaderChanges()
  listenForCanvasChanges()
})


function listenForHeaderChanges() {
  const modeCheckbox = document.getElementById("mode") as HTMLInputElement
  modeCheckbox.checked = state.mode === "edit"

  modeCheckbox.addEventListener("click", function toggleMode() {
    state.mode = state.mode === "edit" ? "interactive" : "edit"
  })

  const exportButton = document.getElementById("export") as HTMLButtonElement
  exportButton.addEventListener("click", () => downloadPatch(state.currentPatch))
}


function listenForCanvasChanges() {
  const patchCanvas = document.getElementById("pd") as HTMLCanvasElement

  // When dragging a file over canvas, update UI
  patchCanvas.addEventListener("dragover", (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
  })

  // When dropping a file over canvas, render it as a patch
  patchCanvas.addEventListener("drop", async (e: any) => {
    const patchText = String(await loadPatch(e))
    state.currentPatch = deserializeFromFile(patchText)
    renderPatch(state.currentPatch)
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
