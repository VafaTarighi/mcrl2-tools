import { MCF, Mcrl2Tool, PBES } from './common';
import Lps2Pbes from './lps2pbes';
import { Mcrl2Args } from '../types/common';
import overrideArg from '../utils/overrideArg';

export default class PbesSolve extends Mcrl2Tool {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PbesSolve("pbessolve", Lps2Pbes.getInstance());
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

    protected getInputFile(basename: string, args?: Mcrl2Args) {
        const formula = args!.lps2pbes!["formula"] as string;
        return PBES.getFile(basename, formula);
    }
}
