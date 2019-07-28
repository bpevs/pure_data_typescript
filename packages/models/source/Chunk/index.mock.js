export default class Chunk {
  static constructed = jest.fn()
  static from = jest.fn()

  constructor(args) {
    Chunk.constructed(args)
  }

  toString = jest.fn()
}
