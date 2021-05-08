import { OBJECT } from "../../typeMaps.ts";
import { PdChunk } from "../chunk/main.ts";
import { PdElement } from "../element/main.ts";

export interface ObjectProps {
  children: PdChunk[];
  name: string;
  params: string[];
  xPos: number;
  yPos: number;
}

/**
 * Objects are Elements that contain functionality,
 * gui-related or not.
 * @ref http://puredata.info/docs/developer/PdFileFormat#r36
 * @example #X obj 132 72 trigger bang float;
 */
export class PdObject extends PdElement {
  public static readonly TYPE = OBJECT.types;
  public static readonly type = PdElement.TYPE.OBJECT;
  public static serializeType = (a: symbol) => OBJECT.serializeType(a);
  public static getType = (a: string) => OBJECT.getType(a);

  public color = "black";
  public inlets: symbol[] = [];
  public length: number = 0;
  public name: string;
  public objectType: symbol;
  public outlets: symbol[] = [];
  public xPos: number;
  public yPos: number;

  constructor(objectType: symbol, props: ObjectProps) {
    super(PdElement.TYPE.OBJECT, props);
    this.objectType = objectType;
    this.params = props.params;
    this.name = props.name;
    this.xPos = props.xPos;
    this.yPos = props.yPos;
  }

  public toString() {
    return [
      super.toString(),
      this.xPos,
      this.yPos,
      PdObject.serializeType(this.objectType),
    ].join(" ");
  }
}
