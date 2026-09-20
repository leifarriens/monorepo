import { expect, it } from "vitest";

import { double } from "./double.js";

it("should double the number", () => {
  expect(double(4)).toBe(8);
});
