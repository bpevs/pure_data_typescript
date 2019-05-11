import Record from "../Record"

describe("construct from string array", () => {
  test("should parse array", () => {
    const line = "0 0 9.41753e-06 1.88351e-05 2.82228e-05 3.76403e-05 6.58631e-05"
    expect(Record.from(line)).toBeDefined()
  })

  test("should parse element", () => {
    const line = "obj 57 491 cnv 15 400 250 empty empty empty 20 12 0 14 -261682 -66577 0"
    expect(Record.from(line)).toBeDefined()
  })
})
