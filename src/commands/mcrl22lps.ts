import { Mcrl2Args } from '../types/common';
import { LPS, MCRL2, Mcrl2Tool } from './common';

export default class Mcrl22Lps extends Mcrl2Tool {

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Mcrl22Lps("mcrl22lps");
    }
    return this.instance;
  }

  public getCommand(getArgs?: () => Mcrl2Args) {
    const args = getArgs?.();

    const input = MCRL2.getFile();
    const output = LPS.getFile();

    
    return this.commandString(input, args, output);

  }
}