import * as core from "@la/core";
import * as lib from "@la/lib";
import { expect, it, vi } from "vitest";

import { doSomething } from "./task";

vi.mock("@la/core");
vi.mock("@la/lib");

const mockDouble = vi.spyOn(core, "double");
const mockGreet = vi.spyOn(lib, "greet");

it("should call double", () => {
  doSomething(4);

  expect(mockDouble).toHaveBeenCalledWith(4);
});

it("should call greet", () => {
  mockGreet("Ada");

  expect(mockGreet).toHaveBeenCalledWith("Ada");
});
