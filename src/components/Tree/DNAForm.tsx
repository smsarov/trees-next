import React, { useState } from "react";
import { LevelNavigation } from "./LevelNavigation";
import { LevelForm } from "./LevelForm";

function DNAForm() {
  const [level, setLevel] = useState(0);
  return (
    <div className="w-[400px] font-bold text-xl shadow-lg shadow-amber-800 p-8 rounded-xl">
      <LevelForm level={level}></LevelForm>
      <LevelNavigation onChange={setLevel} level={level}></LevelNavigation>
    </div>
  );
}


export default DNAForm;
