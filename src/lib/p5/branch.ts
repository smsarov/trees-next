import { DNA, Base } from "./types";
import { lerp, dnaMappers } from "./helpers";
import p5Types from "p5";

type Vector = p5Types.Vector;

class Branch {
  dna: DNA;
  level: number;

  base?: Base;
  order: number;
  splits: number[] = [];
  children: Branch[] = [];

  pos?: Vector;
  vel?: Vector;

  isDrawn = false;

  constructor(dna: DNA, level = 0, order = 0) {
    this.dna = dna;
    this.level = level;
    this.order = order;

    this.splits = new Array(this.DNA("branch") || 0)
      .fill(1)
      .map((_) => Math.random())
      .sort();
  }

  DNA(param: keyof DNA) {
    const normalizedValue = this.dna[param][this.level];
    return dnaMappers[param](normalizedValue);
  }

  setDNA(dna: DNA) {
    if (!this.base) throw new Error("Base is not defined");

    this.dna = dna;
    this.initialize(this.base);
  }

  setBase(base: Base) {
    const angle = this.DNA("angle");
    const isLast = this.level && (this.dna.branch[this.level - 1] === this.order + 1);
    const sign = ((-1) ** this.order) * Number(!isLast);

    this.base = { ...base };
    this.pos = this.base.pos.copy();
    this.vel = this.base.vel.copy().rotate(angle * sign);
  }

  initialize(base: Base) {
    this.isDrawn = false;

    if (this.children.length !== this.DNA("branch")) {
      this.children = this.splits.map(
        (_, index) => new Branch(this.dna, this.level + 1, index)
      );
    }

    this.setBase(base);
    const length = this.DNA("length");
    const stepMap = this.stepsCount();

    let updated = 0;
    for (let step = 0; step < length; step++) {
      if (updated == this.splits.length) break;

      this.move();
      if (stepMap.has(step)) {
        const count = stepMap.get(step) || 0;
        for (let i = 0; i < count; i++) {
          const childBase = this.getCurrentBase(this.splits[updated]);
          const child = this.children[updated];

          child.dna = this.dna;
          child.initialize(childBase);

          updated += 1;
        }
      }
    }

    this.setBase(base);
  }

  getCurrentBase(ratio: number): Base {
    if (!this.base || !this.pos || !this.vel)
      throw new Error("Base is not defined");

    return {
      pos: this.pos,
      vel: this.vel,
      r: lerp(this.base.r, this.DNA("r"), ratio),
      g: lerp(this.base.g, this.DNA("g"), ratio),
      b: lerp(this.base.b, this.DNA("b"), ratio),
      R: lerp(this.base.R, this.DNA("R"), ratio),
    };
  }

  move() {
    if (!this.pos || !this.vel || !this.base)
      throw new Error("Base is not defined");
    const curl = this.DNA("curl");
    const gravity = this.DNA("gravity");

    this.vel.rotate(curl);
    this.vel.y += gravity;
    this.vel.normalize();
    this.pos.add(this.vel);
  }

  draw(p5: p5Types, ratio: number) {
    if (!this.pos || !this.vel) throw new Error("Base is not defined");
    const { r, g, b, R } = this.getCurrentBase(ratio);

    p5.fill(p5.color(r, g, b));
    p5.circle(this.pos.x, this.pos.y, R);
  }

  stepsCount() {
    const stepsArray = this.splits.map((r) =>
      Math.floor(r * this.DNA("length"))
    );
    const stepMap = new Map<number, number>();
    for (let step of stepsArray) {
      stepMap.set(step, (stepMap.get(step) || 0) + 1);
    }
    return stepMap;
  }

  cycle(p5: p5Types) {
    const length = this.DNA("length");
    const maxSplitPoint = this.splits.at(-1) || 1;
    const maxLength = length * maxSplitPoint;

    const stepMap = this.stepsCount();

    let drawn = 0;
    for (let step = 0; step < maxLength; step++) {
      const ratio = step / length;
      this.move();
      this.draw(p5, ratio);

      if (stepMap.has(step)) {
        const count = stepMap.get(step) || 0;
        for (let i = 0; i < count; i++) {
          const child = this.children[drawn];
          child.cycle(p5);
          drawn += 1;
        }
      }
    }

    this.isDrawn = true;
  }
}

export { Branch };
