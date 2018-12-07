const body = document.getElementsByTagName("body")[0]

/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */

export class PDMsg {
  public readonly chunkType = "X"
  public readonly elementType = "msg"

  public text: string // The content of the message
  public xPos: number // Horizontal position within the window
  public yPos: number // Vertical position within the window

  constructor([ xPos, yPos, ...params ]: string[]) {
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.text = params.join(" ")
  }

  public render() {
    const node = document.createElement("p")

    Object.assign(node.style, {
      border: "1px solid black",
      cursor: "default",
      left: String(this.xPos) + "px",
      padding: "2px",
      position: "fixed",
      top: String(this.yPos) + "px",
    })

    node.appendChild(document.createTextNode(this.text))
    body.appendChild(node)
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
