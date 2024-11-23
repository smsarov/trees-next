import { Branch } from "./branch";
import { Base, DNA, FullInfo, RandomInfo, StableInfo } from "./types";
import p5Types from "p5";

function lerp(from: number, to: number, ratio: number) {
  return from * (1 - ratio) + to * ratio;
}

function createDefaultBase(p5: p5Types): Base {
  return {
    pos: p5.createVector(200, 350),
    vel: p5.createVector(0, -1),

    r: 0,
    g: 0,
    b: 0,

    R: 20,
  };
}

const emptyDNA: DNA = {
  length: [200, 120, 60, 30],
  curl: [0, 0, 0, 0],
  angle: [0, -0.2, 0.7, 0.8],
  gravity: [0.01, 0.01, 0.1, 0.2],

  branch: [4, 3, 3, 4],

  r: [255, 0, 0, 50],
  g: [0, 255, 0, 100],
  b: [0, 0, 255, 100],

  R: [4, 2, 2, 2],
};

function randomDNA(): DNA {
  const dna = JSON.parse(JSON.stringify(emptyDNA)) as DNA;

  for (let _key in dna) {
    let key = _key as keyof DNA;
    dna[key] = dna[key].map((_) => Math.floor(Math.random() * 100));
  }

  dna.angle[0] = 50;
  dna.gravity[0] = 50;
  dna.curl[0] = 50;

  dna.branch[dna.branch.length - 1] = 0;

  return dna;
}

const dnaMappers: Record<keyof DNA, (value: number) => number> = {
  length: (value) => lerp(20, 150, value / 100),
  curl: (value) => lerp(-0.02, 0.02, value / 100),
  angle: (value) => lerp(-1, 1, value / 100),
  gravity: (value) => lerp(-0.02, 0.02, value / 100),

  branch: (value) => Math.floor(value / 20),

  r: (value) => lerp(0, 255, value / 100),
  g: (value) => lerp(0, 255, value / 100),
  b: (value) => lerp(0, 255, value / 100),

  R: (value) => lerp(0, 10, value / 100),
};

function fullInfo(tree: Branch) {
  if (!tree.base) throw new Error("Base is not defined");

  function getRandomInfo(tree: Branch): RandomInfo {
    const points = [...tree.splits];
    const children = tree.children.map(getRandomInfo);

    return {
      points,
      children,
    };
  }

  const stableInfo: StableInfo = {
    dna: tree.dna,
    base: tree.base,
  };

  const randomInfo = getRandomInfo(tree);

  return { randomInfo, stableInfo };
}

export { lerp, randomDNA, createDefaultBase, dnaMappers, fullInfo };
