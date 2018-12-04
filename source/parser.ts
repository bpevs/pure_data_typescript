/**
 *  Parses *.pd files
 *  Based on Unnoficial Spec: http://puredata.info/docs/developer/PdFileFormat
 */

import { PDConnect } from "./elements/PDConnect.js"
import { PDCoords } from "./elements/PDCoords.js"
import { PDMsg } from "./elements/PDMsg.js"


/**
 * X: Object
 * N: New Window
 * A: Array
 */
type chunkType = "X" | "N" | "A"
function isChunkType(text: string): text is chunkType {
  return /[XNA]/.test(text)
}

export function parse(text: string) {
  return text
    .replace(/\r/, "")
    .split(/;\n/)
    .filter(Boolean)
    .map(line => {
      const [ chunk, element, ...params ] = line.substring(1).split(/\s+/)
      if (isChunkType(chunk)) {
        return createEntity(chunk, element, params)
      } else {
        throw new Error("invalid syntax")
      }
    })
}

function createEntity(
  chunk: chunkType,
  element: string,
  params: string[],
): object {
  const paramObj = { chunk, element, params }

  switch (element) {
    case "msg": return new PDMsg(params)
    case "connect": return new PDConnect(params)
    case "coords": return new PDCoords(params)
    default: return paramObj
  }
}
