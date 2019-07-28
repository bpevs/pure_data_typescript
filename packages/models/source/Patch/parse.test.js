jest.mock("..")

import parsePatch from "./parse"
import text from "./__mocks__/sampleFile"

test("Should parse patch", () => {
  const patch = parsePatch(text)
  expect(patch).toBeDefined()
})
