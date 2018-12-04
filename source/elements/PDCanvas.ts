/**
 * @class PDCanvas
 * @description Defines window properties
 *
 * @example
 *  #X obj 30 27 midiin;
 *  #X obj 26 59 midiout;
 *  #X connect 0 0 1 0;
 *  #X connect 0 1 1 1;
 */


export class PDCanvas {
  public name: string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor([ xPos, yPos, xSize, ySize, name, openOnLoad ]: string[]) {
    this.name = name
    this.xPos = Number(xPos)
    this.yPos = Number(yPos)
    this.xSize = Number(xSize)
    this.ySize = Number(ySize)
    this.openOnLoad = Boolean(openOnLoad)
  }
}
