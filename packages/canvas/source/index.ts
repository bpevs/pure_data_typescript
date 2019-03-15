import { Chunk, Element, Renderer } from "@pure-data/models"
import renderObj from "./renderers/objRenderer"
const { TYPE } = Element

// Canvas Setup
const canvas: HTMLCanvasElement | any = document.getElementById("pd")
const context = canvas.getContext("2d")
const dpr = window.devicePixelRatio || 1
const bsr = context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1
const PIXEL_RATIO = dpr / bsr

canvas.width = window.innerWidth * PIXEL_RATIO
canvas.height = window.innerHeight * PIXEL_RATIO
canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)

context.lineWidth = "1"
context.fillStyle = "black"
context.font = "10pt monaco"
context.fillText("Drop file to start", window.innerWidth / 2.2, window.innerHeight / 2.8)

export class CanvasRenderer extends Renderer {
  public context = context

  public render(selector: string, chunks: Chunk[]) {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    chunks.forEach(item => {
      if (item.chunkType !== Chunk.TYPE.Element) {
        return
      }

      // If item has custom renderer, respect it
      if (item.render.canvas) return item.render.canvas(this, selector)

      switch (item.elementType) {
        case TYPE.OBJ:
        default: renderObj(this, item)
      }
    })
  }
}
