import { OBJECT } from "../types.ts";
import Chunk from "./Chunk.ts";
import Element from "./Element.ts";

export interface ObjectProps {
  children: Chunk[];
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
export default class PDObject extends Element {
  public static readonly TYPE = OBJECT.types;
  public static readonly type = Element.TYPE.OBJECT;
  public static serializeType = (a: symbol) => OBJECT.serializeType(a);
  public static getType = (a: string) => OBJECT.getType(a);

  public static from = ({ children, objectType, params }: Chunk) => {
    if (!objectType) throw new Error("Object type required");
    const [xPos, yPos, name = "", ...other] = params;

    return new PDObject(objectType, {
      children,
      name,
      params: other,
      xPos: Number(xPos),
      yPos: Number(yPos),
    });
  };

  public color = "black";
  public inlets: symbol[] = [];
  public length: number = 0;
  public name: string;
  public objectType: symbol;
  public outlets: symbol[] = [];
  public xPos: number;
  public yPos: number;

  constructor(objectType: symbol, props: ObjectProps) {
    super(Element.TYPE.OBJECT, props);
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
      PDObject.serializeType(this.objectType),
    ].join(" ");
  }
}
