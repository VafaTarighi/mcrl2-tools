import { Mcrl2Args, Mcrl2ToolType } from '../types/common';
import path from 'path';
import fs from 'fs';
import { isDirty, resetDirty } from '../utils/isDirty';
import { LTS, Mcrl2Tool } from './common';
import getProjectPaths from '../utils/getProjectPaths';
import Lps2Lts from './lps2lts';

export default class LtsView extends Mcrl2Tool {
  
  public static getInstance() {
    if (!this.instance) {
      this.instance = new LtsView("ltsview", Lps2Lts.getInstance());
    }
    return this.instance;
  }

  public getCommand(getArgs: () => Mcrl2Args) {
    const args = getArgs?.();

    const {
      baseName,
    } = getProjectPaths();

    const input = LTS.getFile();

    let command = "";
    if (this.dependency) {
      if (isDirty() || !fs.existsSync(input)) {
        command += this.dependency.getCommand();
        resetDirty();
      }
    }

    command += this.commandString(input, args);
    return command;

  }

}