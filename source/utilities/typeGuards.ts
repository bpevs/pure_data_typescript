// Object | New Window | Array
export type chunkType = "X" | "N" | "A";

export function isChunkType(text: string): text is chunkType {
  return /[XNA]/.test(text);
}
