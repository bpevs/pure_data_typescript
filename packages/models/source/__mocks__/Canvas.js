import Chunk from "./Chunk"

export default class Canvas {
  static constructed = jest.fn()
  static from = jest.fn()

  chunk = new Chunk(Chunk.TYPE.NEW_WINDOW)

  constructor(args) {
    Canvas.constructed(args)
  }

  toString = jest.fn()
}
