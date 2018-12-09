export const definitions: any = {
  "%": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 % inlet2,
    out: [ "control" ],
  },
  "*": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 * inlet2,
    out: [ "control" ],
  },
  "+": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 + inlet2,
    out: [ "control" ],
  },
  "-": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 - inlet2,
    out: [ "control" ],
  },
  "/": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 / inlet2,
    out: [ "control" ],
  },
  "max": {
    in: [ "control", "control" ],
    method: Math.max,
    out: [ "control" ],
  },
  "min": {
    in: [ "control", "control" ],
    method: Math.min,
    out: [ "control" ],
  },
  "mod": {
    in: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 % inlet2,
    out: [ "control" ],
  },
  "pow": {
    in: [ "control", "control" ],
    method: Math.pow,
    out: [ "control" ],
  },
}
