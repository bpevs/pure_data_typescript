jest.mock("..")

import parsePatch from "../parsePatch"
import text from "../__mocks__/sampleFile"

test("Should parse patch", () => {
  const patch = parsePatch(text)
  expect(patch).toBeDefined()
})
