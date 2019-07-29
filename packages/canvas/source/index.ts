import { Obj } from "@pure-data/elements"
import { Record, Renderer } from "@pure-data/models"
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

  public render(selector: string, records: Record[]) {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    records.forEach(record => {
      // If item has custom renderer, respect it
      if (typeof record.render.canvas === "function")
        return record.render.canvas(this, selector)

      if (record instanceof Obj)
        return renderObj(this, record)
    })
  }
}
