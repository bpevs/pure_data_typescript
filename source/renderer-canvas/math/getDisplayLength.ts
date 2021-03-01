// Determine the longest visual length item to render
export default function getDisplayLength(
  drawLabel: string,
  inlets: any[],
  outlets: any[],
) {
  const textLength = drawLabel.length * 6 + 5;
  const inletLength = inlets.length * 20;
  const outletLength = outlets.length * 20;
  return Math.max(textLength, inletLength, outletLength);
}
