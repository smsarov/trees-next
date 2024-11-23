import p5Types from 'p5';
type Vector = p5Types.Vector

type DNA = {
  length: number[];
  curl: number[];
  angle: number[];
  gravity: number[];

  branch: number[];

  r: number[];
  g: number[];
  b: number[];

  R: number[];
};

type Base = {
  pos: Vector;
  vel: Vector;
  
  r: number;
  g: number;
  b: number;

  R: number;
};

type RandomInfo = {
  points: number[];
  children: RandomInfo[];
};

type StableInfo = {
  dna: DNA;
  base: Base;
};

type FullInfo = {
  randomInfo: RandomInfo;
  stableInfo: StableInfo;
};

export type {Base, DNA, RandomInfo, StableInfo, FullInfo}