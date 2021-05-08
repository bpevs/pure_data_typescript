import { PdElement } from "../element/main.ts";
import { PdObject } from "../object/main.ts";
import { PdRecord } from "../record/main.ts";

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
export class PdChunk {
  public children: PdChunk[] = [];
  public params: string[];

  constructor(recordString: string) {
    this.params = recordString
      .substring(1)
      .replace(/\n/gm, " ")
      .split(/\s+/) || [];
  }

  get recordType(): symbol | null {
    return PdRecord.getType(this.params[0]) || null;
  }

  get elementType(): symbol | null {
    return PdElement.getType(this.params[1]) || null;
  }

  get objectType(): symbol | null {
    return PdObject.getType(this.params[5]) || null;
  }

  toString() {
    return (
      `recordType: ${String(this.recordType)}\n` +
      `elementType: ${String(this.elementType)}\n` +
      `objectType: ${String(this.objectType)}\n` +
      `params: ${String(this.params)}\n` +
      `children: ${String(this.children)}\n`
    );
  }
}
