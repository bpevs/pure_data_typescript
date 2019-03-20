jest.mock("../parseChunk")

import { parsePatch } from "../parsePatch"
import { parseArrayChunk, parseCanvasChunk, parseElementChunk, parseUnknownChunk } from "../parseChunk"
import text from "../__mocks__/samplePatch"

test("Should parse patch", () => {
  const patch = parsePatch(text)
  expect(patch).toBeDefined()
  expect(parseArrayChunk).toBeCalledTimes(6)
  expect(parseCanvasChunk).toBeCalledTimes(5)
  expect(parseElementChunk).toBeCalledTimes(181)
  expect(parseUnknownChunk).toBeCalledTimes(0)
})
