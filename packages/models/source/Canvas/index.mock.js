import Record from "../Record"

export default class Canvas {
  static constructed = jest.fn()
  static from = jest.fn()

  recordType = Record.TYPE.NEW_WINDOW

  constructor(args) {
    Canvas.constructed(args)
  }

  toString = jest.fn()
}
