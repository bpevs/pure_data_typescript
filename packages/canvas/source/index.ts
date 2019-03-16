import { Obj } from "@pure-data/elements"
import { Chunk, Renderer } from "@pure-data/models"
import renderObj from "./renderers/objRenderer"

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
  public context: any = context
  public objectHeight: number = 18
  public portletHeight: number = 3
  public portletWidth: number = 8

  public render(selector: string, chunks: Chunk[]) {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    chunks.forEach(chunk => {
      if (chunk.chunkType !== Chunk.TYPE.Element) {
        return
      }

      // If item has custom renderer, respect it
      if (typeof chunk.render.canvas === "function") return chunk.render.canvas(this, selector)

      if (chunk instanceof Obj) {
        renderObj(this, chunk)
      }
    })
  }
}
