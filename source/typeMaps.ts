import TypeMap from "./utilities/TypeMap.ts";

export const ELEMENT = new TypeMap({
  ARRAY: "array",
  CANVAS: "canvas",
  COORDS: "coords",
  CONNECT: "connect",
  FLOAT_ATOM: "floatatom",
  MSG: "msg",
  OBJ: "obj",
  RESTORE: "restore",
  SYMBOL_ATOM: "symbolatom",
  TEXT: "text",
  UNKNOWN: "unknown",
});

export const RECORD = new TypeMap({
  ARRAY: "A",
  ELEMENT: "X",
  NEW_WINDOW: "N",
});

export const OBJECT = new TypeMap({
  BUTTON: "button",
  OBJ: "obj",
  UNKNOWN: "unknown",
});
