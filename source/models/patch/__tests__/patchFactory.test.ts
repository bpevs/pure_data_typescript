import { assertNotEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";

import { createPatch } from "../main.ts";
import text from "../__stubs__/sampleFile.ts";

Deno.test("Should parse patch", () => {
  const patch = createPatch(text);
  assertNotEquals(patch.records.length, undefined);
});
