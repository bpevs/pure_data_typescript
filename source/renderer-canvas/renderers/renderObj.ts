import Renderer from "../../models/Renderer.ts";
import Obj from "../../elements/obj/ObjElement.ts";
import drawLabel from "../draw/drawLabel.ts";
import drawPortlets from "../draw/drawPortlets.ts";
import drawRectOutline from "../draw/drawRectOutline.ts";
import getDisplayLength from "../math/getDisplayLength.ts";

export default function renderObj(renderer: Renderer, el: Obj) {
  const { context } = renderer;
  const displayText = el.name.replace(/\\/g, "");
  const length = getDisplayLength(displayText, el.inlets, el.outlets);

  context.strokeStyle = el.color;
  drawRectOutline(renderer, el.xPos, el.yPos, length);
  drawLabel(renderer, el.xPos, el.yPos, displayText);
  drawPortlets(renderer, el.length, el.xPos, el.yPos, el.inlets, el.outlets);
}
