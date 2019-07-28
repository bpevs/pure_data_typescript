import Chunk from "./Chunk"
import Record from "./Record"

/**
 * @ref http://puredata.info/docs/developer/PdFileFormat#r31
 * @ref http://puredata.info/docs/developer/PdFileFormat#r1
 */
export default class PDArray extends Record {
  public static from = (chunk: Chunk) => {
    return new PDArray(chunk.params)
  }

  public values: number[]

  constructor(...params: any[]) {
    super(Record.TYPE.ARRAY)
    this.values = params.map(Number)
  }

  public append(values: number[]) {
    this.values = this.values.concat(values)
  }

  public toString() {
    return [
      super.toString(),
      this.values.join(" "),
    ].join(" ")
  }
}
