import { PathLike, statSync } from 'fs';

export function isDirty(input: PathLike, output: PathLike): boolean {

  const inputMTime = statSync(input).mtimeMs;
  const outputMTime = statSync(output).mtimeMs;

  return inputMTime > outputMTime;
}