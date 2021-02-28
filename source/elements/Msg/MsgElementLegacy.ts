/**
 * @class PDMsg
 * @description Defines a message
 *
 * @example
 *  #X msg 61 48 read audio.wav;
 */

import { context as ctx, OBJECT_HEIGHT, wireType } from "../globals.ts";
import * as draw from "../utilities/drawHelpers.ts";

export class PDMsg {
  public readonly chunkType = "X";
  public readonly elementType = "msg";
  public readonly color = "black";
  public readonly inlets: wireType[] = ["control"];
  public readonly outlets: wireType[] = ["signal"];

  public text: string; // The content of the message
  public xPos: number; // Horizontal position within the window
  public yPos: number; // Vertical position within the window

  constructor([xPos, yPos, ...params]: string[]) {
    this.xPos = Number(xPos);
    this.yPos = Number(yPos);
    this.text = params.join(" ");
  }

  public render() {
    const displayText = this.text.replace(/\\/g, "");
    const length = draw.getDisplayLength(
      displayText,
      this.inlets,
      this.outlets,
    );

    ctx.strokeStyle = this.color;
    drawMsgOutline(this.xPos, this.yPos, length);
    draw.text(this.xPos, this.yPos, displayText);
    draw.inlets(length, this.xPos, this.yPos, this.inlets, this.outlets);
  }

  public toString() {
    return `#X msg ${this.xPos} ${this.yPos} ${this.text}`;
  }
}

// Message box has a custom shaped outline
function drawMsgOutline(xPos: number, yPos: number, length: number) {
  ctx.beginPath();
  ctx.moveTo(xPos, yPos);
  ctx.lineTo(xPos + length + 5, yPos);
  ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT / 4));
  ctx.lineTo(xPos + length, yPos + (OBJECT_HEIGHT * 3 / 4));
  ctx.lineTo(xPos + length + 5, yPos + OBJECT_HEIGHT);
  ctx.lineTo(xPos, yPos + OBJECT_HEIGHT);
  ctx.lineTo(xPos, yPos);
  ctx.stroke();
}
