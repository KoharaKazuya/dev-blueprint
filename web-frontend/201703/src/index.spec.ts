import "jasmine";

import * as index from "./index";

describe("test", () => {
  it("should be ok", () => {
    const a = index.id(1);
    const b = index.id(2);
    expect(a).toBe(1);
    expect(b).toBe(2);
  });

  it("should be the same", () => {
    const prev = "prev";
    const tran = index.id(prev);
    expect(tran).toBe(prev);
  });
});
