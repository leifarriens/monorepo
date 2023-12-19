import { it, expect } from "vitest";
import { double } from "./";

it("should double the number", () => {
  expect(double(4)).toBe(8);
});
