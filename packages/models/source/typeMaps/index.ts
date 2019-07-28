import createTypeMaps from "./createTypeMaps"

export const ELEMENT_TYPES = createTypeMaps({
  CONNECT: "connect",
  OBJECT: "object",
  UNKNOWN: "unknown",
})

export const RECORD_TYPES = createTypeMaps({
  ARRAY: "A",
  ELEMENT: "X",
  NEW_WINDOW: "N",
})

export const OBJECT_TYPES = createTypeMaps({
  BUTTON: "button",
  UNKNOWN: "unknown",
})
