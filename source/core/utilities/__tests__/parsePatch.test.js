import { assertNotEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";

import parsePatch from "../parsePatch.ts";
import text from "../__mocks__/sampleFile.ts";

Deno.test("Should parse patch", () => {
  const patch = parsePatch(text);
  assertNotEquals(patch, undefined);
});
