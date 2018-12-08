const canvas: HTMLCanvasElement | any = document.getElementById("pd")
const context = canvas.getContext("2d")
const dpr = window.devicePixelRatio || 1
const bsr = context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1
const PIXEL_RATIO = dpr / bsr
const OBJECT_HEIGHT = 18

canvas.width = window.innerWidth * PIXEL_RATIO
canvas.height = window.innerHeight * PIXEL_RATIO
canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)

export {
  canvas,
  context,
  OBJECT_HEIGHT,
}
