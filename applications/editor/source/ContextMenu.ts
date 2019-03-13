const body = document.getElementsByTagName("body")[0]


interface IContextMethod {
  method: (...args: any[]) => void,
  name: string,
}

export class ContextMenu {
  private ref: HTMLElement | null = null
  private listeners: any[] = []

  constructor() {
    body.addEventListener("click", this.removeMenu)
  }

  public render(xPos: number, yPos: number, items: IContextMethod[]) {
    const menu = this.ref || document.createElement("div")
    menu.className = "context-menu"
    menu.style.top = yPos + "px"
    menu.style.left = xPos + "px"
    const menuItems = items.map(({ name }, i) => `<li class="context-${i}">${name}</li>`).join("")
    menu.innerHTML = `<ul>${menuItems}</ul>`

    if (!this.ref) {
      body.appendChild(menu)

      items.forEach(({ method }: IContextMethod, i) => {
        const ref = document.getElementsByClassName(`context-${i}`)[0]
        if (ref) this.listeners.push(ref.addEventListener("click", method))
      })
    }

    this.ref = menu
  }

  private removeMenu = () => {
    if (this.ref) {
      body.removeChild(this.ref)
      this.ref = null
    }

    if (this.listeners) {
      this.listeners.forEach(listener => removeEventListener("click", listener))
    }
  }
}
