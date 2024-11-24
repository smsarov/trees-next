import { DNA } from "@/lib/p5/types";

function getTreeParamName(param: keyof DNA) {
  switch (param) {
    case "r":
      return "red";
    case "g":
      return "green";
    case "b":
      return "blue";
    case "R":
      return "size";
    case "branch":
      return "branches";
    default:
      return param;
  }
}

const sliderParams: (keyof DNA)[] = [
  "branch",
  "length",
  "angle",
  "curl",
  "gravity",
  "R",
] as const;


export { getTreeParamName, sliderParams };
