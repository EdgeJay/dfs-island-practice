import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import Graph from './Graph';

const buildGraph = (input: string[][]) => {
  const graph = new Graph();
  graph.rebuild(input);
};

const readFile = (): string[][] => {
  const { f: file } = yargs.parseSync();
  if (typeof file !== 'string') {
    throw new Error('Missing file');
  }

  const str = fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');
  const output = JSON.parse(str) as string[][];
  return output;
};

const start = () => {
  const nodes = readFile();
  buildGraph(nodes);
};

start();
