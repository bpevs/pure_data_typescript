import Element from "../Element"

test("constructed from string", () => {
  const element = "obj 465 491 cnv 15 400 250 empty empty README 20 12 0 20 -261234 -66577 0".split(" ")
  expect(Element.from(element)).toBeDefined()
})
