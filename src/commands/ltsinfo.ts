import { Mcrl2Args } from '../types/common';
import { LPS, LTS, Mcrl2Tool } from './common';
import fs from 'fs';
import getProjectPaths from '../utils/getProjectPaths';
import { isDirty, resetDirty } from '../utils/isDirty';
import Lps2Lts from './lps2lts';

export default class LtsInfo extends Mcrl2Tool {

  public static getInstance(): Mcrl2Tool {
    if (!this.instance) {
      this.instance = new LtsInfo("ltsinfo", Lps2Lts.getInstance());
    }
    return this.instance;
  }

  public getCommand(getArgs?: () => Mcrl2Args) {
    const args = getArgs?.();

    const {
      baseName
    } = getProjectPaths();

    const lpsInput = LTS.getFile();

    let command = "";
    if (this.dependency) {
      if (isDirty() || !fs.existsSync(lpsInput)) {
        command += this.dependency.getCommand(getArgs);
        resetDirty();
      }
    }

    command += this.commandString(lpsInput, args);
    return command;
  }

}