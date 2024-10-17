import * as internals from "@la/internal";
import { expect, it, vi } from "vitest";

import { doSomething } from "./";

vi.mock("@la/internal");

const mockFn = vi.spyOn(internals, "double");

it("should call double", () => {
  doSomething(4);

  expect(mockFn).toHaveBeenCalledWith(4);
});
