import React, { useState } from "react";
import { LevelNavigation } from "./LevelNavigation";
import { LevelInputs } from "./LevelForm";

function DNAForm() {
  const [level, setLevel] = useState(0);
  return (
    <form className="w-[400px] text-xl shadow-lg shadow-amber-800 p-8 rounded-xl">
      <LevelInputs level={level}></LevelInputs>
      <LevelNavigation onChange={setLevel} level={level}></LevelNavigation>
    </form>
  );
}


export default DNAForm;
