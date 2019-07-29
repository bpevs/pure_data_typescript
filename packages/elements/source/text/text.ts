import { Chunk, Element } from "@pure-data/models"

/**
 * @class PDtext
 * @description Defines a message
 *
 * @example
 *  #X text 61 48 read audio.wav;
 */
export interface TextParams {
  text: string
  xPos: number
  yPos: number
}

export default class Text extends Element {
  public static type = Symbol("text")

  public static from({ params }: Chunk) {
    const [ xPos, yPos, ...texts ] = params
    return new Text({
      text: texts.join(" "),
      xPos: Number(xPos),
      yPos: Number(yPos),
    })
  }

  public color: string = "black"
  public text: string = "" // The content of the message
  public xPos: number = 0 // Horizontal position within the window
  public yPos: number = 0 // Vertical position within the window

  constructor(params: TextParams) {
    super(Text.type, { children: [], params: [] })
    this.text = params.text
    this.xPos = params.xPos
    this.yPos = params.yPos
  }

  public toString() {
    return `${super.toString()} text ${this.xPos} ${this.yPos} ${this.text}`
  }
}
