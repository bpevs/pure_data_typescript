import TypeMap from "./utilities/TypeMap.ts";

// UI CONSTANTS
export const OBJECT_HEIGHT = 18;
export const PORTLET_HEIGHT = 3;
export const PORTLET_WIDTH = 8;

// Types
export type wireType = "control" | "signal";

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
