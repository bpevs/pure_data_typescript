import Chunk from "./Chunk"

/**
 * @ref http://puredata.info/docs/developer/PdFileFormat#r31
 * @ref http://puredata.info/docs/developer/PdFileFormat#r1
 */
export default class PDArray {
  public static from = (...values: any[]) => {
    return new PDArray(values.map(Number))
  }

  public readonly chunk = new Chunk(Chunk.TYPE.ARRAY)
  public values: number[]

  constructor(values: number[]) {
    this.values = values
  }

  public toString() {
    return [
      this.chunk.toString(),
      this.values.join(" "),
    ].join(" ")
  }
}
