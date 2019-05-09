import Chunk from "./Chunk"

export default class Array {
  static constructed = jest.fn()
  static from = jest.fn()

  chunk = new Chunk(Chunk.TYPE.NEW_WINDOW)

  constructor(args) {
    Array.constructed(args)
  }

  toString = jest.fn()
}
