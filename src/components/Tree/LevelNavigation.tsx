import { useContextDNA } from "@/contexts/VisualEditorContext";
import { randomDNA } from "@/lib/p5/helpers";
import { Button } from "../ui/button";

export function LevelNavigation({
  level,
  onChange,
}: {
  level: number;
  onChange: (level: number) => void;
}) {
  const { DNA, setDNA } = useContextDNA();
  const maxLevel = DNA.R.length;

  return (
    <div className="flex flex-row items-center justify-between leading-16 mt-6">
      <Button
        variant="outline"
        role="reset"
        onClick={(e) => {
          e.preventDefault();
          setDNA(randomDNA());
        }}
      >
        Reset
      </Button>

      <div className="flex flex-row justify-between gap-4">
        {Array.from({ length: maxLevel }).map((_, index) => {
          const active = index === level;
          return (
            <Button
              role="radio"
              key={index}
              variant={active ? "secondary" : "outline"}
              className="min-w-12"
              onClick={(e) => {
                e.preventDefault();
                onChange(index);
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
