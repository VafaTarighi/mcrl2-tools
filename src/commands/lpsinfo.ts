import Mcrl22Lps from './mcrl22lps';
import { Mcrl2Args, Mcrl2ToolType } from '../types/common';
import { LPS, Mcrl2Tool } from './common';
import fs from 'fs';
import getProjectPaths from '../utils/getProjectPaths';
import { isDirty, resetDirty } from '../utils/isDirty';

export default class LpsInfo extends Mcrl2Tool {

  public static getInstance(): Mcrl2Tool {
    if (!this.instance) {
      this.instance = new LpsInfo("lpsinfo", Mcrl22Lps.getInstance());
    }
    return this.instance;
  }

  public getCommand(getArgs?: () => Mcrl2Args) {
    const args = getArgs?.();

    const {
      baseName
    } = getProjectPaths();

    const lpsInput = LPS.getFile();

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