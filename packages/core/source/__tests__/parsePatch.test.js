jest.mock("@pure-data/models")

import { Array, Canvas, Chunk, Element } from "@pure-data/models"
import { parsePatch } from "../parsePatch"
import text from "../__mocks__/samplePatch"

test("Should parse patch", () => {
  const patch = parsePatch(text)
  expect(patch).toBeDefined()
  expect(Chunk.stringToChunkType).toBeCalledTimes(192)
})
