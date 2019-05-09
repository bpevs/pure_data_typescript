import Element from "./Element"

export default class Connect {
  static constructed = jest.fn()
  static from = jest.fn()

  element = new Element(Element.TYPE.CONNECT)

  constructor(args) {
    Element.constructed(args)
  }

  toString = jest.fn()
}
