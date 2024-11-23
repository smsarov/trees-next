"use client";

import { Branch } from "./branch";
import { createDefaultBase } from "./helpers";
import { fullInfo } from "./helpers";
import p5Types from "p5";

function createSketch(tree: Branch) {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.noStroke();

    const base = createDefaultBase(p5);

    tree.initialize(base);

    console.log(fullInfo(tree));
  };

  const draw = (p5: p5Types) => {
    if (!tree.isDrawn) {
      p5.clear(0, 0, 0, 0);
      tree.cycle(p5);
    }
  };

  return { setup, draw };
}

export { createSketch };
