import { LPS, LTS, Mcrl2Tool } from './common';
import Mcrl22Lps from './mcrl22lps';
import { Mcrl2Args } from '../types/common';

export default class Lps2Lts extends Mcrl2Tool {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new Lps2Lts("lps2lts", Mcrl22Lps.getInstance());
    }
    return this.instance;
  }

  protected getInputFile(basename: string, args?: Mcrl2Args) {
    return LPS.getFile(basename);
  }

  protected getOutputFile(basename: string, args?: Mcrl2Args) {
    return LTS.getFile(basename);
  }
}
