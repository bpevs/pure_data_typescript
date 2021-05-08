import { PdRecord } from "../record/main.ts";

/**
 * @ref http://puredata.info/docs/developer/PdFileFormat#r31
 * @ref http://puredata.info/docs/developer/PdFileFormat#r1
 */
export class PdArray extends PdRecord {
  public values: number[];

  constructor({ params }: { params: any[] }) {
    super(PdRecord.TYPE.ARRAY);
    this.values = params.map(Number);
  }

  public append(values: number[]) {
    this.values = this.values.concat(values);
  }

  public toString() {
    return [
      super.toString(),
      this.values.join(" "),
    ].join(" ");
  }
}
