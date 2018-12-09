export const generics: any = {
  "%": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 % inlet2,
    outlets: [ "control" ],
  },

  "*": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 * inlet2,
    outlets: [ "control" ],
  },

  "+": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 + inlet2,
    outlets: [ "control" ],
  },

  "-": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 - inlet2,
    outlets: [ "control" ],
  },

  "/": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 / inlet2,
    outlets: [ "control" ],
  },

  "max": {
    inlets: [ "control", "control" ],
    method: Math.max,
    outlets: [ "control" ],
  },

  "min": {
    inlets: [ "control", "control" ],
    method: Math.min,
    outlets: [ "control" ],
  },

  "mod": {
    inlets: [ "control", "control" ],
    method: ([ inlet1, inlet2 ]: any[]) => inlet1 % inlet2,
    outlets: [ "control" ],
  },

  "pow": {
    inlets: [ "control", "control" ],
    method: Math.pow,
    outlets: [ "control" ],
  },
}
