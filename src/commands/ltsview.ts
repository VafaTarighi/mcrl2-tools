import { Mcrl2Args } from '../types/common';
import { LTS, Mcrl2Tool } from './common';
import Lps2Lts from './lps2lts';

export default class LtsView extends Mcrl2Tool {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new LtsView("ltsview", Lps2Lts.getInstance());
    }
    return this.instance;
  }

  protected getInputFile(basename: string, args?: Mcrl2Args) {
    return LTS.getFile(basename);
  }
}
