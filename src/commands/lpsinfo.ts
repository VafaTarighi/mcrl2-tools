import Mcrl22Lps from './mcrl22lps';
import { Mcrl2Args } from '../types/common';
import { LPS, Mcrl2Tool } from './common';

export default class LpsInfo extends Mcrl2Tool {
  public static getInstance(): Mcrl2Tool {
    if (!this.instance) {
      this.instance = new LpsInfo("lpsinfo", Mcrl22Lps.getInstance());
    }
    return this.instance;
  }

  protected getInputFile(basename: string, args?: Mcrl2Args) {
    return LPS.getFile(basename);
  }
}
