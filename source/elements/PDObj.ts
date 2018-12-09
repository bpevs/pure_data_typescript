/**
 * @class PDObject
 * @description An object
 *
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 */


import { context as ctx } from "../globals"
import { generics } from "../objects/generics"
import * as draw from "../utilities/drawHelpers"


export class PDObj {
  public readonly chunkType = "X"
  public readonly elementType = "obj"
  public color = "black"
  public inlets = []
  public outlets = []
  public length: number = 0

  public xPos: number
  public yPos: number
  public name: string
  public params: string[]

  protected displayText: string

  constructor([ xPos, yPos, name, ...params ]: string[]) {
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.name = String(name || "")
    this.params = params
  }

  public render() {
    if (generics[this.name]) {
      this.inlets = generics[this.name].inlets
      this.outlets = generics[this.name].outlets
    }

    this.displayText = this.name.replace(/\\/g, "")
    this.length = draw.getDisplayLength(this.displayText, this.inlets, this.outlets)

    ctx.strokeStyle = this.color
    draw.rectOutline(this.xPos, this.yPos, this.length)
    draw.text(this.xPos, this.yPos, this.displayText)
    draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets)
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
