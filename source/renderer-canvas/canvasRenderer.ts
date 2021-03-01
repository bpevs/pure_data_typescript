import { ELEMENT } from "../typeMaps.ts";
import Record from "../models/Record.ts";
import Renderer from "../models/Renderer.ts";

import renderFloatatom from "./renderers/renderFloatatom.ts";
import renderMsg from "./renderers/renderMsg.ts";
import renderObj from "./renderers/renderObj.ts";
import renderText from "./renderers/renderText.ts";

const renderer = new Renderer();
renderer.elementRenderers.set(ELEMENT.types.FLOAT_ATOM, renderFloatatom);
renderer.elementRenderers.set(ELEMENT.types.MSG, renderMsg);
renderer.elementRenderers.set(ELEMENT.types.OBJ, renderObj);
renderer.elementRenderers.set(ELEMENT.types.TEXT, renderText);

const canvas: HTMLCanvasElement | any = document.getElementById('pd');
const context = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
const bsr = context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1;
const PIXEL_RATIO = dpr / bsr;

canvas.width = window.innerWidth * PIXEL_RATIO;
canvas.height = window.innerHeight * PIXEL_RATIO;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);

renderer.canvas = canvas;
renderer.context = context;

renderer.render = function (records: Record[], options = {}) {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  records.forEach((record: any) => {
    const renderFunc = this.elementRenderers.get(record.elementType);
    if (renderFunc) {
      console.log(record)
      renderFunc(this, record);
    }
  });
};

export default renderer;
