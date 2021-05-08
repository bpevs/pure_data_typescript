import { PdCanvas } from "../canvas/main.ts";
import { PdPortlet } from "../portlet/main.ts";
import { PdRecord } from "../record/main.ts";
import { PdRenderer } from "../renderer/main.ts";

interface PatchProps {
  canvas?: PdCanvas | null;
  inlets?: PdPortlet[];
  outlet?: PdPortlet[];
  records?: PdRecord[];
  renderer?: PdRenderer | null;
}

const DefaultPatchProps = Object.freeze({
  canvas: null,
  inlets: [],
  outlets: [],
  records: [],
  renderer: null,
});

export class PdPatch {
  private readonly inlets: PdPortlet[] = [];
  private readonly outlets: PdPortlet[] = [];
  private readonly records: PdRecord[] = [];
  private renderer: PdRenderer = new PdRenderer();

  // State variables that are expected to change during patch use
  private state = {
    dspEnabled: false,
    editMode: false,
  };

  constructor(
    { records, renderer, ...options }: PatchProps = DefaultPatchProps,
  ) {
    if (records) this.records = records;
    if (renderer) this.renderer = renderer;
    this.state = { ...this.state, ...options };
  }

  // Render patch to
  public render(options: any) {
    return this.renderer.render(this.records, options);
  }

  /**
   * Set a static value for an inlet. Good for basic uses.
   * @example patch.setInlet(1, 100)
   * @param index index of the inlet
   * @param value a value to pass to the patch
   */
  public setInlet(index: number, value: any) {
    if (this.inlets[index]) {
      this.inlets[index].value = value;
    } else {
      this.inlets[index] = new PdPortlet(value);
    }
  }

  public setOutlet(index: number, value: any) {
    if (this.outlets[index]) {
      this.outlets[index].value = value;
    } else {
      this.outlets[index] = new PdPortlet(value);
    }
  }

  public setRenderer(renderer: PdRenderer) {
    this.renderer = renderer;
  }

  // Change patch environment settings.
  // Will expose helpers in the future. Turn on DSP, edit mode.
  public setState(options = {}) {
    this.state = { ...this.state, ...options };
  }

  public start() {
    console.log(this);
  }

  /**
   * Stream data to an inlet. Audio stream or observable.
   * @example patch.streamInlet(0, audioInput)
   * @param index index of the inlet
   * @param source Source of the stream
   */
  public streamInlet(index: number, source: any) {
    this.inlets[index] = source;
  }

  public streamOutlet(index: number, target: any) {
    this.outlets[index] = target;
  }

  /**
   * Write a patch to a string. This doesn't actually do too much, since it
   * depends on records having toString methods of their own.
   */
  public toString() {
    return this.records
      .map((record) => record.toString())
      .join(";\r\n") + ";\r\n";
  }
}
