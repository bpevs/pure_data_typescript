export class PdRenderer {
  public canvas: any;
  public context: any;

  // Default UI constants are in pixels
  public objectHeight: number;
  public portletHeight: number;
  public portletWidth: number;

  public elementRenderers: Map<symbol | void, () => void> = new Map();
  public objectRenderers: Map<symbol | void, () => void> = new Map();

  constructor() {
    this.objectHeight = 18;
    this.portletHeight = 3;
    this.portletWidth = 8;
  }

  public setup(): void {
    console.log("No render method declared", this);
  }

  public render(): void {
    console.log("No render method declared", this);
  }
}
