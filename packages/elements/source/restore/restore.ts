import { Element } from "@pure-data/models"

/**
 * @class Restore
 * @description Defines a message
 *
 * @example
 *  #X restore 61 48 read audio.wav;
 */


export default class Restore extends Element {
  public readonly chunkType = "X"
  public readonly elementType = "restore"

  public name: string = ""

  constructor([ ...params ]: string[]) {
    super()
    this.name = params.join(" ")
  }

  public toString() {
    return `#X restore ${this.name}`
  }
}
