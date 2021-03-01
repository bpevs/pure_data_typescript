import Chunk from "../../models/Chunk.ts";
import Element from "../../models/Element.ts";

/**
 * @class Symbolatom
 * @description Defines a message
 *
 * @example
 *  #X symbolatom 61 48 read audio.wav;
 */

export default class Symbolatom extends Element {
  public static type = Element.TYPE.SYMBOL_ATOM;

  public static from({ params }: Chunk) {
    return new Symbolatom({ name: params.join(" ") });
  }

  public name: string = "";

  constructor(params: { name: string }) {
    super(Symbolatom.type, { children: [], params: [] });
    this.name = params.name;
  }

  public toString() {
    return `#X symbolatom ${this.name}`;
  }
}
