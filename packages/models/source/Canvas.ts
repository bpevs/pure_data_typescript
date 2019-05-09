import Chunk from "./Chunk"

/**
 * Defines window properties
 * @ref http://puredata.info/docs/developer/PdFileFormat#r21
 * @example #N canvas 0 0 452 302 12;
 */
export default class PDCanvas {
  public static from = ([ xPos, yPos, xSize, ySize, param1, param2 ]: any) => {
    const isFirstRecord = isNaN(Number(param1))
    return new PDCanvas({
      fontSize: isFirstRecord ? Number(param1) : null,
      name: isFirstRecord ? null : param1,
      openOnLoad: isFirstRecord ? null : Boolean(Number(param2)),
      xPos: Number(xPos),
      xSize: Number(xSize),
      yPos: Number(yPos),
      ySize: Number(ySize),
    })
  }

  public readonly chunk = new Chunk(Chunk.TYPE.NEW_WINDOW)
  public fontSize: number
  public name: string
  public openOnLoad: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor({ params }: any) {
    Object.assign(this, params)
  }

  public toString() {
    const chunk = this.chunk.toString()
    const params: any[] = [ chunk, this.xPos, this.yPos, this.xSize, this.ySize ]
    const additionalParams = typeof this.fontSize === "number"
      ? [ this.fontSize ]
      : [ this.name, this.openOnLoad ]

    return params.concat(additionalParams).join(" ")
  }
}
