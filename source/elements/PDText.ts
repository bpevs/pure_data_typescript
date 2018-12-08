import { drawBox } from "../utilities/drawBox.js"

/**
 * @class PDtext
 * @description Defines a message
 *
 * @example
 *  #X text 61 48 read audio.wav;
 */

export class PDText {
  public readonly chunkType = "X"
  public readonly elementType = "text"

  public text: string // The content of the message
  public xPos: number // Horizontal position within the window
  public yPos: number // Vertical position within the window

  constructor([ xPos, yPos, ...params ]: string[]) {
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.text = params.join(" ")
  }

  public render() {
    drawBox({
      text: this.text,
      type: "text",
      xPos: this.xPos,
      yPos: this.yPos,
    })
  }

  public toString() {
    return `#X text ${this.xPos} ${this.yPos} ${this.text}`
  }
}
