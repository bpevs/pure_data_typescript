/**
 * Utilities for parsing to and from*.pd files
 * It goes to and from text files to javascript classes
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * @param text *.pd file text
 */


import { PDConnect, PDCoords, PDMsg } from "../elements/index.js"
import { isChunkType } from "./typeGuards.js"


export function deserializeFromFile(text: string) {
  return text
    .replace(/\r/, "")
    .split(/;\n/)
    .filter(Boolean)
    .map(line => {
      const [ chunk, element, ...params ] = line.substring(1).split(/\s+/)
      if (isChunkType(chunk)) {
        switch (element) {
          case "msg": return new PDMsg(params)
          case "connect": return new PDConnect(params)
          case "coords": return new PDCoords(params)
          default: return { chunk, element, params }
        }
      }

      throw new Error("invalid syntax")
    })
}


export function serializeToFile(elements: any[]) {
  return elements.map(el => el.chunkType
    ? el.toString()
    : [ "#", el.chunk, el.element ].concat(el.params).join(" "),
  ).join(";\r\n") + ";\r\n"
}
