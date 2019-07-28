import PDElement from "."
import Chunk from "../Chunk"

export default class Element {
  static TYPE = PDElement.TYPE
  static constructed = jest.fn()
  static from = jest.fn()

  chunk = new Chunk(Chunk.TYPE.ELEMENT)

  constructor(args) {
    Element.constructed(args)
  }

  toString = jest.fn()
}
