jest.mock("@pure-data/models", () => ({ Chunk: { from: jest.fn() } }))

import { Chunk } from "@pure-data/models"
import { parsePatch } from "../parsePatch"
import text from "../__mocks__/samplePatch"

test("Should parse patch", () => {
  const patch = parsePatch(text)
  expect(patch).toBeDefined()
  expect(Chunk.from).toBeCalledTimes(192)
})
