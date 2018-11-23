const { add } = require("../dist/main");

test("main", () => {
  expect(add(1, 2)).toBe(3);
});
