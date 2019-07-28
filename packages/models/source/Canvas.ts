import Chunk from "./Chunk"
import Record from "./Record"

export interface CanvasParams {
  fontSize?: number
  name?: string
  openOnLoad?: boolean
  xPos: number
  xSize: number
  yPos: number
  ySize: number
}

/**
 * Defines window properties
 * @ref http://puredata.info/docs/developer/PdFileFormat#r21
 * @example #N canvas 0 0 452 302 12;
 */
export default class PDCanvas extends Record {
  public static from = (chunk: Chunk) => {
    const [ xPos, yPos, xSize, ySize, param1, param2 ] = chunk.params
    const isFirstRecord = isNaN(Number(param1))
    return new PDCanvas({
      fontSize: isFirstRecord ? Number(param1) : undefined,
      name: isFirstRecord ? undefined : param1,
      openOnLoad: isFirstRecord ? undefined : Boolean(Number(param2)),
      xPos: Number(xPos),
      xSize: Number(xSize),
      yPos: Number(yPos),
      ySize: Number(ySize),
    })
  }

  public fontSize?: number
  public name?: string
  public openOnLoad?: boolean
  public xPos: number
  public xSize: number
  public yPos: number
  public ySize: number

  constructor(params: CanvasParams) {
    super(Record.TYPE.NEW_WINDOW)
    this.fontSize = params.fontSize
    this.name = params.name
    this.openOnLoad = params.openOnLoad
    this.xPos = params.xPos
    this.xSize = params.xSize
    this.yPos = params.yPos
    this.ySize = params.ySize
  }

  public toString() {
    const record = super.toString()
    const params: any[] = [ record, this.xPos, this.yPos, this.xSize, this.ySize ]
    const additionalParams = this.fontSize == null
      ? [ this.name, this.openOnLoad ]
      : [ this.fontSize ]

    return params.concat(additionalParams).join(" ")
  }
}
