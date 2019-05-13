import { Element } from "@pure-data/models"

/**
 * @class Restore
 * @description Defines a message
 *
 * @example
 *  #X restore 61 48 read audio.wav;
 */

export default class Restore extends Element {
  public static type = Symbol("restore")

  public static from([ ...params ]: string[]) {
    return new Restore({ name: params.join(" ") })
  }

  public name: string = ""

  constructor({ name }: { name: string }) {
    super({ type: Restore.type })
    Object.assign(this, { name })
  }

  public toString() {
    return `#X restore ${this.name}`
  }
}
