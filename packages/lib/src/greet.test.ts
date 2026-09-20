import { expect, it } from "vitest";

import { greet } from "./greet.js";

it("should greet the person", () => {
  expect(greet("Ada")).toBe("Hello, Ada!");
});
