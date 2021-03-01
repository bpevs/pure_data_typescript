export default class Renderer {
  public canvas: any;
  public context: any;

  // Default UI constants are in pixels
  public objectHeight: number = 18;
  public portletHeight: number = 3;
  public portletWidth: number = 8;

  public elementRenderers: Map<symbol | void, (...args: any[]) => any> =
    new Map();
  public objectRenderers: Map<symbol | void, (...args: any[]) => any> =
    new Map();

  public setup(...args: any[]): void {
    console.log("No render method declared", this);
  }

  public render(...args: any[]): void {
    console.log("No render method declared", this);
  }
}
