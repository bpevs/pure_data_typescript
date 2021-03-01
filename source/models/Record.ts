import { RECORD } from "../typeMaps.ts";

/**
 * Base class of all PD Entities
 * All records
 */
export default class Record {
  public static readonly TYPE = RECORD.types;
  public static type: symbol;
  public static serializeType = (a: symbol) => RECORD.serializeType(a);
  public static getType = (a: string) => RECORD.getType(a);
  public static isType = (type: symbol, record: any): boolean => {
    return type === Record.getType(record.recordType);
  };

  public children: Record[];
  public params: string[];
  public recordType: symbol;
  public render: (...params: any[]) => any | void = () => {}; // Renderers can be added to any record

  /**
   * Our common pattern for constructors is
   * TYPE,
   * props: Props are object properties that we know types of
   * params: are unparsed string[] line params, and are a prop
   */
  constructor(
    recordType: symbol,
    props: { params: string[] } = { params: [] },
  ) {
    this.children = [];
    this.params = props.params;
    this.recordType = recordType;
  }

  /**
   * Base Record toString.
   * We should only stringify params that we are sure that we use
   */
  public toString() {
    const type = Record.serializeType(this.recordType);
    const params = this.params.join(" ");
    return `#${type} ${params}`;
  }
}
