import { it, expect, vi } from "vitest";
import { doSomething } from "./";
import * as internals from "@la/internal";

vi.mock("@la/internal");

const mockFn = vi.spyOn(internals, "double");

it("should call double", () => {
  doSomething(4);

  expect(mockFn).toHaveBeenCalledWith(4);
});
