import Chunk from "../../models/Chunk.ts";
import Element from "../../models/Element.ts";

/**
 * @class Restore
 * @description Defines a message
 *
 * @example
 *  #X restore 61 48 read audio.wav;
 */

export default class Restore extends Element {
  public static type = Symbol("restore");

  public static from({ params }: Chunk) {
    return new Restore({ name: params.join(" ") });
  }

  public name: string = "";

  constructor(params: { name: string }) {
    super(Restore.type, { children: [], params: [] });
    this.name = params.name;
  }

  public toString() {
    return `#X restore ${this.name}`;
  }
}
