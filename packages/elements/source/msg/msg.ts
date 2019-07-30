import { Chunk, Element } from "@pure-data/core"

/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */

export interface MsgParams {
  text: string
  xPos: number
  yPos: number
}

export default class Msg extends Element {
  public static type = Symbol("msg")

  public static from({ params }: Chunk) {
    const [xPos, yPos, ...texts] = params
    return new Msg({
      text: texts.join(" "),
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public readonly color = "black"
  public readonly inlets = ["control"]
  public readonly outlets = ["signal"]

  public text: string // The content of the message
  public xPos: number // Horizontal position within the window
  public yPos: number // Vertical position within the window

  constructor(params: MsgParams) {
    super(Msg.type, { children: [], params: [] })
    this.text = params.text
    this.xPos = params.xPos
    this.yPos = params.yPos
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
