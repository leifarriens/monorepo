import { double } from "@la/core";
import { greet } from "@la/lib";

export function doSomething(n: number) {
  greet("Ada");
  double(n);
}
