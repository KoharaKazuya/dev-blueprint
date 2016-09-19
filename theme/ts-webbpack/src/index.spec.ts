import "mocha";
import * as assert from "power-assert";

import * as index from "./index";

describe("test", () => {
  it("should be ok", () => {
    const a = 1;
    const b = 2;
    assert(a === b);
  });

  it("should be the same", () => {
    const prev = "prev";
    const tran = index.id(prev);
    assert(tran === prev);
  });
});
