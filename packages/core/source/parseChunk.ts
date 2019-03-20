export function parseArrayChunk(args: any) {
  return args.map(Number)
}

export function parseCanvasChunk(arg: any) {
  return arg
}

export function parseElementChunk(args: any) {
  return args
}

export function parseUnknownChunk(arg: any) {
  return arg
}
