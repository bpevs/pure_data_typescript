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

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
