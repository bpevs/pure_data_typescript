import { ELEMENT } from "../../typeMaps.ts";
import { PdChunk } from "../chunk/main.ts";
import { PdRecord } from "../record/main.ts";

export interface ElementProps {
  children: PdChunk[];
  params: string[];
  [key: string]: any;
}

/**
 * Elements are the parts that together make up the entire layout of a patch,
 * including windowsizes and position.
 *
 * @ref http://puredata.info/docs/developer/PdFileFormat#r3
 * @syntax #X [element];\r\n
 * @example #X obj 50 36;
 */
export class PdElement extends PdRecord {
  public static readonly TYPE = ELEMENT.types;
  public static type = PdRecord.TYPE.ELEMENT;
  public static getType = (a: string) => ELEMENT.getType(a);
  public static isType = (type: symbol, record: any): boolean => {
    return type === PdElement.getType(record.elementType);
  };
  public static serializeType = (a: symbol) => ELEMENT.serializeType(a);

  public elementType: symbol;

  public children: PdRecord[] = [];
  public params: string[];
  public recordType: symbol;
  public render: (...params: any[]) => any | void = () => {};

  constructor(elementType: symbol, props: ElementProps) {
    super(PdRecord.TYPE.ELEMENT);
    this.elementType = elementType;
    this.params = props.params;
  }

  public toString() {
    return [
      super.toString(),
      PdElement.serializeType(this.elementType),
    ].join(" ");
  }
}
