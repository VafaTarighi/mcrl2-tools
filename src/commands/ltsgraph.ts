import { Mcrl2Args } from '../types/common';
import fs from 'fs';
import { isDirty, resetDirty } from '../utils/isDirty';
import { LTS, Mcrl2Tool } from './common';
import Lps2Lts from './lps2lts';

export default class LtsGraph extends Mcrl2Tool {

  public static getInstance() {
    if (!this.instance) {
      this.instance = new LtsGraph("ltsgraph", Lps2Lts.getInstance());
    }
    return this.instance;
  }

  public getCommand(getArgs: () => Mcrl2Args) {
    const args = getArgs?.();

    const input = LTS.getFile();

    let command = "";
    if (this.dependency) {
      if (isDirty() || !fs.existsSync(input)) {
        command += this.dependency.getCommand(getArgs);
        resetDirty();
      }
    }

    command += this.commandString(input, args);
    return command;

  }

}