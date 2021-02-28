export default class Renderer {
  // Default UI constants are in pixels
  public context: any
  public objectHeight: number = 18
  public portletHeight: number = 3
  public portletWidth: number = 8

  public render(...args: any[]): void {
    console.log("No render method declared", this)
  }
}
