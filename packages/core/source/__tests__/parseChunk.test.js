import { parseArrayChunk, parseCanvasChunk, parseElementChunk } from "../parseChunk"

describe("parseArrayChunk", () => {
  test("should parse", () => {
    const chunk = "0 0 9.41753e-06 1.88351e-05 2.82228e-05 3.76403e-05 6.58631e-05".split(" ")
    expect(parseArrayChunk(chunk)).toBeDefined()
  })
})

describe("parseCanvasChunk", () => {
  test("should parse", () => {
    const chunk = "obj 57 491 cnv 15 400 250 empty empty empty 20 12 0 14 -261682 -66577 0".split(" ")
    expect(parseCanvasChunk(chunk)).toBeDefined()
  })
})

describe("parseElementChunk", () => {
  test("should parse", () => {
    const chunk = "obj 465 491 cnv 15 400 250 empty empty README 20 12 0 20 -261234 -66577 0".split(" ")
    expect(parseElementChunk(chunk)).toBeDefined()
  })
})
