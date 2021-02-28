// Determine the longest visual length item to render
export default function getDisplayLength(drawText: string, inlets: any[], outlets: any[]) {
  const textLength = drawText.length * 6 + 5
  const inletLength = inlets.length * 20
  const outletLength = outlets.length * 20
  return Math.max(textLength, inletLength, outletLength)
}
