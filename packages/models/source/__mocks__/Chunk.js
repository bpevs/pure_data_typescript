import PDChunk from "../Chunk"

export default class Chunk {
  static TYPE = PDChunk.TYPE
  static constructed = jest.fn()
  static from = jest.fn()

  constructor(args) {
    Chunk.constructed(args)
  }

  toString = jest.fn()
}
