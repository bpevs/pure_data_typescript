import { PdArray } from "../../models/array/main.ts";
import { PdChunk } from "../../models/chunk/main.ts";
import { PdElement } from "../../models/element/main.ts";

export interface ArrayElementParams {
  children: PdChunk[];
  name: string;
  size: number;
  format: string;
  params: string[];
  saveFlag: boolean;
}

/**
 * @class ArrayElement
 * @description A visual representation of an Array
 *
 * @example
 */
export default class ArrayElement extends PdElement {
  public static readonly type = Symbol("array");

  public static from({ children, params }: PdChunk) {
    const [name, size, format, saveFlag, ...other] = params;
    return new ArrayElement({
      children,
      format: String(format),
      name: String(name),
      params: other,
      saveFlag: Boolean(saveFlag) || false,
      size: Number(size) || 0,
    });
  }

  public data: number[] = [];
  public name: string;
  public size: number;
  public format: string;
  public saveFlag: boolean;

  constructor(params: ArrayElementParams) {
    super(ArrayElement.type, params);
    this.format = params.format;
    this.name = params.name;
    this.saveFlag = params.saveFlag || false;
    this.size = params.size || 0;
    this.children = [];
  }

  addData(data: PdArray[]) {
    this.data = data.flatMap((arr) => arr.values).map(Number);
  }

  // TODO: This currently breaks for two reasons:
  // - Need to format small numbers: 9.41753e-06
  // - #A is often split into multiple lines. Not sure why yet. Probably Dimensions or size constraint.
  public toString() {
    const meta = `#X array ${this.name} ${this.size} ${this.format} ${
      this.saveFlag ? 1 : 0
    };\r\n`;
    const data = `#A ${this.data.join(" ")}`;
    return meta + data;
  }
}
