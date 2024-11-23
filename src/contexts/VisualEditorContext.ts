import { createContext, useContext } from "react";
import type { DNA } from "@/lib/p5/types";

type ContextType = {
  DNA: DNA;
  setDNA: (dna: DNA) => void;
};

const ContextDNA = createContext<ContextType | undefined>(undefined);

const useContextDNA = () => {
  const value = useContext(ContextDNA);
  if (!value) throw new Error('Must be used "ContextDNA.Provider"');

  return value;
};

export { ContextDNA, useContextDNA };
