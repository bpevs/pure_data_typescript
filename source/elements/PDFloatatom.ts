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

export class PDFloatatom {
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
    this.label = String(label === "-" ? "" : label)
    this.labelPos = Number(labelPos)
    this.receive = String(receive === "-" ? "" : receive)
    this.send = String(send === "-" ? "" : send)
    this.upperLimit = Number(upperLimit)
    this.width = Number(width)
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
  }
}
