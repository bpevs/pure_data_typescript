import Chunk from "./Chunk"

export default class PDCanvas {
  public static from = (...values: any[]) => {
    return new PDCanvas(values.map(Number))
  }

  public readonly chunk = new Chunk(Chunk.TYPE.NEW_WINDOW)
  public values: number[]

  constructor(values: number[]) {
    this.values = values
  }
}
