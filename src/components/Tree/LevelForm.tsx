import { useEffect, useRef } from "react";
import { useContextDNA } from "@/contexts/VisualEditorContext";
import { getTreeParamName } from "./utils";
import { DNA } from "@/lib/p5/types";
import { sliderParams } from "./utils";
import { Slider } from "../ui/slider";
import { RgbColorPicker } from "react-colorful";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LevelInputs({ level }: { level: number }) {
  return (
    <div>
      {sliderParams.map((key) => (
        <SliderRow key={key} level={level} param={key as keyof DNA}></SliderRow>
      ))}
      <div className="mt-4">
        <ColorRow level={level}></ColorRow>
      </div>
    </div>
  );
}

function SliderRow({ level, param }: { level: number; param: keyof DNA }) {
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
        key={inputId}
        name={inputId}
        className="w-1/2"
        disabled={!active}
        min={0}
        max={100}
        onValueChange={handleChange}
        value={[DNA[param][level]]}
        id={inputId}
      />
    </div>
  );
}

function ColorRow({ level }: { level: number }) {
  const { DNA, setDNA } = useContextDNA();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputId = `$color-${level}`;

  const initalColor = {
    r: DNA["r"][level],
    g: DNA["g"][level],
    b: DNA["b"][level],
  };

  const style: React.CSSProperties = {
    background: `rgb(${initalColor.r}, ${initalColor.g}, ${initalColor.b})`,
  };

  function handleChange(e: typeof initalColor) {
    const newDNA = { ...DNA };

    triggerRef.current!.style.background = `rgb(${e.r}, ${e.g}, ${e.b})`;

    newDNA["r"][level] = e.r;
    newDNA["g"][level] = e.g;
    newDNA["b"][level] = e.b;
    setDNA(newDNA);
  }

  return (
    <DropdownMenu key={inputId}>
      <DropdownMenuTrigger
        ref={triggerRef}
        key={`${inputId}-trigger`}
        className="w-full h-6 rounded-md border-secondary border"
        style={style}
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="overflow-visible p-0">
        <RgbColorPicker
          role='input'
          onChange={handleChange}
          id="inputId"
          key={`${inputId}-picker`}
          color={initalColor}
        ></RgbColorPicker>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
