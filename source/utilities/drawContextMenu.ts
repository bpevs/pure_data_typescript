const body = document.getElementsByTagName("body")[0]
let contextMenu: any = null

export function drawContextMenu(xPos: number, yPos: number) {
  const div = contextMenu || document.createElement("div")
  div.className = "context-menu"
  div.innerHTML = `
    <ul>
      <li>Properties</li>
      <li>Object ⌘1</li>
      <li>Message ⌘2</li>
      <li>Number ⌘3</li>
      <li>Symbol ⌘4</li>
      <li>Comment ⌘5</li>
    </ul>
  `
  div.style.top = yPos + "px"
  div.style.left = xPos + "px"

  if (!contextMenu) {
    body.appendChild(div)
  }

  contextMenu = div
}

body.addEventListener("click", () => {
  body.removeChild(contextMenu)
  contextMenu = null
})
