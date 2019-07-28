import { Element } from ".."

export default class PDObject {
  static constructed = jest.fn()
  static from = jest.fn()

  element = new Element(Element.TYPE.OBJECT)

  constructor(args) {
    Element.constructed(args)
  }

  toString = jest.fn()
}
