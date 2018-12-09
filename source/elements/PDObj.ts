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
import * as draw from "../utilities/drawHelpers"


export class PDObj {
  public readonly chunkType = "X"
  public readonly elementType = "obj"
  public readonly inlets = []
  public readonly outlets = []
  public readonly color = "black"
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

    this.displayText = this.name.replace(/\\/g, "")
    this.length = draw.getDisplayLength(this.displayText, this.inlets, this.outlets)
  }

  public render() {
    if (this.name !== "cnv") {
      ctx.strokeStyle = this.color
      draw.rectOutline(this.xPos, this.yPos, this.length)
      draw.text(this.xPos, this.yPos, this.displayText)
      draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets)
    } else {
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
    }
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}


// Colors are 0-127, multiplied to separate, then added into big int
// This func turns them into rgba(0-256, 0-256, 0-256)
function parseColor(str: string) {
  const num = Number(str).toString(2).slice(1).padStart(18, "0")
  const r = parseInt(num.slice(0, 6), 2) * 4
  const g = parseInt(num.slice(6, 12), 2) * 4
  const b = Math.max(0, parseInt(num.slice(12), 2) * 4) || 256
  return `rgb(${r}, ${g}, ${b})`
}
