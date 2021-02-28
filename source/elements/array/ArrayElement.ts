import ArrayModel from "../../models/Array.ts";
import Chunk from "../../models/Chunk.ts";
import Element from "../../models/Element.ts";

export interface ArrayElementParams {
  children: Chunk[];
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
export default class ArrayElement extends Element {
  public static readonly type = Symbol("array");

  public static from({ children, params }: Chunk) {
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
  public size: number = 0;
  public format: string;
  public saveFlag: boolean = false;

  constructor(params: ArrayElementParams) {
    super(ArrayElement.type, params);
    this.format = params.format;
    this.name = params.name;
    this.saveFlag = params.saveFlag;
    this.size = params.size;
    this.children = [];
  }

  set children(data: ArrayModel[]) {
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
