import Renderer from "../../models/Renderer.ts";
import Connect from "../../elements/Connect/ConnectElement.ts";

export default function drawPortlets(
  renderer: Renderer,
  length: number,
  xPos: number,
  yPos: number,
  inlets: symbol[],
  outlets: symbol[],
) {
  const { context, objectHeight, portletHeight, portletWidth } = renderer;
  const inletY = yPos;
  const outletY = yPos + objectHeight - portletHeight;
  const actualLength = Math.max(length, 20) - portletWidth;
  const inletDistance = actualLength / Math.max(1, inlets.length - 2);
  const outletDistance = actualLength / Math.max(1, outlets.length - 2);

  inlets.forEach((type: symbol, index: number) => {
    const nextInletLocation = xPos + index * inletDistance;
    if (type === Connect.TYPE.SIGNAL) {
      context.fillRect(nextInletLocation, inletY, portletWidth, portletHeight);
    } else {
      context.strokeRect(
        nextInletLocation,
        inletY,
        portletWidth,
        portletHeight,
      );
    }
  });

  outlets.forEach((type: symbol, index: number) => {
    const nextOutletLocation = xPos + index * outletDistance;
    if (type === Connect.TYPE.SIGNAL) {
      context.fillRect(
        nextOutletLocation,
        outletY,
        portletWidth,
        portletHeight,
      );
    } else {
      context.strokeRect(
        nextOutletLocation,
        outletY,
        portletWidth,
        portletHeight,
      );
    }
  });
}
