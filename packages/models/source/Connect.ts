import Element from "./Element"

const CONTROL = Symbol("CONTROL")
const SIGNAL = Symbol("SIGNAL")

/**
 * @syntax #X connect [source]? [outlet]? [target]? [inlet]?;\r\n
 * @ref http://puredata.info/docs/developer/PdFileFormat#r32
 */
export default class Connect {
  public static TYPE = { CONTROL, SIGNAL }

  public element = new Element({ type: Element.TYPE.CONNECT })
}
