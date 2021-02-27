/**
 * Utilities for parsing to and from*.pd files
 * It goes to and from text files to javascript classes
 * Based on unoffiicial spec: http://puredata.info/docs/developer/PdFileFormat
 * @param text *.pd file text
 */


import { PDArray } from "../elements/PDArray.ts";
import { PDCanvas } from "../elements/PDCanvas.ts";
import { PDConnect } from "../elements/PDConnect.ts";
import { PDCoords } from "../elements/PDCoords.ts";
import { PDFloatatom } from "../elements/PDFloatatom.ts";
import { PDMsg } from "../elements/PDMsg.ts";
import { PDObj } from "../elements/PDObj.ts";
import { PDText } from "../elements/PDText.ts";

import { objects } from "../objects/objects.ts"
let prev: PDArray | null = null
let subPatchName: string | null = null


export function deserializeFromFile(text: string) {
  return text
    .split(/;\r?\n/)
    .filter(Boolean)
    .map(line => {
      const [ chunk, element, ...params ] = line.substring(1).split(/\s+/)

      // Ignore subPatches for now
      if (subPatchName) {
        const endsGraph = subPatchName === "(subpatch)" && params[2] === "graph"
        const endsSubPatch = element === "restore" && subPatchName === params[3]
        if (!endsGraph && !endsSubPatch) return
        subPatchName = null
      }

      if (prev && chunk === "A") {
        // Special case; array's "element" type is included in prev line
        prev.addData([ element, ...params ])
        return
      }

      prev = null

      if (chunk === "N" && element === "canvas") {
        const canvas = new PDCanvas(params)
        if (canvas.isSubPatch) subPatchName = canvas.name
        return canvas
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
          case "text": return new PDText(params)
          case "obj": {
            const objectType = params[2]
            if (objects[objectType]) return new objects[objectType](params)
            else return new PDObj(params)
          }
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
