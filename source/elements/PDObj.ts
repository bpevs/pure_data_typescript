/**
 * @class PDObject
 * @description An object
 *
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 */


import { context as ctx } from "../constants"
import { definitions } from "../objects/basic"
import * as draw from "../utilities/drawHelpers"
import { parseColor } from "../utilities/parseColor"

export class PDObj {
  public readonly chunkType = "X"
  public readonly elementType = "obj"
  public color = "black"
  public inlets = []
  public outlets = []
  public length = 0

  public xPos: number
  public yPos: number
  public name: string
  public params: string[]

  private displayText: string

  constructor([ xPos, yPos, name, ...params ]: string[]) {
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.name = String(name || "")
    this.params = params
  }

  public render() {
    if (this.name === "cnv") {
      const width = this.params[1]
      const height = this.params[2]
      const label = this.params[5] !== "empty" ? this.params[5] : ""
      const xOff = Number(this.params[7])
      const yOff = Number(this.params[8]) + 30
      const fontSize = Number(this.params[9]) - 8
      const backgroundColor = this.params[10]
      ctx.fillStyle = parseColor(backgroundColor)
      ctx.fillRect(this.xPos, this.yPos, width, height)
      draw.text(this.xPos + xOff, this.yPos + yOff, label, fontSize)
    } else {
      if (definitions[this.name]) {
        this.inlets = definitions[this.name].in
        this.outlets = definitions[this.name].out
      }

      this.displayText = this.name.replace(/\\/g, "")
      this.length = draw.getDisplayLength(this.displayText, this.inlets, this.outlets)

      ctx.strokeStyle = this.color
      draw.rectOutline(this.xPos, this.yPos, this.length)
      draw.text(this.xPos, this.yPos, this.displayText)
      draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets)
    }
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
