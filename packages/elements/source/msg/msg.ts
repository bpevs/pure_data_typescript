import { Element } from "@pure-data/models"

/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */

export interface MsgProps {
  text: string
  xPos: number
  yPos: number
}

export default class Msg extends Element {
  public static type = Symbol("msg")

  public static from([ xPos, yPos, ...params ]: string[]) {
    return new Msg({
      text: params.join(" "),
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public readonly color = "black"
  public readonly inlets = [ "control" ]
  public readonly outlets = [ "signal" ]

  public text: string // The content of the message
  public xPos: number // Horizontal position within the window
  public yPos: number // Vertical position within the window

  constructor({ text, xPos, yPos }: MsgProps) {
    super({ type: Msg.type })
    Object.assign(this, { text, xPos, yPos })
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`
  }
}
