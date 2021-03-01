export class PDCanvas {
  public readonly chunkType = "N";
  public readonly elementType = "canvas";
  public readonly isSubPatch: boolean;

  public name: null | string;
  public openOnLoad: boolean;
  public xPos: number;
  public xSize: number;
  public yPos: number;
  public ySize: number;

  constructor([xPos, yPos, xSize, ySize, name, openOnLoad]: string[]) {
    this.isSubPatch = isNaN(parseInt(name, 10));
    this.name = this.isSubPatch ? name : null;
    this.xPos = Number(xPos);
    this.yPos = Number(yPos);
    this.xSize = Number(xSize);
    this.ySize = Number(ySize);
    this.openOnLoad = Boolean(openOnLoad);
  }

  public toString() {
    return `#N canvas ${this.xPos} ${this.yPos} ${this.xSize} ${this.ySize} ${this.name} ${this.openOnLoad}`;
  }
}
