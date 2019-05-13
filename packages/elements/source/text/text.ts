import { Element } from "@pure-data/models"

/**
 * @class PDtext
 * @description Defines a message
 *
 * @example
 *  #X text 61 48 read audio.wav;
 */
export interface TextProps {
  text: string
  xPos: number
  yPos: number
}

export default class Text extends Element {
  public static type = Symbol("text")

  public static from([ xPos, yPos, ...params ]: string[]) {
    return new Text({
      text: params.join(" "),
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public color: string = "black"
  public text: string = "" // The content of the message
  public xPos: number = 0 // Horizontal position within the window
  public yPos: number = 0 // Vertical position within the window

  constructor(props: TextProps) {
    super({ type: Text.type })
    Object.assign(this, props)
  }

  public toString() {
    return `${this.record.toString()} text ${this.xPos} ${this.yPos} ${this.text}`
  }
}
