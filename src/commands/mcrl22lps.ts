import { Mcrl2Args } from '../types/common';
import { LPS, MCRL2, Mcrl2Tool } from './common';

export default class Mcrl22Lps extends Mcrl2Tool {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new Mcrl22Lps("mcrl22lps");
    }
    return this.instance;
  }

  protected getInputFile(basename: string, args?: Mcrl2Args) {
    return MCRL2.getFile(basename);
  }

  protected getOutputFile(basename: string, args?: Mcrl2Args) {
    return LPS.getFile(basename);
  }
}
