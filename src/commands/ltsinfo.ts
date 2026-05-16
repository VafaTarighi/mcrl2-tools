import { Mcrl2Args } from '../types/common';
import { LTS, Mcrl2Tool } from './common';
import Lps2Lts from './lps2lts';

export default class LtsInfo extends Mcrl2Tool {
  public static getInstance(): Mcrl2Tool {
    if (!this.instance) {
      this.instance = new LtsInfo("ltsinfo", Lps2Lts.getInstance());
    }
    return this.instance;
  }

  protected getInputFile(basename: string, args?: Mcrl2Args) {
    return LTS.getFile(basename);
  }
}
