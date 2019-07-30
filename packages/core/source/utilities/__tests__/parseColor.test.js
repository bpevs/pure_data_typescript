import parseColor from "../parseColor"

test("should parse color", () => {
  expect(parseColor("-262144")).toBe("rgb(128, 0, 256)")
  expect(parseColor("-1109")).toBe("rgb(0, 68, 84)")
  expect(parseColor("-233017")).toBe("rgb(224, 224, 228)")
  expect(parseColor("-66577")).toBe("rgb(64, 64, 68)")
})
