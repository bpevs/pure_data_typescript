/**
 * @class PDFloatatom
 * @description Defines a number box
 * When the value of [upper_limit] minus the value of [lower_limit] is less than one,
 * or the [width] attribute is set to one, PureData resets these values both to zero.
 * Floatatom and symbolatom are the only elements that uses "-" characters to indicate
 * that no value has been assigned to its attributes [label], [receive] and [send].
 *
 *
 * @example
 *  #X floatatom 32 26 5 0 0 0 - - -;
 */


import { context as ctx, OBJECT_HEIGHT } from "../constants"
import * as draw from "../utilities/drawHelpers"


export class PDFloatatom {
  public readonly chunkType = "X"
  public readonly elementType = "floatatom"
  public readonly color = "black"
  public readonly inlets = [ "control" ]
  public readonly outlets = [ "signal" ]

  public lowerLimit: number
  public label: string
  public labelPos: number
  public receive: string
  public send: string
  public upperLimit: number
  public width: number
  public xPos: number
  public yPos: number

  constructor([ xPos, yPos, width, lowerLimit, upperLimit, labelPos, label, receive, send ]: string[]) {
    this.lowerLimit = Number(lowerLimit)
    this.label = String(label)
    this.labelPos = Number(labelPos)
    this.receive = String(receive)
    this.send = String(send)
    this.upperLimit = Number(upperLimit)
    this.width = Number(width)
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
  }

  public render() {
    const displayText = this.label.replace(/\\/g, "")
    const length = draw.getDisplayLength(displayText, this.inlets, this.outlets)

    ctx.strokeStyle = this.color
    drawOutline(this.xPos, this.yPos, length)
    draw.text(this.xPos, this.yPos, displayText)
    draw.inlets(this.xPos, this.yPos, this.inlets, this.outlets)
  }

  public toString() {
    let str = `#X floatatom ${this.xPos} ${this.yPos} ${this.width}` +
      ` ${this.lowerLimit} ${this.upperLimit} ${this.labelPos}`
    str += (this.label || "-")
    str += (this.receive || "-")
    str += (this.send || "-")
    return str
  }
}


// Number box has a custom shaped outline
function drawOutline(xPos: number, yPos: number, length: number) {
  ctx.beginPath()
  ctx.moveTo(xPos, yPos)
  ctx.lineTo(xPos + length, yPos)
  ctx.lineTo(xPos + length + 5, yPos + 5)
  ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos + OBJECT_HEIGHT)
  ctx.lineTo(xPos, yPos)
  ctx.stroke()
}
