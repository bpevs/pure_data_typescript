const canvas: HTMLCanvasElement | any = document.getElementById("pd")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const context = canvas.getContext("2d")
const OBJECT_HEIGHT = 24

export {
  canvas,
  context,
  OBJECT_HEIGHT,
}
