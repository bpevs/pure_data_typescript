import Canvas from "./Canvas"
import Portlet from "./Portlet"
import parsePatch from "./utils/parsePatch"

export interface Elements { [id: string]: Element }

export default class Patch {
  /**
   * Create a Patch from a *.pd file string
   * @example const patch = Patch.from("#N canvas 624 103 899 784 10;")
   * @param patchFileString The actual pd file content
   */
  public static from(patchFileString: string) {
    return parsePatch(patchFileString)
  }

  public canvas: Canvas | null
  public elements: Elements
  public inlets: Portlet[] = []
  public outlets: Portlet[] = []

  constructor(canvas: Canvas | null, elements: Elements) {
    this.canvas = canvas || null
    this.elements = elements
  }

  public getInlet(index: number) {
    return this.inlets[index].value
  }

  public getOutlet(index: number) {
    return this.outlets[index].value
  }

  public start() {
    console.log(this)
  }

  public setInlet(index: number, value: any) {
    if (this.inlets[index]) {
      this.inlets[index].value = value
    } else {
      this.inlets[index] = new Portlet(value)
    }
  }

  public setOutlet(index: number, value: any) {
    if (this.outlets[index]) {
      this.outlets[index].value = value
    } else {
      this.outlets[index] = new Portlet(value)
    }
  }
}
