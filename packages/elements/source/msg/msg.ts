import { Element } from "@pure-data/models"

/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */

export default class Msg extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "msg"
  public readonly color = "black"
  public readonly inlets = [ "control" ]
  public readonly outlets = [ "signal" ]

  public text: string // The content of the message
  public xPos: number // Horizontal position within the window
  public yPos: number // Vertical position within the window

  constructor([ xPos, yPos, ...params ]: string[]) {
    super()
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.text = params.join(" ")
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
