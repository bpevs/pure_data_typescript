import El from "./Element"
import Obj from "./Object"
import Record from "./Record"

/**
 * A line of text representing a Record. This is what is directly
 * stored in *.pd files. This can contain multiple lines of a file
 * (defined by an ending semi-colon), for the special cases of
 * Arrays and SubPatches. The data for these entities is contained
 * in `children`.
 *
 * Chunks are completely type agnostic, and have no specific properties.
 * They are essentially used to split up a *.pd file into self-contained
 * entities.
 */
export default class Chunk {
  public children: Chunk[] = []
  public params: string[]

  constructor(recordString: string) {
    this.params = recordString
      .substring(1)
      .replace(/\n/gm, " ")
      .split(/\s+/) || []
  }

  get recordType(): symbol | null {
    return Record.getType(this.params[0]) || null
  }

  get elementType(): symbol | null {
    return El.getType(this.params[3]) || null
  }

  get objectType(): symbol | null {
    return Obj.getType(this.params[5]) || null
  }
}
