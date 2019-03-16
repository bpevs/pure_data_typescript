import { Element } from "@pure-data/models"

/**
 * @class PDtext
 * @description Defines a message
 *
 * @example
 *  #X text 61 48 read audio.wav;
 */


export default class Text extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "text"

  public color: string = "black"
  public text: string = "" // The content of the message
  public xPos: number = 0 // Horizontal position within the window
  public yPos: number = 0 // Vertical position within the window

  constructor([ xPos, yPos, ...params ]: string[]) {
    super()
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.text = params.join(" ")
  }

  public toString() {
    return `#X text ${this.xPos} ${this.yPos} ${this.text}`
  }
}
