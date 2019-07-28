import Record from "../Record"

export default class Array {
  static constructed = jest.fn()
  static from = jest.fn()

  recordType = Record.TYPE.NEW_WINDOW

  constructor(args) {
    Array.constructed(args)
  }

  toString = jest.fn()
}
