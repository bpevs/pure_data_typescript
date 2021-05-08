export type inlets = string[];
export type outlets = string[];
export type method = (...args: any[]) => any | void;
export type genericDescriptor = [inlets, outlets, method];
const ctrl = "control";

export const generics: any = {
  "%": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a % b],
  "*": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a * b],
  "+": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a + b],
  "-": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a - b],
  "/": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a / b],
  "abs": [[ctrl], [ctrl], Math.abs],
  "atan": [[ctrl], [ctrl], Math.atan],
  "atan2": [[ctrl, ctrl], [ctrl], Math.atan2],
  "cos": [[ctrl], [ctrl], Math.cos],
  "dbtopow": [
    [ctrl],
    [ctrl],
    (a: number) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 10),
  ],
  "dbtorms": [
    [ctrl],
    [ctrl],
    (a: number) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 20),
  ],
  "del": [[ctrl, ctrl], [ctrl], () => {
    return;
  }],
  "delay": [[ctrl, ctrl], [ctrl], () => {
    return;
  }],
  "exp": [[ctrl], [ctrl], Math.exp],
  "ftom": [[ctrl], [ctrl], () => {
    return;
  }],
  "inlet": [[], [ctrl], () => {
    return;
  }],
  "key": [[], [ctrl], () => {
    return;
  }],
  "keyup": [[], [ctrl], () => {
    return;
  }],
  "loadbang": [[], [ctrl], () => {
    return;
  }],
  "log": [[ctrl], [ctrl], Math.log],
  "max": [[ctrl, ctrl], [ctrl], Math.max],
  "metro": [[ctrl], [ctrl], () => {
    return;
  }],
  "min": [[ctrl, ctrl], [ctrl], Math.min],
  "mod": [[ctrl, ctrl], [ctrl], ([a, b]: any[]) => a % b],
  "mtof": [[ctrl], [ctrl], () => {
    return;
  }],
  "outlet": [[ctrl], [], () => {
    return;
  }],
  "pow": [[ctrl, ctrl], [ctrl], Math.pow],
  "powtodb": [
    [ctrl],
    [ctrl],
    (a: number) => a <= 0 ? 0 : 10 * Math.log(a) / Math.LN10 + 100,
  ],
  "print": [[ctrl], [], (...args: any[]) => {
    console.log(args);
  }],
  "r": [[ctrl], [], () => {
    return;
  }],
  "receive": [[ctrl], [], () => {
    return;
  }],
  "rmstodb": [
    [ctrl],
    [ctrl],
    (a: number) => a <= 0 ? 0 : 20 * Math.log(a) / Math.LN10 + 100,
  ],
  "s": [[ctrl], [], () => {
    return;
  }],
  "send": [[ctrl], [], () => {
    return;
  }],
  "sin": [[ctrl], [ctrl], Math.sin],
  "spigot": [[ctrl, ctrl], [ctrl]],
  "sqrt": [[ctrl], [ctrl], Math.sqrt],
  "tan": [[ctrl], [ctrl], Math.tan],
  "wrap": [[ctrl], [], (a: number) => a - Math.floor(a)],
};
