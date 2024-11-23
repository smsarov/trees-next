import { useContextDNA } from "@/contexts/VisualEditorContext";
import { getTreeParamName } from "./utils";
import { DNA } from "@/lib/p5/types";
import { paramsForForm } from "./utils";
import { Slider } from "../ui/slider";

export function LevelForm({ level }: { level: number }) {
  const { DNA } = useContextDNA();

  return (
    <div>
      {paramsForForm.map((key) => (
        <LevelRow key={key} level={level} param={key as keyof DNA}></LevelRow>
      ))}
    </div>
  );
}

function LevelRow({ level, param }: { level: number; param: keyof DNA }) {
  const { DNA, setDNA } = useContextDNA();
  const name = getTreeParamName(param);
  const inputId = `${param}-${level}`;

  const handleChange = (values: number[]) => {
    const value = values[0];
    const newDNA = { ...DNA };
    newDNA[param][level] = value;
    setDNA(newDNA);
  };

  const active = param !== "branch";

  return (
    <div className="flex flex-row w-full justify-between">
      <label htmlFor={inputId}>{name}</label>
      <Slider
        className="w-1/2"
        disabled={!active}
        min={0}
        max={100}
        onValueChange={handleChange}
        defaultValue={[DNA[param][level]]}
        id={inputId}
      />
    </div>
  );
}
