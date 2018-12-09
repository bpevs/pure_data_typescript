/**
 * Utilities for parsing to and from*.pd files
 * It goes to and from text files to javascript classes
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * @param text *.pd file text
 */


import { PDArray, PDCanvas, PDConnect, PDCoords, PDFloatatom, PDMsg, PDObj, PDText } from "../elements"
let prev: PDArray | null = null


export function deserializeFromFile(text: string) {
  return text
    .replace(/\r/, "")
    .split(/;\n/)
    .filter(Boolean)
    .map(line => {
      const [ chunk, element, ...params ] = line.substring(1).split(/\s+/)
      if (prev && chunk === "A") {
        // Special case; array's "element" type is included in prev line
        prev.addData([ element, ...params ])
        return
      }

      prev = null

      if (chunk === "N" && element === "canvas") {
        return new PDCanvas(params)
      }

      if (chunk === "X") {
        switch (element) {
          case "array":
            prev = new PDArray(params)
            return prev
          case "connect": return new PDConnect(params)
          case "coords": return new PDCoords(params)
          case "floatatom": return new PDFloatatom(params)
          case "msg": return new PDMsg(params)
          case "obj": return new PDObj(params)
          case "text": return new PDText(params)
          default: return { chunk, element, params }
        }
      }

      throw new Error(`invalid syntax, ${line}`)
    }).filter(Boolean)
}


export function serializeToFile(elements: any[]) {
  return elements.map(el => el.chunkType
    ? el.toString()
    : [ "#", el.chunk, el.element ].concat(el.params).join(" "),
  ).join(";\r\n") + ";\r\n"
}
