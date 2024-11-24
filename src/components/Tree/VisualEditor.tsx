"use client";

import React, { useState } from "react";
import Sketch from "./Sketch";
import DNAForm from "./DNAForm";

import { ContextDNA } from "@/contexts/VisualEditorContext";
import { randomDNA } from "@/lib/p5/helpers";
import type { DNA } from "@/lib/p5/types";

function VisualEditor() {
  const [DNA, setDNA] = useState(randomDNA());

  function changeDNA(dna: DNA) {
    setDNA(JSON.parse(JSON.stringify(dna)));
  }

  return (
    <ContextDNA.Provider value={{ DNA, setDNA: changeDNA }}>
      <div className="w-fit rounded-xl flex flex-col items-center gap-4 md:p-8 md:flex-row shadow-lg shadow-yellow-800">
        <Sketch dna={DNA} />
        <DNAForm />
      </div>
    </ContextDNA.Provider>
  );
}

export default VisualEditor;
