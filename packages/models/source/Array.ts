import Record from "./Record"

/**
 * @ref http://puredata.info/docs/developer/PdFileFormat#r31
 * @ref http://puredata.info/docs/developer/PdFileFormat#r1
 */
export default class PDArray {
  public static from = (...values: any[]) => {
    return new PDArray(values.map(Number))
  }

  public readonly record = new Record({ chunkType: Record.CHUNK_TYPE.ARRAY })
  public values: number[]

  constructor(values: number[]) {
    this.values = values
  }

  public toString() {
    return [
      this.record.toString(),
      this.values.join(" "),
    ].join(" ")
  }
}
