import * as core from "@la/core";
import { expect, it, vi } from "vitest";

import { doSomething } from "./";

vi.mock("@la/core");

const mockFn = vi.spyOn(core, "double");

it("should call double", () => {
  doSomething(4);

  expect(mockFn).toHaveBeenCalledWith(4);
});
