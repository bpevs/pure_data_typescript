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

  public xPos: number
  public yPos: number
  public name: string
  public params: string[]

  constructor([ xPos, yPos, name, ...params ]: string[]) {
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.name = String(name || "")
    this.params = params
  }

  public render() {
    if (this.name !== "cnv") {
      const displayText = this.name.replace(/\\/g, "")
      const length = draw.getDisplayLength(displayText, this.inlets, this.outlets)
      ctx.strokeStyle = this.color
      draw.rectOutline(this.xPos, this.yPos, length)
      draw.text(this.xPos, this.yPos, displayText)
      draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets)
    } else {
      const width = this.params[1]
      const height = this.params[2]
      const label = this.params[5]
      if (label === "HELLO") console.log("HELLO")
      ctx.fillStyle = parseColor(this.params[10])
      ctx.fillRect(this.xPos, this.yPos, width, height)
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
  const b = (parseInt(num.slice(12), 2) * 4) || 256
  return `rgb(${r}, ${g}, ${b})`
}
