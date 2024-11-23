"use client";

import React, { useEffect, useMemo, useRef } from "react";
import type { DNA } from "@/lib/p5/types";
import { Branch } from "@/lib/p5/branch";
import { createSketch } from "@/lib/p5/setup";
import Sketch from "react-p5";

const TreeSketch = ({ dna }: { dna: DNA }) => {
  const mounted = useRef(false);
  const tree = useMemo(() => new Branch(dna), []);
  const sketch = useMemo(() => createSketch(tree), [tree]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    tree.setDNA(dna);
  }, [dna]);

  return (
    <div className="w-fit rounded-xl overflow-hidden">
      <Sketch setup={sketch.setup} draw={sketch.draw} />
    </div>
  );
};

export default TreeSketch;
