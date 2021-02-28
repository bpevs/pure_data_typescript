import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";

import parseColor from "../parseColor.ts";

Deno.test("should parse color", () => {
  assertEquals(parseColor("-262144"), "rgb(128, 0, 256)");
  assertEquals(parseColor("-1109"), "rgb(0, 68, 84)");
  assertEquals(parseColor("-233017"), "rgb(224, 224, 228)");
  assertEquals(parseColor("-66577"), "rgb(64, 64, 68)");
});
