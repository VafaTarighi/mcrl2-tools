import fs from 'fs';
import { LPS, LTS, Mcrl2Tool } from './common';
import Mcrl22Lps from './mcrl22lps';
import { Mcrl2Args } from '../types/common';
import { isDirty, resetDirty } from '../utils/isDirty';

export default class Lps2Lts extends Mcrl2Tool {

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Lps2Lts("lps2lts", Mcrl22Lps.getInstance());
    }
    return this.instance;
  }

  public getCommand(getArgs?: () => Mcrl2Args) {
    const args = getArgs?.();

    const input = LPS.getFile();

    let command = "";
    if (this.dependency) {
      if (isDirty() || !fs.existsSync(input)) {
        command += this.dependency.getCommand(getArgs);
        resetDirty();
      }
    }

    const output = LTS.getFile();

    command += this.commandString(input, args, output);
    return command;
  }
}