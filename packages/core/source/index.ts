import { Chunk, Renderer } from "@pure-data/models"
import canvasRenderer from "@pure-data/canvas"
import { parsePatch } from "./parsePatch/parsePatch";

type Streamable =

export class Patch {
  private chunks: Chunk[] = []
  private inlets: any[] = []
  private outlets: any[] = []
  private renderer = canvasRenderer

  // State variables that are expected to change during patch use
  private state = {
    editMode: false,
    dspEnabled: false,
  }

  constructor(options={}) {
    this.state = Object.assign(this.state, options)
  }

  // Render patch to
  render(selector: string) {
    this.renderer(selector, this.chunks)
  }

  /**
   * Set a static value for an inlet. Good for basic uses.
   * @example patch.setInlet(1, 100)
   * @param index index of the inlet
   * @param value a value to pass to the patch
   */
  setInlet(index: number, value: any) {}

  setOutlet() {}

  setRenderer(renderer: Renderer) {
    this.renderer = renderer
  }

  // Change patch environment settings.
  // Will expose helpers in the future. Turn on DSP, edit mode.
  setState(options={}) {
    this.state = Object.assign(this.state, options)
  }

  /**
   * Stream data to an inlet. Audio stream or observable.
   * @example patch.streamInlet(0, audioInput)
   * @param index index of the inlet
   * @param source Source of the stream
   */
  streamInlet(index: number, source: any) {}
  streamOutlet(index: number, target: any) {}

  /**
   * Write a patch to a string. This doesn't actually do too much, since it
   * depends on chunks having toString methods of their own.
   */
  toString() {
    return this.chunks
      .map(chunk => chunk.toString())
      .join(";\r\n") + ";\r\n"
  }

  /**
   * @example const patch = Patch.from("#N canvas 624 103 899 784 10;")
   * @param patchFileString The actual pd file content
   */
  static from(patchFileString: string) {
    this.chunks = parsePatch(patchFileString);
  }
}
