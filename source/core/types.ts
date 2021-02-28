import TypeMap from "./utilities/TypeMap.ts";

export const ELEMENT = new TypeMap({
  COORDS: "coords",
  CONNECT: "connect",
  OBJECT: "object",
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
