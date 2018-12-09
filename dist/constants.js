var canvas = document.getElementById("pd");
var context = canvas.getContext("2d");
var dpr = window.devicePixelRatio || 1;
var bsr = context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
var PIXEL_RATIO = dpr / bsr;
var OBJECT_HEIGHT = 18;
canvas.width = window.innerWidth * PIXEL_RATIO;
canvas.height = window.innerHeight * PIXEL_RATIO;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
export { canvas, context, OBJECT_HEIGHT, };
//# sourceMappingURL=constants.js.map