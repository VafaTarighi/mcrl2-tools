import fs from 'fs';
import { LPS, MCF, Mcrl2Tool, PBES } from './common';
import Mcrl22Lps from './mcrl22lps';
import { Mcrl2Args, Mcrl2ToolType } from '../types/common';
import { isDirty, resetDirty } from '../utils/isDirty';
import overrideArg from '../utils/overrideArg';

export default class Lps2Pbes extends Mcrl2Tool {

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Lps2Pbes("lps2pbes", Mcrl22Lps.getInstance());
    }
    return this.instance;
  }

  public async run(getArgs?: () => Mcrl2Args) {
    const formula = await MCF.chooseFormula();
    if (!formula) {
      throw new Error("You must choose a mu-formula for this operation to succeed.");
    }
    super.run(overrideArg("lps2pbes", "formula", formula, getArgs));
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

    const formula = args!.lps2pbes!["formula"] as string;

    const output = PBES.getFile(formula);

    command += this.commandString(input, args, output);
    return command;
  }
}