import { context as ctx, OBJECT_HEIGHT } from "../constants.js"

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
    ctx.lineWidth = "1.5"
    ctx.strokeStyle = "black"
    ctx.strokeRect(this.xPos - 5, this.yPos - 15, this.text.length * 9 + 10, OBJECT_HEIGHT)

    ctx.fillStyle = "black"
    ctx.font = "10pt monaco"
    ctx.fillText(this.text, this.xPos, this.yPos)

    ctx.fillRect(this.xPos - 5, this.yPos - 16, 8, 4)
    ctx.fillRect(this.xPos - 5, this.yPos + 5, 8, 4)
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
