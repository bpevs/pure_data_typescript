import Renderer from "@pure-data/models"
import canvasRenderer from "@pure-data/canvas"
import { parsePatch } from "./parsePatch/parsePatch";

export class Patch {
  private chunks = []
  private inlets = []
  private outlets = []
  private renderer = canvasRenderer

  constructor() {
  }

  render(elementSelector: string) {

  }

  /**
   * Set a static value for an inlet. Good for basic uses.
   * @example patch.setInlet(1, 100)
   * @param index index of the inlet
   * @param value a value to pass to the patch
   */
  setInlet(index: number, value: any) {

  }

  setOutlet() {}

  setRenderer(renderer: Renderer) {
    this.renderer = renderer
  }

  /**
   * Turn on DSP. By default, outlet is your system's default output
   */
  start() {}

  /**
   * Stream data to an inlet. Audio stream or observable.
   * @example patch.streamInlet(0, audioInput)
   * @param index index of the inlet
   * @param source Source of the stream
   */
  streamInlet(index: number, source: any) {}
  streamOutlet() {}

  toString() {
    return this.chunks.map(chunk => chunk.chunkType
      ? chunk.toString()
      : [ "#", chunk.chunk, chunk.element ].concat(chunk.params).join(" "),
    ).join(";\r\n") + ";\r\n"
  }

  /**
   * @example const patch = Patch.from("#N canvas 624 103 899 784 10;")
   * @param patchFileString The actual pd file content
   */
  static from(patchFileString: string) {
    this.chunks = parsePatch(patchFileString);
  }
}
