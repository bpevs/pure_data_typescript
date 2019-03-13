import { context as ctx } from "../globals"
import * as draw from "../utilities/drawHelpers"


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
    const displayText = this.text.replace(/\\/g, "")

    ctx.strokeStyle = "black"
    draw.text(this.xPos, this.yPos, displayText)
  }

  public toString() {
    return `#X text ${this.xPos} ${this.yPos} ${this.text}`
  }
}
