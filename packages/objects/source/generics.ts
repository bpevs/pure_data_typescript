import { Connect } from "@pure-data/core"
import { Obj } from "@pure-data/elements"

const { CONTROL: ctrl } = Connect.TYPE
const noop = () => { return }

type genericDefinition = [string, symbol[], symbol[], (...args: any[]) => any | void]
const definitions = [
  ["%", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a % b],
  ["*", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a * b],
  ["+", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a + b],
  ["-", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a - b],
  ["/", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a / b],
  ["abs", [ctrl], [ctrl], Math.abs],
  ["atan", [ctrl], [ctrl], Math.atan],
  ["atan2", [ctrl, ctrl], [ctrl], Math.atan2],
  ["cos", [ctrl], [ctrl], Math.cos],
  ["dbtopow", [ctrl], [ctrl], (a: number) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 10)],
  ["dbtorms", [ctrl], [ctrl], (a: number) => a <= 0 ? 0 : Math.exp(Math.LN10 * (a - 100) / 20)],
  ["del", [ctrl, ctrl], [ctrl], noop],
  ["delay", [ctrl, ctrl], [ctrl], noop],
  ["exp", [ctrl], [ctrl], Math.exp],
  ["ftom", [ctrl], [ctrl], noop],
  ["inlet", [], [ctrl], noop],
  ["key", [], [ctrl], noop],
  ["keyup", [], [ctrl], noop],
  ["loadbang", [], [ctrl], noop],
  ["log", [ctrl], [ctrl], Math.log],
  ["max", [ctrl, ctrl], [ctrl], Math.max],
  ["metro", [ctrl], [ctrl], noop],
  ["min", [ctrl, ctrl], [ctrl], Math.min],
  ["mod", [ctrl, ctrl], [ctrl], ([a, b]: any[]) => a % b],
  ["mtof", [ctrl], [ctrl], noop],
  ["outlet", [ctrl], [], noop],
  ["pow", [ctrl, ctrl], [ctrl], Math.pow],
  ["powtodb", [ctrl], [ctrl], (a: number) => a <= 0 ? 0 : 10 * Math.log(a) / Math.LN10 + 100],
  ["print", [ctrl], [], (...args: any[]) => { console.log(args) }],
  ["r", [ctrl], [], noop],
  ["receive", [ctrl], [], noop],
  ["rmstodb", [ctrl], [ctrl], (a: number) => a <= 0 ? 0 : 20 * Math.log(a) / Math.LN10 + 100],
  ["s", [ctrl], [], noop],
  ["send", [ctrl], [], noop],
  ["sin", [ctrl], [ctrl], Math.sin],
  ["spigot", [ctrl, ctrl], [ctrl], noop],
  ["sqrt", [ctrl], [ctrl], Math.sqrt],
  ["tan", [ctrl], [ctrl], Math.tan],
  ["wrap", [ctrl], [], (a: number) => a - Math.floor(a)],
]

const generics = definitions.reduce((
  generics: { [name: string]: Obj },
  [name, inlets, outlets, behavior]: genericDefinition,
) => {
  return {
    ...generics,
    [name]: Obj.from({ inlets, outlets, behavior }),
  }
}, {})

export default generics
