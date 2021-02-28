import parsePatch from "../utilities/parsePatch.ts"
import Canvas from "./Canvas.ts"
import Portlet from "./Portlet.ts"
import Record from "./Record.ts"
import Renderer from "./Renderer.ts"

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
  private readonly records: Record[] = []
  private readonly inlets: Portlet[] = []
  private readonly outlets: Portlet[] = []
  private renderer: Renderer

  // State variables that are expected to change during patch use
  private state = {
    dspEnabled: false,
    editMode: false,
  }

  constructor({ canvas, records, ...options }: any = {}) {
    this.canvas = options.canvas
    this.records = options.records
    this.renderer = options.renderer
    this.state = { ...this.state, ...options }
  }

  // Render patch to
  public render(selector: string) {
    this.renderer.render(selector, this.records)
  }

  /**
   * Set a static value for an inlet. Good for basic uses.
   * @example patch.setInlet(1, 100)
   * @param index index of the inlet
   * @param value a value to pass to the patch
   */
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

  public setRenderer(renderer: Renderer) {
    this.renderer = renderer
  }

  // Change patch environment settings.
  // Will expose helpers in the future. Turn on DSP, edit mode.
  public setState(options = {}) {
    this.state = { ...this.state, ...options }
  }

  public start() {
    console.log(this)
  }

  /**
   * Stream data to an inlet. Audio stream or observable.
   * @example patch.streamInlet(0, audioInput)
   * @param index index of the inlet
   * @param source Source of the stream
   */
  public streamInlet(index: number, source: any) {
    this.inlets[index] = source
  }

  public streamOutlet(index: number, target: any) {
    this.outlets[index] = target
  }

  /**
   * Write a patch to a string. This doesn't actually do too much, since it
   * depends on records having toString methods of their own.
   */
  public toString() {
    return this.records
      .map(record => record.toString())
      .join(";\r\n") + ";\r\n"
  }
}
