/**
 * @class PDObject
 * @description An object
 *
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 */


import { PDObj } from "@pure-data/elements"
import { context as ctx } from "../globals"
import * as draw from "../utilities/drawHelpers"


export class PDObjCnv extends PDObj {
  public readonly chunkType = "X"
  public readonly elementType = "obj"
  public readonly objectType = "cnv"

  public color = "black"
  public inlets = []
  public outlets = []
  public width: number
  public height: number
  public label: string
  public xLabelOffset: number
  public yLabelOffset: number
  public xPos: number
  public yPos: number
  public name: string
  public params: string[]
  public fontSize: number
  public bgColor: string
  public labelColor: string

  protected displayText: string

  constructor(params: string[]) {
    super(params)
    this.width = Number(params[4])
    this.height = Number(params[5])
    this.label = params[8] !== "empty" ? this.params[8] : ""
    this.xLabelOffset = Number(params[9])
    this.yLabelOffset = Number(params[10]) + 30
    this.fontSize = Number(params[12]) - 8
    this.bgColor = params[13]
    this.labelColor = params[14]
  }

  public render() {
    ctx.fillStyle = draw.parseColor(this.bgColor)
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
    draw.text(this.xPos + this.xLabelOffset, this.yPos + this.yLabelOffset, this.label, this.fontSize)
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.name} ${this.params.join(" ")}`
  }
}
