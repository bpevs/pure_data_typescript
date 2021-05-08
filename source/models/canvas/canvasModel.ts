import { PdRecord } from "../record/main.ts";

export interface CanvasProps {
  xPos: number;
  xSize: number;
  yPos: number;
  ySize: number;
  fontSize?: number;
  name?: string;
  params?: string[];
  openOnLoad?: boolean;
}

/**
 * Defines window properties
 * @ref http://puredata.info/docs/developer/PdFileFormat#r21
 * @example #N canvas 0 0 452 302 12;
 */
export class PdCanvas extends PdRecord {
  public xPos: number;
  public xSize: number;
  public yPos: number;
  public ySize: number;

  public fontSize?: number;
  public name?: string;
  public openOnLoad?: boolean;

  public children: PdRecord[] = [];
  public params: string[];
  public recordType: symbol;
  public render: (...params: any[]) => any | void = () => {};

  constructor(props: CanvasProps) {
    super(PdRecord.TYPE.NEW_WINDOW);
    this.fontSize = props.fontSize;
    this.name = props.name;
    this.openOnLoad = props.openOnLoad;
    this.xPos = props.xPos;
    this.xSize = props.xSize;
    this.yPos = props.yPos;
    this.ySize = props.ySize;
  }

  public addChild(key: string, record: PdRecord) {
    this.children.push(record);
  }

  public toString() {
    const record = super.toString();
    const props: any[] = [record, this.xPos, this.yPos, this.xSize, this.ySize];
    const additionalProps = this.fontSize == null
      ? [this.name, this.openOnLoad]
      : [this.fontSize];

    return props.concat(additionalProps).join(" ");
  }
}
